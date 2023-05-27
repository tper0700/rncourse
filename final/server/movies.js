import mpvAPI from 'node-mpv'
import QRCode from 'qrcode'
import * as os from "os"

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

    this.init();
  }

  async showQRCode() {
    let info = "MEDIASERVER " + JSON.stringify({
      url: "http://" + os.hostname() + ":8920",
      name: os.hostname().split(".")[0]
    });

    await QRCode.toFile("./init.png", info, {
      margin: 10,
      scale: 20,
      color: {
        dark: "#225",
        light: "#FFF"
      }
    });

    this.mpv.loop("inf");
    this.mpv.fullscreen();
    this.mpv.load("./init.png");
  }

  async init() {
    await this.mpv.start();
    await this.showQRCode();
  }
  
  async pause() {
    if (await this.mpv.isPaused()) {
      this.mpv.play();
    } else {
      this.mpv.pause();
    }
  }

  async stop() {
    await this.showQRCode();
  }

  async play(movie) {
    console.log("Play: " + movie.name);
    await this.mpv.load(movie.uri);
  } 
}

