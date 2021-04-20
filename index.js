const express = require("express");
const cors = require("cors");
const exampleData = require("./data.json");
const calculatedDeduction = require("./calculateDeduction");

let app = express();
app.use(express.json()); // for parsing application/json

app.use(cors());

// Uses the dummy-data
app.get("/", function (req, res) {
  res.send({ reisefradrag: calculatedDeduction(exampleData) });
});

// Uses real data
app.post("/", function (req, res) {
  res.send({ reisefradrag: calculatedDeduction(req.body) });
});

const port = process.env.PORT || 5000;
http.listen(port);
