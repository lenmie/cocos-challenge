import { Portfolio } from "../../../domain/models/portfolio";
import { PortfolioDTO } from "../dtos/portfolio.dto";

export const portfolioMapper = (response: PortfolioDTO[]): Portfolio[] =>
response.map((item) => ({
    id: item.id,
    ticker: item.ticker,
    quantity: item.quantity,
    avgCostPrice: item.avg_cost_price,
    lastPrice: item.last_price,
    marketValue: item.quantity * item.last_price,
    gain: item.quantity * (item.last_price - item.avg_cost_price),
    totalReturn: ((item.last_price / item.avg_cost_price) - 1) * 100,
}))