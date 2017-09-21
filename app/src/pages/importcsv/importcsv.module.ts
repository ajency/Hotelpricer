import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportcsvPage } from './importcsv';
import { TabsContainerComponentModule } from '../../components/tabs-container/tabs-container.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DpDatePickerModule } from 'ng2-date-picker';
import { FooterElementComponentModule } from '../../components/footer-element/footer-element.module';
import { LogoutPopoverComponentModule } from '../../components/logout-popover/logout-popover.module';
import { SelectModule } from 'angular2-select';

@NgModule({
  declarations: [
    ImportcsvPage
  ],
  imports: [
    NgxPaginationModule,
    DpDatePickerModule,
    TabsContainerComponentModule,
    FooterElementComponentModule,
    LogoutPopoverComponentModule,
    SelectModule,
    IonicPageModule.forChild(ImportcsvPage)
  ],
  exports: [
    ImportcsvPage
  ]
})
export class ImportcsvPageModule {}
