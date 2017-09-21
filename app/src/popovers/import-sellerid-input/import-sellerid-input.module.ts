import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportSellerInput } from './import-sellerid-input';
import { SelectModule } from 'angular2-select';
import { PricerLoaderComponentModule } from '../../components/pricer-loader/pricer-loader.module';

@NgModule({
  declarations: [
    ImportSellerInput,
  ],
  imports: [
    SelectModule,
    PricerLoaderComponentModule,
    IonicPageModule.forChild(ImportSellerInput),
  ],
  exports: [
    ImportSellerInput
  ]
})
export class ImportSellerInputModule {}
