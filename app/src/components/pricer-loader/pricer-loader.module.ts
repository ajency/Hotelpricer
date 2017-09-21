import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PricerLoaderComponent } from './pricer-loader';

@NgModule({
  declarations: [
    PricerLoaderComponent,
  ],
  imports: [
    IonicPageModule.forChild(PricerLoaderComponent),
  ],
  exports: [
    PricerLoaderComponent
  ]
})
export class PricerLoaderComponentModule {}
