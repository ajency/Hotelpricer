import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthGuard } from '../../providers/auth-guard';

/**
 * Generated class for the CreaterulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'page-createrule',
  segment: 'page-createrule',
  priority: 'off'
})
@Component({
  selector: 'page-createrule',
  templateUrl: 'createrule.html',
})
export class CreaterulePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authguard: AuthGuard
    ) {
  }

  ionViewCanEnter(): Promise<boolean>{
    console.log('ionviewcanenter login')
    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('page-createrule')
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject(true) 
      })
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreaterulePage');
  }

}
