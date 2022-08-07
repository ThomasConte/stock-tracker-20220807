import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../stock.service';

@Component({
    selector: 'track-stock',
    templateUrl: './track-stock.component.html',
  styles : ['button[disabled] {color:grey;border-color:grey}']})
export class TrackStockComponent implements OnInit {
    watchStockFormGroup = this.formBuilder.group({
        symbol: new FormControl('', [
            Validators.required,
            Validators.maxLength(5),
            Validators.pattern(/^[A-Za-z]+$/) //I'd be tempted to remove ^and +$ and a-z but I'm very bad at regular expressions...
        ]),
    });

    constructor(private stockService: StockService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {}

    onSubmit(): void {
        let symbol: string | null | undefined = this.watchStockFormGroup.value.symbol;
        if (symbol) {
            this.stockService.watchStockBySymbol(symbol.toUpperCase());
            this.watchStockFormGroup.reset();
        }
    }
}
