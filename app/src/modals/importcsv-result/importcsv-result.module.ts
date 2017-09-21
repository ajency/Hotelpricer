import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportcsvResultPopoverPage } from './importcsv-result';
import { NgxPaginationModule } from 'ngx-pagination';
import { PricerLoaderComponentModule } from '../../components/pricer-loader/pricer-loader.module';


@NgModule({
  declarations: [
    ImportcsvResultPopoverPage,
  ],
  imports: [
    NgxPaginationModule,
    PricerLoaderComponentModule,
    IonicPageModule.forChild(ImportcsvResultPopoverPage)
  ],
  exports: [
    ImportcsvResultPopoverPage
  ]
})
export class ImportcsvResultPopoverPageModule {}
