import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RepricerApi } from './repricer-api';
import { CookieService } from 'ngx-cookie';
import { Storage } from '@ionic/storage';
import { AppService } from './app-service';
import { AppGlobals } from './app-globals';

declare var navigator: any;
declare var webengage;
declare var clevertap;
@Injectable()
export class AuthGuard {
  private retrievedUserData: boolean = false;
  private redirectExceptions = [];

  constructor(
    private appglobals: AppGlobals,
    private repricerapi: RepricerApi,
    private cookieservice: CookieService,
    private storage: Storage,
    private appservice: AppService,
    private location: Location
    ) {
    console.log('Hello AuthGuard Provider');
    this.redirectExceptions = this.appglobals.getRedirectExp();
  }

  private loaderInstance: any;
  public verifyToken(page,showloader: boolean = false): Promise<any>{
    this.showLoader(showloader);

    return new Promise((resolve,reject) => {
      if(this.retrievedUserData === false){
        console.log('initial auth...')
        let keepLoggedIn = this.cookieservice.get("keepLoggedIn");

        // add authentication logic here
        if(keepLoggedIn === 'yes'){
          this.storage.get("appMeta")
          .then((result) => {
            console.log('result',result);
            this.retrievedUserData = true;
            // add token validation here
            if(result && result["logintoken"]){

              webengage.user.login(result["user"]['email']);
              webengage.user.setAttribute({
                'we_first_name' : result["user"]['name'],
                'we_email'      : result["user"]['email'],
                'we_phone'      : result["user"]['phone'],
                'dummy_uploaded': (result["user"]['dummy_uploaded']) ? 'Yes' :'No',
                'phone_verified': (result["user"]['phone_verified']) ? 'Yes' :'No',
              });

              clevertap.event.push("User auto logged in",{
                "User Name":result["user"]['name'],
                "Email"    : result["user"]['email'],
                "Phone"    : result["user"]['phone']
              });

              this.repricerapi.setLoginToken(result["logintoken"]);
              this.repricerapi.setUser(result["user"]);
              this.repricerapi.setPriceRules(result["pricingrules"]);
              this.repricerapi.setMarketPlaces(result["marketplaces"]);
              this.repricerapi.setStatus(result["status"]);

              //Redirect the user to dashboard if account is not verified
              // if(!result["user"]['account_verified'] && this.location.path(true) !== '/dashboard'){
              //   this.appservice.updateRootNav('dashboard',true,{},false)
              // }

              console.log(this.repricerapi);

              this.hideLoader(showloader);
              this.redirectToDash(page);
              resolve(true);
              // this.router.navigate(['/summary']);
            }
            else{
              // this.router.navigate(['/login']);
              this.hideLoader(showloader);
              this.redirectToLogin(page);
              reject(false);

            }

          })
          .catch(() => {
            // this.retrievedUserData = false;
            console.log("WARNING: application storage error!")
            reject(false);
          });
        }
        else{
          // this.router.navigate(['/login']);
          this.retrievedUserData = true;
          this.hideLoader(showloader);
          this.redirectToLogin(page);
          reject(false);
        }
      }
      else{
        let logintoken = this.repricerapi.getLoginToken();
        if(logintoken){

          //Redirect the user to dashboard if account is not verified
          // let usr = this.repricerapi.getUser();
          // if(!usr['account_verified'] && this.location.path(true) !== '/dashboard'){
          //   this.appservice.updateRootNav('dashboard',true,{},false)
          // }

          this.hideLoader(showloader);
          this.redirectToDash(page);
          resolve(true);
        }
        else{
          this.hideLoader(showloader);
          this.redirectToLogin(page);
          reject(false);
        }
      }
    })
  }




  private showLoader(show): any{
    if(show){
      this.loaderInstance = this.appservice.showLoader()
    }
  }

  private redirectToLogin(page: string): any{
    if(this.location.path(true) === '/login'){
      return;
    }

    let allowredirect = true;
    for(let expPage of this.redirectExceptions){
      if(page === expPage['page']){
        allowredirect = false;
      }
    }

    if(allowredirect){
      // console.log('redireicting to login page ... page: [' + page + '] location: [' + this.location.path(true) + ']')
      console.log("%c redirecting to login ...","color: red");
      setTimeout(() => {
        this.appservice.updateRootNav('login',true,{},false)
      },500);
    }
  }

  private redirectToDash(page: string): void{
    console.log(this.location.path(true));
    if(this.location.path(true) === '/dashboard' || page === 'dashboard'){
      return;
    }

    let redirect = false;
    for(let expage of this.redirectExceptions){
      if(this.location.path(true).indexOf(expage['page']) !== -1){
        redirect = true;
      }
    }

    if(redirect){
      console.log("%c redirecting to dashboard ...","color: red");
      setTimeout(() => {
        this.appservice.updateRootNav('dashboard',true,{},false)
      },500);
    }
  }

  private hideLoader(show): any{
    // if(navigator && navigator.splashscreen) navigator.splashscreen.hide(); console.log("close splash if open");
    if(show){
      this.loaderInstance.dismiss()
    }
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  //   let logintoken = this.repricerapi.getLoginToken();

  //   console.log("url =>", state.url)

  //   if(logintoken){
  //     return this.parseRoutes(true, state.url);
  //   }
  //   else{
  //     return this.parseRoutes(false, state.url);
  //   }

  // }

  // private parseRoutes(loggedin: boolean, stateurl: string): boolean{
  //     if(stateurl === '/login' || stateurl === '/forgotlogin'){
  //       if(loggedin){
  //         console.log("AuthGaurd not authorised");
  //         return false;
  //       }
  //       else{
  //         console.log("AuthGaurd canactivate for anonymous user");
  //         return true;
  //       }
  //     }
  //     else{
  //       if(loggedin){
  //         console.log("AuthGaurd canactivate");
  //         return true;
  //       }
  //       else{
  //         console.log("AuthGaurd not authorised for anonymous user");
  //         this.router.navigate(['/login']);
  //         return false;
  //       }

  //     }
  // }

}
