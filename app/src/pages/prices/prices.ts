import { Component, NgZone, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, Events, Content, App, ViewController } from 'ionic-angular';

import { Location } from '@angular/common';
import { RepricerApi } from '../../providers/repricer-api';
import { AuthGuard } from '../../providers/auth-guard';
import { AppService } from '../../providers/app-service';
import { AppGlobals } from '../../providers/app-globals';
import { BattlefieldHelpPage } from '../../popovers/battlefield-help/battlefield-help';
import { PricesProductTabsPage } from '../../modals/prices-product-tabs/prices-product-tabs';
// import { Subject } from 'rxjs/Subject';
import { FilterHistory } from './filter-history-service';

import * as _ from 'underscore';
// import * as moment from 'moment';
// import * as deparam from 'jquery-deparam';

@IonicPage({
  name: 'prices',
  segment: 'prices/:marketplace',
  defaultHistory: ['dashboard'],
  priority: 'off'
})
@Component({
  selector: 'page-prices',
  templateUrl: 'prices.html'
})
export class PricesPage {

  @ViewChild(Content) content: Content;
  private hideFilter: boolean = true;
  private priceListLoading: boolean = false;
  private currentPage = '';
  // private naText = "--";
  private naText = "";
  private titleNaText = "Not found on the market place";
  private productList: any = [];
  private pendingCrawls: number = 0;
  private firstCrawlFailed: number = 0;
  private listingSubscription: any = null;
  private disableFilter: boolean = true;
  private truncate: Function;
  private topMetrics: any = {};

  private showFailed: boolean = false;
  private showInactive: boolean = false;

  private demochartData =  {
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
    options: { pointShape: 'circle', title: 'Price variation', width: 200, height: 50, chartArea: {width: '90%', height: '90%' } , legend: {position: 'none'}, vAxis: { textPosition: 'none', gridlines: { color: 'none' } }, hAxis: { textPosition: 'none' } }
  };

  private defaultFilters = {
    limit: 20,
    page: 1,
    includesellers: 'no',
    sort: 'created_at',
    direction: 'desc'
  }
  private filters: any;

  private paginationConfig: any = {
    id: 'productpaging',
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 0
  };

  // private sellerPageConfig: any = {
  //   itemsPerPage: 5,
  //   currentPage: 1,
  // }

  private sellerPage: any = 1;

  private statuses: any;

  private dummyProducts = [];
  // private dummySellers = [];

  private marketOptions: any = {
    all: {id: 0, active: true},
    amazon: {id: 1, active: false},
    flipkart: {id: 2, active: false},
    snapdeal: {id: 3, active: false},
    paytm: {id: 4, active: false}
  };

  private filterOptions: any = {
    // market: null,
    search: {
      open: false,
      filtered: false,
      selected: 'product_title',
      selectedname: 'Product Title',
      value: '',
      options: [
        // {slug: 'seller_id', name: 'Seller ID'},
        {slug: 'listing_id', name: 'Listing ID'},
        // {slug: 'sku_code', name: 'SKU Code'},
        {slug: 'product_title', name: 'Product Title'}
      ]
    },
    price_status: {
      open: false,
      filtered: false,
      selected: '',
      options: [{slug: 'at_my_min', name: "At my min"},{slug: 'at_my_max', name: 'At my max'},{slug: 'only_seller', name: "I\'m only seller"}]
    },
    pricing_outcome: {
      open: false,
      filtered: false,
      selected: '',
      options: [{slug: 'im_cheapest', name: "You're lowest"},{slug: 'i_have_buy_box', name: 'You have BuyBox'},{slug: 'seller_is_cheapest', name: "You aren't lowest"},{slug: 'i_am_only_seller', name: "You're the only seller"},{slug: 'is_violation', name: 'Violations'}]
    },
    sellers: {
      open: false,
      filtered: false,
      min: '',
      max: ''
    },
    price: {
      open: false,
      filtered: false,
      min: '',
      max: ''
    },
    direction: {
      open: false,
      filtered: false,
      selected: 'desc',
      options: [{slug: 'asc', name: 'Asc'},{slug: 'desc', name: 'Desc'}]
    },
    sort: {
      open: false,
      filtered: false,
      selected: 'created_at',
      options: [
          // { slug: 'id', name: 'ID'},
          // {slug: 'seller_id', name: 'Seller ID'},
          {slug: 'listing_id', name: 'Listing ID'},
          {slug: 'product_title', name: 'Product Title'},
          // {slug: 'min', name: 'Min Price'},
          // {slug: 'max', name: 'Max Price'},
          // {slug: 'mop', name: 'MOP'},
          {slug: 'mrp', name: 'MRP'},
          {slug: 'created_at', name: 'Created At'},
          {slug: 'last_updated', name: 'Last Crawled'}
        ]
    }
  };
  private $: any;
  private nativeElement: ElementRef;

  private onlineStatusSubscription: any;
  private onPopStateHandler: any;
  private appMetadata: any;

  constructor(
    private filterhistory: FilterHistory,
    private viewctrl: ViewController,
    private app: App,
    private location: Location,
    private repricerapi: RepricerApi,
    private navCtrl: NavController,
    private authguard: AuthGuard,
    private appservice: AppService,
    private navparams: NavParams,
    private appglobals: AppGlobals,
    private zone: NgZone,
    private popoverctrl: PopoverController,
    private modalctrl: ModalController,
    private events: Events,
    private renderer: Renderer2,
    private element: ElementRef
    ) {

    for(let x = 0; x < this.defaultFilters.limit; x++){
      this.dummyProducts.push('');
    }
    // for(let x = 0; x < this.sellersFilter.limit; x++){
    //   this.dummySellers.push('');
    // }

    this.statuses = this.repricerapi.getStatus();

    this.paginationConfig.itemsPerPage = this.defaultFilters.limit;
    this.paginationConfig.currentPage = this.defaultFilters.page;
    this.$ = this.appservice.jQuery;

    // this.hideFilter = this.appglobals.isMobile() ? true : false;

    this.truncate = this.appservice.getTruncateMethod();

    this.nativeElement = element.nativeElement;

    this.appMetadata = this.repricerapi.getAppMeta();
    // console.log(this.nativeElement);
    // console.log("truncate",this.truncate(4.5))
    // this.events.publish('app:onlinestatus',navigator.onLine);
  }

  private updateOnline(data): void{
    this.isOnline = data
  }

  ionViewCanEnter(): Promise<boolean>{
    console.log('ionviewcanenter PricesPage')
    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('prices')
      .then(() => {
        this.appglobals.setPageToNavigate({page: 'prices'});
        this.currentPage = 'prices';
        resolve(true)
      })
      .catch(() => {
        reject(true)
      })
    })

  }

  private isOnline = false;
  private marketName: string = '';
  private currentURL: any;

  private viewInitialized: boolean = false;
  ionViewDidEnter(){
    console.log('ionViewDidEnter PricesPage ');
    this.viewInitialized = true;
    // console.log( this.viewctrl.getContent());
    // console.log(this.viewctrl.contentRef())
    // this.app.setTitle(`${this.appglobals.getAppName()} - Prices`);

    this.marketName = this.navparams.get('marketplace');
    if(this.marketName){
      this.setMarket(this.marketName);
    }

    this.buildFiltersFromURL();

    this.updateFilterData('pageload');

    this.onPopStateHandler = (state) => {
      console.log('pressed onpop state => ', state);

      if(state && state.filters && state.filteroptions){
        this.filterhistory.filters = state.filters;
        this.filterhistory.filterOptions = state.filteroptions;
        this.filterhistory.productList = state.productlist;
        this.filterhistory.paginationConfig = state.paginationconfig;
        this.filterhistory.firstPageItem = state.firstpageitem;
        this.filterhistory.lastPageItem = state.lastpageitem;
        this.filterhistory.pendingCrawls = state.pendingcrawls;
        this.filterhistory.firstCrawlFailed = state.firstcrawlfailed;
        this.filterhistory.showFailed = state.showfailed;
        this.filterhistory.showInactive = state.showinactive;
        this.updateFilterData();
      }

      this.hideModal();
      this.zone.run(() => {});
      // this.navTo("prices","all");
    }
    this.events.subscribe('app:popstate',this.onPopStateHandler);

    this.onlineStatusSubscription = (data) => {
      this.isOnline = data;
      console.log('app:onlinestatus',data)
    }
    this.events.subscribe('app:onlinestatus',this.onlineStatusSubscription)

    setTimeout(() => {
      this.isOnline = this.appservice.updateOnlineStatus();
    },1000)

    this.events.publish('app:updatehistory','prices');
    // setTimeout(() => {
    //   this.events.publish('app:updatehistory',{page:`/${this.marketName}`, state: {id: 'prices'}, frompath: `/prices`, replace: true});
    // },500)

    // this.events.publish('app:updatehistory',{page: `/${this.marketName}`, state: {}, replace: true, frompath: `/prices`});

    this.appservice.searchDebounceInit();

    this.searchChangeCallback = () => {
      console.log('updating filter...')
      this.updateFilter('search','forceupdate');
    }
    this.events.subscribe('app:searchtermchanged',this.searchChangeCallback);
  }

  private filterTemplate: any = {
        "limit": "20",
        "page": "1",
        "includesellers": "no",
        "sort": "created_at",
        "direction": "desc",
        "filters": {
            "pricing_outcome": "seller_is_cheapest",
            "seller_count": {
                "min": "5",
                "max": "10"
            },
            "price": {
                "min": "45",
                "max": "120"
            }
        },
        "search": {
            "field": "product_title",
            "value": "test product"
        }
    };

  private singleProduct: any;
  private selectedTab: string;
  private sellerID: number;
  private buildFiltersFromURL(): void{
    // this.currentURL = new URL('https://repricer2.ajency.in/prices/all/seller/287?page=1&sort=price&direction=asc');
    // this.currentURL = new URL(window.location.href);
    this.currentURL = this.appservice.getURLfromOmnibox('prices');

    console.log("current url => ", this.currentURL);
    let currenturlparts = this.currentURL['url'].pathname.split('/');
    this.sellerID = currenturlparts.length > 3 && ( currenturlparts[3] === 'seller' || currenturlparts[3] === 'info' || currenturlparts[3] === 'activity' ) && currenturlparts[4] && !isNaN(currenturlparts[4]) ? Number(currenturlparts[4]) : 0;
    // console.log("seller id => ",this.sellerID);
    console.log("index of prices =>", this.currentURL['url'].pathname.split('/')[1].indexOf('prices'));

    if(this.sellerID){
      // this.setSellersModal(this.dummyProducRecord);
      this.selectedTab = currenturlparts[3];
    }
    else if(this.filterhistory.internalNavigation){
      this.filterhistory.internalNavigation = false;
    }
    else{
      this.filters = this.currentURL.jsonfilter && this.currentURL.currentpage ? this.currentURL.jsonfilter : null;
      console.log("constructed filters =>", this.filters);
    }
  }

  private updateFilterData(caller: string = ''): void{ // handle the errorneous ionic deeplink page reload on popstate from history entry

    if(this.filterhistory.filters && this.filterhistory.filterOptions){
      console.warn('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ updating filter data')
      this.filters = Object.assign({},this.filterhistory.filters);
      this.filterOptions = Object.assign({},this.filterhistory.filterOptions);
      this.productList = this.filterhistory.productList;
      this.paginationConfig = Object.assign({}, this.filterhistory.paginationConfig);
      this.disableFilter = true;

      this.firstPageItem = this.filterhistory.firstPageItem;
      this.lastPageItem = this.filterhistory.lastPageItem;
      this.pendingCrawls = this.filterhistory.pendingCrawls;
      this.firstCrawlFailed = this.filterhistory.firstCrawlFailed;
      this.showFailed = this.filterhistory.showFailed;
      this.showInactive = this.filterhistory.showInactive;

      // this.productList.map((val) => { // for transmitting hover events from parent html into price-battefield component
      //   val.parentsubject = new Subject<string>();
      //   val.parentsubjectstream = val.parentsubject.asObservable();
      // });

      // let prevView = this.navCtrl.getPrevious(this.viewctrl);
      // this.navCtrl.removeView(prevView);

      // if(caller === 'pageload'){
      //   // this.filterhistory.filters = null;
      //   // this.filterhistory.filterOptions = null;
      //   // this.filterhistory.productList = null;
      // }
      // else{
      //   this.viewctrl._destroy();
      // }
      setTimeout(() => {
        this.disableFilter = false;
        this.filterhistory.filters = null;
        this.filterhistory.filterOptions = null;
        this.filterhistory.productList = null;
        this.filterhistory.paginationConfig = null;
        this.filterhistory.firstPageItem = null;
        this.filterhistory.lastPageItem = null;
        this.filterhistory.pendingCrawls = null;
        this.filterhistory.firstCrawlFailed = null;
        this.filterhistory.showFailed = null;
        this.filterhistory.showInactive = null;
      },500);
    }
    else{
      if(this.sellerID){
        this.viewInitialized = false;
        // make api call for product before display in modal here
        this.repricerapi.getProduct(this.sellerID)
                .subscribe(
                  (res) => {
                    this.viewInitialized = true;
                    if(res.success && res.data){
                      this.singleProduct = res.data;
                      this.productList = [this.singleProduct];

                      // this.productList.map((val) => { // for transmitting hover events from parent html into price-battefield component
                      //   val.parentsubject = new Subject<string>();
                      //   val.parentsubjectstream = val.parentsubject.asObservable();
                      // });

                      this.addProperties(res.data, this.selectedTab);
                    }
                    else{
                      this.resetFilters('replaceurl');
                    }
                  },
                  (err) => {
                    this.viewInitialized = true;
                    this.resetFilters('replaceurl');
                  }
                );
      }
      else if(this.filters || this.repricerapi.priceFilter){ // if filters constructed from url present on page entry
        if(this.repricerapi.priceFilter){
          this.filters = this.repricerapi.priceFilter;
          this.repricerapi.priceFilter = null;
        }
        this.updateFilters();
      }
      else{
        this.resetFilters('replaceurl');
      }

    }
  } // end updateFilterData

  private updateFilters(): void{
    console.log("updateFilters filter =>", this.filters);
    this.filters['page'] = Number(this.filters['page']);
    //delete this.filters['show_failed'];

    this.showFailed = this.filters['show_failed'] === 'yes' ? true : false;
    this.showInactive = this.filters['show_inactive'] === 'yes' ? true : false;

    // this.pendingCrawls = this.filterhistory.pendingCrawls;
    // this.firstCrawlFailed = this.filterhistory.firstCrawlFailed;
    // this.showFailed = this.filters['show_failed'] === 'yes' ? true : false;;

    this.disableFilter = true;
    this.buildFilterOptions();
    this.getPriceList(this.filters['page'], false);
  }

  private buildFilterOptions(): void{
    for(let key in this.filters){
      if(key === 'filters'){
        let filters = this.filters[key];
        for(let filterskey in filters){
          switch(filterskey){
            case 'pricing_outcome':{this.filterOptions[filterskey].selected = filters[filterskey]; this.filterOptions[filterskey].filtered = true;};break;
            case 'price':{this.filterOptions[filterskey].min = filters[filterskey].min; this.filterOptions[filterskey].max = filters[filterskey].max; this.filterOptions[filterskey].filtered = true;};break;
            case 'seller_count':{this.filterOptions['sellers'].min = filters[filterskey].min; this.filterOptions['sellers'].max = filters[filterskey].max; this.filterOptions['sellers'].filtered = true;};break;
          }
        }
      }
      else if(key === 'search'){
        this.filterOptions[key].value = this.filters[key].value;

        this.filterOptions[key].options.map((val) => {
          if(this.filters[key].field === val.slug){
            this.filterOptions[key].selected = val.slug;
            this.filterOptions[key].selectedname = val.name;
          }
        });
      }
      else{
        if(this.filterOptions[key]){
          this.filterOptions[key].selected = this.filters[key];
          this.filterOptions[key].filtered = true;
        }
      }
    }
  }

  private searchChangeCallback: any
  private searchItem(event): void{
    this.appservice.triggerSearchChange(this.filterOptions.search.value);
  }

  ionViewWillUnload(){
    console.log("unloading page")

    this.clearFirstImportPoll();
    this.events.unsubscribe('app:searchtermchanged',this.searchChangeCallback);
    this.events.unsubscribe('app:popstate',this.onPopStateHandler);
    this.events.unsubscribe('app:onlinestatus',this.onlineStatusSubscription);
  }

  private resetFilterTemplate(): void{
    for(let filter in this.filterOptions){
      this.filterOptions[filter].open = false;
      if(filter === 'search'){
        this.filterOptions[filter].filtered = true;
        this.filterOptions[filter].value = '';
        this.filterOptions[filter].selectedname = 'Product Title';
        this.filterOptions[filter].selected = 'product_title';
      }
      else if(filter === 'direction'){
        this.filterOptions[filter].filtered = true;
        this.filterOptions[filter].selectedname = 'Desc';
        this.filterOptions[filter].selected = 'desc';
      }
      else if(filter === 'sort'){
        this.filterOptions[filter].filtered = true;
        this.filterOptions[filter].value = '';
        this.filterOptions[filter].selectedname = 'Created At';
        this.filterOptions[filter].selected = 'created_at';
      }
      else if(filter === 'price' || filter === 'sellers'){
        this.filterOptions[filter].filtered = false;
        this.filterOptions[filter].min = '';
        this.filterOptions[filter].max = '';
        this.filterOptions[filter].error = false;
      }
      else{
        this.filterOptions[filter].filtered = false;
        this.filterOptions[filter].selectedname = '';
        this.filterOptions[filter].selected = '';
      }
    }
  }

  private showPBHelper(event: any): void{
    let pricepopover = this.popoverctrl.create(BattlefieldHelpPage);

    pricepopover.present({
      ev: event
    })
  }

  private productModal: any = null;
  // private editProduct(currentitem: any): void{

  //   this.productModal = this.modalctrl.create(EditSinglePricesPage, currentitem);
  //   this.productModal.present({
  //       updateUrl: false
  //   });

  //   this.productModal.onDidDismiss((data) => {
  //     console.log('productModal data => ',data)
  //     this.productModal = null;

  //     // if(val.product_details || ){
  //     //   this.location.back();
  //     // }

  //     if(data === null) return;

  //     let item = this.productList.map((val,index) => {
  //       if(val.product_details.id === currentitem.product_details.id){
  //         console.log("data",data)
  //         data.selectedDetail = val.selectedDetail;
  //         data.isOpen = val.isOpen;
  //         data.open = val.open;
  //         this.productList[index] = data;
  //         this.zone.run(() => {});
  //       }
  //     });


  //   });

  // }

  private hideModal(): void{
    if(this.productModal){
      this.productModal.dismiss();
    }
    else if(this.productTabsModal){
      this.productTabsModal.dismiss();
    }
  }

  private hideProductDetails(item: any): void{
    // item.open = false;
    // item.isOpen = false;
    // item.selectedDetail = null;
    console.log("hideproductdetails doesnt do anything yet")
  }

  private setMarket(marketn): void{
    let market = this.marketOptions[marketn];
    if(!market){
      console.warn('invalid market' + marketn + ' !')
      return;
    }

    for(let mkt in this.marketOptions){
      this.marketOptions[mkt]['active'] = false;
    }

    market['active'] = true;

    if(market.id){
      this.defaultFilters['marketplace_id'] = market.id;
    }
    this.zone.run(() => {});
  }

  private filterMarket(market): void{
    // this.navTo('prices',{market: this.marketName});
    if(!market) return;

    for(let mkt in this.marketOptions){
      this.marketOptions[mkt]['active'] = false;
    }

    if(market.id){
      this.defaultFilters['marketplace_id'] = market.id;
      this.filters['marketplace_id'] = market.id;
    }
    else{
      delete this.defaultFilters['marketplace_id'];
      delete this.filters['marketplace_id'];
    }

    market['active'] = true;
    this.getPriceList(1);
    this.zone.run(() => {});
  }

  private goBack(): void{
    console.log('going back');
    // this.location.back();
    this.navTo('dashboard');
  }


  private pagChanged(page): void{
    this.content.scrollToTop();
    // this.paginationConfig.currentPage = page;
    this.getPriceList(page);
  }

  public toggleFilterDisplay(): void{
    this.hideFilter = !this.hideFilter;
    this.zone.run(() => {});
  }

  private firstPageItem = 0;
  private lastPageItem = 0;
  private priceListError: boolean = false;
  private firstImportPollCounter: any = null;
  private loadingPriceTrend: boolean = true;

  private getPriceList(page: number = 1, pushurl: boolean = true): void{
    this.priceListLoading = true;
    this.priceListError = false;
    this.paginationConfig.currentPage = page;
    this.filters["page"] = page;
    this.productList = [];
    this.pendingCrawls = 0;
    this.firstCrawlFailed = 0;

    if(this.listingSubscription){
      console.warn('unsubscribing to previous subscription')
      this.listingSubscription.unsubscribe();
    }

    let querystring = "?" + this.$.param(this.filters);

    this.listingSubscription = this.repricerapi.getProductList(this.filters,'observable','nourlupdate')
    .subscribe((res) => {
      console.log('prices', res);

      // this.paginationConfig.itemsPerPage = res.results_per_page
      this.firstPageItem = ( (res.page - 1) * res.results_per_page ) + 1;

      // if (res.results_per_page < res.result_count) {
      //     end = itemsPerPage * page
      //     if (end > totalItems) {
      //       end = totalItems;
      //     }
      //   }
      this.lastPageItem = ( res.results_per_page < res.result_count ) ? ( (res.results_per_page * res.page > res.result_count) ? res.result_count : res.results_per_page * res.page ) : res.result_count; //TBD refactor this
      this.paginationConfig.totalItems = res.result_count;
      this.productList = res.data;

      this.pendingCrawls = this.showInactive ? 0 : res.pending;
      this.firstCrawlFailed = this.showInactive ? 0 : res.first_crawled_not_succeeded;
      
      let marketplaceids = [], productids = [];
      this.productList.map((val) => { // for transmitting hover events from parent html into price-battefield component
        // val.parentsubject = new Subject<string>();
        // val.parentsubjectstream = val.parentsubject.asObservable();
        marketplaceids.push(val.marketplace_seller_id);
        productids.push(val.tracking_group_id);
      });

      console.log("marketplaceids ", marketplaceids);

      this.loadingPriceTrend = true;
      this.repricerapi.getSellerPriceTrend(666,{sids: marketplaceids, pids: productids, string_ids: true},'nourlupdate')
                      .subscribe(
                        (res) => {
                          console.log("price trend => ",res)
                          this.productList.map((product) => {
                            let productmatch = _.find(res.data,(value) => {return value['product_id'] == product['tracking_group_id']})
                            console.log('productmatch =>', productmatch);

                            if(productmatch){
                              let chartjson = {}
                              chartjson['chartType'] = this.demochartData.chartType;
                              chartjson['options'] = this.demochartData.options;
                              chartjson['dataTable'] =  this.appservice.decimateDatatable(productmatch['price_trend'] || []);
                              product.chartData = chartjson;
                            }
                          });
                          this.loadingPriceTrend = false;
                      },
                      (err) => {console.warn(err); this.loadingPriceTrend = false;});


      this.checkNPollForFirstImport();
      console.log('product list',this.productList);
      this.priceListLoading = false

      if(pushurl){
        this.events.publish('app:updatehistory',{page: `/${this.marketName}${querystring}`, state: {querystring: querystring, filters: this.filters, filteroptions: this.filterOptions, productlist: this.productList, paginationconfig: this.paginationConfig, firstpageitem: this.firstPageItem, lastpageitem: this.lastPageItem, pendingcrawls: this.pendingCrawls, firstcrawlfailed: this.firstCrawlFailed, showfailed: this.showFailed, showinactive: this.showInactive },  frompath: `/prices` });
      }
      else{
        this.events.publish('app:updatehistory',{page: `/${this.marketName}${querystring}`, state: {querystring: querystring, filters: this.filters, filteroptions: this.filterOptions, productlist: this.productList, paginationconfig: this.paginationConfig, firstpageitem: this.firstPageItem, lastpageitem: this.lastPageItem, pendingcrawls: this.pendingCrawls, firstcrawlfailed: this.firstCrawlFailed, showfailed: this.showFailed, showinactive: this.showInactive },  frompath: `/prices`, replace: true });
      }
    },
    (err) => {
      console.warn(err)
      this.paginationConfig.totalItems = 0;
      this.disableFilter = false;
      this.priceListLoading = false;
      this.priceListError = true;
      this.zone.run(() => {});
    },
    () => {
      this.disableFilter = false;
      this.listingSubscription.unsubscribe();
      this.listingSubscription = null;
      this.zone.run(() => {});
    });

    this.zone.run(() => {});
  }

  private defaultFiltersOnNoRecords: boolean = false;
  private checkNPollForFirstImport(): void{
    console.log("checking for pending crawls ...")
    if(this.productList && this.productList.length === 0){
      // poll here
      console.log("entered polling check ...");
      if(!this.firstImportPollCounter){
        this.defaultFiltersOnNoRecords = false;

        let defaultFilterKeys = Object.keys(this.defaultFilters);
        if(Object.keys(this.filters).length === defaultFilterKeys.length){
          defaultFilterKeys.map((key) => {
            if(this.filters[key] === this.defaultFilters[key]){
              this.defaultFiltersOnNoRecords = true;
            }
            else{
              this.defaultFiltersOnNoRecords = false;
            }
          });
        }
        if(this.defaultFiltersOnNoRecords){
          // if(!this.firstImportPollCounter){
            console.log("starting polling...")
            this.firstImportPollCounter = setInterval(() => {
              this.getPriceList()
            },this.appglobals.getPollInterval());
          // }
        }
      }
    }
    else{
      if(this.productList && this.productList.length > 0){
          this.clearFirstImportPoll();
      }
    }
  }

  private clearFirstImportPoll(): void{
    if(this.firstImportPollCounter){
      clearInterval(this.firstImportPollCounter);
      this.firstImportPollCounter = null;
      this.defaultFiltersOnNoRecords = false;
    }
  }

  private itemMouseOver(item: any): void{
    // console.log('item mouse over')
    if(this.appglobals.iosDevice === false){
          item.open = true;
    }

    // item.mouseenter = "yes";
    // item.mouseleave = 'no';

    // if( item.repricing.my_price > 0 && item.product_details.sold_by_me && item.repricing.tracked_sellers_count > 1 ){
    //   if(item.rankrequest || item.rankobtained) return;

    //   item.rankrequest = this.repricerapi.getProductRank(item.product_details.id)
    //   .then((res) => {
    //     if(res.success){
    //       item.product_details.sales_rank = res.data.seller_rank ? res.data.seller_rank : 'NA';
    //       console.log("rank =>", item.product_details.sales_rank);
    //       this.zone.run(() => {});
    //     }
    //     else{
    //       item.product_details.sales_rank = 'NA';
    //     }
    //     item.rankrequest = null;
    //     item.rankobtained = true;
    //   })
    //   .catch((err) => {
    //     // item.rankrequest = null;
    //     item.product_details.sales_rank = "NA";
    //      item.rankobtained = true;
    //     // console.warn(err);
    //   });

    // }

    // if(!item.parentsubject){
    //    item.parentsubject = new Subject<string>();
    //    item.parentsubjectstream = item.parentsubject.asObservable();
    // }

    this.zone.run(() => {});
  } //end itemMouseOver

  private itemMouseOut(item: any): void{
    if(!item.selectedDetail){
          item.open = false
    }

    this.zone.run(() => {});
    // item.selectedDetail = null;
  }

  private sellerSubscription = null;
  private sellersFilter = {
    limit: 5,
    page: 1,
    sort: 'buy_box',
    direction: 'desc'
  }
  private getSellersCall(item: any): void{
    if(item.sellerSubscription){
      item.sellerSubscription.unsubscribe();
    }

    item.sellersfilter = item.sellersfilter ? item.sellersfilter : Object.assign({},this.sellersFilter);
    item.sellerPage = item.sellerPage ? item.sellerPage : 1;
    item.sellersfilter['page'] = item.sellerPage;
    item.sellersPageConfig = {
      id: item.product_details.id,
      itemsPerPage: item.sellersfilter["limit"],
      currentPage: item.sellerPage,
      totalItems: 0
    }

    item.sellersPageConfig = item.sellersPageConfig ? item.sellersPageConfig : { id: item.product_details.id, itemsPerPage: item.sellersfilter["limit"], currentPage: item.sellerPage, totalItems: 0 }

    item.asyncSellers = [];
    item.error = false;


    item.sellerSubscription = this.repricerapi.getSellers(item.product_details.id, item.sellersfilter)
    .subscribe((res) => {
      item.asyncSellers = res.data;
      item.totalSellers = res.result_count;
      item.sellersPageConfig.totalItems = res.result_count;
    },(err) => {
      console.warn(err);
      item.sellerSubscription.unsubscribe();
      item.sellerSubscription = null;
      item.error = true;
      console.warn('seller subscription unsubscribed on error.....')
      this.zone.run(() => {});
    }, () => {
      item.sellerSubscription.unsubscribe();
      item.sellerSubscription = null;
      console.log('seller subscription unsubscribed.....')
      this.zone.run(() => {});
    });
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

  private itemClick(event,item): void{
    console.log("item target => ", event.target);

    if(event.target.nodeName === 'ION-SEGMENT-BUTTON'){
      //do something here
      console.log('ion segment clicked')
      return;
    }
    else if(this.$(event.target).parents('ion-list.list.list-md').length > 0){ //for click of elements within ion-list after ion-segment
      // other stuff here
      console.log('ion list clicked')
      return;
    }
    // else if(event.target.classList.length === 0 || this.$(event.target).hasClass('pagination-previous') || this.$(event.target).hasClass('pagination-next') || this.$(event.target).hasClass('current') || this.$(event.target).hasClass('activated') ){ //for the click event on the page number in nested pagination controls
    else if(this.$(event.target).hasClass('pagination-previous') || this.$(event.target).hasClass('pagination-next') || this.$(event.target).hasClass('current') || this.$(event.target).hasClass('activated') || this.$(event.target).parents().find('a.activated').length === 1 ){ //for the click event on the page number in nested pagination controls
      // other stuff
      console.log('pagination clicked')
      return;
    }
    else{
      console.log('default click handler')
      if(item.isOpen){
        item.isOpen = false;
        item.open = false;
        item.selectedDetail = null;
        return;
      }
      this.addProperties(item);
    }

    item.isOpen = true;
    // if(this.appglobals.iosDevice){
      item.open = true;
    // }

    // this.loadActivity(item);
    console.log(item.sellerPage);
    this.zone.run(() => {});
  }

  private setSellersModal(item: any, edit: boolean = false, disableurlupdate: boolean = false): void{

    item.sellerPage = 1;
    let competitorlistings = item.repricing.tracked_listings;
    let listingsids = competitorlistings.split(',');
    item.repricing.tracked_listings = listingsids.join(',  ');

    item.sellersPageConfig = {id: item.product_details.id, itemsPerPage: 0, currentPage: 1, totalItems: 0 };

    // console.log("location", window.location.pathname);
    if(!disableurlupdate){
      this.events.publish('app:updatehistory',{page:`/${this.marketName}`, state: {id: 'prices'}, frompath: `/prices`, replace: true});
    }

    this.productTabsModal = this.modalctrl.create(PricesProductTabsPage,{item: item, isOnline: this.isOnline, market: this.marketName, titleNaText: this.titleNaText, editproduct: edit}, {enableBackdropDismiss: false});
    this.productTabsModal.present({
        updateUrl: false
    });

    this.productTabsModal.onDidDismiss((data) => {
      console.log('product tab dismissed')
      item.isOpen = false;
      item.open = false;
      item.selectedDetail = null;

      this.productTabsModal = null;

      if(data){
        if(data.product_details){
          // console.log('data', data);
          this.productList.map((val,index) => {
              if(val.product_details.id === data.product_details.id){

                for(let key in val){
                  if(key !== 'channel_details' && key !== 'product_details' && key !== 'repricing' && key !== 'tracking_group_id'){
                    data[key] = val[key];
                  }
                }
                this.productList[index] = data;

                console.log('productList =>', this.productList[index]);
                this.zone.run(() => {});
              }
            });
        }
        this.location.back();

        // this.events.publish('app:updatehistory',{page: `/${this.marketName}`, state: {id: "product-tab-dismiss"}, replace: true, frompath: `/prices`});
      }

      setTimeout(() => {
        let queryparams = this.$.param(this.filters);
        this.events.publish('app:updatehistory',{page:`/${this.marketName}?${queryparams}`, state: {id: 'prices'}, frompath: `/prices`, replace: true});
      },250);

    });
  }

  private productTabsModal: any = null;
  private editPrFlag: boolean = true;
  private segmentClick(item, event: any = null, editproduct: boolean = false): void{
    console.log('segmentclick info %O editproduct %b',item.selectedDetail,editproduct)

    switch(item.selectedDetail){
      case 'seller':{
              item.productTabOpen = item.activityTabOpen = false;
              // if( item.sellersTabOpen && !this.appglobals.isMobile() ){
              //   item.sellersTabOpen = false;
              //   this.hideSelectedTab(item);
              //   return;
              // }
              item.sellersTabOpen = true;
              this.setSellersModal(item);
        };break;
      case 'info':{
              item.sellersTabOpen = item.activityTabOpen = false;
              item.productTabOpen = true;
              this.setSellersModal(item, true);
        };break;
      case 'activity':{
              item.sellersTabOpen = item.productTabOpen = false;
              this.setSellersModal(item);
              item.activityTabOpen = true;
        };break;
    }

    this.zone.run(() => {});
  }// end segmentClick

  private onTabScroll(event){
    console.log('ionlist scroll event',event);
  }

  private addProperties(item: any, selectedtab: string = ''): void{

    item.selectedDetail = selectedtab ? selectedtab : 'seller';
    item.sellersTabOpen = true;

    this.setSellersModal(item);
  }

  private actFilter = {
      page: 1,
      limit: 20,
      sort: "created",
      direction: "desc"
    };

  private resetFilters(replaceurl: string = ''): void{
    console.log("resting filter =>", this.filters);

    this.filters = Object.assign({},this.defaultFilters);
    //delete this.filters['show_failed'];
    this.showFailed = false;
    this.showInactive = false;
    this.disableFilter = true;
    this.resetFilterTemplate();
    this.getPriceList(1, replaceurl ? false : true);
  }

  private getFailedProducts(): void{
    //this.filters = Object.assign({},this.defaultFilters);
    this.showFailed = true;
    this.showInactive = false;
    this.disableFilter = true;
    this.filters = Object.assign({},this.defaultFilters);
    this.filters['show_failed'] = 'yes';
    this.resetFilterTemplate();
    this.getPriceList(1);
  }

  private exportDrop:any = {
    open: false
  };

  private toggleExportDrop(){
    this.exportDrop.open = !this.exportDrop.open;
    this.zone.run(() => {});
  }

  private exportFile(type: string): void{
    let payload = {
      file_type: "xlsx"
    };

    if(type === 'competing'){
      payload['is_competing'] = true;
    }

    this.appservice.presentToast("Exporting file...");
    this.repricerapi.exportTemplate(payload)
    .then((res) => {
      console.log(res)
      this.appservice.downloadFile(res.file, res.name);
    })
    .catch((err) => {
      console.warn(err)
      this.appservice.presentToast('Export failed','warn')
    });

    this.exportDrop.open = false;
    this.zone.run(() => {})
  }

  private toggleDrop(filtertype: string): void{
    if(this.filterOptions[filtertype]){
      for(let filter in this.filterOptions){
        if(filter !== filtertype){
          this.filterOptions[filter].open = false;
        }
      }
      this.filterOptions[filtertype].open = !this.filterOptions[filtertype].open;
    }
    this.zone.run(() => {});
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

  ngOnChanges(){
    console.log("ngOnChanges to prices")
  }

  ngAfterViewInit(){
    console.log("ngAfterViewInit prices")
  }

  ngAfterContentInit(){
    console.log("ngAfterContentInit prices")
  }

  private hideAllFilters(event){
    console.log("hide filter => ",this.$(event.target).parents('.bt-dropdown').length)
    // this.$(event.target).parents('.bt-dropdown__dd').length;
    if(this.$(event.target).parents('.bt-dropdown').length === 0){ // handle case for export dropdown
      this.exportDrop.open = false;
    }

    this.appservice.hideAllDrops(event, this.filterOptions)
    .then((res) => {
      this.zone.run(() => {})
    })
    .catch((err) => {
      console.warn(err)
    });
  }

  private updateFilter(filtertype: string, force: string = ''): void{
    if(this.disableFilter && !force){
      return;
    }

    // if(this.listingSubscription){
    //   console.warn("listing subscription active")
    //   this.appservice.presentToast('Product list is being updated. Please try again!','warn');
    //   return;
    // }

    console.log('update filters here');
    let currentfilter = this.filterOptions[filtertype];
    if(!currentfilter) return;

    if(currentfilter && currentfilter.selected && currentfilter.options.length){
      currentfilter.options.map((val) => {
        if(val.slug === currentfilter.selected){
          currentfilter.selectedname = val.name;
          currentfilter.filtered= true;
          currentfilter.open = false;
        }
      });
    }

    switch(filtertype){
      case 'sort': {
        this.filters["sort"] = currentfilter.selected;

        this.filters["direction"] = 'asc';
        this.filterOptions["direction"].selected = 'asc';
        this.filterOptions["direction"].selectedname = 'Asc';
        // this.disableFilter = true;
      };break;
      case 'price_status': {
        // filters[price_status]:at_my_min  [options: at_my_min, at_my_max, only_seller]
         if(currentfilter.selected){
          this.filters['filters'] = this.filters['filters'] ? this.filters['filters'] : {};
          this.filters['filters']["price_status"] = currentfilter.selected;
        }
        else{
          currentfilter.filtered= false;
          if(this.filters['filters']){
            if(this.filters['filters']['price_status']){
              delete this.filters['filters']['price_status'];
            }

            if( Object.keys(this.filters['filters']).length === 0 ){
              delete this.filters['filters']
            }
          }
          return;
        }
      };break;
      case 'pricing_outcome': {
        if(currentfilter.selected){
          this.filters['filters'] = this.filters['filters'] ? this.filters['filters'] : {};
          this.filters['filters']["pricing_outcome"] = currentfilter.selected;
        }
        else{
          currentfilter.filtered= false;
          if(this.filters['filters']){
            if(this.filters['filters']['pricing_outcome']){
              delete this.filters['filters']['pricing_outcome'];
            }

            if( Object.keys(this.filters['filters']).length === 0 ){
              delete this.filters['filters']
            }
          }
          // return;
        }
      };break;
      case 'direction': {
        this.filters["direction"] = currentfilter.selected;
      };break;
      case 'search': {
        if(currentfilter.selected){
          if(currentfilter.value){
            this.filters['search'] = {
              field: currentfilter.selected,
              value: currentfilter.value
            }
          }
          else{
            currentfilter.filtered= false;
            delete this.filters['search'];

            if(force === ''){
              return;
            }
          }
        }
        else{
          currentfilter.filtered= false;
          delete this.filters['search'];

          if(force === ''){
            return;
          }
        }
      };break;
      case 'sellers': {
        if(currentfilter.min && currentfilter.max && ( Number(currentfilter.min) <= Number(currentfilter.max) ) ){
          this.filters['filters'] = this.filters['filters'] ? this.filters['filters'] : {};
          this.filters['filters']['seller_count'] = {};
          this.filters['filters']['seller_count']['min'] = Number(currentfilter.min);
          this.filters['filters']['seller_count']['max'] = Number(currentfilter.max);

          currentfilter.error = false;
          currentfilter.filtered= true;
          currentfilter.open = false;
        }
        else{
          currentfilter.filtered= false;
          // currentfilter.open = false;
          currentfilter.error = true;
          if(this.filters['filters']){
            if(this.filters['filters']['seller_count']){
              delete this.filters['filters']['seller_count'];
            }

            if( Object.keys(this.filters['filters']).length === 0 ){
              delete this.filters['filters']
            }
          }
          return;
        }
      };break;
      case 'price': {
        if(currentfilter.min && currentfilter.max && ( Number(currentfilter.min) <= Number(currentfilter.max) ) ){
            this.filters['filters'] = this.filters['filters'] ? this.filters['filters'] : {};
            this.filters['filters']['price'] = {};
            this.filters['filters']['price']['min'] = Number(currentfilter.min);
            this.filters['filters']['price']['max'] = Number(currentfilter.max);

            currentfilter.error = false;
            currentfilter.filtered= true;
            currentfilter.open = false;
        }
        else{
          currentfilter.filtered= false;
          // currentfilter.open = false;
          currentfilter.error = true;
          if(this.filters['filters']){
            if(this.filters['filters']['price']){
              delete this.filters['filters']['price'];
            }

            if( Object.keys(this.filters['filters']).length === 0 ){
              delete this.filters['filters']
            }
          }
          return;
        }
      };break;
    }

    console.log(this.filterOptions[filtertype])
    console.log('price filters', this.filters);
    this.zone.run(() => {});
    this.getPriceList(1);
  }

  private changeSearchField(field: string): void{
    this.filterOptions['search'].selected = field;
    this.updateFilter('search');
  }

  private navTo(page: string, market: string = ''): any{
    console.log('navigating to page', page);
    let params = {};
    if(market){
      params['marketplace'] = market;
    }

    if(page === 'prices'){
      this.filterhistory.internalNavigation = true;
    }

    this.$(event.currentTarget).removeAttr('href');
    this.appservice.updateRootNav(page,false,params)
  }

  private orderSellersByPrice(item: any): void{
    item.sortDirection === 'dsc' ?  item.sortDirection = 'asc' : item.sortDirection = 'dsc';
    console.log(item.sortDirection)
    // item.sellers = this.appservice.orderBy(item.asyncSellers, 'price', item.sortDirection);
    // console.log(item.sellers)

    item.sellersfilter = item.sellersfilter ? item.sellersfilter : Object.assign({},this.sellersFilter);
    item.sellersfilter['sort'] = 'price';
    item.sellersfilter['direction'] = item.sortDirection === 'dsc' ? 'desc' : 'asc';
    item.sellerPage = 1;

    this.getSellersCall(item);
    this.zone.run(() => {});
  }

  private onContextMenu(event,page): void{
    console.log("on context menu",event.currentTarget)
    this.$(event.currentTarget).attr('href',`/${page}`);
  }

}
