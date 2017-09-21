import { Component, ViewChild } from '@angular/core';
import { Platform , MenuController, Nav, NavController, Events, App, ModalController } from 'ionic-angular';
import { Location, PlatformLocation } from '@angular/common';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { AppGlobals } from '../providers/app-globals';
import { AppService } from '../providers/app-service';
import { AuthGuard } from '../providers/auth-guard';
import { RepricerApi } from '../providers/repricer-api';
import { TitleCasePipe } from '../pipes/title-case/title-case';
import { Storage } from '@ionic/storage';
import { VerifyAccountPopoverPage } from '../modals/verify-account/verify-account';

declare var self: any;

interface Window {
  location: any
  addEventListener: any;
  onlineToast: any;
  offlineToast: any;
  onfocus: any;
  onblur: any;
  unescape: any;
}

declare var window: Window;
declare var document: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mainContent') nav: NavController;

  // @HostListener('window:popstate', ['$event'])
  // onPopState(event) {
  //   console.warn('HostListener Back button pressed');
  //   event.preventDefault()
  // }
  private appName: string;
  private currentPage: string;
  rootPage: any;
  pages: Array<{title: string, component: any}>;
  private $: any;
  loading: boolean = false;
  constructor(
    // private statusbar: StatusBar,
    // private splashscreen: SplashScreen,
    private modalctrl: ModalController,
    public platform: Platform,
    public menu: MenuController,
    private storage: Storage,
    private events: Events,
    private appservice: AppService,
    private appglobals: AppGlobals,
    private location: Location,
    private platformlocation: PlatformLocation,
    private authguard: AuthGuard,
    private repricerapi: RepricerApi,
    private app: App,
    private titlecasepipe: TitleCasePipe
  ) {
    console.log('app component init => Environment is "' + this.appglobals.getEnvironment() + '"');

    this.initializeApp();
    this.appName = this.appglobals.getAppName();

    this.events.subscribe('app:navroot',(data) => {
      this.updateNav(data)
    });

    this.events.subscribe('app:updatehistory',(data) => {

      this.showVerificationModal();

      // if(this.appglobals.getEnv().ionicEnvName === 'dev') return;
      console.log("pushstate data =>" , data)
      if(data.state){
        let currentlocation = data.frompath ? data.frompath : this.location.path(true);
        if(currentlocation.indexOf('?') !== -1){
          let locationparts = currentlocation.split('?');
          currentlocation = locationparts[0];
        }

        let page = data.state['query'] ? currentlocation + data.state['query'] : currentlocation + data.page;

        // let page = window.location.pathname + data.page;
        if(data.replace){
          console.log("pressed replacing url history => ", page)
          this.platformlocation.replaceState(data.state,"",page);
          this.appglobals.updateCurrentHistory(page);
        }
        else{
          console.log("pressed pushing url history => ", page)
          this.platformlocation.pushState(data.state,"",page);
          this.appglobals.pushToHistory(page);
        }
      }
      else{ // just update the history stack
        this.appglobals.pushToHistory(data);
        // this.platformlocation.pushState({page: data},"",data);
      }
      console.log("app:updatehistory",this.appglobals.getHistory());
    });

    platformlocation.onPopState((event: any) => {
      // console.warn('pressed back location ' + document.location + ", state: " + JSON.stringify(event.state));
      let history = this.appglobals.getHistory();
      this.events.publish('app:popstate',event.state);

      // this.updateNav({page: 'competitors', setroot: true});
      // if(event.state && event.state.id === 'prices'){
      //   this.events.publish('app:updatehistory',{page: "test-state", state: {test: "123"}})
      // }
    });


    this.events.subscribe('app:invalidToken',(error) => {
      console.warn('invalid token', error);
      this.repricerapi.logout();
    });
    // platformlocation.onHashChange((event: any) => {
    //   console.warn("hash change detected",event);
    //   // event.preventDefault();
    // });

  }

  ngOnInit(){
    console.log('%c url location on app entry ... location: [' + this.location.path(true) + ']','color:orange')

    let path = this.location.path(true)
    let pathparts = path.split('/');

    let logininurl = false;
    pathparts.map((val) => {
      if(val === 'login'){
        logininurl = true;
      }
    });

    if(logininurl && pathparts.length > 2 && window.unescape(pathparts[pathparts.length - 1]) !== ':token'){
      console.log("login with url token !!!!!!!!!!!!!!!!");
      this.repricerapi.logout(false)
          .then(() => {
            this.repricerapi.login({}, true, pathparts[pathparts.length - 1])
            .then((res) => {
              console.log("login response =>",res);
              this.updateTitle('dashboard');
              this.appservice.updateRootNav('dashboard',true,{},true);
            })
            .catch((err) => {
              console.warn('err',err)
            })
          })
          .catch((err) => {
            console.warn('token login error: ',err)
          })
      return;
    }else if(this.location.path(true) === ''){

      console.log("%c redirecting to dashboard screen...","color: green")

      this.authguard.verifyToken('dashboard')
      .then(() => {
        this.rootPage = 'dashboard';
        this.updateTitle(this.rootPage);
      })
      .catch(() => {
        console.warn('dashboard not authorised');
      });
    }
    else{
      console.warn("trying navigation to page =>", this.location.path(true));

      // handle lazy loaded scripts and failures
      let redirectExps = this.appglobals.getRedirectExp();

      let validtab = '';
      let validparams = false;
      redirectExps.map((val) => {
        // if(val['page'] === pathparts[1]){
        if(pathparts[1].indexOf(val['page']) === 0){
          validtab = val['page'];
          if(val['requiredparam']){
            if(pathparts[2]){
              validparams = true;
            }
          }
          else{
            validparams = true;
          }
        }
      });

      if(!validtab){
        let tabdictionare = this.appglobals.getTabsContainerList();      
        for(let tab in tabdictionare){
          // if(tabdictionare[tab].deeplink === pathparts[1]){
          if(pathparts[1].indexOf(tabdictionare[tab].deeplink) === 0){
            validtab = tabdictionare[tab].deeplink;
            if(tabdictionare[tab]['requiredparam']){
              if(pathparts[2]){
                validparams = true;
              }
            }
            else{
              validparams = true;
            }
          }
        }
      }

      if(validtab && validparams){
        console.warn('valid navigation');
        this.updateTitle(validtab);
      }
      else{
        this.updateTitle('not-found');
        if(validtab){
          // if(!validparams){
            console.warn('invalid params in navigation!!!');
            this.nav.setRoot('not-found',{invalidurlparams: true});
          // }
        }
        else{
          console.warn('invalid navigation!!!');
          this.nav.setRoot('not-found');
        }
      }

    }

    this.nav.viewDidEnter
            .subscribe((res) => {
              console.log('view did enter =>' + this.currentPage + " %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
              // setTimeout(() => {
                // this.app.setTitle(`${this.appName} - ${this.titlecasepipe.transform(this.currentPage)}`);
                this.updateTitle(this.currentPage);
              // },250);
            },(err) => {
              console.warn('view enter error', err);
            })
  }

  private updateTitle(title: string = ''): void{
    this.currentPage = title ? title : this.currentPage;
    document.title = `${this.appName} - ${this.titlecasepipe.transform(this.currentPage)}`;
  }

  private verifyModal: any;
  private showVerificationModal(): void{
    if(this.verifyModal) return;
    let usr = this.repricerapi.getUser();
    //console.log('Storage Meta::: ',this.storageMeta.user);
    //if(!usr['account_verified']){

    if(!usr['account_verified']){
      // if(!usr['dummy_uploaded']){
        console.log('verify modal opened');
        this.verifyModal = this.modalctrl.create(VerifyAccountPopoverPage,{}, { enableBackdropDismiss: false});
        this.verifyModal.present();

        this.verifyModal.onDidDismiss(() => {
          this.verifyModal = null;
        });
      // }
    }
  }

  private showFailNavToast(message): void{
    this.appservice.presentToast(`'Woopps! Couldnt not navigate to '${message}', Please check network connection...`,'warn');
  }

  private updateNav(data: any): any{
    console.warn(' updating data => ', data)
    // console.log('navigation history', this.nav.getViews());
    // this.appglobals.setPageToNavigate(data);
    data['params'] = data['params'] ? data['params'] : {};
    if(data && data['page']){
      let loader: any;
      if(data.showloader){
        loader = this.appservice.showLoader()
      }

      let thencallback = () => {
          console.log("success2");
          // this.updateTitle(data['page']);
          loader ? loader.dismiss(): '';
          this.events.publish('app:navComplete',data);
          console.log(this.appglobals.getHistory());
          this.appservice.updateOnlineStatus();
      }

      let catchcallback = (err) => {
          console.warn(err);
          this.appglobals.setPageToNavigate({});
          loader ? loader.dismiss() : '';

          setTimeout(() => {
            this.nav.setRoot('not-found', {networkfailure: true})
          },500);

          // this.showFailNavToast(data['page']);
      }

      // this.updateTitle(data['page']);
      this.updateTitle();
      this.currentPage = data['page'];
      if(data['setroot']){
        this.nav.setRoot(data['page'], data['params'])
                .then(thencallback)
                .catch(catchcallback)
      }
      else{
        this.nav.setRoot(data['page'], data['params'],{animate: false, animation: 'md-transition', direction: 'forward'})
                .then(thencallback)
                .catch(catchcallback)
      }

      // console.log(this.nav.getActive());
      // console.log(this.nav.getActiveChildNav());
    }
    else{
      console.warn('incomplete page payload');
      console.log("closeflash5");
    }
  } //end updateNav

  // navigationInterceptor(event: RouterEvent): void{
  //       if (event instanceof NavigationStart) {
  //           console.log("nav start")
  //           this.loading = true;
  //           this._showSpinner();
  //       }
  //       else if (event instanceof NavigationEnd) {
  //           console.log("nav end")
  //           this.delayLoaderHide();
  //       }

  //       // Set loading state to false in both of the below events to hide the spinner in case a request fails
  //       else if (event instanceof NavigationCancel) {
  //           console.log("nav cancel")
  //           this.delayLoaderHide();
  //       }
  //       else if (event instanceof NavigationError) {
  //         console.log("nav error")
  //           this.delayLoaderHide();
  // //       }
  // // }

  // private delayLoaderHide(): void{
  //   setTimeout(() => {
  //     this.loading = false;
  //     this._hideSpinner();
  //   },250);
  // }

  // private _showSpinner(): void{
  //   // We wanna run this function outside of Angular's zone to
  //   // bypass change detection
  //   this.ngZone.runOutsideAngular(() => {

  //       // For simplicity we are going to turn opacity on / off
  //       // you could add/remove a class for more advanced styling
  //       // and enter/leave animation of the spinner
  //       // this.renderer.setElementStyle(
  //       //     this.spinnerElement.nativeElement,
  //       //     'display',
  //       //     'block'
  //       // );
  //   });
  // }

  // private _hideSpinner(): void {

  //     // We wanna run this function outside of Angular's zone to
  //     // bypass change detection,
  //     this.ngZone.runOutsideAngular(() => {

  //         // For simplicity we are going to turn opacity on / off
  //         // you could add/remove a class for more advanced styling
  //         // and enter/leave animation of the spinner
  //         // this.renderer.setElementStyle(
  //         //     this.spinnerElement.nativeElement,
  //         //     'display',
  //         //     'none'
  //         // );

  //         // this.renderer.setElementStyle(
  //         //     this.spinnerElement.nativeElement,
  //         //     'background',
  //         //     'none'
  //         // );
  //     });
  // }

  // ngOnInit() {
  //   console.log('ionViewDidEnter app-component');

  //   let keepLoggedIn = this.cookieservice.get("keepLoggedIn");

  //   // add authentication logic here
  //   if(keepLoggedIn === 'yes'){
  //     this.storage.get("appMeta")
  //     .then((result) => {
  //       console.log('result',result);
  //       // add token validation here
  //       if(result && result["logintoken"]){

  //         this.repricerapi.setLoginToken(result["logintoken"]);
  //         this.repricerapi.setUser(result["user"]);
  //         this.repricerapi.setPriceRules(result["pricingrules"]);
  //         this.repricerapi.setMarketPlaces(result["marketplaces"]);
  //         this.repricerapi.setStatus(result["status"]);

  //         console.log(this.repricerapi)

  //         // this.router.navigate(['/summary']);
  //       }
  //       else{
  //         // this.router.navigate(['/login']);
  //       }
  //     })
  //   }
  //   else{
  //     // this.router.navigate(['/login']);
  //   }
  // }

  private initializeApp() {
    this.platform.ready().then((readySource) => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // console.log("source ismobileWeb dada => " + this.platform.is('mobileweb') + " isdesktop => " + this.platform.is('core'));
      console.log(`source: ${readySource} android: ${this.platform.is('android')} cordova: ${this.platform.is('cordova')} core: ${this.platform.is('core')} mobile: ${this.platform.is('mobile')} mobileweb: ${this.platform.is('mobileweb')} ios: ${this.platform.is('ios')}`)
      this.appglobals.setAsMobileWeb(this.platform.is('mobile'));
      this.appglobals.iosDevice = this.platform.is('ios');

      // this.statusbar.styleDefault();
      // this.splashscreen.hide();
      this.checkNetwork();

      this.platform.registerBackButtonAction(() => {
            // get current active page
            let view = this.nav.getActive();
            console.log("view ",view.component.name)
            // if (view.component.name == "TabsPage") {
            //     //Double check to exit app
            //     if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
            //         this.platform.exitApp(); //Exit from app
            //     } else {
            //         let toast = this.toastCtrl.create({
            //             message:  'Press back again to exit App?',
            //             duration: 3000,
            //             position: 'bottom'
            //         });
            //         toast.present();
            //         lastTimeBackPress = new Date().getTime();
            //     }
            // } else {
            //     // go to previous page
            //     this.nav.pop({});
            // }
        });

    });
  }



  checkNetwork() {
      let self = this;
      let networktimeout = null;
      window.addEventListener('online',  function(e) {
        if(self.appservice.getAppFocus() === false) return;

        clearTimeout(networktimeout);
        networktimeout = setTimeout(() => {
          // self.updateOnlineStatus(self.appservice);
          self.appservice.updateOnlineStatus(true);
        },self.appglobals.networkStatusDelay);
      });
      window.addEventListener('offline', function(e) {
        if(self.appservice.getAppFocus() === false) return;

        clearTimeout(networktimeout);
        networktimeout = setTimeout(() => {
          // self.updateOnlineStatus(self.appservice);
          self.appservice.updateOnlineStatus(true);
        },self.appglobals.networkStatusDelay);
      });

      // Set the name of the hidden property and the change event for visibility
      var hidden, visibilityChange; 
      if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
        hidden = "hidden";
        visibilityChange = "visibilitychange";
      } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
      } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
      }

      if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
        console.warn("addeventlistener required for page visibility api to work!");
      } else {
        // Handle page visibility change   
        document.addEventListener(visibilityChange, () => {
          if(document[hidden]){
              console.warn("########################### window hidden ##############################");
              this.appservice.setAppFocus(false);
          }
          else{
              console.warn("@@@@@@@@@@@@@@@@@@@@@@@@@@@@ window visible @@@@@@@@@@@@@@@@@@@@@@@@@@@@");
              this.appservice.setAppFocus(true);
              this.appservice.updateOnlineStatus(true);
          }
        }, false);
      }   
      // window.onfocus = () => {
      //   console.warn("@@@@@@@@@@@@@@@@@@@@@@@@@@@@ window focused @@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      //   this.appservice.setAppFocus(true);
      // }

      // window.onblur = () => {
      //   console.warn("########################### window blured ##############################");
      //   this.appservice.setAppFocus(false);
      // }
  }

  // openPage(page) {
  //   // close the menu when clicking a link from the menu
  //   this.menu.close();
  //   // navigate to the new page if it is not the current page
  //   this.nav.setRoot(page.component);
  // }
}
