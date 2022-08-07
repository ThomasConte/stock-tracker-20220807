/*This class used to be named "Sentiment" its variables through code have been renamed,
 but it is possible that reference to "sentiment" remain, in that case it refers to StockSentiment */

export class StockSentiment {
    symbol : string;
    change : number;
    mspr : number;
    month: number;
    year: number;

    constructor(
        symbol: string,
        change: number,
        mspr: number,
        month: number,
        year: number,
    ) {
        this.symbol = symbol;
        this.change = change;
        this.mspr = mspr;
        this.month = month;
        this.year = year;
    }
}