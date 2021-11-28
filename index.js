const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/track_repo", (req, res) => {
  console.log(req.body);

  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Google repos app listening at http://localhost:${port}`);
});
