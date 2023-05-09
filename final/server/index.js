import express from 'express'
import {MOVIES, Player} from './movies.js'

const app = express()

app.set("view engine", "ejs");

app.get("/movies", (req, res) => {
  res.json(MOVIES);
})

app.get("/pause", (req, res) => {
  Player.pause();
  res.status(200);
  res.end();
})
app.get("/play/:id", (req, res) => {
  let id = req.params.id;
  let movie = MOVIES.reduce((res, cur) => {
    return cur.id == id ? cur : res;
  }, null);

  if (movie) {
    Player.play(movie);
    res.json(movie);
  } else {
    res.status(404);
    res.end();
  }
})

app.listen(8920, () => {
  console.log("Server running on http://localhost:8920")
});
