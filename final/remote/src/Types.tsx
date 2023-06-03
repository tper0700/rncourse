/*
 * Types and helper functions for server interaction
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_CLOSE_FACTOR = 0.000075

export type Server = {
  url: string,
  name: string,
  lat: number,
  lon: number,
}

export type coord = {
  "lon": number,
  "lat": number,
}

export type Movie = {
  "name": string,
  "uri": string,
  "id": number,
}

// Test list of servers, used for testing only.
export var HARDCODED_SERVERS : Server[] = [
  {
    url: "http://garbage1", 
    name: "garbage1",
    lat: 52.56029,
    lon: -125.28527,
  },
  {
    url: "http://garbage2",
    name: "garbage2",
    lat: 52.56029,
    lon: -125.28527,
  },
  {
    url: "garbg",
    name: "faraway",
    lat: 47.64029,
    lon: -122.64527,
  }
]

// Check Async Storage for current list of servers
export async function GetServerList() : Server[] {
  const jsonList = await AsyncStorage.getItem('@remoteMovieList');
  let servers = jsonList != null ? JSON.parse(jsonList) : [];
  return servers;
}

// Add a server to Async storage
export async function SaveServer(server: Server) {
  // Get movies from AsyncStorage
  const jsonList = await AsyncStorage.getItem('@remoteMovieList');
  let servers = jsonList != null ? JSON.parse(jsonList) : [];

  // Append movie
  servers.push(server);

  // Save updated list
  let jsonUpdated = JSON.stringify(servers);
  await AsyncStorage.setItem('@remoteMovieList', jsonUpdated);
}

// Helper calculation to see how far a server is
// Uses cartesian distance approximation.
export function isServerClose(s: Server, c: coord) {
  let latdist = s.lat - c.lat;
  let londist = s.lon - c.lon;
  let dist = Math.sqrt(latdist * latdist + londist * londist);
  console.log(" --- " + s.name + " : " + dist);
  return dist < SERVER_CLOSE_FACTOR;
}

// Adds a server to list without duplication (checks GPS coords)
export async function AddServerToList(server: Server) {
  console.log("Adding server " + server.url)
  let servers: Server[] = await GetServerList();
  let seen: boolean = false
  let c: coord = {
    lat: server.lat,
    lon: server.lon,
  }
  for (let s of servers) {
    console.log(" : " + s.url)
    if (s.url == server.url && isServerClose(s, c)) {
      console.log ("maybe already added");
      seen = true;
    }
  }
  if (!seen) {
    SaveServer(server);
  }
}

// Removes a server from list (looks for same URL and nearby location)
export async function RemoveServerFromList(server: Server) {
  console.log("Removing server " + server.url)
  let servers: Server[] = await GetServerList();
  let seen: boolean = false
  let c: coord = {
    lat: server.lat,
    lon: server.lon,
  }
  for (let i in servers) {
    let s = servers[i];
    console.log(" : " + s.url)
    if (s.url == server.url && isServerClose(s, c)) {
      console.log ("delete this one");
      servers.splice(i, 1);

      let jsonUpdated = JSON.stringify(servers);
      await AsyncStorage.setItem('@remoteMovieList', jsonUpdated);
    }
  }
}
