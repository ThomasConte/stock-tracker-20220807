import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackStockComponent } from './stock-main/track-stock/track-stock.component';
import { StockService } from './stock.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockDataComponent } from './stock-main/stock-data/stock-data.component';
import { RouterModule, Routes } from '@angular/router';
import { SentimentComponent } from './sentiment/sentiment.component';
import { StockMainComponent } from './stock-main/stock-main.component';
import { SharedPipesModule } from '../shared-pipes/shared-pipes.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { StockDataTrackerComponent } from './stock-main/stock-data-tracker/stock-data-tracker.component';

const routes: Routes = [
    { path: 'sentiment/:symbol', component: SentimentComponent },
    { path: '', component: StockMainComponent }
];

@NgModule({
  declarations: [
    TrackStockComponent,
    StockDataComponent,
    SentimentComponent,
    StockMainComponent,
    StockDataTrackerComponent
  ],
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes),
      SharedPipesModule,
      SharedComponentsModule
    ],
    providers: [
        StockService
    ]
})
export class StockModule {}
