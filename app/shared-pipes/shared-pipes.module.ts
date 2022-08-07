import { NgModule } from '@angular/core';
import { GetMonthNamePipe } from './get-month-name.pipe';

@NgModule({
    declarations: [
        GetMonthNamePipe
    ],
    exports: [GetMonthNamePipe]
})
export class SharedPipesModule { }
