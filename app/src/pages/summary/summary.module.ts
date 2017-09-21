import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryPage } from './summary';
import { TabsContainerComponentModule } from '../../components/tabs-container/tabs-container.module';
import { LogoutPopoverComponentModule } from '../../components/logout-popover/logout-popover.module';
import { PieChartComponentModule } from '../../components/pie-chart/pie-chart.module';
import { FooterElementComponentModule } from '../../components/footer-element/footer-element.module';
import { ChartsModule } from 'ng2-charts';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { PricerLoaderComponentModule } from '../../components/pricer-loader/pricer-loader.module';
// import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  declarations: [
    SummaryPage
  ],
  imports: [
    MyDateRangePickerModule,
    PricerLoaderComponentModule,
    ChartsModule,
    TabsContainerComponentModule,
    LogoutPopoverComponentModule,
    PieChartComponentModule,
    FooterElementComponentModule,
    // Ng2GoogleChartsModule,
    IonicPageModule.forChild(SummaryPage),
  ],
  exports: [
    SummaryPage
  ]
})
export class SummaryPageModule {}