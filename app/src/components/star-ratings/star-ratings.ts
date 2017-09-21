import { Component, Input } from '@angular/core';

/**
 * Generated class for the StarRatingsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'star-ratings',
  templateUrl: 'star-ratings.html'
})
export class StarRatingsComponent {
  @Input('stars') starcount;

  text: string;

  constructor() {
    // console.log('Hello StarRatingsComponent Component');
  }

}
