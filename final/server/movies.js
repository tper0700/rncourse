import * as child from 'child_process'
import mpvAPI from "node-mpv"

export const MOVIES = [
  {
    name: "Rain forest",
    uri: "https://www.youtube.com/watch?v=SnUBb-FAlCY",
    id: 15965,
  },
  {
    name: "Bouncing Light",
    uri: "https://www.youtube.com/watch?v=VTH1zCgC1kI",
    id: 15425,
  },
  {
    name: "Blue Spotted Grid",
    uri: "https://www.youtube.com/watch?v=9kRWLr5ZzRY",
    id: 15975,
  },
  {
    name: "Wormhole",
    uri: "https://www.youtube.com/watch?v=2QSukL7dl5o",
    id: 11965,
  },
  {
    name: "Green Screen Particles",
    uri: "https://www.youtube.com/watch?v=eOskNqmCUvU",
    id: 15265,
  },
]

export const Player = new class {
  constructor() {
    this.mpv = new mpvAPI();
    this.mpv.start();
  }
  
  // TODO: Use MPV IPC
  // https://mpv.io/manual/master/#json-ipc
  async pause() {
    if (await this.mpv.isPaused()) {
      this.mpv.play();
    } else {
      this.mpv.pause();
    }
  }

  async play(movie) {
    console.log("Play: " + movie.name);
    await this.mpv.load(movie.uri);
  } 
}

