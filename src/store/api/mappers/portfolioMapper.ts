import { Portfolio } from "../../../domain/models/portfolio";
import { PortfolioDTO } from "../dtos/portfolio.dto";

export const portfolioMapper = (response: PortfolioDTO[]): Portfolio[] =>
response.map((item) => ({
    id: item.instrument_id,
    ticker: item.ticker,
    quantity: item.quantity,
    lastPrice: item.last_price,
    closePrice: item.close_price,
    avgCostPrice: item.avg_cost_price,
    marketValue: item.quantity * item.last_price,
    gain: item.quantity * (item.last_price - item.avg_cost_price),
    totalReturn: ((item.last_price / item.avg_cost_price) - 1) * 100,
}))