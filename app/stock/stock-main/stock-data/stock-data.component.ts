import { Component, OnInit } from '@angular/core';
import { StockProfile } from '../../models/stockProfile';
import { StockService } from '../../stock.service';

@Component({
  selector: 'stock-data',
  templateUrl: './stock-data.component.html',
    styleUrls: ['./stock-data.component.css']
})
export class StockDataComponent implements OnInit {
    stockService: StockService;

    constructor(stockService: StockService) {
        this.stockService = stockService;
    }

    ngOnInit(): void { }

    stockProfileTrackBy(index: number, stockProfile: StockProfile) {
        return stockProfile.symbol;
    }

}
