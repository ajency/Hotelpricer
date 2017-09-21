import { Component, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AppService } from '../../providers/app-service';
import { AppGlobals } from '../../providers/app-globals';

@IonicPage({
  name: 'products',
  segment: 'products',
  priority: 'off'
})
@Component({
  selector: 'page-all-products',
  templateUrl: 'all-products.html',
})
export class AllProductsPage {
  private hideFilter: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private events: Events,
    private zone: NgZone,
    private location: Location,
    private appglobals: AppGlobals, 
    private appservice: AppService) {
      this.hideFilter = this.appglobals.isMobile() ? true : false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllProductsPage');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter products');

    this.events.publish('app:updatehistory','products');
    
  }

  private navTo(page: string, params: any = {}): any{
    this.appservice.updateRootNav(page,false,params)
  }

  goBack(){
    this.location.back();
  }

  toggleFilterView(): void{
    this.hideFilter = !this.hideFilter;
    this.zone.run(() => {});
  }
}
