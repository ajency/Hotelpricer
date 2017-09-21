import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthGuard } from '../../providers/auth-guard';
import { RepricerApi } from '../../providers/repricer-api';
import { AppService } from '../../providers/app-service';

/**
 * Generated class for the ResetLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'reset-password',
  segment: 'reset-password/:token',
  priority: 'off'
})
@Component({
  selector: 'page-reset-login',
  templateUrl: 'reset-login.html',
})
export class ResetLoginPage {
  private password: string = '';
  private confirmPassword: string = '';
  private minLength = 6;
  private validationFailMessage: string = '';
  private validFields: boolean = false;
  private token: string = '';
  private resetMailSent: boolean = false;
  private resetingMail: boolean = false;

  constructor(
    private authguard: AuthGuard,
    private navparams: NavParams,
    private navCtrl: NavController,
    private repricerapi: RepricerApi,
    private appservice: AppService
  ) {
    this.token = this.navparams.get('token');
    console.log("token",this.token);
  }

  ionViewCanEnter(): Promise<boolean>{
    console.log('ionviewcanenter ResetLoginPage')
    // TBD update this logic
    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('reset-password')
      .then(() => {
        console.warn('reset pass page not authorised')        
        reject(true)
      })
      .catch(() => {
        resolve(true) 
      })
    });
  }

  private resetPassword(): void{
    if(!this.password){
      this.validationFailMessage = "Password cannot be blank!";
      return;
    }

    if(!this.confirmPassword){
      this.validationFailMessage = 'Confirm password cannot be blank!';
      return;
    }

    if(this.password !== this.confirmPassword){
      this.validationFailMessage = "Password & confirm password do not match!"
      return;
    }

    let pload = {
      "token": this.token,
      "new_password": this.password,
      "confirm_password": this.confirmPassword
    }

    this.resetingMail = true;
    this.repricerapi.resetPassword(pload)
    .then((res) => {
      if(res.success == true){
        this.resetingMail = false;
        this.resetMailSent = true;
        this.appservice.presentToast(res.status);
        this.appservice.updateRootNav('login',true, {}, false);
      }
      else{
        this.appservice.presentToast(res.status,'error');
      }
    })
    .catch((err) => {
      if(err.message){
        this.appservice.presentToast(err.message,'error');
      }
      else{
        this.appservice.presentToast('reset failed','error');
      }
    });
  }

  private comparePasswords(passdirty, confpassdirty): void{
    console.log("pass " + passdirty + " confirm pass " + confpassdirty);

    this.validationFailMessage = '';
    this.validFields = false;

    if(this.password.length !== this.confirmPassword.length) return;
    if(this.password === this.confirmPassword){
      if(this.password.length >= this.minLength){
        this.validFields = true;
      }
      else{
        this.validationFailMessage = `Password should have at least ${this.minLength} characters!`;
      }
    }
    else{
      if(passdirty && confpassdirty){
         this.validationFailMessage = "Password & confirm password do not match!"
      }
    }
  }
}
