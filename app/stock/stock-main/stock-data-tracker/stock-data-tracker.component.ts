import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';
import { StockProfile } from '../../models/stockProfile';
import { StockQuote } from '../../models/stockQuote';
import { StockService } from '../../stock.service';
import { ErrorService } from '../../../shared-components/error-display/error.service';

@Component({
  selector: 'stock-data-tracker',
  templateUrl: './stock-data-tracker.component.html',
    styleUrls: ['./stock-data-tracker.component.css']
})
export class StockDataTrackerComponent implements OnInit, OnChanges, OnDestroy {
    @Input() stockProfile : StockProfile | undefined = undefined;
    stockQuote: StockQuote | undefined = undefined;
    timerSubscription: Subscription | undefined = undefined;
    isLoadingData: boolean = false;

    static refreshStockTrakerDataInterval: number = 60000; //In milliseconds.

    constructor(private stockService: StockService, private errorService: ErrorService) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        let changeKey = 'stockProfile';
        if (changes[changeKey] && changes[changeKey].firstChange) { //Assuming that stock may not be changed for a given instance of StockDataTrackerComponent
            let stockProfile: StockProfile = changes[changeKey].currentValue as StockProfile;
            let symbol: string = stockProfile.symbol;

            this.isLoadingData = true;

            this.timerSubscription = timer(0, StockDataTrackerComponent.refreshStockTrakerDataInterval).pipe(
                map(() => {
                    this.isLoadingData = !this.stockQuote; //If there is already data, I don't want to switch to the loading text during a refresh.
                    this.stockService.getStockQuoteBySymbol(symbol)
                        .then(stockQuote => {
                            if (!stockQuote) {
                                this.errorService.raiseErrorMessage(`Error while fetching quote for ${symbol}`);
                            } else {
                                this.stockQuote = stockQuote;
                            }
                        },
                        msg => {
                            this.errorService.raiseErrorMessage(`Error while fetching quote for ${symbol}: ${msg}`);
                        }
                    ).finally((): void => { this.isLoadingData = false; });                       ;
                }
                )).subscribe();
        }
    }

    ngOnDestroy(): void {
        this.timerSubscription?.unsubscribe();
    }

    unwatchStock(stock: StockProfile) {
        this.stockService.unwatchStock(stock);
    }
}
