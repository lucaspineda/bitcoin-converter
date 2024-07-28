export interface IBPIDataValues {
  rate: number,
  code: string,
  symbol: string,
}

export interface IBPIData {
  [key: string]: IBPIDataValues;
}

export interface IBPILatestPricesValue {
  rate: number,
  created_at: string,
}