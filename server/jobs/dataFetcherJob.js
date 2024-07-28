const { fetchBPIData } = require ("./../services/dataFetcher")

const dataFetcherJob = async () => {
  setInterval(() => {
    fetchBPIData()
  }, 30000)
}

module.exports = dataFetcherJob
