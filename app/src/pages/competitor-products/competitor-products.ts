import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { Location } from '@angular/common';
import { AppService } from '../../providers/app-service';
import { AppGlobals } from '../../providers/app-globals';
import { RepricerApi } from '../../providers/repricer-api';


@IonicPage({
  name: 'competitor-products',
  segment: 'competitor-products/:violation',
  priority: 'off'
})
@Component({
  selector: 'page-competitor-products',
  templateUrl: 'competitor-products.html',
})
export class CompetitorProductsPage {
  private hideFilter: boolean = true;
  private naText = '--';
  private dummyProducts = []

  @ViewChild(Content) content: Content;

  private filterOptions: any = {
    search: {
      open: false,
      filtered: false,
      selected: 'seller_name',
      selectedname: 'Seller Name',
      value: '',
      options: [
        {slug: 'product_title', name: 'Product Title'},
        {slug: 'listing_id', name: 'Seller ID'},
        {slug: 'seller_name', name: 'Seller Name'}
      ]
    },
    marketplace_id: {
      open: false,
      filtered: false,
      selected: '',
      options: [{slug: 'all', name: 'All'},{slug: '1', name: 'Amazon'},{slug: '2', name: 'Flipkart'},{slug: '3', name: 'Snapdeal'},{slug: '4', name: 'Paytm'}]
    },
    attribute: {
      open: false,
      filtered: false,
      selected: '',
      options: [{slug: 'mop_violation', name: 'MOP Violation'},{slug: 'mrp_violation', name: 'MRP Violation'}]
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
      selected: 'updated_on',
      options: [
          {slug: 'updated_on', name: 'Updated On'}
        ]
    }
  };
  private disableFilter: boolean = true;
  private referer: string = '';
  private sellerDetails: any = {};
  private paginationConfig: any = {
    itemsPerPage: 20, 
    currentPage: 1,
    totalItems: 0
  };

  private defaultFilters = {
    limit: 20,
    page: 1,
    sort: 'updated_on',
    direction: 'desc'
  }

  private filters: any;

  private firstPageItem = 0;
  private lastPageItem = 0;
  private listLoading = false;
  private compProducts = [];
  private listSubscription = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appservice: AppService,
    private location: Location,
    private zone: NgZone,
    private events: Events,
    private appglobals: AppGlobals,
    private repricerapi: RepricerApi) {
    // this.hideFilter = this.appglobals.isMobile() ? true : false;

    this.filters = Object.assign({},this.defaultFilters);

    for(let x =0; x < this.defaultFilters.limit; x++){
      this.dummyProducts.push({});
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompetitorProductsPage');
  }

  private violation: string = '';
  private searchChangeCallback: any;
  ionViewDidEnter(){
    console.log('ionViewDidEnter compproducts')
    this.referer = this.navParams.get("referer");
    this.violation = this.navParams.get("violation");
    this.sellerDetails = this.navParams.get('sellerdetails');
    console.log('seller d', this.sellerDetails);

    if(this.sellerDetails && this.sellerDetails.id){
      console.log("sellerDetaulas present")

      this.filters['seller_id'] = this.sellerDetails.id;
      if(this.violation){
        console.log("violation", this.violation)
        this.filterOptions.attribute.selected = this.violation
        this.updateFilter('attribute','forceupdate');
        this.filterOptions.search.value = this.sellerDetails.seller_name;
      }
    }
    else{
      this.resetFilter();
    }

    this.events.publish('app:updatehistory','competitor-products');

    this.appservice.searchDebounceInit();

    this.searchChangeCallback = () => {
      console.log('updating filter...')
      this.updateFilter('search','forceupdate');
    }
    this.events.subscribe('app:searchtermchanged',this.searchChangeCallback);
  } //end ionViewDidEnter

  ionViewWillUnload(){
    this.events.unsubscribe('app:searchtermchanged',this.searchChangeCallback);
  }

  // ngOnInit(): void{

  // }

  private hideUniqueSeller = false;
  private showAllProducts(): void{
    this.filterOptions.attribute.selected = '';
    this.updateFilter('attribute','forceupdate');
    // this.hideUniqueSeller = true;
    this.zone.run(() => {});
  }

  private changeSearchField(field: string): void{
    this.filterOptions['search'].selected = field;
    this.updateFilter('search');
  }

  private searchItem(event): void{
    this.appservice.triggerSearchChange(this.filterOptions.search.value);
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

  private updateFilter(filtertype: string, force: string = ''): void{
    if(this.disableFilter && force === ''){
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

        // this.filters["direction"] = 'asc';
        // this.filterOptions["direction"].selected = 'asc';
        // this.filterOptions["direction"].selectedname = 'Asc';
        // this.disableFilter = true;
      };break;
      case 'marketplace_id':
      case 'attribute': {
        if(currentfilter.selected){
          this.filters['filters'] = this.filters['filters'] ? this.filters['filters'] : {};
          if(filtertype === 'marketplace_id' && currentfilter.selected === 'all'){
            delete this.filters['filters'][filtertype];
          }
          else{
            this.filters['filters'][filtertype] = currentfilter.selected;
          }
        }
        else{
          currentfilter.filtered= false;
          if(this.filters['filters']){
            if(this.filters['filters'][filtertype]){
              delete this.filters['filters'][filtertype];
            }

            if( Object.keys(this.filters['filters']).length === 0 ){
              delete this.filters['filters']
            }
          }

          if(force === ''){
              return;
          }
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
    }

    console.log(this.filterOptions[filtertype])
    console.log('price filters', this.filters);
    this.zone.run(() => {});
    this.listCompProducts();
  }

  private resetFilter(): void{
    this.filters = Object.assign({},this.defaultFilters);
    this.resetFilterTemplate();
    this.listCompProducts();
    this.hideUniqueSeller = true;
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
        this.filterOptions[filter].selectedname = 'Updated On';
        this.filterOptions[filter].selected = 'updated_on';
      }
      else{
        this.filterOptions[filter].filtered = false;
        this.filterOptions[filter].selectedname = '';
        this.filterOptions[filter].selected = '';
      }
    }
    // this.zone.run(() => {})
  }

  private compProductError: boolean = false;
  private listCompProducts(page: number = 1): void{
    if(this.listSubscription){
      this.listSubscription.unsubscribe();
      this.listSubscription = null;
    }

    this.paginationConfig.currentPage = page;
    this.filters['page'] = this.paginationConfig.currentPage;
    
    this.listLoading = true;
    this.compProductError = false;
    this.compProducts = [];
    this.listSubscription = this.repricerapi.getCompetitorProducts(this.filters)
                            .subscribe((res) => {
                              console.log(res)
                              if(res.success){
                                // this.paginationConfig.itemsPerPage = res.results_per_page
                                this.firstPageItem = ( (res.page - 1) * res.results_per_page ) + 1;
                                this.lastPageItem = ( res.results_per_page < res.result_count ) ? ( (res.results_per_page * res.page > res.result_count) ? res.result_count : res.results_per_page * res.page ) : res.result_count; //TBD refactor this
                                this.paginationConfig.totalItems = res.result_count
                                this.listLoading = false;
                                this.compProducts = res.data
                              }
                              else{
                                this.appservice.presentToast("failed to load list",'error')
                              }
                            },(err) => {
                              console.warn(err)
                              this.paginationConfig.totalItems = 0;
                              this.listLoading = false;
                              this.compProductError = true;
                              this.zone.run(() => {});
                            },() => {

                              this.listSubscription.unsubscribe()
                              this.listSubscription = null;
                              this.disableFilter = false;
                              this.zone.run(() => {});
                            })
  }

  private pagChanged(page): void{
    this.content.scrollToTop();
    this.listCompProducts(page);
  }

  private assignColorClass(flag: boolean, type): string{
    let classtype = 'orange'
    switch(type){
      case 'fbm': {};break;
      case 'mop': {};break;
      case 'mrp': {};break;
    }

    return classtype
  }

  private navTo(page: string, params: any = {}): any{
    console.log('navigating to page', params);
    this.appservice.updateRootNav(page,false,params)
  }

  private goBack(): void{
    console.log('going back');
    this.location.back();
  }

  private toggleFilterView(): void{
    this.hideFilter = !this.hideFilter;
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
