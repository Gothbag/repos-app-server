const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { addRepo, getAllRepos } = require("./db");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/track_repo", (req, res) => {
  const repo = req.body;

  try {
    addRepo(repo);
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
  }
});

app.get("/api/repos", async (req, res) => {
  try {
    const repos = await getAllRepos();

    res.send(repos);
  } catch (e) {
    console.error(e);
  }
});

app.listen(port, () => {
  console.log(`Google repos app listening at http://localhost:${port}`);
});
