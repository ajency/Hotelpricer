import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TitleCasePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'titleCase',
})
export class TitleCasePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(input: string): string {
    if (!input) {
        return '';
    } else {
        return input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() ));
    }
  }
}
