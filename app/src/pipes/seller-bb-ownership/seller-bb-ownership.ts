import { Pipe, PipeTransform } from '@angular/core';
import { Events } from 'ionic-angular';

@Pipe({
  name: 'sellerBBownership',
  pure: true
})
export class SellerBbOwnershipPipe implements PipeTransform {

  constructor(
    private events: Events
  ){

  }

  transform(value: Array<any>, bbownership: any) {
    let min = bbownership.min === null ? undefined : Number(bbownership.min);
    let max = bbownership.max === null ? undefined : Number(bbownership.max);
    console.log('bbownershipfilter min: ' + min + ' max: ' + max);

    let transformarray;
    if(min >= 0 && max >= 0 && min <= max){
      transformarray = value.filter( ref => { let bbo = isNaN(ref.buy_box_ownership) ? 0 : Number(ref.buy_box_ownership); return ( bbo <= max && bbo >= min ); } );
    }
    else{
      transformarray = value;
    }
    
    this.events.publish('app:sellerFilter',transformarray);
    return transformarray;
  }
}
