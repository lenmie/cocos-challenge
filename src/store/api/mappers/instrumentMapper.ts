import { Instrument } from "../../../domain/models/instrument";
import { InstrumentDTO } from "../dtos/instrument.dto";

export const instrumentMapper = (response: InstrumentDTO[]):Instrument[] =>
    response.map((item) => ({
        id: item.id,
        ticker: item.ticker,
        name: item.name,
        lastPrice: item.last_price,
        closePrice: item.close_price,
}));