import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BattlefieldHelpPage } from './battlefield-help';

@NgModule({
  declarations: [
    BattlefieldHelpPage,
  ],
  imports: [
    IonicPageModule.forChild(BattlefieldHelpPage),
  ],
  exports: [
    BattlefieldHelpPage
  ]
})
export class BattlefieldHelpPageModule {}
