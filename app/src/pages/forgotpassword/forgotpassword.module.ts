import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotpasswordPage } from './forgotpassword';
import { FooterElementComponentModule } from '../../components/footer-element/footer-element.module';

@NgModule({
  declarations: [
    ForgotpasswordPage,
  ],
  imports: [
    FooterElementComponentModule,
    IonicPageModule.forChild(ForgotpasswordPage),
  ],
  exports: [
    ForgotpasswordPage
  ]
})
export class ForgotpasswordPageModule {}
