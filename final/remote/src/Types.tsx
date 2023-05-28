import AsyncStorage from '@react-native-async-storage/async-storage';

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

export var HARDCODED_SERVERS : Server[] = [
  {
    url: "http://garbage1", 
    name: "garbage1",
    lat: 47.56029,
    lon: -122.28527,
  },
  {
    url: "http://garbage2",
    name: "garbage2",
    lat: 47.56029,
    lon: -122.28527,
  },
  {
    url: "garbg",
    name: "faraway",
    lat: 47.64029,
    lon: -122.64527,
  }
]

// TODO: Store in AsyncStorage
// TODO: Save new servers
export async function GetServerList() : Server[] {
  const jsonList = await AsyncStorage.getItem('@remoteMovieList');
  let movies = jsonList != null ? JSON.parse(jsonList) : [];
  return movies;
}

export async function SaveServer(server: Server) {
  // Get movies from AsyncStorage
  const jsonList = await AsyncStorage.getItem('@remoteMovieList');
  let movies = jsonList != null ? JSON.parse(jsonList) : [];

  // Append movie
  movies.push(server);

  // Save updated list
  let jsonUpdated = JSON.stringify(movies);
  await AsyncStorage.setItem('@remoteMovieList', jsonUpdated);
}

export function isServerClose(s: Server, c: coord) {
  let latdist = s.lat - c.lat;
  let londist = s.lon - c.lon;
  let dist = Math.sqrt(latdist * latdist + londist * londist);
  console.log(" --- " + s.name + " : " + dist);
  return dist < 0.0005;
}

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
