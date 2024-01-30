const express = require("express");
const app = express();
const port = 3000;

// store

var data = require("./servergame1.json");

app.get("/", (req, res) => {
  res.send(data);
});

app.get("/cake", (req, res) => {
  data.cake++;
  res.redirect("/");
});

app.get("/icecream", (req, res) => {
  data.icecream++;
  res.redirect("/");
});

app.get("/chocolate", (req, res) => {
  data.chocolate++;
  res.redirect("/");
});

app.get("/save", (req, res) => {
  const fs = require("fs");
  fs.writeFile("servergame1.json", JSON.stringify(data), (err, res) => {
    if (err) {
      console.log("error");
    } else {
      console.log("resolved");
    }
  });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
