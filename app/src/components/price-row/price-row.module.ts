import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PriceRowComponent } from './price-row';
import { PriceBattlefieldComponentModule } from '../../components/price-battlefield/price-battlefield.module';
import { PricerLoaderComponentModule } from '../../components/pricer-loader/pricer-loader.module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  declarations: [
    PriceRowComponent,
  ],
  imports: [
    PriceBattlefieldComponentModule,
    PricerLoaderComponentModule,
    Ng2GoogleChartsModule,
    IonicPageModule.forChild(PriceRowComponent),
  ],
  exports: [
    PriceRowComponent
  ]
})
export class PriceRowComponentModule {}
