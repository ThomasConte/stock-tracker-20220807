import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChangeArrowComponent } from './change-arrow/change-arrow.component';
import { ErrorDisplayComponent } from './error-display/error-display.component';
import { ErrorService } from './error-display/error.service';

@NgModule({
  declarations: [
        ChangeArrowComponent,
        ErrorDisplayComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ChangeArrowComponent,
        ErrorDisplayComponent
    ],
    providers: [
        ErrorService
    ]
})
export class SharedComponentsModule { }
