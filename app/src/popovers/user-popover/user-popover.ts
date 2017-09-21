import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RepricerApi } from '../../providers/repricer-api';
import { AppService } from '../../providers/app-service';
import { AppGlobals } from '../../providers/app-globals';

@IonicPage()
@Component({
  selector: 'page-user-popover',
  templateUrl: 'user-popover.html',
})
export class UserPopoverPage {
  private userDetails: any;
  private appName: string;

  constructor(
    private appglobals: AppGlobals,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private repricerapi: RepricerApi,
    private viewctrl: ViewController,
    private appservice: AppService) {
      this.userDetails = this.repricerapi.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPopoverPage');
    this.appName = this.appglobals.getAppName();
  }

  signOut(): void{
    this.repricerapi.logout()
    .then(() => {
      console.log('logout success')
      this.viewctrl.dismiss();
    })
    .catch((err) => {
      console.warn(err)
    });
  }

  private navTo(page: string, params: any = {}): any{
    console.log('navigating to page', params);
    this.appservice.updateRootNav(page,false,params)
    this.viewctrl.dismiss();
  }

}
