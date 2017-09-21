import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthGuard } from '../../providers/auth-guard';
import { AppService } from '../../providers/app-service';

/**
 * Generated class for the PricingrulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'pricingrule',
  segment: 'pricingrule',
  priority: 'off'
})
@Component({
  selector: 'page-pricingrule',
  templateUrl: 'pricingrule.html',
})
export class PricingrulePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authguard: AuthGuard,
    private appservice: AppService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PricingrulePage');
  }

  ionViewCanEnter(): Promise<boolean>{
    console.log('ionviewcanenter login')
    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('page-pricingrule')
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject(true) 
      })
    })

  }

  private navTo(page: string, params: any = {}): any{
    this.appservice.updateRootNav(page,false,params)
  }

}
