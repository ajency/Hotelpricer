import { Pipe, PipeTransform } from '@angular/core';
import { Events } from 'ionic-angular';

/**
 * Generated class for the SellerStatusPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'sellerStatus',
  pure: true
})
export class SellerStatusPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor(
    private events: Events
  ){

  }

  transform(value: Array<any>, status: string) {
    console.log("statusfilter ",status);
    let transformarray;
    if(status === 'active'){
      transformarray = value.filter( seller => !seller.is_stocked_out )
    }
    else if(status === 'stocked_out'){
      transformarray = value.filter( seller => seller.is_stocked_out )
    }
    else{
      transformarray = value;
    }

    this.events.publish('app:sellerFilter',transformarray);
    return transformarray;
  }
}
