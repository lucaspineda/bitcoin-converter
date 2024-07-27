const sqlite3 = require("sqlite3").verbose();
const he = require('he');

const db = new sqlite3.Database("BPI.db");

const fetchBPIData = async () => {
  try {
    const response = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    const json = await response.json();
    const BPIdata = json.bpi;

    Object.keys(BPIdata).forEach((key) => {
      db.run(
        "INSERT INTO bitcoin_price_index (code, symbol, rate_float) VALUES (?, ?, ?)",
        [key, BPIdata[key].symbol, BPIdata[key].rate_float]
      );
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getIndexesLastPrice = async (currenciesCode) => {
  const placeholders = currenciesCode.map(() => "?").join(",");
  const sql = `SELECT code, symbol, rate_float as rate FROM bitcoin_price_index WHERE code IN  (${placeholders}) ORDER BY id DESC LIMIT 3`;

  return new Promise(function (resolve, reject) {
    db.all(sql, currenciesCode, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        const result = rows.reduce((acc, current) => {
          current.symbol = he.decode(current.symbol);
          acc[current.code] = current;
          return acc;
        }, {});
        console.log('chamuuu')
        resolve({data: result});
      }
    });
  });
};

const getIndexLastPrices = async (currencyCode, counter) => {
  const sql = `SELECT rate_float as rate, created_at FROM bitcoin_price_index WHERE code = ? ORDER BY id DESC LIMIT ${counter}`;

  return new Promise(function (resolve, reject) {
    db.all(sql, currencyCode, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve({data: rows});
      }
    });
  });
};

module.exports = { fetchBPIData, getIndexesLastPrice, getIndexLastPrices };
