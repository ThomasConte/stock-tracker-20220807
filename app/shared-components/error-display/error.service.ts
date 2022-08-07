import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
    errorMessageRaised : EventEmitter<string> = new EventEmitter();

    constructor() { }

    raiseErrorMessage(errorMessage: string, alsoConsoleLog: boolean = true) {
        if (alsoConsoleLog)
            console.log(errorMessage);
        this.errorMessageRaised.emit(errorMessage);
    }
}
