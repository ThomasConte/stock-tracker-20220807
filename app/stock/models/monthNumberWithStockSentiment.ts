import { StockSentiment } from "../models/stockSentiment";

/*This class is used as a part of workaround since the sentiment API does NOT necessarily have
data for latest month, so this will help handling cases where some month have no data */
export class MonthNumberWithStockSentiment {
    monthNumber: number;
    sentiment: StockSentiment | undefined;
    constructor(
        monthNumber: number,
        stockSentiment: StockSentiment | undefined
    ) {
        this.monthNumber = monthNumber;
        this.sentiment = stockSentiment;
    }
}