import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreaterulePage } from './createrule';

@NgModule({
  declarations: [
    CreaterulePage,
  ],
  imports: [
    IonicPageModule.forChild(CreaterulePage),
  ],
  exports: [
    CreaterulePage
  ]
})
export class CreaterulePageModule {}
