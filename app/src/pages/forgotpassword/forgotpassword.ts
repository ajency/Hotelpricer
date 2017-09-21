import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RepricerApi } from '../../providers/repricer-api';
import { AppService } from '../../providers/app-service';
import { AuthGuard } from '../../providers/auth-guard';
/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'forgot-password',
  segment: 'forgot-password',
  priority: 'off'
})
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  private restPassEmail: string = '';
  private resetPassMessage: string = '';
  private resetInProgress: boolean = false;
  private resetComplete: boolean = false;
  private emailRegExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(
    private repricerapi: RepricerApi,
    private appservice: AppService,
    private authguard: AuthGuard,
    private navCtrl: NavController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  ionViewCanEnter(): Promise<boolean>{
    console.log('ionviewcanenter ForgotpasswordPage')
    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('forgot-password')
      .then(() => {
        reject(true)
      })
      .catch(() => {
        resolve(true)
      })
    })

  }

  private validateEmail(): boolean{
     if(this.emailRegExpression.test(this.restPassEmail)){
       this.resetPassMessage = ''
       return true
     }
     else{
       this.resetPassMessage = "This email isn't valid!"
       return false
    }
  }

  private sendResetLink(): void{
    if(!this.restPassEmail){
      this.resetPassMessage = "Email cannot be blank!"
      this.appservice.presentToast(this.resetPassMessage,'error');
      return;
    }

    if(!this.validateEmail()){
      this.appservice.presentToast(this.resetPassMessage,'error');
      return;
    }

    this.resetInProgress = true;
    this.repricerapi.sendForgotPassLink(this.restPassEmail)
    .then((res) => {
      console.log(res)
      this.resetInProgress = false;
      let toast_type = '';
      if(res.success == true){
        toast_type = 'success'
        this.resetComplete = true;
      }
      else{
        toast_type = 'error'
      }
      this.appservice.presentToast(res.status, toast_type);
      // this.appservice.updateRootNav('login',true);
    })
    .catch((error) => {
      this.resetInProgress = false;
      if(error.message){
        this.appservice.presentToast(error.message, 'error');
      }
      else{
        this.appservice.presentToast('Failed to send reset link', 'error');
      }
    });

  }

  private cancelReset(): void{
    this.appservice.updateRootNav('login',true,{},false)
  }

}
