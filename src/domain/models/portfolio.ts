export interface Portfolio {
  id: number;
  ticker: string;
  quantity: number;
  marketValue: number;
  gain: number;
  totalReturn: number;
  avgCostPrice: number;
}
