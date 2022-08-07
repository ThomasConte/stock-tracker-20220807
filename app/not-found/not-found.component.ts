import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
    template: `<p id="notFoundMessage">Resource not found.</p>`,
    styles: [ '#notFoundMessage{text-align: center;}']
})
export class NotFoundComponent {

  constructor() { }

}
