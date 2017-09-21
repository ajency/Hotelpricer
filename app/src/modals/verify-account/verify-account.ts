import { Component, ElementRef, NgZone } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';
import { RepricerApi } from '../../providers/repricer-api';
import { AppService } from '../../providers/app-service';
import { Storage } from '@ionic/storage';

import { AppGlobals } from '../../providers/app-globals';
import { AuthGuard } from '../../providers/auth-guard';

@IonicPage({
  name: 'page-verify-account',
  segment: 'page-verify'
})
@Component({
  selector: 'page-verify-account',
  templateUrl: 'verify-account.html',
})
export class VerifyAccountPopoverPage {

  private otp = {
    'first':'',
    'second':'',
    'third':'',
    'fourth':'',
    'fifth':'',
    'sixth':''
  };

  private user:any = {};

  private editPhone = false;
  private verifying = false;
  private verified = true;
  private phonenumber:any;
  private isVerificationError = false;
  private verificationError:any;
  private updatedPhone:any;
  private storageMeta:any;
  private resentOtp = false;
  private nativeElement: any;
  private $: any;
  private trackerSetup: boolean = false;
  private allowImport: boolean = false;
  private selectedCategory: string = "";
  private trackerUrlRef: any = {};
  private categories: any = [
                        {name: "Electronics", slug: "electronics" , icon: "../assets/img/Electronics.png"},
                        {name: "Appliances", slug: "appliances" , icon: "../assets/img/Appliances.png" },
                        // {name: "Fashion", slug: "fashion" ,icon: "../assets/img/Fashion.png" },
                        // {name: "Baby & Kids", slug: "babynkids" , icon: "../assets/img/kids.png" },
                        // {name: "Furniture", slug: "furniture" , icon: "../assets/img/furniture.png" }
                      ];

  constructor(
    private viewCtrl: ViewController,
    private params: NavParams,
    private element: ElementRef,
    private repricerapi: RepricerApi,
    private appservice: AppService,
    private appglobals: AppGlobals,
    private authguard:  AuthGuard,
    private zone: NgZone,
    private navCtrl: NavController,
    private storage: Storage
    ) {

      this.getStorageMeta();
      let usr = this.repricerapi.getUser();
      this.user = usr;
      this.phonenumber = usr['phone'];
      this.updatedPhone = usr['phone'];

      // this.trackerSetup = true;

      // this.storageMeta.user.account_verified = true;
      // this.storageMeta.user.phone_verified = true;
      // this.setStorageMeta();

      this.$ = this.appservice.jQuery;
      this.nativeElement = this.element.nativeElement;
      this.trackerUrlRef = this.appglobals.getDummyTrackerUrls();

      let defaultmarket = 'amazon';
      // this.selectedCategory = { market: defaultmarket, category: 'electronics', url: this.trackerUrlRef[defaultmarket][0]["url"], categories: this.trackerUrlRef[defaultmarket] };
      this.selectedCategory = "appliances";
      console.log(this.storageMeta);
  }


  // ionViewDidEnter(){
  //   // let usr = this.repricerapi.getUser();
  //   // this.user = usr;
  //   // this.phonenumber = usr['phone'];
  //   // this.updatedPhone = usr['phone'];
  // }

  ngOnInit(){
    this.$(this.nativeElement).parent().addClass("verify-popover");
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }



  next(event,prevElement,nextElement) {
    if(event.keyCode === 8){
      prevElement.setFocus()
    }
    else{
      nextElement.setFocus();
    }
  }


  verifyOtp(){
    let otp = this.otp.first.toString()+this.otp.second.toString()+this.otp.third.toString()+this.otp.fourth.toString()+this.otp.fifth.toString()+this.otp.sixth.toString();
    if(otp.length<6){
      this.isVerificationError = true;
      this.verificationError = 'OTP should be 6 characters only!';
      return;
    }

    this.verifying = true;
    this.repricerapi.verifyOtp({'otp':otp})
    .then((res) => {
      if(!res.status){
        this.isVerificationError = true;
        this.verificationError = res.message;
      }else{
        this.verified = true;
        this.isVerificationError = false;

        this.storageMeta.user.account_verified = true;
        this.storageMeta.user.phone_verified = true;
        this.setStorageMeta();

        // this.appservice.presentToast("OTP verification success");
      }
      this.verifying = false;

    })
    .catch((err) => {
      this.verifying = false;
      this.verified = false;
      this.isVerificationError = true;
      this.verificationError = 'There was some error verifying OTP!';
    });
    this.resetOtpVal();

  }


  openEditBox(){
    this.editPhone = true;
    window.console.log(this.storageMeta);
  }



  updatePhoneNumber(){
    this.repricerapi.updatePhoneNumber({'phone':this.updatedPhone})
    .then((res) => {
      if(res.status){
        this.phonenumber = this.updatedPhone;
        this.editPhone = false;
        this.storageMeta.user.phone = this.updatedPhone;
        this.setStorageMeta();
      }

    })
    .catch((err) => {
      this.editPhone = false;
      this.isVerificationError = true;
      this.verificationError = 'There was an error changing phone number!';
    });
  }


  resetOtpVal(){
    this.otp.first = '';
    this.otp.second = '';
    this.otp.third = '';
    this.otp.fourth = '';
    this.otp.fifth = '';
    this.otp.sixth = '';
  }



  getStorageMeta(){
    this.storage.get('appMeta').then((val) => {
      this.storageMeta = val;
    });
  }

  setStorageMeta(){
    this.repricerapi.setUser(this.storageMeta.user);
    this.storage.set('appMeta', this.storageMeta);
  }


  resendOtp(){
    this.repricerapi.resendOtp({})
    .then((res) => {
      if(res.status){
        this.resentOtp = true;
        this.resetOtpVal();
      }else{
        this.resentOtp = false;
      }
    })
    .catch((err) => {
      this.resentOtp = false;
    });
  }



  refreshLocation(){
    location.reload();
  }

  private showStep2(): void{
    this.trackerSetup = true;
    this.zone.run(() => {});
  }

  private importCallPending: boolean = true;
  private importInProgress: boolean = false;
  private urlToBeImports: Array<{market: string,url: string}> = [];
  private importDummyRecords(selectedmarket: any): void{
    // this.urlToBeImports = [];

    // for(let ref in this.trackerUrlRef){
    //   this.trackerUrlRef[ref].map((val) => {
    //     if(val["name"] === this.selectedCategory && val.url){
    //       this.urlToBeImports.push({
    //         market: ref,
    //         url: val.url
    //       });
    //     }
    //   })
    // }

    // console.log("urlToBeImports", this.urlToBeImports);

    // this.importMarketData();

      this.importCategoryData();
  }

  private importCategoryData(): void{
      let payload = {
        type: 'dummy',
        filename: `${this.selectedCategory}_dummy.xls`,
        url: this.trackerUrlRef[this.selectedCategory],
        marketplace_id: "custom"
      }

      this.importInProgress = true;
      this.repricerapi.importTemplate(payload)
      .then((res) => {
        console.log("import",res)

        this.importCallPending = false;
        // this.importInProgress = false;
        if(res.success == true){
          this.appservice.presentToast('File imported successfully & status is "' + res.status + '"');

          this.storageMeta.user.dummy_uploaded = true;
          this.storageMeta.user.dummy_cleared = false;
          this.setStorageMeta();

          let params = {};
          params['marketplace'] = "all";
          this.appservice.updateRootNav("prices", true, params);
          // this.appservice.updateRootNav("dashboard", true);
          this.viewCtrl.dismiss();

        }
        else{
          let errmess = ''
          if(res.errors && res.errors.length){
            errmess = 'Errors in file import:\n'
            let errors = []
            for(let err of res.errors){
              if(err["error"]){
                let line = `(Row: ${err["row"]}, Error: ${err["error"]})`
                errors.push(line);
              }
            }

            errmess = errmess + errors.join('\n');

            this.appservice.presentToast(errmess,'error',15000);
          }
          else{
            errmess = res.status ? res.status : 'File import failed!'

            this.appservice.presentToast(errmess,'error');
          }

        }


      })
      .catch((err) => {
        this.importInProgress = false;

        console.warn('import',err)
        if(err.message){
          this.appservice.presentToast(err.message,'error');
        }
      });
  }

  // private importMarketData(){
  //   if(this.urlToBeImports.length){
  //     let importData = this.urlToBeImports.pop();

  //     let payload = {
  //       type: 'dummy',
  //       filename: `${importData.market}_dummy.xls`,
  //       url: importData.url,
  //       marketplace_id: "custom"
  //     }

  //     this.importInProgress = true;
  //     this.repricerapi.importTemplate(payload)
  //     .then((res) => {
  //       console.log("import",res)
  //       // this.importInProgress = false;
  //       if(res.success == true){
  //         this.appservice.presentToast('File imported successfully & status is "' + res.status + '"');

  //         this.storageMeta.user.dummy_uploaded = true;
  //         this.storageMeta.user.dummy_cleared = false;
  //         this.setStorageMeta();

  //       }
  //       else{
  //         let errmess = ''
  //         if(res.errors && res.errors.length){
  //           errmess = 'Errors in file import:\n'
  //           let errors = []
  //           for(let err of res.errors){
  //             if(err["error"]){
  //               let line = `(Row: ${err["row"]}, Error: ${err["error"]})`
  //               errors.push(line);
  //             }
  //           }

  //           errmess = errmess + errors.join('\n');

  //           this.appservice.presentToast(errmess,'error',15000);
  //         }
  //         else{
  //           errmess = res.status ? res.status : 'File import failed!'

  //           this.appservice.presentToast(errmess,'error');
  //         }

  //       }

  //       // this.importCallPending = false;
  //       this.importMarketData();
  //     })
  //     .catch((err) => {
  //       this.importInProgress = false;

  //       console.warn('import',err)
  //       if(err.message){
  //         this.appservice.presentToast(err.message,'error');
  //       }

  //       this.importMarketData();
  //     });
  //   }
  //   else{
  //     this.importInProgress = false;
  //     this.importCallPending = false;

  //     let params = {};
  //     params['marketplace'] = "all";
  //     this.appservice.updateRootNav("prices", true, params);
  //     // this.appservice.updateRootNav("dashboard", true);
  //     this.viewCtrl.dismiss();
  //   }
  // }

  private selectMarket(market: string): void{
    // this.allowImport = false;
    this.zone.run(() => {});
  }

}
