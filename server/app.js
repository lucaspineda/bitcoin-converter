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
  console.log(`Server listening on port ${port}`);
});

app.use('/api', BPIRouter);


const db = new sqlite3.Database("BPI.db");

// db.serialize(() => {

//   db.all('SELECT * FROM test', (err, rows) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(rows);
//     }
// });
// });
