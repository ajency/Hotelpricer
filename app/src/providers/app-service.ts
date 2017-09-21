import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { ToastController, Events, LoadingController } from 'ionic-angular';
import { Location } from '@angular/common';
import { AppGlobals } from './app-globals';
// import { Observable } from 'rxjs/Observable';

import * as $ from 'jquery';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

declare var require: any;
let DEPARAM_DEFINITION = require('jquery-deparam');

interface Window {
  addEventListener: any;
  onlineToast: any;
  offlineToast: any;
  location: any;
  onfocus: any;
  onblur: any;
}

declare var window: Window;

@Injectable()
export class AppService {
  jQuery: any;

  private handleError: any;
  private isOnline: boolean = true;
  private appFocused: boolean = true;

  constructor(
    private appglobals: AppGlobals,
    private location: Location,
    public http: Http,
    private toastctrl: ToastController,
    private events: Events,
    private loadingCtrl: LoadingController) {
    console.log('Hello AppService Provider');
    this.jQuery = $;
    this.jQuery.deparam = DEPARAM_DEFINITION;

    this.handleError = (error: any): Promise<any> => {
                      console.warn('error in request fetch',error)

                      // let errMsg: string;
                      // if (error instanceof Response) {
                      //   const body: any = error.json() || '';
                      //   const err = body.error || JSON.stringify(body);
                      //   errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
                      // } else {
                      //   errMsg = error.message ? error.message : error.toString();
                      // }
                      // console.error(errMsg);
                      // return Promise.reject(errMsg);

                      if(error.status === 0 && !navigator.onLine){
                        if(window.offlineToast){
                          window.offlineToast.dismiss({backdrop: true});
                          window.offlineToast = null;
                        }
                        // else{
                        setTimeout(() => {
                          window.offlineToast = this.presentToast("Request couldn't be made as you are offline!",'error',0,true,'bottom','Refresh');

                          window.offlineToast.onDidDismiss((data) => {
                            if(data && data.backdrop){
                              // window.location.reload(true);
                            }
                            else{
                              window.location.reload(true);
                            }
                          });
                        },500);
                        // }
                      }

                      let prerror = this.parseRejectedError(error);

                      if(prerror.code === 500 && prerror.message === 'Signature verification failed'){
                        this.events.publish('app:invalidToken',prerror);
                      }

                      return Promise.reject(prerror);
                    }

  }

  public setAppFocus(focused: boolean): void{
    this.appFocused = focused;
  }

  public getAppFocus(): boolean{
    return this.appFocused;
  }

  public updateRootNav(page: string,setroot: boolean = false, params = {}, showloader: boolean = true): any{
    let data = {
      page: page
    }
    data['setroot'] = setroot
    data['params'] = params
    data['showloader'] = showloader;

    this.events.publish('app:navroot',data)
  }

  public showLoader(): any{
    let loaderInstance = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div #spinnerElement>
                <div>
                  <div>
                    <img src="./assets/img/loadingAngular.gif"/>
                  </div>
                </div>
              </div>`
    })

    loaderInstance.present();

    return loaderInstance;
  }

  public presentToast(message: string, type: string = 'success', duration: number = 3000, keepOpen: boolean = false, position: string = 'bottom',closeText: string = 'Got it'): any{

      //this.toastctrl.dismiss();

    let toastClass = '';
    if(type === 'success'){
      toastClass = 'toast-success online';
    }
    else if(type === 'warn'){
      toastClass = 'toast-warn offline';
    }
    else if(type === 'error'){
      toastClass = 'toast-fail'
    }

    let toastOptions:any = {
      message: message,
      cssClass: toastClass,
      position: position
    }

    if(keepOpen){
      toastOptions.showCloseButton = true;
      toastOptions.closeButtonText = closeText;
      toastOptions.dismissOnPageChange = false;
    }else{
      toastOptions.duration = duration;
    }

    let toast = this.toastctrl.create(toastOptions);

    // let toast = this.toastctrl.create({
    //   message: message,
    //   duration: duration,
    //   cssClass: toastClass,
    //   position: 'bottom',
    //   showCloseButton: true,
    //   closeButtonText: 'X'
    // });

    // toast.onDidDismiss(() => {
    //   console.log("toast dsimissed");
    // });

    toast.present();
    console.log("toasst presented")

    return toast;
  }

  public request(url: string,type: string, body: object, optionalHeaders: object = {},overrideheaders: boolean = false, returntype: string = 'promise', disableurlupdate: string = ''): any{
    let locationpath = this.location.path(true);

    let headers = new Headers({'Content-Type': 'application/json','Accept': 'application/json'});

    let opHeaderKeys = Object.keys(optionalHeaders);
    if(opHeaderKeys.length){
      if(overrideheaders){
        headers = new Headers(optionalHeaders);
      }
      else{
        for(let key of opHeaderKeys){
          headers.append(key,optionalHeaders[key]);
        }
      }

    }

    // let objToSearchParams = (obj) => {
    //     let params: URLSearchParams = new URLSearchParams();
    //     for (var key in obj) {
    //         if (obj.hasOwnProperty(key))
    //             params.set(key, obj[key]);
    //     }
    //     return params;
    // }

    let httpEvent, serializedquery = '';
    if(type === 'get'){
      //TBD construct query params
      if(Object.keys(body).length){
        serializedquery =  `?${$.param(body)}`;
        url = url + serializedquery;
        // let params: URLSearchParams = objToSearchParams(body);

        // console.log("url search params =>", params)
        // httpEvent = this.http.get(url,{headers: headers, search: params})
      }
      httpEvent = this.http.get(url,{headers: headers})
    }
    else if(type === 'post'){
      httpEvent = this.http.post(url,body,{headers: headers})
    }

    setTimeout(() => {
      this.updateQueryParams(serializedquery,locationpath,disableurlupdate);
    },250);

    if(returntype === 'promise'){
      return httpEvent
        .toPromise()
        .then((response) => {
          // this.updateQueryParams(serializedquery,locationpath, disableurlupdate);
          return response.json()
        })
        .catch(this.handleError);
    }
    else{
      return httpEvent
        .map((response) => {
          // this.updateQueryParams(serializedquery,locationpath, disableurlupdate);
          return response.json()
        })
        .catch(this.handleError);
    }


  }

  private updateQueryParams(query,locationpath, disableupdate){
    // if(locationpath !== this.location.path(true)) return;
    if(disableupdate) return;

    let serializedquery = typeof query === 'string' ? query : typeof query === 'object' ? $.param(query) : '';

    if(serializedquery){
      this.events.publish('app:updatehistory',{page: serializedquery, state: {query: serializedquery}, replace: true});
    }
  }

  public parseRejectedError(error: any): any{
      try{
        return JSON.parse(error._body);
      }
      catch(e){
        return error;
      }
  }

  public setBadgeColor(status: string): string{
    if(status.match(/processed/i)){
      return 'green'
    }
    else if(status.match(/crawling/i) || status.match(/importing/i)){
      return 'orange'
    }
    else{
      return 'danger'
    }
  }

  public downloadFile(file: string, name: string, extension: string = "xlsx"): void{
    let dlink = $("<a>");
    dlink.attr("href",file);
    dlink.attr("download",`${name}.${extension}`);
    $("body").append(dlink);
    // dlink.trigger("click");
    dlink[0].click();
    dlink.remove();
  }

  public orderBy(items: Array<any>, sortkey: any, direction: String = 'dsc') : Array<any>{
    let ascsort = (prev: any, curr: any) => {
      return  prev[sortkey] - curr[sortkey];
    }

    let dscsort = (prev: any, curr: any) => {
      return curr[sortkey] - prev[sortkey];
    }

    if(items && items.length){
      let sorteditems;
      if(direction === 'dsc'){
        sorteditems = Array.prototype.sort.call(items,dscsort);
      }
      else{
        sorteditems = Array.prototype.sort.call(items,ascsort);
      }

      return sorteditems;
    }
    else{
      return items;
    }
  }

  public getTruncateMethod(): any{
    return Math.trunc
  }

  public updateOnlineStatus(showtoast: boolean = false, updateui: boolean = true): boolean {
        if(!this.appFocused) return;

        if(updateui){
          showtoast = this.isOnline == navigator.onLine ? false : true;
          this.isOnline = navigator.onLine;

          let content = document.getElementsByTagName('ion-content')[0];
          let container = content.querySelector('div.container');
          let filtercontainer, filterinputs, filterbuttons, tabularcontainer, tabinputs, tabbuttons, containerinputs, containerbuttons;

          try{
            filtercontainer = container.querySelector('div.filters.flex');
            filterinputs = filtercontainer.getElementsByTagName('INPUT');
            filterbuttons = filtercontainer.getElementsByTagName('BUTTON');

            tabularcontainer = container.querySelector('div.tabular');
            tabinputs = tabularcontainer.getElementsByTagName('INPUT');
            tabbuttons = tabularcontainer.getElementsByTagName('BUTTON');
          }
          catch(e){
            containerinputs = container.getElementsByTagName('INPUT');
            containerbuttons =  container.getElementsByTagName('BUTTON');
          }

          if (navigator.onLine) {
            // this.isOnline = true;
            if(showtoast){
              if(window.offlineToast != null){
                window.offlineToast.dismiss();
              }
              window.onlineToast = this.presentToast('You are online','success',5000);
            }

            if(filtercontainer && tabularcontainer){
              filtercontainer.classList.remove("app-is-offline");
              tabularcontainer.classList.remove("app-is-offline");

              Array.prototype.map.call(filterinputs,(val) => {val['disabled'] = false;});
              Array.prototype.map.call(filterbuttons,(val) => {val['disabled'] = false;});

              Array.prototype.map.call(tabinputs,(val) => {val['disabled'] = false;});
              Array.prototype.map.call(tabbuttons,(val) => {val['disabled'] = false;});
            }
            else{
              container.classList.remove('app-is-offline');

              Array.prototype.map.call(containerinputs,(val) => {val['disabled'] = false;});
              Array.prototype.map.call(containerbuttons,(val) => {val['disabled'] = false;});
            }

          } else {
            // this.isOnline = false;
            if(showtoast){
              if(window.onlineToast != null){
                window.onlineToast.dismiss();
              }
              window.offlineToast = this.presentToast('Warning you are offline and may be viewing outdated info!','warn',0,true);
            }

            if(filtercontainer && tabularcontainer){
              filtercontainer.classList.add("app-is-offline");
              tabularcontainer.classList.add("app-is-offline");

              Array.prototype.map.call(filterinputs,(val) => {val['disabled'] = true;});
              Array.prototype.map.call(filterbuttons,(val) => {val['disabled'] = true;});

              Array.prototype.map.call(tabinputs,(val) => {val['disabled'] = true;});
              Array.prototype.map.call(tabbuttons,(val) => {val['disabled'] = true;});
            }
            else{
              container.classList.add('app-is-offline');

              Array.prototype.map.call(containerinputs,(val) => {val['disabled'] = true;});
              Array.prototype.map.call(containerbuttons,(val) => {val['disabled'] = true;});
            }
          }
        } //end if

        console.log("updating online status .......................................... ")
        this.events.publish('app:onlinestatus',navigator.onLine);
        return navigator.onLine;
  } //end updateOnlineStatus

  private searchSubscription: any = null;
  private searchTerms: Subject<string> = new Subject<string>();
  public searchDebounceInit(): Observable<any>{

    this.searchTerms = new Subject<string>();
    if(this.searchSubscription){
      this.searchSubscription.unsubscribe();
    }

    this.searchSubscription = this.searchTerms
                                  .debounceTime(500)
                                  .distinctUntilChanged()
                                  .switchMap((model) => {
                                    console.log('term: ',model)
                                    // this.updateFilter('search','forceupdate');
                                    this.events.publish('app:searchtermchanged');
                                    if(model){
                                      return model
                                    }
                                    else{
                                      return Observable.of<any>([])
                                    }
                                  })
                                  .catch((err) => {
                                    console.warn('search error: ',err)
                                    return Observable.of<any>([]);
                                  })

    this.searchSubscription
        .subscribe((e) => {
          // console.log('search debounce subscription',e)
        },(e) => {
          console.warn(e)
        });

    return this.searchSubscription;
  } //end searchDebounceInit

  public triggerSearchChange(value: string): void{
    value = value.trim();
    this.searchTerms.next(value)
  }

  // public getisNaNMethod(): any{
  //   return window.isNaN
  // }

  public hideAllDrops(event, filteroptions: any): Promise<any>{
    return new Promise((resolve,reject) => {
      try{
        console.log("hideAllDrops",event.target.className);
        if(event.target.className === 'button-inner' || this.jQuery(event.target).parents('.bt-dropdown__dd').length) return;

        for(let filter in filteroptions){
          filteroptions[filter].open = false;
        }
        resolve(true);
      }
      catch(e){
        reject(e)
      }

    });
  } //end hideAllDrops

  public getURLfromOmnibox(page): any{
    let urlconstr = {}; 
    // ?range=02%2F08%2F2017%20-%2009%2F08%2F2017
    // urlconstr['url'] = new URL('https://repricer2.ajency.in/prices/all?limit=20&page=1&includesellers=no&sort=created_at&direction=desc&show_failed=yes');
    // urlconstr['url'] = new URL('https://repricer2.ajency.in/dashboard?range=24h');
    urlconstr['url'] = new URL(window.location.href);

    if(urlconstr['url'].search){
      urlconstr['jsonfilter'] = this.jQuery.deparam(urlconstr['url'].search.split('?')[1]);
    }

    if(urlconstr['url'].pathname.split('/')[1].indexOf(page) === 0){
      urlconstr['currentpage'] = true;
    }

    return urlconstr;
  }

  public decimateDatatable(datatable): Array<any>{
    let threshold = this.appglobals.getMiniChartThreshold();
    if(datatable.length > threshold){
      let decfactor = Math.floor(datatable.length / threshold);

      let decarray = [];
      decarray.push(datatable[0]);

      let lastvalidindex = 1;
      for(let index = 1; index < datatable.length; index += decfactor){
        let entry;
        if(datatable[index][1]){
          entry = datatable[index]; 
          lastvalidindex = index;
        }
        else{
          entry = datatable[lastvalidindex];
        }

        decarray.push(entry);
      }

      return decarray;
    }
    else{
      return datatable;
    }
  }

}
