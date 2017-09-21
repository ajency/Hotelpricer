import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerifyAccountPopoverPage } from './verify-account';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    VerifyAccountPopoverPage,
  ],
  imports: [
    NgxPaginationModule,
    IonicPageModule.forChild(VerifyAccountPopoverPage)
  ],
  exports: [
    VerifyAccountPopoverPage
  ]
})
export class VerifyAccountPopoverPageModule {}
