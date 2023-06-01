import express from 'express'
import * as fs from "fs";
import * as https from "https";
import {MOVIES, Player} from './movies.js'

const app = express()
var currentMovie = null;

app.use(express.json());
app.set("view engine", "ejs");

app.get("/movies", (req, res) => {
  res.json(MOVIES);
})

app.get("/state", (req, res) => {
  res.json({
    current: currentMovie
  });
})

app.get("/volume", (req, res) => {
  Player.getVolume().
  then(vol => {
    res.json({
      volume: vol,
    });
  })
});

app.put("/volume", (req, res) => {
  if ("volume" in req.body && typeof req.body.volume == "number") {
    Player.setVolume(req.body.volume)
    .then((vol) => {
      res.json({
        "volume": vol
      })
    });
  } else {
    res.status(400);
    res.end()
  }  
})

app.get("/pause", (req, res) => {
  Player.pause();
  res.status(200);
  res.end();
});

app.get("/stop", (req, res) => {
  Player.stop();
  currentMovie = null;
  res.status(200);
  res.end();
});

app.get("/play/:id", (req, res) => {
  let id = req.params.id;
  let movie = MOVIES.reduce((res, cur) => {
    return cur.id == id ? cur : res;
  }, null);

  if (movie) {
    currentMovie = movie;
    Player.play(movie)
    .then(() => {
      res.json(movie);
    })
    .catch(err => {
      console.log("playback error: " + JSON.stringify(err));
    });
  } else {
    res.status(404);
    res.end();
  }
});

app.listen(8920, () => {
  console.log("Server running on http://localhost:8920");
});
