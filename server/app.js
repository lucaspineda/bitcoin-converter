const express = require("express");
const app = express();
const port = 3002;
const sqlite3 = require("sqlite3").verbose();
const createDataFetcherJob = require("./jobs/dataFetcherJob");
const BPIRouter = require("./routes/BPI.route");

app.get("/", (req, res) => {
  res.send("Hello, World!!!");
});

app.listen(port, () => {
  createDataFetcherJob();
});

app.use('/api', BPIRouter);
