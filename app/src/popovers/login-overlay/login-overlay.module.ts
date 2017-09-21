import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginOverlay } from './login-overlay';

@NgModule({
  declarations: [
    LoginOverlay,
  ],
  imports: [
    IonicPageModule.forChild(LoginOverlay),
  ],
  exports: [
    LoginOverlay
  ]
})
export class LoginOverlayModule {}
