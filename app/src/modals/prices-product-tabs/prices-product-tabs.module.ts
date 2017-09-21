import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PricesProductTabsPage } from './prices-product-tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomPipesModule } from '../../pipes/pipes.module';
import { PricerLoaderComponentModule } from '../../components/pricer-loader/pricer-loader.module';
import { StarRatingsComponentModule } from '../../components/star-ratings/star-ratings.module';
import { EditSinglePricesPageModule } from '../../components/edit-single-prices/edit-single-prices.module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { PriceRowComponentModule } from '../../components/price-row/price-row.module';

@NgModule({
  declarations: [
    PricesProductTabsPage,
  ],
  imports: [
    NgxPaginationModule,
    StarRatingsComponentModule,
    CustomPipesModule,
    PricerLoaderComponentModule,
    EditSinglePricesPageModule,
    Ng2GoogleChartsModule,
    PriceRowComponentModule,
    IonicPageModule.forChild(PricesProductTabsPage)
  ],
  exports: [
    PricesProductTabsPage
  ]
})
export class PricesProductTabsPageModule {}

