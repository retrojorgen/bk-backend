const express = require("express");
const exampleData = require("./data.json");
const calculatedDeduction = require("./calculateDeduction");

let app = express();
app.use(express.json()); // for parsing application/json

// Uses the dummy-data
app.get("/", function (req, res) {
  res.send({ reisefradrag: calculatedDeduction(exampleData) });
});

// Uses real data
app.post("/", function (req, res) {
  console.log(req.body);
  res.send({ reisefradrag: calculatedDeduction(req.body) });
});

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
