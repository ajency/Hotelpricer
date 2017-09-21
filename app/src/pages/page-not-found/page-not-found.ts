import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthGuard } from '../../providers/auth-guard';
import { AppService } from '../../providers/app-service';
/**
 * Generated class for the PageNotFound page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'not-found',
  segment: 'not-found',
  priority: 'high'
})
@Component({
  selector: 'page-not-found',
  templateUrl: 'page-not-found.html',
})
export class PageNotFound {

  private networkFailure: boolean = false;
  private invalidNavParams: boolean = false;

  constructor(
    private authguard: AuthGuard,
    private navCtrl: NavController,
    private navparams: NavParams,
    private appservice: AppService,
    private location: Location
  ) {

    this.networkFailure = this.navparams.get("networkfailure");
    this.invalidNavParams = this.navparams.get("invalidurlparams");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PageNotFound');
  }

  // ionViewCanEnter(): Promise<boolean>{
  //   console.log('ionviewcanenter PageNotFound')
  //   // TBD do custum logic here
  //   return new Promise((resolve,reject) => {
  //     this.authguard.verifyToken('not-found')
  //     .then(() => {
  //       resolve(true)
  //     })
  //     .catch(() => {
  //       reject(true) 
  //     })
  //   })

  // }

  private navTo(page: string, market: string = ''): any{
    console.log('navigating to page', page);
    let params = {};
    if(market){
      params['marketplace'] = market;
    }
    this.appservice.updateRootNav(page,true,params)
  }

  private goBack(): void{
    this.location.back();
  }

}
