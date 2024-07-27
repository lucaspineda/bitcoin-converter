export interface IBPIDataValues {
  rate: number,
  code: string,
  symbol: string,
}

export interface IBPIData {
  [key: string]: IBPIDataValues;
}