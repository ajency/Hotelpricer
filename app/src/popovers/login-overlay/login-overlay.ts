import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppService } from '../../providers/app-service';

// @IonicPage()
@Component({
  selector: 'login-overlay',
  templateUrl: 'login-overlay.html'
})
export class LoginOverlay {
  private sellerID: string;
  private nativeElement: any;
  private $: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appservice: AppService,
    public element: ElementRef,
    public viewctrl: ViewController) {
      this.nativeElement = this.element.nativeElement;
      this.$ = this.appservice.jQuery;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginOverlay');
  }

  ngOnInit(){
    // this.$(this.nativeElement).parent().addClass("marketplace-sellerid");
    this.$(this.nativeElement).parents().find('.popover-content').addClass("marketplace-sellerid");
  }

  // submit(){
  //   if(this.sellerID){
  //       this.viewctrl.dismiss(this.sellerID);
  //   }
  //   else{
  //     this.appservice.presentToast('Please enter an ID','error');
  //   }
  // }

  // dismiss(){
  //   this.appservice.presentToast('Unable to import without Sender ID','error');
  //   this.viewctrl.dismiss();
  // }
}
