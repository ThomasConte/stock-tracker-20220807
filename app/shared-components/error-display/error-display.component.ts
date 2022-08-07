import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from './error.service';

@Component({
  selector: 'error-display',
  templateUrl: './error-display.component.html',
    styleUrls: ['./error-display.component.css']
})
export class ErrorDisplayComponent implements OnInit, OnChanges, OnDestroy {
    subscriptions: Subscription[] = [];
    display: string | undefined = undefined;
    timer: any | undefined;

    constructor(private ErrorService: ErrorService) { }

    ngOnInit(): void {
        let suscbription : Subscription = this.ErrorService.errorMessageRaised.subscribe(this.onErrorMessageRaised);
        this.subscriptions.push(suscbription);
    }

    onErrorMessageRaised = (errorMessage: string) : void => {
        this.display = errorMessage;
        this.initiateReset();
    }



    initiateReset() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = window.setTimeout(() => {
            this.display = undefined;
        }, 6000);
    }

    ngOnDestroy(): void {
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        changes = changes;
    }

}
