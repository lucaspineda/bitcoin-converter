// src/controllers/dataController.js
const dataFetcher = require("../services/dataFetcher");

const currencyCodes = ["USD", "GBP", "EUR"];

const fetchData = async (req, res) => {
  try {
    const data = await dataFetcher.fetchData();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

const getLatestPrice = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const data = await dataFetcher.getIndexesLastPrice(currencyCodes);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

const getIndexLastPrices = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { currency } = req.params;
  const { count } = req.query;
  console.log(req.params, count, 'reqq')

  try {
    const data = await dataFetcher.getIndexLastPrices(currency, count);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

module.exports = {
  fetchData,
  getLatestPrice,
  getIndexLastPrices,
};
