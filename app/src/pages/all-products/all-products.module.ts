import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllProductsPage } from './all-products';
import { FooterElementComponentModule } from '../../components/footer-element/footer-element.module';
import { LogoutPopoverComponentModule } from '../../components/logout-popover/logout-popover.module';

@NgModule({
  declarations: [
    AllProductsPage,
  ],
  imports: [
    FooterElementComponentModule,
    LogoutPopoverComponentModule,
    IonicPageModule.forChild(AllProductsPage)
  ],
  exports: [
    AllProductsPage
  ]
})
export class AllProductsPageModule {}
