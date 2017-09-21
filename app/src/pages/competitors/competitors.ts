import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { Location } from '@angular/common';
import { RepricerApi } from '../../providers/repricer-api';
import { AuthGuard } from '../../providers/auth-guard';
import { AppService } from '../../providers/app-service';
import { AppGlobals } from '../../providers/app-globals';
import * as moment from 'moment';

@IonicPage({
  name: 'competitors',
  segment: 'competitors',
  priority: 'off'
})
@Component({
  selector: 'page-competitors',
  templateUrl: 'competitors.html',
})
export class CompetitorsPage {
  private hideFilter: boolean = true;
  private naText = "--";
  private competitorList: Array<any> = [];
  private disableFilter = false;

  @ViewChild(Content) content: Content;

  private defaultFilters = {
    limit: 20,
    page: 1,
    direction: 'desc',
    sort: 'id'
  }
  private filters: any;

  private paginationConfig: any = {
    itemsPerPage: 20, 
    currentPage: 1,
    totalItems: 0
  };

  private dummyProducts = [];

  private marketOptions: any = {
    all: {id: 0, active: true},
    amazon: {id: 1, active: false},
    flipkart: {id: 2, active: false},
    snapdeal: {id: 3, active: false},
    paytm: {id: 4, active: false}
  };

  private filterOptions: any = {
    search: {
      open: false,
      filtered: false,
      selected: 'sku_code',
      selectedname: 'SKU Code',
      value: '',
      options: [
        {slug: 'seller_id', name: 'Seller ID'},
        {slug: 'seller_name', name: 'Seller Name'}
      ]
    },
    ratings: {
      open: false,
      filtered: false,
      min: '',
      max: ''
    },
    reviews: {
      open: false,
      filtered: false,
      min: '',
      max: ''
    },
    listings: {
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
      selected: 'id',
      options: [ //  id, seller_id, seller_name
          {slug: 'id', name: 'ID'},
          {slug: 'seller_id', name: 'Seller ID'},
          {slug: 'seller_name', name: 'Seller Name'}
        ]
    }
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authguard: AuthGuard,
    private appservice: AppService,
    private location: Location,
    private repricerapi: RepricerApi,
    private appglobals: AppGlobals,
    private events: Events,
    private zone: NgZone
    ) {

    // this.hideFilter = this.appglobals.isMobile() ? true : false;
    this.filters = Object.assign({},this.defaultFilters);

    for(let x = 0; x < this.defaultFilters.limit; x++){
      this.dummyProducts.push({})
    }
    // this.resetFilter();
  }

  private searchChangeCallback: any;
  ionViewDidEnter(){
    console.log('ionViewDidEnter competitors')
    this.resetFilter();

    this.events.publish('app:updatehistory','competitors');

    this.appservice.searchDebounceInit();

    this.searchChangeCallback = () => {
      console.log('updating filter...')
      this.updateFilter('search','forceupdate');
    }
    this.events.subscribe('app:searchtermchanged',this.searchChangeCallback);
  }

  ionViewWillUnload(){
    this.events.unsubscribe('app:searchtermchanged',this.searchChangeCallback);
  }

  // ionViewDidEnter() {
  //   console.log('ionViewDidEnter CompetitorsPage');

  //   setTimeout(() => {
  //     this.appservice.updateOnlineStatus();
  //   },1000)
  // }

  ionViewCanEnter(): Promise<boolean>{
    console.log('ionviewcanenter CompetitorsPage')
    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('competitors')
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject(true) 
      })
    })

  }

  private resetFilterTemplate(): void{
    this.disableFilter = true;
    for(let filter in this.filterOptions){
      this.filterOptions[filter].open = false;
      if(filter === 'search'){
        this.filterOptions[filter].filtered = true;
        this.filterOptions[filter].value = '';
        this.filterOptions[filter].selectedname = 'Seller Name';
        this.filterOptions[filter].selected = 'seller_name';
      }
      else if(filter === 'direction'){
        this.filterOptions[filter].filtered = true;
        this.filterOptions[filter].selectedname = 'Desc';
        this.filterOptions[filter].selected = 'desc';
      }
      else if(filter === 'sort'){
        this.filterOptions[filter].filtered = true;
        this.filterOptions[filter].selectedname = 'ID';
        this.filterOptions[filter].selected = 'id';
      }
      else if(filter === 'ratings' || filter === 'reviews' || filter === 'listings'){
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

  private resetFilter(): void{
    this.filters = Object.assign({},this.defaultFilters);
    this.resetFilterTemplate();
    this.listCompetitors();
  }

  private changeSearchField(field: string): void{
    this.filterOptions['search'].selected = field;
    this.updateFilter('search');
  }

  private searchItem(event): void{
    this.appservice.triggerSearchChange(this.filterOptions.search.value);
  }

  private updateFilter(filtertype: string, force: string = ''): void{
    if(this.disableFilter){
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
      case 'ratings': 
      case 'reviews':
      case 'listings': {
        if(currentfilter.min && currentfilter.max && ( Number(currentfilter.min) <= Number(currentfilter.max) ) ){
            this.filters['filters'] = this.filters['filters'] ? this.filters['filters'] : {};
            this.filters['filters'][filtertype] = {};
            this.filters['filters'][filtertype]['min'] = Number(currentfilter.min);
            this.filters['filters'][filtertype]['max'] = Number(currentfilter.max);

            currentfilter.error = false;
            currentfilter.filtered= true;
            currentfilter.open = false;
        }
        else{
          currentfilter.filtered= false;
          // currentfilter.open = false;
          currentfilter.error = true;
          if(this.filters['filters']){
            if(this.filters['filters'][filtertype]){
              delete this.filters['filters'][filtertype];
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
    this.listCompetitors();
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

  private filterMarket(market): void{
    // this.navTo('prices',{market: marketname});
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

    this.listCompetitors();
    this.zone.run(() => {});
  }

  private firstPageItem = 0;
  private lastPageItem = 0;
  private navTo(page: string, params: any = {}): any{
    console.log('navigating to page', params);
    this.appservice.updateRootNav(page,false,params)
  }

  private toggleFilterView(): void{
    this.hideFilter = !this.hideFilter;
    this.zone.run(() => {});
  }

  private listSubscription = null;
  private listLoading = false;
  private competitorListError: boolean = false;
  private listCompetitors(page: any = 1): void{

    if(this.listSubscription){
      this.listSubscription.unsubscribe();
    }

    this.paginationConfig.currentPage = page;
    this.filters['page'] = this.paginationConfig.currentPage;
    this.listLoading = true;
    this.competitorListError = false;
    this.competitorList = [];
    this.listSubscription = this.repricerapi.getAllCompetitors(this.filters)
    .subscribe((res) => {
      if(res.success == true){
        this.firstPageItem = ( (res.page - 1) * res.results_per_page ) + 1;
        this.lastPageItem = ( res.results_per_page < res.result_count ) ? ( (res.results_per_page * res.page > res.result_count) ? res.result_count : res.results_per_page * res.page ) : res.result_count; //TBD refactor this
        this.paginationConfig.totalItems = res.result_count
        this.competitorList = res.data

        this.addProperties();
        this.zone.run(() => {});
      }
    },(err) => {
      console.warn(err);
      this.paginationConfig.totalItems = 0;

      // let ermess;
      // try{
      //   ermess = ermess.message ? ermess.message : ermess;
      // }
      // catch(e){
      //   ermess = 'Server Error'
      // }
      
      // if(ermess){
      //   this.appservice.presentToast(ermess,'error');
      // }
      this.listLoading = false;
      this.competitorListError = true;
      this.zone.run(() => {});
    },
    () => {
      this.listSubscription.unsubscribe()
      this.listLoading = false;
      this.disableFilter = false;
    })

    this.zone.run(() => {});
  }

  private addProperties(): void{
    this.competitorList.map((val) => {
      val['tracked_since_time'] = moment(val.tracked_since,'MMM DD, YYYY, h:mm A');
      val['tracked_since_date'] = moment(val['tracked_since_time']).format('MMM DD, YYYY');
      // val['rating'] = 4.1;
    })
  }

  private goBack(): void{
    console.log('going back');
    this.location.back();
  }

  private pagChanged(page): void{
    this.content.scrollToTop();
    this.listCompetitors(page);
  }

  private gotoCompProducts(item,type): void{
      if(type === 'mop_violation'){
        if(item["mop_violation"]){
          this.navTo('competitor-products',{'violation': 'mop_violation', 'referer': 'competitors', sellerdetails: item})
        }
      }
      else if(type === 'mrp_violation'){
        if(item["mrp_violation"]){
          this.navTo('competitor-products',{'violation': 'mrp_violation', 'referer': 'competitors', sellerdetails: item})
        }
      }
  } //end gotoCompProducts

  private lockMainHeader: boolean = false
  private getContentHeight(): void{
    this.content.getContentDimensions()
    // console.log('content dimensions => content top: ' + this.content.contentTop + ' scroll top: ' + this.content.scrollTop);
  
    if(this.content.scrollTop >= this.content.contentTop){
      this.lockMainHeader = true;
    }
    else{
      this.lockMainHeader = false;
    }

    this.zone.run(() => {});
  }

  private hideAllFilters(event){
    // console.log(event.target.className)

    // if(event.target.className === 'button-inner') return;

    // for(let filter in this.filterOptions){
    //   this.filterOptions[filter].open = false;
    // }
    // this.zone.run(() => {});
    this.appservice.hideAllDrops(event, this.filterOptions)
    .then((res) => {
      this.zone.run(() => {})
    })
    .catch((err) => {
      console.warn(err)
    });
  }

}
