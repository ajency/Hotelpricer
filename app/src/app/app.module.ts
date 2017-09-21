import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Inject } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule }    from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CookieModule } from 'ngx-cookie';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { ImportcsvResultPopoverPageModule } from '../modals/importcsv-result/importcsv-result.module';
import { VerifyAccountPopoverPageModule } from '../modals/verify-account/verify-account.module';
// import { EditSinglePricesPageModule } from '../modals/edit-single-prices/edit-single-prices.module';
import { RepricePopupPageModule } from '../modals/reprice-popup/reprice-popup.module';
import { PricesProductTabsPageModule } from '../modals/prices-product-tabs/prices-product-tabs.module';
import { BattlefieldHelpPageModule } from '../popovers/battlefield-help/battlefield-help.module';
import { ImportSellerInputModule } from '../popovers/import-sellerid-input/import-sellerid-input.module';
// import { LoginOverlayModule } from '../popovers/login-overlay/login-overlay.module';
import { UserPopoverPageModule } from '../popovers/user-popover/user-popover.module';

import { AppGlobals } from '../providers/app-globals';
import { AppService } from '../providers/app-service';
import { RepricerApi } from '../providers/repricer-api';
import { AuthGuard } from '../providers/auth-guard';

import { EnvironmentsModule } from '../config/env.module';
import { TitleCasePipe } from '../pipes/title-case/title-case';
import { EnvVariables } from '../config/env.token';


// export const deepLinkConfig: DeepLinkConfig = {
// links: [
// { component: TabsPage, name: 'home', segment: 'home' },
// { component: HouseDetailPage, name: 'detail', segment: 'housedetail/:id/:list', defaultHistory: [ TabsPage ] }
// ]
// };

@NgModule({
  declarations: [
    MyApp,
    TitleCasePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ImportcsvResultPopoverPageModule,
    VerifyAccountPopoverPageModule,
    BattlefieldHelpPageModule,
    ImportSellerInputModule,
    // LoginOverlayModule,
    UserPopoverPageModule,
    // EditSinglePricesPageModule,
    RepricePopupPageModule,
    PricesProductTabsPageModule,
    CookieModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      mode: 'md',
      preloadModules: false,
      // locationStrategy: window.location.hostname == 'localhost' ? 'hash' :'path'
      locationStrategy: 'path'
    }), // deepLinkConfig
    IonicStorageModule.forRoot({
      driverOrder: ['indexeddb', 'websql','sqlite']
    }),
    EnvironmentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppGlobals,
    AppService,
    RepricerApi,
    AuthGuard,
    TitleCasePipe,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(
    @Inject(EnvVariables) private environment
  ){
    this.setLogLevel();
  }

  private setLogLevel(): void{
    if(this.environment.ionicEnvName !== 'dev'){
      window.console.log = function(){};
      window.console.warn = function(){};
      window.console.error = function(){};
    }
  }
}
