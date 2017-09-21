import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PricingrulePage } from './pricingrule';
import { FooterElementComponentModule } from '../../components/footer-element/footer-element.module';
import { LogoutPopoverComponentModule } from '../../components/logout-popover/logout-popover.module';

@NgModule({
  declarations: [
    PricingrulePage,
  ],
  imports: [
    FooterElementComponentModule,
    LogoutPopoverComponentModule,
    IonicPageModule.forChild(PricingrulePage)
  ],
  exports: [
    PricingrulePage
  ]
})
export class PricingrulePageModule {}
