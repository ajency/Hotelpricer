import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditSinglePricesPage } from './edit-single-prices';
import { CustomPipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    EditSinglePricesPage,
  ],
  imports: [
    CustomPipesModule,
    IonicPageModule.forChild(EditSinglePricesPage),
  ],
  exports: [
    EditSinglePricesPage
  ]
})
export class EditSinglePricesPageModule {}
