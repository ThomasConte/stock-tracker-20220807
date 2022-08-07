import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'change-arrow',
  templateUrl: './change-arrow.component.html',
  styleUrls: ['./change-arrow.component.css']
})
export class ChangeArrowComponent implements OnInit, AfterContentChecked {
    @Input() changeArrowChange : number | undefined;

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    ngAfterContentChecked(): void {
        this.changeDetectorRef.detectChanges();
    }


}
