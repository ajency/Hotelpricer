import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { IonicPage, NavController, NavParams, ViewController, App, Events, ModalController, Content } from 'ionic-angular';
import { RepricerApi } from '../../providers/repricer-api';
import { AppService } from '../../providers/app-service';
import { AppGlobals } from '../../providers/app-globals';

import * as moment from 'moment';
import * as _ from 'underscore';

@IonicPage({
  name: 'product_info',
  segment: 'product_xxxx'
})
@Component({
  selector: 'page-prices-product-tabs',
  templateUrl: 'prices-product-tabs.html',
})

export class PricesProductTabsPage {
  @ViewChild(Content) content: Content;
  private item: any;
  private dummySellers = [];
  private $: any;
  private naText = "--";
  private nativeElement: any;
  private titleNaText: string;
  private productModal: any = null;
  private editProductInfo: boolean = false;
  private disableActFilter: boolean = true;
  private loadingProduct: boolean = true;

  private chartData =  {
    chartType: 'AreaChart',
    dataTable: [
      ['Price', 'Price'],
      ['', 15000],
      ['', 12000],
      ['', 35000],
      ['', 19000],
      ['', 25000],
      ['', 22000],
      ['', 21000],
      ['', 20000],
      ['', 19000],
      ['', 18000],
      ['', 18590],
      ['', 18456],
      ['', 18459],
      ['', 14756],
      ['', 25461],
      ['', 23561],
      ['', 17561],
      ['', 14785],
      ['', 13485],
      ['', 17486]
    ],
    options: { pointShape: 'circle', title: 'Price variation', width: 160, height: 50, chartArea: {width: '90%', height: '90%' } , legend: {position: 'none'}, vAxis: { textPosition: 'none', gridlines: { color: 'none' } }, hAxis: { textPosition: 'none' } }
  };

  private actFilterOptions: any = {
    activity_actions: {
      selected: 'all',
      open: false,
      filtered: true,
      options: []
    }
  }

  private sellerFilterOptions: any = {
    status: {
      selected: 'all',
      open: false,
      filtered: true,
      options: [{slug: 'all', label: 'All'},{slug: 'active', label: 'Active'},{slug: 'stocked_out', label: 'Stocked Out'}]
    },
    bb_ownership: {
      open: false,
      filtered: false,
      min: null,
      max: null
      // options: []
    }
  }

  private defActFilter = {
    page: 1,
    limit: 20,
    sort: "created",
    direction: "desc"
  };

  private actFilter = {
    page: 1,
    limit: 20,
    sort: "created",
    direction: "desc"
  };

  private sellersFilter = {
    // limit: 20,
    page: 1,
    // sort: 'buy_box',
    // direction: 'desc'
    sort: 'price',
    direction: 'asc'
  }

  private isMobile: boolean = false;
  private truncate: any;
  private isOnline: boolean;
  private refererPath: string = '';
  private hideFilter: boolean = true;
  constructor(
    public appglobals: AppGlobals,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public repricerapi: RepricerApi,
    public zone: NgZone, // monkey patching
    public app: App,
    public viewctrl: ViewController,
    public appservice: AppService,
    public modalctrl: ModalController,
    public events: Events,
    private element: ElementRef,
    public platformlocation: PlatformLocation) {
    
    this.isMobile = this.appglobals.isMobile();
    this.item = this.navParams.get('item');

    // item dictionary structure
    // {
    //         "tracking_group_id": 22145,
    //         "channel_details": {
    //             "channel_id": 1,
    //             "channel_name": "Amazon",
    //             "listing_id": "B01KXGJI2G"
    //         },
    //         "product_details": {
    //             "id": 22145,
    //             "created_on": "Jul 28, 2017, 8:17 PM",
    //             "product_name": "RG Designers Men\u0027s Full Sleeve Short kurta ChineseCollarLightDenimKurta",
    //             "product_image_url": "https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/71M8CJbgg8L._UX342_.jpg",
    //             "product_url": "http:\/\/www.amazon.in\/dp\/B01KXGJI2G",
    //             "sku_code": null,
    //             "sales_rank": null,
    //             "mop": null,
    //             "mrp": 3289,
    //             "cp": null,
    //             "shipping": null,
    //             "in_stock": true,
    //             "sold_by_me": false
    //         },
    //         "repricing": {
    //             "rule_id": 1,
    //             "rule_name": "Amazon Default with Free Shipping",
    //             "my_min": null,
    //             "my_max": null,
    //             "my_price": "N\/A",
    //             "market_min": 1149,
    //             "market_max": 1149,
    //             "buy_box_price": 1149,
    //             "is_min": "no",
    //             "is_buy_box": "no",
    //             "last_tracked_on": "Aug 1, 2017, 8:19 PM",
    //             "tracked_listings": "",
    //             "tracked_sellers_count": 1,
    //             "tracked_products_count": 1,
    //             "violated": false
    //         }
    //     }

    this.isOnline = this.navParams.get('isOnline');
    this.titleNaText = this.navParams.get('titleNaText');
    this.editProductInfo = this.navParams.get('editproduct');
    let market = this.navParams.get("market");
    this.refererPath = `/prices/${market}`;

    this.item.product_details_from_api = this.item.product_details_from_api ? this.item.product_details_from_api : {};
    // this.refererPath = this.navParams.get('path');

    console.log("editproductinfo ", this.editProductInfo);
    console.log('referer path -> ',this.refererPath);
    // this.app.setScrollDisabled(true);
    this.$ = this.appservice.jQuery;
    this.truncate = this.appservice.getTruncateMethod();

    this.nativeElement = element.nativeElement;


  }

  private scrollContainer: any;
  ngOnInit(){
    this.$(this.nativeElement).parent().addClass("product-info");

    this.scrollContainer = this.$(this.nativeElement).find('.scroll-content')[0];
    this.scrollContainer.onscroll = (event) => {
      // console.log("scrollposition => " + (event.target.scrollTop + event.target.clientHeight) + " scrollheight => " + event.target.scrollHeight);
      if( (event.target.scrollTop + event.target.clientHeight) >= event.target.scrollHeight ){
        console.log('load more');
          if(this.item.selectedDetail === 'seller'){
            // this.logger.log('load more sellers');
            // this.item.sellerPage = this.item.sellerPage + 1;
            // this.item.sellersfilter['page'] = this.item.sellerPage;
            // this.getSellersCall(this.item, true);
          }
          else if(this.item.selectedDetail === 'activity'){
            if(this.item.fetchingActivity || this.item.allactfetched) return;
            // {
              if(this.item.actfilter && this.item.actfilter.page){
                this.item.actfilter['page'] = this.item.actfilter.page + 1; 
                console.log('load more activity', this.item.actfilter);
                this.loadActivity(this.item,{}, true);
              }
            // }
          }
      }
    };

    // for(let x = 0; x < this.sellersFilter.limit; x++){
    //   this.dummySellers.push('');
    // }
    
    // push placeholder url for the modal
    this.events.publish('app:updatehistory',{page: "/" + this.item.selectedDetail + "/" + this.item.product_details.id, state: {id: this.item.product_details.id.toString()},  frompath: this.refererPath });
  
  
    if(this.editProductInfo){ // if view is entered with product edit mode flag set
      this.getProductInfo();
    }
    else{ // else load the sellers data from api
      // this.initSellerRequest();
      this.segmentClick(this.item,{});
    }

  }

  private emptySellers: boolean = false;
  private filteredArray: Array<any> = [];
  private onPopStateHandler: any;
  private sllrFltrHandler: any;
  ionViewDidEnter() {
    console.log('ionViewDidEnter SellersInfoPage');
    this.isOnline = this.appservice.updateOnlineStatus(false, false);

    this.sllrFltrHandler = (array) => { 
      console.log('app filtered array', array);
      this.filteredArray = array;
      array.length ? this.emptySellers = false : this.emptySellers = true;
    };

    this.events.subscribe('app:sellerFilter', this.sllrFltrHandler);
  }

  ionViewWillUnload(){

    this.events.unsubscribe('app:sellerFilter',this.sllrFltrHandler);
    // perform api response clean up
    if(this.item.sellerSubscription){
      this.item.sellerSubscription.unsubscribe();
      this.item.sellerSubscription = null;
    }

    if(this.item.fetchingActivity){
      this.item.fetchingActivity = false;
    }
  }

  private initSellerRequest(): void{
    this.item.asyncSellers = [];
    this.item.sortDirection = 'asc';
    this.item.error = undefined;
    this.item.sellersfilter = Object.assign({},this.sellersFilter);
    this.resetSellerFilter();
    this.getSellersCall(this.item);
  }

  private getProductInfo(): void{
    if(this.loadingProduct === false) return;

    this.events.publish('app:updatehistory',{page: "/" + this.item.selectedDetail + "/" + this.item.product_details.id, state: {id: this.item.product_details.id.toString()}, replace: true, frompath: this.refererPath });
    
    this.repricerapi.getProductInfo(this.item.product_details.id)
    .then((res) => {
      if(res.success){
        this.item.product_details_from_api = res.data;
      }
      this.loadingProduct = false;
    })
    .catch(() => {
      this.loadingProduct = false;
    });

  }
  
  private segmentClick(item, event: any = null): void{
    console.log('segmentclick => ',item.selectedDetail);
    switch(item.selectedDetail){
      case 'seller':{
              item.productTabOpen = item.activityTabOpen = false;
              item.sellersTabOpen = true;
              this.initSellerRequest();
        };break;
      case 'info':{
              item.sellersTabOpen = item.activityTabOpen = false;
              item.productTabOpen = true;
              this.loadingProduct = true;
              this.editProductInfo = false;
              this.getProductInfo();
        };break;
      case 'activity':{
              item.sellersTabOpen = item.productTabOpen = false;
              item.activityTabOpen = true;
              this.resetActFilter(item,event);
        };break;
    }

    this.zone.run(() => {});
  }// end segmentClick

  private resetActFilter(item, event): void{

      this.disableActFilter = true;

      // reset all activity filter UI references 
      this.actFilterOptions.activity_actions.filtered = true;
      this.actFilterOptions.activity_actions.open = false;
      this.actFilterOptions.activity_actions.selected = 'all';
      this.actFilterOptions.activity_actions.options = [];

      item.sortedActivity = [];
      item.actfilter = undefined;
      item.allactfetched = undefined;
      item.acterror = undefined;

      this.actFilter = Object.assign({},this.defActFilter);
      this.loadActivity(item, event && event.target ? event.target : {});
  }

  private editProduct(currentitem: any): void{
    this.editProductInfo = true;
  }

  private hideProductEdit(): void{
    this.editProductInfo = false;
  }

  private toggleActivityDrop(childacticity: any): void{
    if(childacticity.opened){
      childacticity.opened = false;
    }
    else{
      childacticity.opened = true;
    }
    this.zone.run(() => {});
  }

  private actScrollHandler: any;
  private loadActivity(item, target, append: boolean = false){
    if(item.fetchingActivity || item.allactfetched) return;
    item.actfilter = item.actfilter ? item.actfilter : Object.assign({},this.actFilter);

    item.acterror = false;
    item.fetchingActivity = true;

    let querystring = '?' + this.$.param(item.actfilter);
    this.events.publish('app:updatehistory',{page: "/" + item.selectedDetail + "/" + this.item.product_details.id + querystring, state: {id: querystring}, replace: true, frompath: this.refererPath });
    
    this.disableActFilter = true;
    this.repricerapi.getProductActivity(item.product_details.id, item.actfilter, 'nourlupdate')
                    .subscribe((res) => {
                      console.log('res',res)

                      if(this.actFilterOptions.activity_actions.options.length === 0 && res.activity_actions && Object.keys(res.activity_actions).length > 0){
                        // res.activity_actions['all'] = 'All';
                        
                        let options = [];
                        for(let acttype in res.activity_actions){
                          acttype === 'all' ? this.actFilterOptions.activity_actions.filtered = true : this.actFilterOptions.activity_actions.filtered = false;
                          let glob = {slug: acttype, label: res.activity_actions[acttype]};
                          options.push(glob);
                        }

                        this.actFilterOptions.activity_actions.options = options;
                        this.actFilterOptions.activity_actions.selected = 'all';
                      }

                      let activities = res.data;

                      activities.map((val) => {
                        val['createdate'] = moment(val.created,'MMM DD, YYYY, h:mm A').startOf('day').valueOf();
                        val['createdtime'] = moment(val.created,'MMM DD, YYYY, h:mm A').valueOf();
                      });

                      let dateGroupedLogs = _.groupBy(activities,'createdate');

                      let datekeys = Object.keys(dateGroupedLogs);
                      let sortedDateKeys = datekeys.sort((a:any,b:any) => { // sort in descending order
                        a = Number(a);
                        b = Number(b);
                        return b - a;
                      });

                      let sortedDates = [];
                      sortedDateKeys.map((val) => {
                        sortedDates.push(dateGroupedLogs[val]);
                      });

                      item.actFetched = true;

                      if(append){
                        item.sortedActivity = item.sortedActivity.concat(sortedDates);
                      }
                      else{
                        item.sortedActivity = sortedDates;
                        console.log('sortedActivity',sortedDates);
                      }
                      item.fetchingActivity = false;

                      this.disableActFilter = false;
                      this.zone.run(() => {});
                    },
                    (err) => {
                      console.warn('err',err)

                      if(err.message === 'Not Found'){
                        if(item.allactfetched === undefined){
                          // item.actscrollcontainer.onscroll = null;
                          // item.actscrollcontainer = null;
                          // item.allactfetched = true;
                          // this.content.ionScrollEnd.subscribe(this.actScrollHandler);
                          item.allactfetched = true;
                        }
                      }

                      item.acterror = true;
                      item.fetchingActivity = false;

                      this.disableActFilter = false;
                      this.zone.run(() => {});
                    });
  } //end loadActivity

  private loadingPriceTrend: boolean = false;
  private allSellersStockedOut: boolean = false;
  private getSellersCall(item: any, append: boolean = false): void{
    if(item.sellerSubscription || item.allsellersfetched) return;

    item.sellersfilter = item.sellersfilter ? item.sellersfilter : Object.assign({},this.sellersFilter);
    // item.sellersPageConfig = item.sellersPageConfig ? item.sellersPageConfig : { id: item.product_details.id, itemsPerPage: item.sellersfilter["limit"], currentPage: 1, totalItems: 0 }
    
    item.sellerPage = item.sellerPage ? item.sellerPage : 1;
    item.sellersfilter['page'] = item.sellerPage;
    // item.sellersPageConfig["currentPage"] = item.sellerPage;
    // item.sellersPageConfig["itemsPerPage"] = item.sellersfilter["limit"];

    // item.asyncSellers = [];
    item.error = false;

    let querystring = '?' + this.$.param(item.sellersfilter);
    this.events.publish('app:updatehistory',{page: "/" + item.selectedDetail + "/" + this.item.product_details.id + querystring, state: {id: querystring}, replace: true, frompath: this.refererPath });

    item.sellerSubscription = this.repricerapi.getSellers(item.product_details.id, item.sellersfilter, 'nourlupdate')
                                              .subscribe((res) => {
                                                if(append){
                                                  item.asyncSellers = item.asyncSellers.concat(res.data);
                                                }
                                                else{
                                                  item.asyncSellers = res.data;

                                                let sellerids = [];
                                                let stocked_out_count = 0;
                                                item.asyncSellers.map((val) => {
                                                  if(val.is_stocked_out && !val.is_current_seller){
                                                    stocked_out_count++
                                                  }
                                                  sellerids.push(val.seller_id);
                                                });

                                                if( stocked_out_count === (item.asyncSellers.length - 1) ){
                                                  this.allSellersStockedOut = true;
                                                }
                                                else{
                                                  this.allSellersStockedOut = false;
                                                }

                                                console.log(sellerids)

                                                  this.loadingPriceTrend = true;
                                                  this.repricerapi.getSellerPriceTrend(item.product_details.id,{sids: sellerids},'nourlupdate')
                                                                  .subscribe(
                                                                    (res) => {
                                                                      console.log("price trend => ",res)
                                                                      item.asyncSellers.map((seller) => {
                                                                        let sellermatch = _.find(res.data,(value) => {return value['seller_id'] == seller['seller_id']})
                                                                        // console.log('sellermatch =>', sellermatch);

                                                                        if(sellermatch){
                                                                          let chartjson = {}
                                                                          chartjson['chartType'] = this.chartData.chartType;
                                                                          chartjson['options'] = this.chartData.options;
                                                                          chartjson['dataTable'] = this.appservice.decimateDatatable(sellermatch['price_trend'] || []);
                                                                          seller.price_variation = chartjson;

                                                                          if(seller.is_current_seller){
                                                                            this.item.chartData = Object.assign({},chartjson);
                                                                            // this.item.chartData = this.chartData;
                                                                            this.zone.run(() => {});
                                                                          }
                                                                        }

                                                                        // console.log('seller.price_variation', seller.price_variation);
                                                                        // seller['buy_box_ownership'] = Math.round(Math.random() * 10); //debug
                                                                      });
                                                                      this.loadingPriceTrend = false;
                                                                  },
                                                                  (err) => {console.warn(err);  this.loadingPriceTrend = false;});
                                                  // this.content.ionScrollEnd.subscribe(this.sellerScrollHandler);
                                                  // console.log(this.scrollContainer);
                                                }
                                                item.totalSellers = res.result_count;
                                                // item.sellersPageConfig.totalItems = res.result_count;
                                              },(err) => {
                                                console.warn(err);
                                                item.sellerSubscription.unsubscribe();
                                                item.sellerSubscription = null;
                                                item.error = true;

                                                if(err.message === 'Not Found'){
                                                  // this.content.ionScrollEnd.unsubscribe();
                                                  if(item.allsellersfetched === undefined){
                                                    // item.scrollContainer.onscroll = null;
                                                    item.allsellersfetched = true;
                                                  }
                                                }

                                                console.warn('seller subscription unsubscribed on error.....')
                                                this.zone.run(() => {});
                                              }, () => {
                                                item.sellerSubscription.unsubscribe();
                                                item.sellerSubscription = null;
                                                console.log('seller subscription unsubscribed.....')
                                                this.zone.run(() => {});
                                              });
  } // end getSellersCall

  private orderSellersByPrice(item: any): void{
    item.sortDirection === 'dsc' ?  item.sortDirection = 'asc' : item.sortDirection = 'dsc';
    console.log(item.sortDirection)
    item.asyncSellers = this.appservice.orderBy(item.asyncSellers, 'price', item.sortDirection);
    console.log(item.sellers)

    // item.sellersfilter = item.sellersfilter ? item.sellersfilter : Object.assign({},this.sellersFilter);
    // item.sellersfilter['sort'] = 'price';
    // item.sellersfilter['direction'] = item.sortDirection === 'dsc' ? 'desc' : 'asc';
    // item.sellerPage = 1;
    
    // item.asyncSellers = [];
    // item.allsellersfetched = undefined;
    // this.getSellersCall(item);
    // this.zone.run(() => {});
  }

  private selerPageChange(event,item): void{
    item.sellerPage = event;
    let offsetelement: any = document.querySelector("[offsetid='" + item.product_details.id + "']");
    // console.log('Current seller page..=> ',offsetelement.scrollTop);

    offsetelement.scrollTop = 0;
    // let vpreltop = offsetelement.getBoundingClientRect().top;
    
    // if(this.appglobals.isMobile()){
    //     this.content.scrollToTop();
    // }
    this.getSellersCall(item);
    // this.zone.run(() => {})
  }

  private dismiss(productinfo: any){
    if(productinfo){
      this.viewctrl.dismiss(productinfo);
    }
    else{
      this.viewctrl.dismiss({gracefulClose:true});
    }
  }

  private updateActFilter(): void{
    if(this.disableActFilter) return;

    this.actFilterOptions.activity_actions.open = false;

    this.item.sortedActivity = [];
    this.item.actfilter = undefined;
    this.item.allactfetched = undefined;
    this.item.acterror = undefined;

    this.actFilterOptions.activity_actions.selected ? this.actFilter['activity_action'] = this.actFilterOptions.activity_actions.selected : delete this.actFilter['activity_action'];
    this.actFilterOptions.activity_actions.filtered = this.actFilter['activity_action'] ? true : false;
    
    this.loadActivity(this.item,{});
  }


  private updateSellerFilter(type): void{
    this.sellerFilterOptions[type].open = false;
    this.sellerFilterOptions[type].filtered = this.sellerFilterOptions[type].selected || (this.sellerFilterOptions[type].min && this.sellerFilterOptions[type].max) ? true : false;
  
    if(type ==='bb_ownership'){
      this.sellerFilterOptions[type] = Object.assign({},this.sellerFilterOptions[type]);
    }

    // setTimeout(() => {console.log("detect change"); this.zone.run(() => {})}, 500)
  }

  toggleFilterDrop(type, filtertype): void{
    if(type === 'activity'){
      this.actFilterOptions.activity_actions.open = !this.actFilterOptions.activity_actions.open;
    }
    else if(type === 'seller'){
      if(filtertype){
        // switch(filtertype){
        //   case 'status': this.sellerFilterOptions.status.open = !this.sellerFilterOptions.status.open;break;
        // }
        for(let filter in this.sellerFilterOptions){
          if(filtertype !== filter){
            this.sellerFilterOptions[filter].open = false;
          }
        }

        this.sellerFilterOptions[filtertype].open = !this.sellerFilterOptions[filtertype].open;
      }
    }
  }

  private resetSellerFilter(): void{ // ui filter reset
      for(let option in this.sellerFilterOptions){
        this.sellerFilterOptions[option].open = false;
        this.sellerFilterOptions[option].filtered = false;
        
        if(option === 'status'){
          this.sellerFilterOptions[option].open = false;
          this.sellerFilterOptions[option].filtered = true;
          this.sellerFilterOptions[option].selected = 'all';
        }
        else if(this.sellerFilterOptions[option].min || this.sellerFilterOptions[option].max){
          this.sellerFilterOptions[option].min = null;
          this.sellerFilterOptions[option].max = null;
          this.sellerFilterOptions[option] = Object.assign({},this.sellerFilterOptions[option]);
        }
        else{
          if(this.sellerFilterOptions[option].selected){
            this.sellerFilterOptions[option].selected = '';
          }
        }
      }

      console.log(this.sellerFilterOptions)

      this.zone.run(() => {})
  } //end resetSellerFilter

  zonRun(){
    console.log("zone run")
    this.zone.run(() => {})
  }

  private bbBannerHidden: boolean = true;
  applyBboFilter(){
    let min = this.sellerFilterOptions.bb_ownership.min === null ? undefined : Number(this.sellerFilterOptions.bb_ownership.min);
    let max = this.sellerFilterOptions.bb_ownership.max === null ? undefined : Number(this.sellerFilterOptions.bb_ownership.max);

    console.log('min ' + min + ' max ' + max);

    if( ( ( min >= 0 || max >= 0 ) && !( min >= 0 && max >= 0 ) ) || min <= max ) { // hide error banner if only 1 input is entered or both inputs are equal
      this.bbBannerHidden = true;
    }
    else{
      this.bbBannerHidden = false;
    }

    if(min >= 0 && max >= 0 && min <= max){
      this.updateSellerFilter('bb_ownership');
    }
    
    console.log(this.bbBannerHidden);

    this.zone.run(() => {});
  }
  
  private hideAllFilters(event){
    // console.log("hide filter => ",this.$(event.target).parents('.bt-dropdown').length)
    console.log('selected detail =>', this.item.selectedDetail);

    let filter_ref;
    if(this.item.selectedDetail === 'seller'){
      filter_ref = this.sellerFilterOptions;
    }
    else if(this.item.selectedDetail === 'activity'){
      filter_ref = this.actFilterOptions;
    }
    this.appservice.hideAllDrops(event, filter_ref)
                  .then((res) => {
                    this.zone.run(() => {})
                  })
                  .catch((err) => {
                    console.warn(err)
                  });
  }

}