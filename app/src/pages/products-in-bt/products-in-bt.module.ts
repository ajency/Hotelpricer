import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsInBtPage } from './products-in-bt';

@NgModule({
  declarations: [
    ProductsInBtPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductsInBtPage),
  ],
  exports: [
    ProductsInBtPage
  ]
})
export class ProductsInBtPageModule {}
