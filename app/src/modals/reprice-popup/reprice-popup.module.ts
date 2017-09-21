import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepricePopupPage } from './reprice-popup';
import { CustomPipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    RepricePopupPage,
  ],
  imports: [
    CustomPipesModule,
    IonicPageModule.forChild(RepricePopupPage)
  ],
  exports: [
    RepricePopupPage
  ]
})
export class RepricePopupPageModule {}
