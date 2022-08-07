import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockProfile } from '../models/stockProfile';
import { StockService } from '../stock.service';
import { ErrorService } from '../../shared-components/error-display/error.service';
import { MonthNumberWithStockSentiment } from '../models/monthNumberWithStockSentiment';


@Component({
  selector: 'sentiment',
  templateUrl: './sentiment.component.html',
    styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {
    stockProfile: StockProfile | undefined;
    sentiments: MonthNumberWithStockSentiment[] = [];
    isLoadingData: boolean = false;

    constructor(private route: ActivatedRoute, private stockService: StockService, private errorService: ErrorService) { }

    ngOnInit(): void {
        let symbol: string | null = this.route.snapshot.paramMap.get('symbol');
        if (symbol) {
            this.stockProfile = this.stockService.getWatchedStockBySymbol(symbol);
            this.fillSentiments(symbol);
        }
    }

    fillSentiments(symbol: string): void {
        this.isLoadingData = true;
        this.stockService.fetchSentimentBySymbol(symbol)
            .then(res => {
            this.sentiments = res;
        },
            msg => {
                this.errorService.raiseErrorMessage(`Error filling sentiment data for ${symbol}: ${msg}`);
            }
        )
        .finally(() : void => { this.isLoadingData = false; });
    }

}
