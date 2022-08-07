import { Component } from '@angular/core';

@Component({
  selector: 'stock-main',
    template: `
    <error-display></error-display>
    <track-stock></track-stock>
    <stock-data></stock-data>
`,
    styleUrls: ['./stock-main.component.css']
})
export class StockMainComponent {

  constructor() { }

}
