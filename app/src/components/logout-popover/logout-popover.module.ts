import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogoutPopoverComponent } from './logout-popover';

@NgModule({
  declarations: [
    LogoutPopoverComponent,
  ],
  imports: [
    IonicPageModule.forChild(LogoutPopoverComponent),
  ],
  exports: [
    LogoutPopoverComponent
  ]
})
export class LogoutPopoverComponentModule {}
