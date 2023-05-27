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
    return HARDCODED_SERVERS
}

export function SaveServer(server: Server) {
  console.log("TODO: Save server here");
  HARDCODED_SERVERS.push(server);
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
