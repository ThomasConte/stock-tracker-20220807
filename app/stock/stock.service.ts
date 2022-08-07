import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { ErrorService } from '../shared-components/error-display/error.service';
import { StockRepositoryService } from './stock-repository.service';

import { ObservableStockCollection } from './models/observableStockCollection';
import { StockQuote } from './models/stockQuote';
import { StockProfile } from './models/stockProfile';
import { StockSentiment } from './models/stockSentiment';
import { MonthNumberWithStockSentiment } from './models/monthNumberWithStockSentiment';

import { QuoteApiResponse } from './models/apiModel/quoteApiResponse';
import { CompanyProfile2Response } from './models/apiModel/companyProfile2Response';
import { InsiderSentimentApiResponse } from './models/apiModel/insiderSentimentApiResponse';


const finnhubStockQuoteApiUrl : string = 'https://finnhub.io/api/v1/quote'; //https://finnhub.io/docs/api/quote
const finnhubCompanyProfile2ApiUrl: string = 'https://finnhub.io/api/v1/stock/profile2';
/* I used the "Company profile 2" API to get the name as is ssemed more appropriate than "Symbol Lookup" for this task.
 To be honest I wondered if there was a mistake in the URL suggestion. */
const finnhubSentimentApiUrl: string = 'https://finnhub.io/api/v1/stock/insider-sentiment'; //https://finnhub.io/docs/api/insider-sentiment
const finnhubKey: string = 'bu4f8kn48v6uehqi3cqg';

@Injectable()
export class StockService implements OnDestroy {
    watchedStocks : ObservableStockCollection = new ObservableStockCollection();
    subscriptions : Subscription[] = [];
    isLoadingDataToTrackExtraSobks: boolean = false;

    constructor(private stockRepositoryService: StockRepositoryService,  private http: HttpClient, private errorService : ErrorService) {
        this.watchedStocks.stockCollection = this.stockRepositoryService.getWatchedStocks();
        let collectionChangedSubscription : Subscription = this.watchedStocks.collectionChanged.subscribe(this.onWatchedStocksChanged);
        this.subscriptions.push(collectionChangedSubscription);
    }

    ngOnDestroy(): void {
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    async fetchSentimentBySymbol(symbol: string): Promise<MonthNumberWithStockSentiment[]> {
        let today: Date = new Date;
        let endDate: Date = new Date(today.getFullYear(), today.getMonth() -1, 1); //Current month, day 1
        let startDate: Date = new Date(endDate.getFullYear(), endDate.getMonth() -2, 1); //Current month - 2, day 1

        /* We are in August and the service doens't return data later than May for the stock I'm using for testing(AAPL),
        * but fore another stock that I use for test(TSLA), data are available until August...
        * The following month numbers were not in my iniatial plan but will be used for a little workaround. */
        let firstMonthNumber: number = startDate.getMonth() + 1;
        let lastMonthNumber: number = firstMonthNumber + 2;
        let starDateString = `${formatDate(startDate, 'yyyy-MM-dd', 'en-US')}`;
        let endDateString = `${formatDate(endDate, 'yyyy-MM-dd', 'en-US')}`;

        let url: string = `${finnhubSentimentApiUrl}?symbol=${symbol}&from=${starDateString}&to=${endDateString}&token=${finnhubKey}`;
        let InsiderSentimentApiResponse = await this.http.get<InsiderSentimentApiResponse>(url).toPromise();

        let monthNumberWithStockSentiments: MonthNumberWithStockSentiment[] = [];

        for (let monthNumber = firstMonthNumber; monthNumber <= lastMonthNumber; monthNumber += 1) {
            let stockSentimenData =
                InsiderSentimentApiResponse
                ? InsiderSentimentApiResponse.data.find((d: { month: number; }) => d.month == monthNumber)
                : undefined;
            let stockSentiment: StockSentiment | undefined =
                stockSentimenData
                    ? new StockSentiment(symbol, stockSentimenData.change, stockSentimenData.mspr, monthNumber, stockSentimenData.year)
                : undefined;
            monthNumberWithStockSentiments.push(new MonthNumberWithStockSentiment(monthNumber, stockSentiment));
        }

        return monthNumberWithStockSentiments;

        /*No path returns an error as we will always return a set of "3 monts" with ou without data
         *and the absence of data is not an error in this case.*/
        //return Promise.reject('');
    }

    getWatchedStockBySymbol(symbol: string) : StockProfile | undefined {
        let stock: StockProfile | undefined = this.watchedStocks.getStockBySymbol(symbol);
        if (!stock) {
            this.errorService.raiseErrorMessage(`CStock ${symbol} is not watched.`);
            /* Alternatively, we could fetch the stock data, but that would ideally require some
             * re-organising and is it is beyond the requirements so I'll just raise an error for now.*/
        }
        return stock;
    }

    getStockQuoteBySymbol(symbol: string): Promise<StockQuote |undefined> {
        return this.http.get<QuoteApiResponse>(`${finnhubStockQuoteApiUrl}?symbol=${symbol}&token=${finnhubKey}`).toPromise()
            .then(quoteApiResponse => {
            if (!quoteApiResponse || (quoteApiResponse.d === null)) {
                return Promise.reject(`Error while fetching quote for ${symbol}`);
            } else {
                return new StockQuote(quoteApiResponse.o, quoteApiResponse.c, quoteApiResponse.h, quoteApiResponse.d, quoteApiResponse.dp, quoteApiResponse.t);
            }
        },
                msg => {
                    return Promise.reject(`Error while fetching quote for ${symbol} : ${ msg }`);
            });
        }

    watchStockBySymbol(symbol: string): void {
        if (this.watchedStocks.containsBySymbol(symbol)) {
            this.errorService.raiseErrorMessage(`Stock ${symbol} is already being tracked.`);
        }

        this.isLoadingDataToTrackExtraSobks = true;
        this.http.get<CompanyProfile2Response>(`${finnhubCompanyProfile2ApiUrl}?symbol=${symbol}&token=${finnhubKey}`).toPromise()
            .then(companyProfile2Response => {
                if (!companyProfile2Response || (Object.keys(companyProfile2Response).length === 0)) {
                    this.errorService.raiseErrorMessage(`Company profile could not be found for ${symbol}`);
                } else {
                    let stock: StockProfile = new StockProfile(symbol, companyProfile2Response.name, companyProfile2Response.currency);
                    this.watchStock(stock);
                }
            },
                msg => {
                    this.errorService.raiseErrorMessage(`Error while fetching company profile for ${symbol}: ${msg}`);
                }
                 )
            .finally((): void => { this.isLoadingDataToTrackExtraSobks = false; });
    }

    watchStock(stock: StockProfile) : void {
        this.watchedStocks.addStocks([stock]);
    }

    unwatchStock(stock: StockProfile) : void  {
        this.watchedStocks.removeStock(stock);
    }

    onWatchedStocksChanged = (stockCollection: StockProfile[]): void => {
        this.stockRepositoryService.saveWatchedStocks(stockCollection);
    }
}
