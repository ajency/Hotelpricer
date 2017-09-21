import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FooterElementComponent } from './footer-element';

@NgModule({
  declarations: [
    FooterElementComponent,
  ],
  imports: [
    IonicPageModule.forChild(FooterElementComponent),
  ],
  exports: [
    FooterElementComponent
  ]
})
export class FooterElementComponentModule {}
