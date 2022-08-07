import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

const COMPONENT = [NotFoundComponent];

@NgModule({
    declarations: [...COMPONENT],
  imports: [
      BrowserModule,
      RouterModule.forChild([{ path: '**', component: NotFoundComponent }])
    ],
    exports: [RouterModule]
})
export class NotFoundModule { }
