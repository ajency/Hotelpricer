import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageNotFound } from './page-not-found';

@NgModule({
  declarations: [
    PageNotFound,
  ],
  imports: [
    IonicPageModule.forChild(PageNotFound),
  ],
  exports: [
    PageNotFound
  ]
})
export class PageNotFoundModule {}
