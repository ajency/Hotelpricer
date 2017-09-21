import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PricesPage } from './prices';
import { NgxPaginationModule } from 'ngx-pagination';
// import { TabsContainerComponentModule } from '../../components/tabs-container/tabs-container.module';
import { CustomPipesModule } from '../../pipes/pipes.module';
import { LogoutPopoverComponentModule } from '../../components/logout-popover/logout-popover.module';
import { StarRatingsComponentModule } from '../../components/star-ratings/star-ratings.module';
import { FooterElementComponentModule } from '../../components/footer-element/footer-element.module';
import { PricerLoaderComponentModule } from '../../components/pricer-loader/pricer-loader.module';
import { PriceRowComponentModule } from '../../components/price-row/price-row.module';
import { FilterHistory } from './filter-history-service';

@NgModule({
  declarations: [
    PricesPage
  ],
  imports: [
    CustomPipesModule,
    NgxPaginationModule,
    PriceRowComponentModule,
    // TabsContainerComponentModule,
    LogoutPopoverComponentModule,
    StarRatingsComponentModule,
    PricerLoaderComponentModule,
    FooterElementComponentModule,
    IonicPageModule.forChild(PricesPage),
  ],
  exports: [
    PricesPage
  ],
  providers: [
    FilterHistory
  ]
})
export class PricesPageModule {}
