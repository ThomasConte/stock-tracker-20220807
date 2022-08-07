import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getMonthName'
})
export class GetMonthNamePipe implements PipeTransform {

  transform(monthNumber : number): string {
      let months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months[monthNumber];
  }
}
