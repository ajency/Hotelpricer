import { NgModule } from '@angular/core';
import { SellerStatusPipe } from './seller-status/seller-status';
import { SellerBbOwnershipPipe } from './seller-bb-ownership/seller-bb-ownership';
import { PricingRulePipe } from './pricing-rule/pricing-rule';
import { KeysPipe } from './keys/keys';

@NgModule({
  declarations: [
    SellerStatusPipe,
    SellerBbOwnershipPipe,
    PricingRulePipe,
    KeysPipe
  ],
  imports: [
  ],
  exports: [
    SellerStatusPipe,
    SellerBbOwnershipPipe,
    PricingRulePipe,
    KeysPipe
  ]
})
export class CustomPipesModule {}
