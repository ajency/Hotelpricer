import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompetitorsPage } from './competitors';
import { NgxPaginationModule } from 'ngx-pagination';
import { LogoutPopoverComponentModule } from '../../components/logout-popover/logout-popover.module';
import { StarRatingsComponentModule } from '../../components/star-ratings/star-ratings.module';
import { PieChartComponentModule } from '../../components/pie-chart/pie-chart.module';
import { FooterElementComponentModule } from '../../components/footer-element/footer-element.module';

@NgModule({
  declarations: [
    CompetitorsPage,
  ],
  imports: [
    NgxPaginationModule,
    LogoutPopoverComponentModule,
    StarRatingsComponentModule,
    PieChartComponentModule,
    FooterElementComponentModule,
    IonicPageModule.forChild(CompetitorsPage)
  ],
  exports: [
    CompetitorsPage
  ]
})
export class CompetitorsPageModule {}
