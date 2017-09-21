import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PricingRulePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'pricingRule'
})
export class PricingRulePipe implements PipeTransform {
   // TBD get this value from a global, currently cannot import from 
   // Repricer api service as its already declared under app.module and doesnt work here
  private pricingrules: any = {
    "1":{"1": "Amazon Default with Free Shipping", "2": "Amazon with Buy Box Reprice"},
    "2":{"3": "Flipkart with Buy Box Reprice", "4": "Flipkart Default with Free Shipping"},
    "3":{"5": "Snapdeal Default with Free Shipping", "6": "Snapdeal with Buy Box Reprice"},
    "4":{"7": "Paytm Default with Free Shipping", "8": "Paytm with Buy Box Reprice"}
  }
  /**
   * Takes a value and makes it lowercase.
   */
  transform(ruleid: any, channelid: any) {
    if(!ruleid){
      return 'Indertimate rule id';
    }

    if(!channelid){
      return 'Indeterminate channel id'
    }

    ruleid = isNaN(ruleid) ? ruleid : ruleid.toString();
    channelid = isNaN(channelid) ? channelid : channelid.toString();

    for(let channel in this.pricingrules){
      if(channelid === channel){
        let rules = this.pricingrules[channel];
        for(let rule in rules){
          if(ruleid === rule){
            return rules[ruleid];
          }
        }
      }
    }

    return 'Not determined';

  }
}
