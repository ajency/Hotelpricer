import { Injectable } from '@angular/core';
import { AppGlobals } from './app-globals';
import { AppService } from './app-service';
import { Storage } from '@ionic/storage';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { Observable } from 'rxjs/Observable';

declare var webengage;
declare var clevertap;

@Injectable()
export class RepricerApi {
  private defaultHeaders: any;
  private repricerurl = '';
  private logintoken = '';
  private pricingrules = {};
  private marketplaces = {};
  private status = {};
  private user = {};
  private resultPopover: any;
  private cookieOptions: CookieOptions;
  public priceFilter: any;

  constructor(
    private appglobals: AppGlobals,
    private appservice: AppService,
    private storage: Storage,
    private cookieservice: CookieService) {
    console.log('Hello RepricerApi Provider');
    this.repricerurl = this.appglobals.getServerUrl();
  }

  public getResultPopover(): any{
    return this.resultPopover;
  }

  public setResultPopover(data: any): void{
    this.resultPopover = data;
  }

  private appMeta: any = {};

  public getAppMeta(): any{
    return this.appMeta;
  }

  public setLoginToken(token: string): void{
    this.appMeta.logintoken = token;

    this.defaultHeaders = {
      "Authorization": `Bearer ${this.appMeta.logintoken}`
    }
  }

  public getLoginToken(): string{
    return this.appMeta.logintoken;
  }

  public setPriceRules(rules: object): void{
    this.appMeta.pricingrules = rules;
  }

  public getPriceRules(): object{
    return this.appMeta.pricingrules;
  }

  public setMarketPlaces(markets: object): void{
    this.appMeta.marketplaces = markets;
  }

  public getMarketPlaces(): object{
    return this.appMeta.marketplaces;
  }

  public setStatus(status: object): void{
    this.appMeta.status = status;
  }

  public getStatus(): object{
    return this.appMeta.status;
  }

  public setUser(user: object): void{
    this.appMeta.user = user;
  }

  public getUser(): object{
    return this.appMeta.user;
  }

  public login(payload: object,keeploggedin: boolean,token: string = ''): any{
    let loginurl = `${this.repricerurl}/api/users/token`;
    return new Promise((resolve, reject) => {
      this.appservice.request(loginurl,'post', payload, token ? {"Authorization": `Bearer ${token}`}: {})
      .then((response) => {
          let loginData = response.data;

          this.setLoginToken(loginData.token);
          this.setUser(loginData.user);
          this.setPriceRules(loginData.default_pricing_rules);
          this.setMarketPlaces(loginData.marketplaces);
          this.setStatus(loginData.status);


          webengage.user.login(loginData.user.email);
          webengage.user.setAttribute({
            'we_first_name' : loginData.user.name,
            'we_email'      : loginData.user.email,
            'we_phone'      : loginData.user.phone,
            'dummy_uploaded': (loginData.user.dummy_uploaded) ? 'Yes' :'No',
            'phone_verified': (loginData.user.phone_verified) ? 'Yes' :'No',
          });

          clevertap.profile.push({
           "Site": {
             "Name": loginData.user.name,
           }
         });


          // let appMeta = {}
          // appMeta["logintoken"] = this.getLoginToken();
          // appMeta["pricingrules"] = this.getPriceRules();
          // appMeta["marketplaces"] = this.getMarketPlaces();
          // appMeta["status"] = this.getStatus();
          // appMeta["user"] = this.getUser();

          let loginFailed;
          if(this.appMeta["logintoken"]){
            loginFailed = false;
            // this.router.navigate(['/summary']);

            this.storage.set("appMeta",this.appMeta)
            .then((value) => {
              console.log("login details saved")
              if(keeploggedin){
                let logintimemillisec = new Date().getTime() + this.appglobals.getLoginPeriod() * 24 * 60 * 60 * 1000
                this.cookieOptions = {
                  expires: new Date(logintimemillisec).toUTCString()
                }
              }
              else{
                this.cookieOptions = {}
              }

              this.cookieservice.put("keepLoggedIn","yes",this.cookieOptions);

              resolve(loginFailed)
            })
            .catch((err) => {
              console.warn(err)
              reject(err)
            })
          }
          else{
            console.warn("login token missing or user inactive");
            loginFailed = true;
            reject(loginFailed);
          }
      })
      .catch((err) => {
        reject(err)
      });
    });
  } //end login

  public logout(redirect: boolean = true): Promise<any>{
    return new Promise((resolve, reject) => {

      webengage.user.logout();

      this.storage.remove("appMeta")
      .then(() => {
        // this.logintoken = '';
        // this.pricingrules = {};
        // this.marketplaces = {};
        // this.status = {};
        // this.user = {};
        this.appMeta = {};
        this.cookieservice.remove("keepLoggedIn");
        resolve(true)
        // this.router.navigate(["/login"]);
        if(redirect){
          this.appservice.updateRootNav('login',true,{},false);
        }
        console.log("logout success!!!!")
      })
      .catch((err) => {
        console.warn("key delete error ",err)
        reject(err)
      });
    });
  }

  public exportTemplate(payload: object): any{
    let exprturl = `${this.repricerurl}/api/products/export`;
    return this.appservice.request(exprturl,'post',payload,this.defaultHeaders);
  }

  public exportImportedFile(id: any): Promise<any>{
    let expurl = `${this.repricerurl}/api/uploads/get-file/${id}`;
    return this.appservice.request(expurl,'get',{},this.defaultHeaders);
  }

  public getProductResult(id: any, payload, type: string = 'observable'): any{
    let resulturl = `${this.repricerurl}/api/uploads/result/${id}`;
    return this.appservice.request(resulturl,'get',payload,this.defaultHeaders, false, type);
  }

  public importTemplate(payload: object): any{
    let imprturl = `${this.repricerurl}/api/v2/products/import`;
    return this.appservice.request(imprturl,'post',payload,this.defaultHeaders);
  }

  public listCsvUploads(payload: any, type: string = 'promise'): any{
    let listcsvurl = `${this.repricerurl}/api/uploads/all`;
    return this.appservice.request(listcsvurl,'get',payload,this.defaultHeaders,false,type);
  }

  public getProductList(payload: any, type: string = 'promise', disableurlupdate: string = ''): any{
    let pricesurl = `${this.repricerurl}/api/products/all`;
    return this.appservice.request(pricesurl,'get',payload, this.defaultHeaders, false, type, disableurlupdate);
  }

  public updateProduct(id: number, payload: any): Promise<any>{
    let updateurl = `${this.repricerurl}/api/products/edit/${id}`;

    return this.appservice.request(updateurl,'post',payload, this.defaultHeaders);
  }

  public getProductActivity(prid: number, filters: any, disableurlupdate: string = ''): Observable<any>{
    let acturl = `${this.repricerurl}/api/activities/product/${prid}`;
    return this.appservice.request(acturl, 'get', filters, this.defaultHeaders, false, 'observable', disableurlupdate);
  }

  public sendForgotPassLink(email: string): Promise<any>{
    let frgtpassurl = `${this.repricerurl}/api/users/forgot-password`;

    let payload = {
      "email": email
    }
    return this.appservice.request(frgtpassurl,'post',payload);
  }

  public resetPassword(payload: any): Promise<any>{
    let reseturl = `${this.repricerurl}/api/users/reset-password`;
    return this.appservice.request(reseturl,'post',payload);
  }

  public getAllCompetitors(payload: any): Observable<any>{
    let compurl = `${this.repricerurl}/api/competitors/all`;
    return this.appservice.request(compurl,'get',payload,this.defaultHeaders, false, 'observable');
  }

  public getCompetitorProducts(payload: any): Observable<any>{
    let cmptprdurl = `${this.repricerurl}/api/competitors/products`;
    return this.appservice.request(cmptprdurl,'get',payload,this.defaultHeaders, false, 'observable');
  }

  public getDashDetails(): Promise<any>{
    let dashdetails = `${this.repricerurl}/api/dashboard`;
    return this.appservice.request(dashdetails,'get',{},this.defaultHeaders);
  }

  public getSellers(id, filter: any, disableurlupdate: string = ''): Observable<any>{
    let sllerurl = `${this.repricerurl}/api/sellers/product/${id}`;
    return this.appservice.request(sllerurl,'get', filter, this.defaultHeaders, false, 'observable', disableurlupdate);
  }

  public verifyOtp(payload: any): Promise<any>{
    let verifyurl = `${this.repricerurl}/api/users/verify-phonenumber`;
    return this.appservice.request(verifyurl,'post',payload, this.defaultHeaders);
  }

  public updatePhoneNumber(payload: any): Promise<any>{
    let updateurl = `${this.repricerurl}/api/users/update-phone-number`;
    return this.appservice.request(updateurl,'post',payload, this.defaultHeaders);
  }

  public resendOtp(payload: any): Promise<any>{
    let resendurl = `${this.repricerurl}/api/users/resend-otp`;
    return this.appservice.request(resendurl,'post',payload, this.defaultHeaders);
  }

  public getProductRank(id): Promise<any>{
    let rankurl = `${this.repricerurl}/api/sellers/product/${id}/rank`;
    return this.appservice.request(rankurl,'get',{}, this.defaultHeaders);
  }


  public getDashTopMetrics(): Promise<any>{
    let topMetricsUrl = `${this.repricerurl}/api/dashboard/top-metrics`;
    return this.appservice.request(topMetricsUrl,'get',{}, this.defaultHeaders);
  }

  public getDashTrendChart(range): Observable<any>{
    let trendchartUrl = `${this.repricerurl}/api/dashboard/trendchart`;
    return this.appservice.request(trendchartUrl,'get',{'range': range}, this.defaultHeaders, false, 'observable');
  }

  public getDashlastDayCounts(): Promise<any>{

    // let metricurl = `http://www.mocky.io/v2/5981e579110000690c396455`;
    // let headers = {
    //   "Accept": "application/json"
    // }
    // return this.appservice.request(metricurl,'get',{},headers,true);

    let metricurl = `${this.repricerurl}/api/dashboard/last-day-metrics`;
    return this.appservice.request(metricurl,'get',{},this.defaultHeaders);

  }

  public getDashMarketMetrics(): Promise<any>{
    let topMarketMetricsUrl = `${this.repricerurl}/api/dashboard/marketplace-metrics`;
    return this.appservice.request(topMarketMetricsUrl,'get',{}, this.defaultHeaders);
  }

  public getProductInfo(id, disableurlupdate:string = ''): Promise<any>{
    let productinfourl = `${this.repricerurl}/api/products/info/${id}`;
    return this.appservice.request(productinfourl,'get',{}, this.defaultHeaders);
  }

  public getTestAPI(): Promise<any>{
    let productinfourl = `${this.repricerurl}/api/products/test`;
    return this.appservice.request(productinfourl,'get',{}, this.defaultHeaders);
  }

  public getSellerPriceTrend(id, sellerids: any,noupdate: string = ''): Observable<any>{
    let pricetrendurl = `${this.repricerurl}/api/sellers/product/${id}/seller-price-trend`;
    return this.appservice.request(pricetrendurl, 'get', sellerids, this.defaultHeaders, false, 'observable',noupdate);
  }

  public getProduct(id): Observable<any>{
    let producturl = `${this.repricerurl}/api/product/details/${id}`;
    return this.appservice.request(producturl,'get',{},this.defaultHeaders, false, 'observable', 'disableurlupdate')
  }

  public getSellerIDs(payload: any): Promise<any>{
    // return new Promise((resolve, reject) => {
    //   resolve({
    //             "status": true,
    //             "message": "Seller ids successfully sent",
    //             "sellers_data": [
    //                 {
    //                     "seller_id": "A2PMRILGMWYYV5",
    //                     "seller_name": "WiFiZonee",
    //                     "channel_id": 1,
    //                     "rating": 5,
    //                     "rating_count": 1491
    //                 },
    //                 {
    //                     "seller_id": "A1S1RV7QA28FUJ",
    //                     "seller_name": "FastDealsIndia",
    //                     "channel_id": 1,
    //                     "rating": 5,
    //                     "rating_count": 123
    //                 }
    //             ]
    //         });
    // });

    let getsidurl = `${this.repricerurl}/api/seller/get-seller-ids`;
    return this.appservice.request(getsidurl,'post',payload,this.defaultHeaders);
  }

  public addSeller(payload: any): Promise<any>{
    let addslridurl = `${this.repricerurl}/api/seller/add-seller-id`;
    return this.appservice.request(addslridurl,'post',payload,this.defaultHeaders);
  }

}
