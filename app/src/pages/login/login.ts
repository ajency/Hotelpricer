import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { RepricerApi } from '../../providers/repricer-api';
import { AppGlobals } from '../../providers/app-globals';
import { AppService } from '../../providers/app-service';
// import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { Storage } from '@ionic/storage';
import { AuthGuard } from '../../providers/auth-guard';

declare var sessionStorage: any;

@IonicPage({
  name: 'login',
  segment: 'login/:token',
  priority: 'off'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loginFailMessage: string = `Somethings not right...`;
  private keepLoggedIn: boolean = false;
  private loginEmail: string = "";
  private loginPass: string = "";
  private loginFailed = false;
  private loginInProcess: boolean = false;
  private token: string;
  private loginTokenFound: boolean = false;

  constructor(
    private repricerapi: RepricerApi,
    private popctrl: PopoverController,
    // private router: Router,
    private storage: Storage,
    private cookieservice:  CookieService,
    private appglobals: AppGlobals,
    private appservice: AppService,
    private navCtrl: NavController,
    private navparams: NavParams,
    private authguard: AuthGuard) {
      // this.navTo = this.appservice.navToPage;
      this.token = this.navparams.get('token');
  }

  ngOnInit() {
    console.log('ngOninit Login');
  }

  ionViewCanEnter(): Promise<boolean>{
    console.log('ionviewcanenter login')
    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('login')
      .then(() => {
        console.warn('login page not authorised')
        reject(true)
      })
      .catch(() => {
        resolve(true)
      })
    })

  }

  private loaderInstance: any;
  ionViewDidEnter(){
    console.log("ionViewDidEnter login")
    console.log("token => ",this.token);

    if(this.token && this.token !== ':token'){
      this.loaderInstance = this.appservice.showLoader();
    }

  }

  ionViewWillUnload(){
    if(this.loaderInstance){
      this.loaderInstance.dismiss();
    }
  }

  private validInputBeforeSubmit(event: any): void{

    if(event.keyCode === 13){
      if(this.loginEmail && this.loginPass){
        this.signin();
      }
    }
  }

  private navTo(page,showloader: boolean = false){
    console.log('navigating to page', page);
    this.appservice.updateRootNav(page,true,{},showloader);
  }

  public signin(): void{

    console.log("email => " + this.loginEmail + " pass => " + this.loginPass + " serverUrl => ");

    if(!this.loginEmail && !this.loginPass){
      this.loginFailed = true;
      this.loginFailMessage = 'Username and Password cannot be blank';
      return;
    }

    if(!this.loginEmail){
      this.loginFailed = true;
      this.loginFailMessage = 'Username cannot be blank';
      return;
    }

    if(!this.loginPass){
      this.loginFailed = true;
       this.loginFailMessage = 'Password cannot be blank';
      return;
    }

    this.loginInProcess = true;
    this.repricerapi.login({username: this.loginEmail, password: this.loginPass},this.keepLoggedIn)
    .then((response) => {
      console.log("response",response)
      this.loginFailed = response;
      if(!this.loginFailed){
        this.navTo('dashboard',true);
      }
      this.loginInProcess = false;
    })
    .catch(e => {
      // let errmess;
      // try{
      //   errmess = JSON.parse(e._body);
      // }
      // catch(e){
      //   errmess = {message: 'network failed'};
      // }
      console.log(e);
      this.loginFailMessage = e.message;
      this.loginFailed = true;
      this.loginInProcess = false;
    });
  }

}
