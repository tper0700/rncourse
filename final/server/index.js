import express from 'express'
import * as fs from "fs";
import * as https from "https";
import {MOVIES, Player} from './movies.js'

const app = express()
var currentMovie = null;

app.set("view engine", "ejs");

app.get("/movies", (req, res) => {
  res.json(MOVIES);
})

app.get("/state", (req, res) => {
  res.json({
    current: currentMovie
  });
})

app.get("/pause", (req, res) => {
  Player.pause();
  res.status(200);
  res.end();
})

app.get("/stop", (req, res) => {
  Player.stop();
  currentMovie = null;
  res.status(200);
  res.end();
})

app.get("/play/:id", (req, res) => {
  let id = req.params.id;
  let movie = MOVIES.reduce((res, cur) => {
    return cur.id == id ? cur : res;
  }, null);

  if (movie) {
    currentMovie = movie;
    Player.play(movie)
    .catch(err => {
      console.log("playback error: " + JSON.stringify(err));
    });
    res.json(movie);
  } else {
    res.status(404);
    res.end();
  }
})
/*
var key = fs.readFileSync("server.key", "utf8");
var cert = fs.readFileSync("server.crt", "utf8");
var ca = fs.readFileSync("CA.pem", "utf8");
var creds = {
  key: key,
  cert: cert,
  rejectUnauthorized: false,
  ca: [ca],
};

var server = https.createServer(creds, app);
server.listen(8920, () => {
  console.log("Server running on https://localhost:8920");
});
*/

app.listen(8920, () => {
  console.log("Server running on http://localhost:8920")
});
