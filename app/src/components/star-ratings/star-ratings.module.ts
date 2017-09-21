import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StarRatingsComponent } from './star-ratings';

@NgModule({
  declarations: [
    StarRatingsComponent,
  ],
  imports: [
    IonicPageModule.forChild(StarRatingsComponent),
  ],
  exports: [
    StarRatingsComponent
  ]
})
export class StarRatingsComponentModule {}
