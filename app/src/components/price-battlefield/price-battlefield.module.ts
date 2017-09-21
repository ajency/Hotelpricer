import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PriceBattlefieldComponent } from './price-battlefield';
import { PricerLoaderComponentModule } from '../pricer-loader/pricer-loader.module';

@NgModule({
  declarations: [
    PriceBattlefieldComponent,
  ],
  imports: [
    PricerLoaderComponentModule,
    IonicPageModule.forChild(PriceBattlefieldComponent),
  ],
  exports: [
    PriceBattlefieldComponent
  ]
})
export class PriceBattlefieldComponentModule {}
