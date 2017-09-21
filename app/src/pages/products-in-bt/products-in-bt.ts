import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductsInBtPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'products-in-bt',
  priority: 'off'
})
@Component({
  selector: 'page-products-in-bt',
  templateUrl: 'products-in-bt.html',
})
export class ProductsInBtPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsInBtPage');
  }

}
