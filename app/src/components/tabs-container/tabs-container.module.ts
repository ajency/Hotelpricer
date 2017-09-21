import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsContainerComponent } from './tabs-container';

@NgModule({
  declarations: [
    TabsContainerComponent,
  ],
  imports: [
    IonicPageModule.forChild(TabsContainerComponent),
  ],
  exports: [
    TabsContainerComponent
  ]
})
export class TabsContainerComponentModule {}
