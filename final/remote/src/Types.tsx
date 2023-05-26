export type Server = {
  url: string,
  name: string,
  lat?: number,
  lon?: number,
}
  
export const HARDCODED_SERVERS : Server[] = [
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
export function GetServerList() : Server[] {
    return HARDCODED_SERVERS
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