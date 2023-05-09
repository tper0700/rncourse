import * as child from 'child_process'

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
    this.proc = null;
  } 
  
  pause() {
    if (this.proc) {
      console.log(this.proc);
      console.log("Pause")
      this.proc.stdin.cork();
      this.proc.stdin.write("p\n");
      this.proc.stdin.uncork();
    } else {
      console.log("No movie playing...")
    }
  }

  play(movie) {
    console.log("Play: " + movie.name);

    if (this.proc) {
      this.proc.kill('SIGINT');
    }

    this.proc = child.spawn("mpv", [movie.uri], {
      "stdio": ['pipe', 'pipe', 'pipe']
    });

    console.log(this.proc);

    /*
    this.proc.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    this.proc.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    */
    this.proc.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    }); 
  } 
}

