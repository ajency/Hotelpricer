import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViolationsPage } from './violations';
import { FooterElementComponentModule } from '../../components/footer-element/footer-element.module';
import { LogoutPopoverComponentModule } from '../../components/logout-popover/logout-popover.module';

@NgModule({
  declarations: [
    ViolationsPage,
  ],
  imports: [
    FooterElementComponentModule,
    LogoutPopoverComponentModule,
    IonicPageModule.forChild(ViolationsPage),
  ],
  exports: [
    ViolationsPage
  ]
})
export class ViolationsPageModule {}
