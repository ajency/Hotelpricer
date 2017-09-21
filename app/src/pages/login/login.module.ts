import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { FooterElementComponentModule } from '../../components/footer-element/footer-element.module';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    FooterElementComponentModule,
    IonicPageModule.forChild(LoginPage),
  ],
  exports: [
    LoginPage
  ]
})
export class LoginModule {}
