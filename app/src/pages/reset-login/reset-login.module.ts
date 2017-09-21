import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetLoginPage } from './reset-login';

@NgModule({
  declarations: [
    ResetLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetLoginPage),
  ],
  exports: [
    ResetLoginPage
  ]
})
export class ResetLoginPageModule {}
