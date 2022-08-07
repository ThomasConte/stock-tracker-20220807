import { Injectable } from '@angular/core';
import { StockProfile } from './models/stockProfile';

@Injectable({
  providedIn: 'root'
})
export class StockRepositoryService {
    private static watchedStocksKey: string = 'WatchedStocks';


    constructor() { }


    getWatchedStocks(): StockProfile[]  {
        let stocksJSON: string | null = localStorage.getItem(StockRepositoryService.watchedStocksKey);
        if (!stocksJSON) {
            return [];
        }
        return JSON.parse(stocksJSON) as StockProfile[];
    }

    saveWatchedStocks(watchedStocks: StockProfile[]): void {
        let watchedStocksJson = JSON.stringify(watchedStocks);
        localStorage.setItem(StockRepositoryService.watchedStocksKey, watchedStocksJson);
    }
}
