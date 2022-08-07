import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
    templateUrl: 'app.component.html',
    styles: ['h1,#appNote{text-align:center;} #appNote{color:grey}']
})
export class AppComponent {
  title = 'StockTracking';
}
