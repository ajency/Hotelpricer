import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompetitorProductsPage } from './competitor-products';
import { LogoutPopoverComponentModule } from '../../components/logout-popover/logout-popover.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { StarRatingsComponentModule } from '../../components/star-ratings/star-ratings.module';
import { FooterElementComponentModule } from '../../components/footer-element/footer-element.module';

@NgModule({
  declarations: [
    CompetitorProductsPage,
  ],
  imports: [
    LogoutPopoverComponentModule,
    NgxPaginationModule,
    StarRatingsComponentModule,
    FooterElementComponentModule,
    IonicPageModule.forChild(CompetitorProductsPage)
  ],
  exports: [
    CompetitorProductsPage
  ]
})
export class CompetitorProductsPageModule {}
