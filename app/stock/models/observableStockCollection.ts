import { EventEmitter } from '@angular/core';
import { StockProfile } from './stockProfile';

type StocksAddedResponse = { added: StockProfile[], alreadyIn: StockProfile[] }
type StocksRemovedResponse = { removed: StockProfile[], notRemoved: StockProfile[] }

export class ObservableStockCollection {

    private _stocks: StockProfile[] = [];
    public get stockCollection() {
        return this._stocks;
    }

    public set stockCollection(stockProfiles: StockProfile[]) {
        this.flush();
        this.addStocks(stockProfiles);
    }

    collectionChanged : EventEmitter<StockProfile[]> = new EventEmitter();
    stocksAdded : EventEmitter<StocksAddedResponse> = new EventEmitter();
    stocksRemoved : EventEmitter<StocksRemovedResponse> = new EventEmitter();
    
    constructor() {
    }

    containsBySymbol(symbol: string): boolean {
        return !(this._stocks.findIndex(stock => stock.symbol === symbol) === -1);
    }

    flush() {
        for (let stockProfile of this._stocks) {
            this.removeStock(stockProfile);
        }
    }

    getStockBySymbol(symbol: string) : StockProfile | undefined {
        return this._stocks.find(stock => stock.symbol === symbol);
    }

    addStocks(stocks : StockProfile[]): StocksAddedResponse {
        let added : StockProfile[] = [];
        let alreadyIn : StockProfile[] = [];

        for (let stock of stocks) {
            if (this.containsBySymbol(stock.symbol)) {
                alreadyIn.push(stock);
            } else {
                this._stocks.push(stock);
                added.push(stock);
            }
        }

        let reponse: StocksAddedResponse = { added, alreadyIn };
        this.collectionChanged.emit(this._stocks);
        this.stocksAdded.emit(reponse);
        return reponse;
    }

    removeStock(stock: StockProfile): StocksRemovedResponse {
        let removed : StockProfile[] = [];
        let notRemoved : StockProfile[] = [];
        const index : number = this._stocks.indexOf(stock);
        if (index === -1) {
            notRemoved.push(stock);
        }
        else {
            this._stocks.splice(index, 1);
            removed.push(stock);
        }

        let reponse: StocksRemovedResponse = { removed, notRemoved };
        this.collectionChanged.emit(this._stocks);
        this.stocksRemoved.emit(reponse);
        return reponse;
    }

}
