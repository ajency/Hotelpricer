import { Component, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AppService } from '../../providers/app-service';
import { AppGlobals } from '../../providers/app-globals';
/**
 * Generated class for the ViolationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'violations',
  segment: 'violations-page',
  priority: 'off'
})
@Component({
  selector: 'page-violations',
  templateUrl: 'violations.html',
})
export class ViolationsPage {
  private hideFilter: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private events: Events,
    private zone: NgZone, 
    private appservice: AppService,
    private appglobals: AppGlobals,
    private location: Location) {
      this.hideFilter = this.appglobals.isMobile() ? true : false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViolationsPage');
  }

  private navTo(page: string, params: any = {}): any{
    console.log('navigating to page', params);
    // let params = {};
    // if(market){
    //   params['marketplace'] = market;
    // }
    this.appservice.updateRootNav(page,false,params)
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter violations');
    setTimeout(() => {
      this.appservice.updateOnlineStatus();
    },1000);

    this.events.publish('app:updatehistory','violations');
  }

  goBack(){
    this.location.back();
  }

  toggleFilterView(): void{
    this.hideFilter = !this.hideFilter;
    this.zone.run(() => {})
  }

}
