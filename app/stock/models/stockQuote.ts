/*This class used to be named "StockData" its variables through code have been renamed,
 but it is possible that reference to "stockData" remain, in that case it refers to StockQuote */

export class StockQuote {
    openingPrice : number;
    currentPrice : number;
    highPrice : number;
    change: number;
    changePercent: number;
    time: number;

    constructor(
        openingPrice : number,
        currentPrice: number,
        highPrice: number,
        change: number,
        changePercent: number,
        time: number,

    ) {
        this.openingPrice = openingPrice;
        this.currentPrice = currentPrice;
        this.highPrice = highPrice;
        this.change = change;
        this.changePercent = changePercent;
        this.time = time;
    }
}