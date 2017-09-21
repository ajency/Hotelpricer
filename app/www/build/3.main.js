webpackJsonp([3],{

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prices__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_pagination__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipes_pipes_module__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_logout_popover_logout_popover_module__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_star_ratings_star_ratings_module__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_footer_element_footer_element_module__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_pricer_loader_pricer_loader_module__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_price_row_price_row_module__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__filter_history_service__ = __webpack_require__(491);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PricesPageModule", function() { return PricesPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// import { TabsContainerComponentModule } from '../../components/tabs-container/tabs-container.module';







var PricesPageModule = (function () {
    function PricesPageModule() {
    }
    return PricesPageModule;
}());
PricesPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__prices__["a" /* PricesPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__pipes_pipes_module__["a" /* CustomPipesModule */],
            __WEBPACK_IMPORTED_MODULE_3_ngx_pagination__["a" /* NgxPaginationModule */],
            __WEBPACK_IMPORTED_MODULE_9__components_price_row_price_row_module__["a" /* PriceRowComponentModule */],
            // TabsContainerComponentModule,
            __WEBPACK_IMPORTED_MODULE_5__components_logout_popover_logout_popover_module__["a" /* LogoutPopoverComponentModule */],
            __WEBPACK_IMPORTED_MODULE_6__components_star_ratings_star_ratings_module__["a" /* StarRatingsComponentModule */],
            __WEBPACK_IMPORTED_MODULE_8__components_pricer_loader_pricer_loader_module__["a" /* PricerLoaderComponentModule */],
            __WEBPACK_IMPORTED_MODULE_7__components_footer_element_footer_element_module__["a" /* FooterElementComponentModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__prices__["a" /* PricesPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__prices__["a" /* PricesPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_10__filter_history_service__["a" /* FilterHistory */]
        ]
    })
], PricesPageModule);

//# sourceMappingURL=prices.module.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__footer_element__ = __webpack_require__(482);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterElementComponentModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FooterElementComponentModule = (function () {
    function FooterElementComponentModule() {
    }
    return FooterElementComponentModule;
}());
FooterElementComponentModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__footer_element__["a" /* FooterElementComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__footer_element__["a" /* FooterElementComponent */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__footer_element__["a" /* FooterElementComponent */]
        ]
    })
], FooterElementComponentModule);

//# sourceMappingURL=footer-element.module.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_app_globals__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterElementComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the FooterElementComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
var FooterElementComponent = (function () {
    function FooterElementComponent(appglobals) {
        this.appglobals = appglobals;
        this.version = "";
        // console.log('Hello FooterElementComponent Component');
        // this.text = 'Hello World';
        this.version = this.appglobals.getAppVersion();
    }
    return FooterElementComponent;
}());
FooterElementComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'footer-element',template:/*ion-inline-start:"/var/www/ENV/hotelpricer/app/src/components/footer-element/footer-element.html"*/'<!-- Generated template for the FooterElementComponent component -->\n<footer>\n  <div class="text-center" padding-vertical>&copy; Browntape 2017<span class="version-string">&nbsp;V{{version}}</span></div>\n</footer>\n'/*ion-inline-end:"/var/www/ENV/hotelpricer/app/src/components/footer-element/footer-element.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_app_globals__["a" /* AppGlobals */]])
], FooterElementComponent);

//# sourceMappingURL=footer-element.js.map

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logout_popover__ = __webpack_require__(484);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutPopoverComponentModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LogoutPopoverComponentModule = (function () {
    function LogoutPopoverComponentModule() {
    }
    return LogoutPopoverComponentModule;
}());
LogoutPopoverComponentModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__logout_popover__["a" /* LogoutPopoverComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__logout_popover__["a" /* LogoutPopoverComponent */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__logout_popover__["a" /* LogoutPopoverComponent */]
        ]
    })
], LogoutPopoverComponentModule);

//# sourceMappingURL=logout-popover.module.js.map

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popovers_user_popover_user_popover__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_globals__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_repricer_api__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutPopoverComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LogoutPopoverComponent = (function () {
    function LogoutPopoverComponent(popoverctrl, appglobals, repricerapi) {
        this.popoverctrl = popoverctrl;
        this.appglobals = appglobals;
        this.repricerapi = repricerapi;
        this.topMetrics = {};
        console.log('Hello LogoutPopoverComponent Component');
    }
    LogoutPopoverComponent.prototype.ngOnChanges = function () {
        console.log("logout popover changes", this.topMetrics);
        if (this.topMetrics && Object.keys(this.topMetrics).length > 0) {
            this.appglobals.topMetrics = this.topMetrics;
        }
    };
    LogoutPopoverComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("logout popover inti", this.appglobals.topMetrics);
        // this.topMetrics = this.appglobals.topMetrics ? this.appglobals.topMetrics : {};
        if (this.appglobals.topMetrics && Object.keys(this.appglobals.topMetrics).length > 0) {
            this.topMetrics = this.appglobals.topMetrics;
        }
        if (this.Source === 'dashboard')
            return;
        this.repricerapi.getDashTopMetrics()
            .then(function (res) {
            _this.topMetrics = res.data;
            _this.appglobals.topMetrics = _this.topMetrics;
        })
            .catch(function (err) {
            console.warn(err);
        });
    };
    LogoutPopoverComponent.prototype.showUserPopover = function (event) {
        console.log("creating popover");
        var userpopover = this.popoverctrl.create(__WEBPACK_IMPORTED_MODULE_2__popovers_user_popover_user_popover__["a" /* UserPopoverPage */]);
        userpopover.present({
            ev: event
        });
    };
    return LogoutPopoverComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('topmetrics'),
    __metadata("design:type", Object)
], LogoutPopoverComponent.prototype, "topMetrics", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('source'),
    __metadata("design:type", String)
], LogoutPopoverComponent.prototype, "Source", void 0);
LogoutPopoverComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'logout-popover',template:/*ion-inline-start:"/var/www/ENV/hotelpricer/app/src/components/logout-popover/logout-popover.html"*/'<li class="pri-menu__logout" float-right>\n  <ul class="pri-menu__full space-between">\n  	<li [hidden]="!topMetrics.last_updated" class="xs-text-normal"><small class="text-md-dark">Last updated at {{topMetrics.last_updated}}</small></li>  \n  	  <!-- <li class="xs-text-normal"><small class="text-md-dark">Last updated at Aug 18, 2017, 3:40 PM </small></li>   -->\n    <li (click)="showUserPopover($event)"><button ion-button clear color="dark"><ion-icon name="md-person"></ion-icon></button></li>\n  </ul>\n</li>\n\n'/*ion-inline-end:"/var/www/ENV/hotelpricer/app/src/components/logout-popover/logout-popover.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_app_globals__["a" /* AppGlobals */],
        __WEBPACK_IMPORTED_MODULE_4__providers_repricer_api__["a" /* RepricerApi */]])
], LogoutPopoverComponent);

//# sourceMappingURL=logout-popover.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterHistory; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FilterHistory = (function () {
    function FilterHistory() {
        console.log("filterhistory service init");
    }
    return FilterHistory;
}());
FilterHistory = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], FilterHistory);

//# sourceMappingURL=filter-history-service.js.map

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_repricer_api__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_guard__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_app_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_app_globals__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__popovers_battlefield_help_battlefield_help__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modals_prices_product_tabs_prices_product_tabs__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__filter_history_service__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_underscore__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_underscore__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PricesPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









// import { Subject } from 'rxjs/Subject';


// import * as moment from 'moment';
// import * as deparam from 'jquery-deparam';
var PricesPage = (function () {
    function PricesPage(filterhistory, viewctrl, app, location, repricerapi, navCtrl, authguard, appservice, navparams, appglobals, zone, popoverctrl, modalctrl, events, renderer, element) {
        this.filterhistory = filterhistory;
        this.viewctrl = viewctrl;
        this.app = app;
        this.location = location;
        this.repricerapi = repricerapi;
        this.navCtrl = navCtrl;
        this.authguard = authguard;
        this.appservice = appservice;
        this.navparams = navparams;
        this.appglobals = appglobals;
        this.zone = zone;
        this.popoverctrl = popoverctrl;
        this.modalctrl = modalctrl;
        this.events = events;
        this.renderer = renderer;
        this.element = element;
        this.hideFilter = true;
        this.priceListLoading = false;
        this.currentPage = '';
        // private naText = "--";
        this.naText = "";
        this.titleNaText = "Not found on the market place";
        this.productList = [];
        this.pendingCrawls = 0;
        this.firstCrawlFailed = 0;
        this.listingSubscription = null;
        this.disableFilter = true;
        this.topMetrics = {};
        this.showFailed = false;
        this.showInactive = false;
        this.demochartData = {
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
            options: { pointShape: 'circle', title: 'Price variation', width: 200, height: 50, chartArea: { width: '90%', height: '90%' }, legend: { position: 'none' }, vAxis: { textPosition: 'none', gridlines: { color: 'none' } }, hAxis: { textPosition: 'none' } }
        };
        this.defaultFilters = {
            limit: 20,
            page: 1,
            includesellers: 'no',
            sort: 'created_at',
            direction: 'desc'
        };
        this.paginationConfig = {
            id: 'productpaging',
            itemsPerPage: 20,
            currentPage: 1,
            totalItems: 0
        };
        // private sellerPageConfig: any = {
        //   itemsPerPage: 5,
        //   currentPage: 1,
        // }
        this.sellerPage = 1;
        this.dummyProducts = [];
        // private dummySellers = [];
        this.marketOptions = {
            all: { id: 0, active: true },
            amazon: { id: 1, active: false },
            flipkart: { id: 2, active: false },
            snapdeal: { id: 3, active: false },
            paytm: { id: 4, active: false }
        };
        this.filterOptions = {
            // market: null,
            search: {
                open: false,
                filtered: false,
                selected: 'product_title',
                selectedname: 'Product Title',
                value: '',
                options: [
                    // {slug: 'seller_id', name: 'Seller ID'},
                    { slug: 'listing_id', name: 'Listing ID' },
                    // {slug: 'sku_code', name: 'SKU Code'},
                    { slug: 'product_title', name: 'Product Title' }
                ]
            },
            price_status: {
                open: false,
                filtered: false,
                selected: '',
                options: [{ slug: 'at_my_min', name: "At my min" }, { slug: 'at_my_max', name: 'At my max' }, { slug: 'only_seller', name: "I\'m only seller" }]
            },
            pricing_outcome: {
                open: false,
                filtered: false,
                selected: '',
                options: [{ slug: 'im_cheapest', name: "You're lowest" }, { slug: 'i_have_buy_box', name: 'You have BuyBox' }, { slug: 'seller_is_cheapest', name: "You aren't lowest" }, { slug: 'i_am_only_seller', name: "You're the only seller" }, { slug: 'is_violation', name: 'Violations' }]
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
                options: [{ slug: 'asc', name: 'Asc' }, { slug: 'desc', name: 'Desc' }]
            },
            sort: {
                open: false,
                filtered: false,
                selected: 'created_at',
                options: [
                    // { slug: 'id', name: 'ID'},
                    // {slug: 'seller_id', name: 'Seller ID'},
                    { slug: 'listing_id', name: 'Listing ID' },
                    { slug: 'product_title', name: 'Product Title' },
                    // {slug: 'min', name: 'Min Price'},
                    // {slug: 'max', name: 'Max Price'},
                    // {slug: 'mop', name: 'MOP'},
                    { slug: 'mrp', name: 'MRP' },
                    { slug: 'created_at', name: 'Created At' },
                    { slug: 'last_updated', name: 'Last Crawled' }
                ]
            }
        };
        this.isOnline = false;
        this.marketName = '';
        this.viewInitialized = false;
        this.filterTemplate = {
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
        this.productModal = null;
        this.firstPageItem = 0;
        this.lastPageItem = 0;
        this.priceListError = false;
        this.firstImportPollCounter = null;
        this.loadingPriceTrend = true;
        this.defaultFiltersOnNoRecords = false;
        this.sellerSubscription = null;
        this.sellersFilter = {
            limit: 5,
            page: 1,
            sort: 'buy_box',
            direction: 'desc'
        };
        this.productTabsModal = null;
        this.editPrFlag = true;
        this.actFilter = {
            page: 1,
            limit: 20,
            sort: "created",
            direction: "desc"
        };
        this.exportDrop = {
            open: false
        };
        for (var x = 0; x < this.defaultFilters.limit; x++) {
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
    PricesPage.prototype.updateOnline = function (data) {
        this.isOnline = data;
    };
    PricesPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        console.log('ionviewcanenter PricesPage');
        return new Promise(function (resolve, reject) {
            _this.authguard.verifyToken('prices')
                .then(function () {
                _this.appglobals.setPageToNavigate({ page: 'prices' });
                _this.currentPage = 'prices';
                resolve(true);
            })
                .catch(function () {
                reject(true);
            });
        });
    };
    PricesPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log('ionViewDidEnter PricesPage ');
        this.viewInitialized = true;
        // console.log( this.viewctrl.getContent());
        // console.log(this.viewctrl.contentRef())
        // this.app.setTitle(`${this.appglobals.getAppName()} - Prices`);
        this.marketName = this.navparams.get('marketplace');
        if (this.marketName) {
            this.setMarket(this.marketName);
        }
        this.buildFiltersFromURL();
        this.updateFilterData('pageload');
        this.onPopStateHandler = function (state) {
            console.log('pressed onpop state => ', state);
            if (state && state.filters && state.filteroptions) {
                _this.filterhistory.filters = state.filters;
                _this.filterhistory.filterOptions = state.filteroptions;
                _this.filterhistory.productList = state.productlist;
                _this.filterhistory.paginationConfig = state.paginationconfig;
                _this.filterhistory.firstPageItem = state.firstpageitem;
                _this.filterhistory.lastPageItem = state.lastpageitem;
                _this.filterhistory.pendingCrawls = state.pendingcrawls;
                _this.filterhistory.firstCrawlFailed = state.firstcrawlfailed;
                _this.filterhistory.showFailed = state.showfailed;
                _this.filterhistory.showInactive = state.showinactive;
                _this.updateFilterData();
            }
            _this.hideModal();
            _this.zone.run(function () { });
            // this.navTo("prices","all");
        };
        this.events.subscribe('app:popstate', this.onPopStateHandler);
        this.onlineStatusSubscription = function (data) {
            _this.isOnline = data;
            console.log('app:onlinestatus', data);
        };
        this.events.subscribe('app:onlinestatus', this.onlineStatusSubscription);
        setTimeout(function () {
            _this.isOnline = _this.appservice.updateOnlineStatus();
        }, 1000);
        this.events.publish('app:updatehistory', 'prices');
        // setTimeout(() => {
        //   this.events.publish('app:updatehistory',{page:`/${this.marketName}`, state: {id: 'prices'}, frompath: `/prices`, replace: true});
        // },500)
        // this.events.publish('app:updatehistory',{page: `/${this.marketName}`, state: {}, replace: true, frompath: `/prices`});
        this.appservice.searchDebounceInit();
        this.searchChangeCallback = function () {
            console.log('updating filter...');
            _this.updateFilter('search', 'forceupdate');
        };
        this.events.subscribe('app:searchtermchanged', this.searchChangeCallback);
    };
    PricesPage.prototype.buildFiltersFromURL = function () {
        // this.currentURL = new URL('https://repricer2.ajency.in/prices/all/seller/287?page=1&sort=price&direction=asc');
        // this.currentURL = new URL(window.location.href);
        this.currentURL = this.appservice.getURLfromOmnibox('prices');
        console.log("current url => ", this.currentURL);
        var currenturlparts = this.currentURL['url'].pathname.split('/');
        this.sellerID = currenturlparts.length > 3 && (currenturlparts[3] === 'seller' || currenturlparts[3] === 'info' || currenturlparts[3] === 'activity') && currenturlparts[4] && !isNaN(currenturlparts[4]) ? Number(currenturlparts[4]) : 0;
        // console.log("seller id => ",this.sellerID);
        console.log("index of prices =>", this.currentURL['url'].pathname.split('/')[1].indexOf('prices'));
        if (this.sellerID) {
            // this.setSellersModal(this.dummyProducRecord);
            this.selectedTab = currenturlparts[3];
        }
        else if (this.filterhistory.internalNavigation) {
            this.filterhistory.internalNavigation = false;
        }
        else {
            this.filters = this.currentURL.jsonfilter && this.currentURL.currentpage ? this.currentURL.jsonfilter : null;
            console.log("constructed filters =>", this.filters);
        }
    };
    PricesPage.prototype.updateFilterData = function (caller) {
        var _this = this;
        if (caller === void 0) { caller = ''; }
        if (this.filterhistory.filters && this.filterhistory.filterOptions) {
            console.warn('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ updating filter data');
            this.filters = Object.assign({}, this.filterhistory.filters);
            this.filterOptions = Object.assign({}, this.filterhistory.filterOptions);
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
            setTimeout(function () {
                _this.disableFilter = false;
                _this.filterhistory.filters = null;
                _this.filterhistory.filterOptions = null;
                _this.filterhistory.productList = null;
                _this.filterhistory.paginationConfig = null;
                _this.filterhistory.firstPageItem = null;
                _this.filterhistory.lastPageItem = null;
                _this.filterhistory.pendingCrawls = null;
                _this.filterhistory.firstCrawlFailed = null;
                _this.filterhistory.showFailed = null;
                _this.filterhistory.showInactive = null;
            }, 500);
        }
        else {
            if (this.sellerID) {
                this.viewInitialized = false;
                // make api call for product before display in modal here
                this.repricerapi.getProduct(this.sellerID)
                    .subscribe(function (res) {
                    _this.viewInitialized = true;
                    if (res.success && res.data) {
                        _this.singleProduct = res.data;
                        _this.productList = [_this.singleProduct];
                        // this.productList.map((val) => { // for transmitting hover events from parent html into price-battefield component
                        //   val.parentsubject = new Subject<string>();
                        //   val.parentsubjectstream = val.parentsubject.asObservable();
                        // });
                        _this.addProperties(res.data, _this.selectedTab);
                    }
                    else {
                        _this.resetFilters('replaceurl');
                    }
                }, function (err) {
                    _this.viewInitialized = true;
                    _this.resetFilters('replaceurl');
                });
            }
            else if (this.filters || this.repricerapi.priceFilter) {
                if (this.repricerapi.priceFilter) {
                    this.filters = this.repricerapi.priceFilter;
                    this.repricerapi.priceFilter = null;
                }
                this.updateFilters();
            }
            else {
                this.resetFilters('replaceurl');
            }
        }
    }; // end updateFilterData
    PricesPage.prototype.updateFilters = function () {
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
    };
    PricesPage.prototype.buildFilterOptions = function () {
        var _this = this;
        var _loop_1 = function (key) {
            if (key === 'filters') {
                var filters = this_1.filters[key];
                for (var filterskey in filters) {
                    switch (filterskey) {
                        case 'pricing_outcome':
                            {
                                this_1.filterOptions[filterskey].selected = filters[filterskey];
                                this_1.filterOptions[filterskey].filtered = true;
                            }
                            ;
                            break;
                        case 'price':
                            {
                                this_1.filterOptions[filterskey].min = filters[filterskey].min;
                                this_1.filterOptions[filterskey].max = filters[filterskey].max;
                                this_1.filterOptions[filterskey].filtered = true;
                            }
                            ;
                            break;
                        case 'seller_count':
                            {
                                this_1.filterOptions['sellers'].min = filters[filterskey].min;
                                this_1.filterOptions['sellers'].max = filters[filterskey].max;
                                this_1.filterOptions['sellers'].filtered = true;
                            }
                            ;
                            break;
                    }
                }
            }
            else if (key === 'search') {
                this_1.filterOptions[key].value = this_1.filters[key].value;
                this_1.filterOptions[key].options.map(function (val) {
                    if (_this.filters[key].field === val.slug) {
                        _this.filterOptions[key].selected = val.slug;
                        _this.filterOptions[key].selectedname = val.name;
                    }
                });
            }
            else {
                if (this_1.filterOptions[key]) {
                    this_1.filterOptions[key].selected = this_1.filters[key];
                    this_1.filterOptions[key].filtered = true;
                }
            }
        };
        var this_1 = this;
        for (var key in this.filters) {
            _loop_1(key);
        }
    };
    PricesPage.prototype.searchItem = function (event) {
        this.appservice.triggerSearchChange(this.filterOptions.search.value);
    };
    PricesPage.prototype.ionViewWillUnload = function () {
        console.log("unloading page");
        this.clearFirstImportPoll();
        this.events.unsubscribe('app:searchtermchanged', this.searchChangeCallback);
        this.events.unsubscribe('app:popstate', this.onPopStateHandler);
        this.events.unsubscribe('app:onlinestatus', this.onlineStatusSubscription);
    };
    PricesPage.prototype.resetFilterTemplate = function () {
        for (var filter in this.filterOptions) {
            this.filterOptions[filter].open = false;
            if (filter === 'search') {
                this.filterOptions[filter].filtered = true;
                this.filterOptions[filter].value = '';
                this.filterOptions[filter].selectedname = 'Product Title';
                this.filterOptions[filter].selected = 'product_title';
            }
            else if (filter === 'direction') {
                this.filterOptions[filter].filtered = true;
                this.filterOptions[filter].selectedname = 'Desc';
                this.filterOptions[filter].selected = 'desc';
            }
            else if (filter === 'sort') {
                this.filterOptions[filter].filtered = true;
                this.filterOptions[filter].value = '';
                this.filterOptions[filter].selectedname = 'Created At';
                this.filterOptions[filter].selected = 'created_at';
            }
            else if (filter === 'price' || filter === 'sellers') {
                this.filterOptions[filter].filtered = false;
                this.filterOptions[filter].min = '';
                this.filterOptions[filter].max = '';
                this.filterOptions[filter].error = false;
            }
            else {
                this.filterOptions[filter].filtered = false;
                this.filterOptions[filter].selectedname = '';
                this.filterOptions[filter].selected = '';
            }
        }
    };
    PricesPage.prototype.showPBHelper = function (event) {
        var pricepopover = this.popoverctrl.create(__WEBPACK_IMPORTED_MODULE_7__popovers_battlefield_help_battlefield_help__["a" /* BattlefieldHelpPage */]);
        pricepopover.present({
            ev: event
        });
    };
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
    PricesPage.prototype.hideModal = function () {
        if (this.productModal) {
            this.productModal.dismiss();
        }
        else if (this.productTabsModal) {
            this.productTabsModal.dismiss();
        }
    };
    PricesPage.prototype.hideProductDetails = function (item) {
        // item.open = false;
        // item.isOpen = false;
        // item.selectedDetail = null;
        console.log("hideproductdetails doesnt do anything yet");
    };
    PricesPage.prototype.setMarket = function (marketn) {
        var market = this.marketOptions[marketn];
        if (!market) {
            console.warn('invalid market' + marketn + ' !');
            return;
        }
        for (var mkt in this.marketOptions) {
            this.marketOptions[mkt]['active'] = false;
        }
        market['active'] = true;
        if (market.id) {
            this.defaultFilters['marketplace_id'] = market.id;
        }
        this.zone.run(function () { });
    };
    PricesPage.prototype.filterMarket = function (market) {
        // this.navTo('prices',{market: this.marketName});
        if (!market)
            return;
        for (var mkt in this.marketOptions) {
            this.marketOptions[mkt]['active'] = false;
        }
        if (market.id) {
            this.defaultFilters['marketplace_id'] = market.id;
            this.filters['marketplace_id'] = market.id;
        }
        else {
            delete this.defaultFilters['marketplace_id'];
            delete this.filters['marketplace_id'];
        }
        market['active'] = true;
        this.getPriceList(1);
        this.zone.run(function () { });
    };
    PricesPage.prototype.goBack = function () {
        console.log('going back');
        // this.location.back();
        this.navTo('dashboard');
    };
    PricesPage.prototype.pagChanged = function (page) {
        this.content.scrollToTop();
        // this.paginationConfig.currentPage = page;
        this.getPriceList(page);
    };
    PricesPage.prototype.toggleFilterDisplay = function () {
        this.hideFilter = !this.hideFilter;
        this.zone.run(function () { });
    };
    PricesPage.prototype.getPriceList = function (page, pushurl) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (pushurl === void 0) { pushurl = true; }
        this.priceListLoading = true;
        this.priceListError = false;
        this.paginationConfig.currentPage = page;
        this.filters["page"] = page;
        this.productList = [];
        this.pendingCrawls = 0;
        this.firstCrawlFailed = 0;
        if (this.listingSubscription) {
            console.warn('unsubscribing to previous subscription');
            this.listingSubscription.unsubscribe();
        }
        var querystring = "?" + this.$.param(this.filters);
        this.listingSubscription = this.repricerapi.getProductList(this.filters, 'observable', 'nourlupdate')
            .subscribe(function (res) {
            console.log('prices', res);
            // this.paginationConfig.itemsPerPage = res.results_per_page
            _this.firstPageItem = ((res.page - 1) * res.results_per_page) + 1;
            // if (res.results_per_page < res.result_count) {
            //     end = itemsPerPage * page
            //     if (end > totalItems) {
            //       end = totalItems;
            //     }
            //   }
            _this.lastPageItem = (res.results_per_page < res.result_count) ? ((res.results_per_page * res.page > res.result_count) ? res.result_count : res.results_per_page * res.page) : res.result_count; //TBD refactor this
            _this.paginationConfig.totalItems = res.result_count;
            _this.productList = res.data;
            _this.pendingCrawls = _this.showInactive ? 0 : res.pending;
            _this.firstCrawlFailed = _this.showInactive ? 0 : res.first_crawled_not_succeeded;
            var marketplaceids = [], productids = [];
            _this.productList.map(function (val) {
                // val.parentsubject = new Subject<string>();
                // val.parentsubjectstream = val.parentsubject.asObservable();
                marketplaceids.push(val.marketplace_seller_id);
                productids.push(val.tracking_group_id);
            });
            console.log("marketplaceids ", marketplaceids);
            _this.loadingPriceTrend = true;
            _this.repricerapi.getSellerPriceTrend(666, { sids: marketplaceids, pids: productids, string_ids: true }, 'nourlupdate')
                .subscribe(function (res) {
                console.log("price trend => ", res);
                _this.productList.map(function (product) {
                    var productmatch = __WEBPACK_IMPORTED_MODULE_10_underscore__["find"](res.data, function (value) { return value['product_id'] == product['tracking_group_id']; });
                    console.log('productmatch =>', productmatch);
                    if (productmatch) {
                        var chartjson = {};
                        chartjson['chartType'] = _this.demochartData.chartType;
                        chartjson['options'] = _this.demochartData.options;
                        chartjson['dataTable'] = _this.appservice.decimateDatatable(productmatch['price_trend'] || []);
                        product.chartData = chartjson;
                    }
                });
                _this.loadingPriceTrend = false;
            }, function (err) { console.warn(err); _this.loadingPriceTrend = false; });
            _this.checkNPollForFirstImport();
            console.log('product list', _this.productList);
            _this.priceListLoading = false;
            if (pushurl) {
                _this.events.publish('app:updatehistory', { page: "/" + _this.marketName + querystring, state: { querystring: querystring, filters: _this.filters, filteroptions: _this.filterOptions, productlist: _this.productList, paginationconfig: _this.paginationConfig, firstpageitem: _this.firstPageItem, lastpageitem: _this.lastPageItem, pendingcrawls: _this.pendingCrawls, firstcrawlfailed: _this.firstCrawlFailed, showfailed: _this.showFailed, showinactive: _this.showInactive }, frompath: "/prices" });
            }
            else {
                _this.events.publish('app:updatehistory', { page: "/" + _this.marketName + querystring, state: { querystring: querystring, filters: _this.filters, filteroptions: _this.filterOptions, productlist: _this.productList, paginationconfig: _this.paginationConfig, firstpageitem: _this.firstPageItem, lastpageitem: _this.lastPageItem, pendingcrawls: _this.pendingCrawls, firstcrawlfailed: _this.firstCrawlFailed, showfailed: _this.showFailed, showinactive: _this.showInactive }, frompath: "/prices", replace: true });
            }
        }, function (err) {
            console.warn(err);
            _this.paginationConfig.totalItems = 0;
            _this.disableFilter = false;
            _this.priceListLoading = false;
            _this.priceListError = true;
            _this.zone.run(function () { });
        }, function () {
            _this.disableFilter = false;
            _this.listingSubscription.unsubscribe();
            _this.listingSubscription = null;
            _this.zone.run(function () { });
        });
        this.zone.run(function () { });
    };
    PricesPage.prototype.checkNPollForFirstImport = function () {
        var _this = this;
        console.log("checking for pending crawls ...");
        if (this.productList && this.productList.length === 0) {
            // poll here
            console.log("entered polling check ...");
            if (!this.firstImportPollCounter) {
                this.defaultFiltersOnNoRecords = false;
                var defaultFilterKeys = Object.keys(this.defaultFilters);
                if (Object.keys(this.filters).length === defaultFilterKeys.length) {
                    defaultFilterKeys.map(function (key) {
                        if (_this.filters[key] === _this.defaultFilters[key]) {
                            _this.defaultFiltersOnNoRecords = true;
                        }
                        else {
                            _this.defaultFiltersOnNoRecords = false;
                        }
                    });
                }
                if (this.defaultFiltersOnNoRecords) {
                    // if(!this.firstImportPollCounter){
                    console.log("starting polling...");
                    this.firstImportPollCounter = setInterval(function () {
                        _this.getPriceList();
                    }, this.appglobals.getPollInterval());
                    // }
                }
            }
        }
        else {
            if (this.productList && this.productList.length > 0) {
                this.clearFirstImportPoll();
            }
        }
    };
    PricesPage.prototype.clearFirstImportPoll = function () {
        if (this.firstImportPollCounter) {
            clearInterval(this.firstImportPollCounter);
            this.firstImportPollCounter = null;
            this.defaultFiltersOnNoRecords = false;
        }
    };
    PricesPage.prototype.itemMouseOver = function (item) {
        // console.log('item mouse over')
        if (this.appglobals.iosDevice === false) {
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
        this.zone.run(function () { });
    }; //end itemMouseOver
    PricesPage.prototype.itemMouseOut = function (item) {
        if (!item.selectedDetail) {
            item.open = false;
        }
        this.zone.run(function () { });
        // item.selectedDetail = null;
    };
    PricesPage.prototype.getSellersCall = function (item) {
        var _this = this;
        if (item.sellerSubscription) {
            item.sellerSubscription.unsubscribe();
        }
        item.sellersfilter = item.sellersfilter ? item.sellersfilter : Object.assign({}, this.sellersFilter);
        item.sellerPage = item.sellerPage ? item.sellerPage : 1;
        item.sellersfilter['page'] = item.sellerPage;
        item.sellersPageConfig = {
            id: item.product_details.id,
            itemsPerPage: item.sellersfilter["limit"],
            currentPage: item.sellerPage,
            totalItems: 0
        };
        item.sellersPageConfig = item.sellersPageConfig ? item.sellersPageConfig : { id: item.product_details.id, itemsPerPage: item.sellersfilter["limit"], currentPage: item.sellerPage, totalItems: 0 };
        item.asyncSellers = [];
        item.error = false;
        item.sellerSubscription = this.repricerapi.getSellers(item.product_details.id, item.sellersfilter)
            .subscribe(function (res) {
            item.asyncSellers = res.data;
            item.totalSellers = res.result_count;
            item.sellersPageConfig.totalItems = res.result_count;
        }, function (err) {
            console.warn(err);
            item.sellerSubscription.unsubscribe();
            item.sellerSubscription = null;
            item.error = true;
            console.warn('seller subscription unsubscribed on error.....');
            _this.zone.run(function () { });
        }, function () {
            item.sellerSubscription.unsubscribe();
            item.sellerSubscription = null;
            console.log('seller subscription unsubscribed.....');
            _this.zone.run(function () { });
        });
    };
    PricesPage.prototype.selerPageChange = function (event, item) {
        item.sellerPage = event;
        var offsetelement = document.querySelector("[offsetid='" + item.product_details.id + "']");
        // console.log('Current seller page..=> ',offsetelement.scrollTop);
        offsetelement.scrollTop = 0;
        // let vpreltop = offsetelement.getBoundingClientRect().top;
        // if(this.appglobals.isMobile()){
        //     this.content.scrollToTop();
        // }
        this.getSellersCall(item);
        // this.zone.run(() => {})
    };
    PricesPage.prototype.itemClick = function (event, item) {
        console.log("item target => ", event.target);
        if (event.target.nodeName === 'ION-SEGMENT-BUTTON') {
            //do something here
            console.log('ion segment clicked');
            return;
        }
        else if (this.$(event.target).parents('ion-list.list.list-md').length > 0) {
            // other stuff here
            console.log('ion list clicked');
            return;
        }
        else if (this.$(event.target).hasClass('pagination-previous') || this.$(event.target).hasClass('pagination-next') || this.$(event.target).hasClass('current') || this.$(event.target).hasClass('activated') || this.$(event.target).parents().find('a.activated').length === 1) {
            // other stuff
            console.log('pagination clicked');
            return;
        }
        else {
            console.log('default click handler');
            if (item.isOpen) {
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
        this.zone.run(function () { });
    };
    PricesPage.prototype.setSellersModal = function (item, edit, disableurlupdate) {
        var _this = this;
        if (edit === void 0) { edit = false; }
        if (disableurlupdate === void 0) { disableurlupdate = false; }
        item.sellerPage = 1;
        var competitorlistings = item.repricing.tracked_listings;
        var listingsids = competitorlistings.split(',');
        item.repricing.tracked_listings = listingsids.join(',  ');
        item.sellersPageConfig = { id: item.product_details.id, itemsPerPage: 0, currentPage: 1, totalItems: 0 };
        // console.log("location", window.location.pathname);
        if (!disableurlupdate) {
            this.events.publish('app:updatehistory', { page: "/" + this.marketName, state: { id: 'prices' }, frompath: "/prices", replace: true });
        }
        this.productTabsModal = this.modalctrl.create(__WEBPACK_IMPORTED_MODULE_8__modals_prices_product_tabs_prices_product_tabs__["a" /* PricesProductTabsPage */], { item: item, isOnline: this.isOnline, market: this.marketName, titleNaText: this.titleNaText, editproduct: edit }, { enableBackdropDismiss: false });
        this.productTabsModal.present({
            updateUrl: false
        });
        this.productTabsModal.onDidDismiss(function (data) {
            console.log('product tab dismissed');
            item.isOpen = false;
            item.open = false;
            item.selectedDetail = null;
            _this.productTabsModal = null;
            if (data) {
                if (data.product_details) {
                    // console.log('data', data);
                    _this.productList.map(function (val, index) {
                        if (val.product_details.id === data.product_details.id) {
                            for (var key in val) {
                                if (key !== 'channel_details' && key !== 'product_details' && key !== 'repricing' && key !== 'tracking_group_id') {
                                    data[key] = val[key];
                                }
                            }
                            _this.productList[index] = data;
                            console.log('productList =>', _this.productList[index]);
                            _this.zone.run(function () { });
                        }
                    });
                }
                _this.location.back();
                // this.events.publish('app:updatehistory',{page: `/${this.marketName}`, state: {id: "product-tab-dismiss"}, replace: true, frompath: `/prices`});
            }
            setTimeout(function () {
                var queryparams = _this.$.param(_this.filters);
                _this.events.publish('app:updatehistory', { page: "/" + _this.marketName + "?" + queryparams, state: { id: 'prices' }, frompath: "/prices", replace: true });
            }, 250);
        });
    };
    PricesPage.prototype.segmentClick = function (item, event, editproduct) {
        if (event === void 0) { event = null; }
        if (editproduct === void 0) { editproduct = false; }
        console.log('segmentclick info %O editproduct %b', item.selectedDetail, editproduct);
        switch (item.selectedDetail) {
            case 'seller':
                {
                    item.productTabOpen = item.activityTabOpen = false;
                    // if( item.sellersTabOpen && !this.appglobals.isMobile() ){
                    //   item.sellersTabOpen = false;
                    //   this.hideSelectedTab(item);
                    //   return;
                    // }
                    item.sellersTabOpen = true;
                    this.setSellersModal(item);
                }
                ;
                break;
            case 'info':
                {
                    item.sellersTabOpen = item.activityTabOpen = false;
                    item.productTabOpen = true;
                    this.setSellersModal(item, true);
                }
                ;
                break;
            case 'activity':
                {
                    item.sellersTabOpen = item.productTabOpen = false;
                    this.setSellersModal(item);
                    item.activityTabOpen = true;
                }
                ;
                break;
        }
        this.zone.run(function () { });
    }; // end segmentClick
    PricesPage.prototype.onTabScroll = function (event) {
        console.log('ionlist scroll event', event);
    };
    PricesPage.prototype.addProperties = function (item, selectedtab) {
        if (selectedtab === void 0) { selectedtab = ''; }
        item.selectedDetail = selectedtab ? selectedtab : 'seller';
        item.sellersTabOpen = true;
        this.setSellersModal(item);
    };
    PricesPage.prototype.resetFilters = function (replaceurl) {
        if (replaceurl === void 0) { replaceurl = ''; }
        console.log("resting filter =>", this.filters);
        this.filters = Object.assign({}, this.defaultFilters);
        //delete this.filters['show_failed'];
        this.showFailed = false;
        this.showInactive = false;
        this.disableFilter = true;
        this.resetFilterTemplate();
        this.getPriceList(1, replaceurl ? false : true);
    };
    PricesPage.prototype.getFailedProducts = function () {
        //this.filters = Object.assign({},this.defaultFilters);
        this.showFailed = true;
        this.showInactive = false;
        this.disableFilter = true;
        this.filters = Object.assign({}, this.defaultFilters);
        this.filters['show_failed'] = 'yes';
        this.resetFilterTemplate();
        this.getPriceList(1);
    };
    PricesPage.prototype.toggleExportDrop = function () {
        this.exportDrop.open = !this.exportDrop.open;
        this.zone.run(function () { });
    };
    PricesPage.prototype.exportFile = function (type) {
        var _this = this;
        var payload = {
            file_type: "xlsx"
        };
        if (type === 'competing') {
            payload['is_competing'] = true;
        }
        this.appservice.presentToast("Exporting file...");
        this.repricerapi.exportTemplate(payload)
            .then(function (res) {
            console.log(res);
            _this.appservice.downloadFile(res.file, res.name);
        })
            .catch(function (err) {
            console.warn(err);
            _this.appservice.presentToast('Export failed', 'warn');
        });
        this.exportDrop.open = false;
        this.zone.run(function () { });
    };
    PricesPage.prototype.toggleDrop = function (filtertype) {
        if (this.filterOptions[filtertype]) {
            for (var filter in this.filterOptions) {
                if (filter !== filtertype) {
                    this.filterOptions[filter].open = false;
                }
            }
            this.filterOptions[filtertype].open = !this.filterOptions[filtertype].open;
        }
        this.zone.run(function () { });
    };
    PricesPage.prototype.toggleActivityDrop = function (childacticity) {
        if (childacticity.opened) {
            childacticity.opened = false;
        }
        else {
            childacticity.opened = true;
        }
        this.zone.run(function () { });
    };
    PricesPage.prototype.ngOnChanges = function () {
        console.log("ngOnChanges to prices");
    };
    PricesPage.prototype.ngAfterViewInit = function () {
        console.log("ngAfterViewInit prices");
    };
    PricesPage.prototype.ngAfterContentInit = function () {
        console.log("ngAfterContentInit prices");
    };
    PricesPage.prototype.hideAllFilters = function (event) {
        var _this = this;
        console.log("hide filter => ", this.$(event.target).parents('.bt-dropdown').length);
        // this.$(event.target).parents('.bt-dropdown__dd').length;
        if (this.$(event.target).parents('.bt-dropdown').length === 0) {
            this.exportDrop.open = false;
        }
        this.appservice.hideAllDrops(event, this.filterOptions)
            .then(function (res) {
            _this.zone.run(function () { });
        })
            .catch(function (err) {
            console.warn(err);
        });
    };
    PricesPage.prototype.updateFilter = function (filtertype, force) {
        if (force === void 0) { force = ''; }
        if (this.disableFilter && !force) {
            return;
        }
        // if(this.listingSubscription){
        //   console.warn("listing subscription active")
        //   this.appservice.presentToast('Product list is being updated. Please try again!','warn');
        //   return;
        // }
        console.log('update filters here');
        var currentfilter = this.filterOptions[filtertype];
        if (!currentfilter)
            return;
        if (currentfilter && currentfilter.selected && currentfilter.options.length) {
            currentfilter.options.map(function (val) {
                if (val.slug === currentfilter.selected) {
                    currentfilter.selectedname = val.name;
                    currentfilter.filtered = true;
                    currentfilter.open = false;
                }
            });
        }
        switch (filtertype) {
            case 'sort':
                {
                    this.filters["sort"] = currentfilter.selected;
                    this.filters["direction"] = 'asc';
                    this.filterOptions["direction"].selected = 'asc';
                    this.filterOptions["direction"].selectedname = 'Asc';
                    // this.disableFilter = true;
                }
                ;
                break;
            case 'price_status':
                {
                    // filters[price_status]:at_my_min  [options: at_my_min, at_my_max, only_seller]
                    if (currentfilter.selected) {
                        this.filters['filters'] = this.filters['filters'] ? this.filters['filters'] : {};
                        this.filters['filters']["price_status"] = currentfilter.selected;
                    }
                    else {
                        currentfilter.filtered = false;
                        if (this.filters['filters']) {
                            if (this.filters['filters']['price_status']) {
                                delete this.filters['filters']['price_status'];
                            }
                            if (Object.keys(this.filters['filters']).length === 0) {
                                delete this.filters['filters'];
                            }
                        }
                        return;
                    }
                }
                ;
                break;
            case 'pricing_outcome':
                {
                    if (currentfilter.selected) {
                        this.filters['filters'] = this.filters['filters'] ? this.filters['filters'] : {};
                        this.filters['filters']["pricing_outcome"] = currentfilter.selected;
                    }
                    else {
                        currentfilter.filtered = false;
                        if (this.filters['filters']) {
                            if (this.filters['filters']['pricing_outcome']) {
                                delete this.filters['filters']['pricing_outcome'];
                            }
                            if (Object.keys(this.filters['filters']).length === 0) {
                                delete this.filters['filters'];
                            }
                        }
                        // return;
                    }
                }
                ;
                break;
            case 'direction':
                {
                    this.filters["direction"] = currentfilter.selected;
                }
                ;
                break;
            case 'search':
                {
                    if (currentfilter.selected) {
                        if (currentfilter.value) {
                            this.filters['search'] = {
                                field: currentfilter.selected,
                                value: currentfilter.value
                            };
                        }
                        else {
                            currentfilter.filtered = false;
                            delete this.filters['search'];
                            if (force === '') {
                                return;
                            }
                        }
                    }
                    else {
                        currentfilter.filtered = false;
                        delete this.filters['search'];
                        if (force === '') {
                            return;
                        }
                    }
                }
                ;
                break;
            case 'sellers':
                {
                    if (currentfilter.min && currentfilter.max && (Number(currentfilter.min) <= Number(currentfilter.max))) {
                        this.filters['filters'] = this.filters['filters'] ? this.filters['filters'] : {};
                        this.filters['filters']['seller_count'] = {};
                        this.filters['filters']['seller_count']['min'] = Number(currentfilter.min);
                        this.filters['filters']['seller_count']['max'] = Number(currentfilter.max);
                        currentfilter.error = false;
                        currentfilter.filtered = true;
                        currentfilter.open = false;
                    }
                    else {
                        currentfilter.filtered = false;
                        // currentfilter.open = false;
                        currentfilter.error = true;
                        if (this.filters['filters']) {
                            if (this.filters['filters']['seller_count']) {
                                delete this.filters['filters']['seller_count'];
                            }
                            if (Object.keys(this.filters['filters']).length === 0) {
                                delete this.filters['filters'];
                            }
                        }
                        return;
                    }
                }
                ;
                break;
            case 'price':
                {
                    if (currentfilter.min && currentfilter.max && (Number(currentfilter.min) <= Number(currentfilter.max))) {
                        this.filters['filters'] = this.filters['filters'] ? this.filters['filters'] : {};
                        this.filters['filters']['price'] = {};
                        this.filters['filters']['price']['min'] = Number(currentfilter.min);
                        this.filters['filters']['price']['max'] = Number(currentfilter.max);
                        currentfilter.error = false;
                        currentfilter.filtered = true;
                        currentfilter.open = false;
                    }
                    else {
                        currentfilter.filtered = false;
                        // currentfilter.open = false;
                        currentfilter.error = true;
                        if (this.filters['filters']) {
                            if (this.filters['filters']['price']) {
                                delete this.filters['filters']['price'];
                            }
                            if (Object.keys(this.filters['filters']).length === 0) {
                                delete this.filters['filters'];
                            }
                        }
                        return;
                    }
                }
                ;
                break;
        }
        console.log(this.filterOptions[filtertype]);
        console.log('price filters', this.filters);
        this.zone.run(function () { });
        this.getPriceList(1);
    };
    PricesPage.prototype.changeSearchField = function (field) {
        this.filterOptions['search'].selected = field;
        this.updateFilter('search');
    };
    PricesPage.prototype.navTo = function (page, market) {
        if (market === void 0) { market = ''; }
        console.log('navigating to page', page);
        var params = {};
        if (market) {
            params['marketplace'] = market;
        }
        if (page === 'prices') {
            this.filterhistory.internalNavigation = true;
        }
        this.$(event.currentTarget).removeAttr('href');
        this.appservice.updateRootNav(page, false, params);
    };
    PricesPage.prototype.orderSellersByPrice = function (item) {
        item.sortDirection === 'dsc' ? item.sortDirection = 'asc' : item.sortDirection = 'dsc';
        console.log(item.sortDirection);
        // item.sellers = this.appservice.orderBy(item.asyncSellers, 'price', item.sortDirection);
        // console.log(item.sellers)
        item.sellersfilter = item.sellersfilter ? item.sellersfilter : Object.assign({}, this.sellersFilter);
        item.sellersfilter['sort'] = 'price';
        item.sellersfilter['direction'] = item.sortDirection === 'dsc' ? 'desc' : 'asc';
        item.sellerPage = 1;
        this.getSellersCall(item);
        this.zone.run(function () { });
    };
    PricesPage.prototype.onContextMenu = function (event, page) {
        console.log("on context menu", event.currentTarget);
        this.$(event.currentTarget).attr('href', "/" + page);
    };
    return PricesPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Content */])
], PricesPage.prototype, "content", void 0);
PricesPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])({
        name: 'prices',
        segment: 'prices/:marketplace',
        defaultHistory: ['dashboard'],
        priority: 'off'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-prices',template:/*ion-inline-start:"/var/www/ENV/hotelpricer/app/src/pages/prices/prices.html"*/'<ion-header class="hidden-xs">\n   <ion-navbar no-padding>\n		<ion-title>\n			<!--<ion-title>Pricer - Prices</ion-title>-->\n			<div class="container">\n        		<div class="header-main" padding-horizontal>\n					<!-- Main Nav tabs -->\n					<ul class="nav pri-menu pri-to-nav">\n						<!--<li (click)="toggleMenu()" class="visible-xs pri-menu__hb"> <ion-icon name="menu"></ion-icon></li>-->\n						<li style="Width: 150px;" margin-right class="hidden-xs"><img src="../assets/img/tracker-logo.png" alt=""></li>\n						<!-- <li class="pri-menu__title hasub"> --><!-- <h1>Tracker</h1> --><!-- </li> -->\n						<li class="pri-menu__wrap hidden-xs-inline-block">\n							<ul class="pri-menu__full">\n								<!--<li *ngFor="let tab of activeTabsList" (click)="navTo(tab.segment);" [ngClass]="isActive(tab)"><a>{{tab.name}}</a></li>-->\n								<li><a (click)="navTo(\'dashboard\');" (contextmenu)="onContextMenu($event,\'dashboard\')">Dashboard</a></li>\n								<li><a (click)="navTo(\'import\')" (contextmenu)="onContextMenu($event,\'import\')">Import</a></li>  \n								<li class="active"><a (contextmenu)="onContextMenu($event,\'prices/all\')">Prices</a></li>\n								<!-- <li (click)="navTo(\'competitors\');"><a>Competitors</a></li>   -->\n								<!-- <li (click)="navTo(\'violations\');"><a>Violations</a></li> -->\n								<!-- <li (click)="navTo(\'products\');"><a>Products</a></li> -->\n								<!--<li (click)="navTo(\'pricingrule\');"><a>Pricing Rules</a></li>-->\n							</ul>\n						</li>\n						<!-- .... user popover will appear here and logout + settings will be a part of it .... -->\n						<!--<li (click)="signOut()" class="pri-menu__logout"><a>Logout</a></li>-->\n						<logout-popover>\n						</logout-popover>\n					</ul>\n				</div>\n			</div>\n		</ion-title>\n	 </ion-navbar>\n</ion-header>\n<ion-content (click)="hideAllFilters($event)" class="background-bt-grey-xs">\n	<div class="container" padding-horizontal>\n		<div class="header-secondary replace-header">\n			<ul class="nav pri-menu">\n				<li (click)="goBack()" class="visible-xs pri-menu__hb"> <ion-icon name="ios-arrow-back"></ion-icon></li>\n				<!-- <li class="pri-menu__title"><h2>Import product details from a CSV</h2></li> -->\n				<li class="pri-menu__wrap marketplace-tabs show-white">\n					<ul class="pri-menu__full" [hidden]="showFailed || showInactive">\n						<li [class.active]="marketOptions.all.active"><a (click)="navTo(\'prices\',\'all\')">All</a></li>\n						<li [class.active]="marketOptions.amazon.active"><a (click)="navTo(\'prices\',\'amazon\')" class="marketplaces m-amazon"><span class="m-h"></span></a></li>\n						<li [class.active]="marketOptions.flipkart.active"><a (click)="navTo(\'prices\',\'flipkart\')" class="marketplaces m-flipkart"><span class="m-h"></span></a></li>\n						<li [class.active]="marketOptions.snapdeal.active"><span class="not-allowed text-tooltip"><span class="tooltip-text">Coming Soon</span><a (click)="navTo(\'prices\',\'snapdeal\')" class="marketplaces m-snapdeal"><span class="m-h"></span></a></span></li>\n						<li [class.active]="marketOptions.paytm.active"><span class="not-allowed text-tooltip"><span class="tooltip-text">Coming Soon</span><a (click)="navTo(\'prices\',\'paytm\')" class="marketplaces m-paytm"><span class="m-h"></span></a></span></li>\n					</ul>\n				<ul class="pri-menu__full" [hidden]="!showFailed">\n						<li [class.active]="marketOptions.all.active"><a>Crawl Failed</a></li>\n				</ul>\n				<ul class="pri-menu__full" [hidden]="!showInactive">\n						<li [class.active]="marketOptions.all.active"><a>Inactive Products</a></li>\n				</ul>\n		</li>\n\n				 <!-- <li class="to-crawl hidden-xs" [hidden]="!pendingCrawls || pendingCrawls < 1">\n					<span class="sku-code">\n						Products to be crawled: {{pendingCrawls}}\n						<span (click)="resetFilters()" class="pending-crawls-refresh">\n							&nbsp;Check again\n						</span>\n					</span>\n				</li> -->\n\n    	<li class="to-crawl hidden-xs" [hidden]="!showFailed">\n			<span class="sku-code">\n			Showing failed products.\n			<span (click)="resetFilters()" class="pending-crawls-refresh">\n				&nbsp;Exit\n			</span>\n			</span>\n		</li>\n\n		<li class="to-crawl hidden-xs" [hidden]="!showInactive">\n			<span class="sku-code">\n			Showing inactive products.\n			<span (click)="resetFilters()" class="pending-crawls-refresh">\n				&nbsp;Exit\n			</span>\n			</span>\n		</li>\n\n		<li class="to-crawl hidden-xs" [hidden]="!firstCrawlFailed || firstCrawlFailed < 1 || showFailed">\n					<span class="sku-code">\n						<!-- <ion-icon name="ios-repeat"></ion-icon>  -->\n						<!-- Crawl failed: {{firstCrawlFailed}} -->\n            Some of your products did not crawl.\n            <span (click)="getFailedProducts()" class="pending-crawls-refresh">\n							&nbsp;Show failed products\n						</span>\n\n					</span>\n				</li>\n\n\n				<li class="buttons-right hidden-xs">\n					<ul class="pri-menu__full">\n						<!-- <li>\n							<div class="bt-dropdown open" [class.open]="exportDrop.open">\n								<a (click)="toggleExportDrop(\'sort\')">Export <ion-icon name="md-arrow-dropdown" class="vam"></ion-icon></a>\n								<div class="bt-dropdown__dd" style="z-index: 100;">\n									<ion-list>\n										<ion-item (click)="exportFile(\'all\')" style="cursor: pointer;">\n											<ion-label no-padding>All Products</ion-label>\n										</ion-item>\n										<ion-item (click)="exportFile(\'competing\')" style="cursor: pointer;">\n											<ion-label no-padding>Competing listings</ion-label>\n										</ion-item>\n									</ion-list>\n								</div>\n							</div>\n						</li> -->\n						<li><a (click)="navTo(\'import\')">Import <ion-icon name="ios-cloud-upload-outline" class="vam"></ion-icon> </a></li> \n						<li class="prices-legend">\n							<ion-badge class="bb" color="orange" text-uppercase>BB</ion-badge> BuyBox\n						</li>\n						<li padding-left>\n							<span [hidden]="paginationConfig.totalItems > 0"> - to -- of <strong>---</strong></span>\n							<span [hidden]="paginationConfig.totalItems == 0">{{firstPageItem}} to {{lastPageItem}} of <strong>{{paginationConfig.totalItems}}</strong></span>\n						</li>\n					</ul>\n				</li>\n			</ul>\n		</div>\n\n\n		<!-- test -->\n\n		<div class="filters flex flex-space-between flex-items-center">\n			<!-- crawling -->\n\n\n			<!-- <div class="to-crawl visible-xs m-t-5" [hidden]="!pendingCrawls || pendingCrawls < 1">\n				<span class="sku-code">\n					Products to be crawled: {{pendingCrawls}}\n					<span (click)="resetFilters()" class="pending-crawls-refresh">\n						&nbsp;Check again\n					</span>\n				</span>\n			</div> -->\n\n		<div [hidden]="!topMetrics.last_updated" class="visible-xs center-block m-t-5"><small class="text-md-dark">Last updated at {{topMetrics.last_updated}} </small></div>\n\n		<div class="to-crawl visible-xs m-t-5" [hidden]="!showFailed">\n			<span class="sku-code">\n				Showing failed products.\n				<span (click)="resetFilters()" class="pending-crawls-refresh">\n					&nbsp;Exit\n				</span>\n			</span>\n		</div>\n\n	    <div class="to-crawl visible-xs m-t-5" [hidden]="!showInactive">\n			<span class="sku-code">\n				Showing inactive products.\n				<span (click)="resetFilters()" class="pending-crawls-refresh">\n					&nbsp;Exit\n				</span>\n			</span>\n		</div>\n\n			<div class="to-crawl visible-xs m-t-5" [hidden]="!firstCrawlFailed || firstCrawlFailed < 1 || showFailed">\n				<span class="sku-code">\n					<!-- Crawl failed: {{firstCrawlFailed}} -->\n          Some of your products did not crawl.\n          <span (click)="getFailedProducts()" class="pending-crawls-refresh no-wrap">\n						&nbsp;Show failed products\n					</span>\n				</span>\n			</div>\n\n			<!-- /crawling -->\n			<div class="status-container" [hidden]="showFailed || showInactive">\n				<ul class="">\n					<li (click)="filterOptions.pricing_outcome.selected == otcmfilter.slug ? filterOptions.pricing_outcome.selected = \'\' : filterOptions.pricing_outcome.selected = otcmfilter.slug; updateFilter(\'pricing_outcome\',\'force\');" *ngFor="let otcmfilter of filterOptions.pricing_outcome.options" [class.active]="filterOptions.pricing_outcome.selected == otcmfilter.slug">\n						<!-- <a href=""> -->\n							<!-- <div><strong>{{ priceListLoading == false && filterOptions.pricing_outcome.selected == otcmfilter.slug ? paginationConfig.totalItems : naText }}</strong></div> -->\n							 <span>{{otcmfilter.name}}</span>\n						<!-- </a> -->\n					</li>\n				</ul>\n			</div>\n\n\n			<div class="flex">\n				<div class="filters__search flex">\n					<div class="bt-dropdown" [class.open]="filterOptions.search.open">\n						<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n						<!-- .... just adding the class will show the dropdown .... -->\n						<!-- .... if any of the elements are selected then add class "filtered" to parent div "bt-dropdown" .... -->\n						<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop btn-search" (click)="toggleDrop(\'search\')">\n							<ion-icon name="ios-search"></ion-icon> {{filterOptions.search.selectedname}}  <ion-icon name="ios-arrow-down"></ion-icon>\n						</button>\n						<div class="bt-dropdown__dd">\n							<button ion-button color="dark" (click)="changeSearchField(field.slug)" *ngFor="let field of filterOptions.search.options" clear no-margin block class="bt-dropdown__btn button-drop">{{field.name}}</button>\n						</div>\n					</div>\n					<input [(ngModel)]="filterOptions.search.value" #searchBox (keyup)="searchItem($event)" type="text" class="form-control" placeholder="Type to search" padding-left>\n				</div>\n				<!-- .... On click of this button  ... -->\n				<!-- .... toggle class "open" here ... -->\n				<a (click)="toggleFilterDisplay()" class="filters__toggle" [class.open]="!hideFilter" [hidden]="showFailed || showInactive"><img src="./assets/img/filter.png" alt=""></a>\n\n\n				<button [hidden]="!hideFilter || showFailed || showInactive" (click)="resetFilters()" ion-button color="secondary" no-margin class="btn-reset hidden-xs" clear><ion-icon name="md-refresh" class="hidden-xs"></ion-icon><span class="visible-xs">Reset</span></button>\n			</div>\n\n			<!-- filters -->\n			<!-- .... toggle this one -->\n			<div [ngClass]="{\'hidden\': hideFilter}" class="filters__wrap">\n				<!-- <button (click)="resetFilters()" ion-button color="secondary" no-margin class="btn-reset" clear><ion-icon name="md-refresh" class="hidden-xs"></ion-icon><span class="visible-xs">Reset</span></button> -->\n\n				<div class="bt-dropdown" [class.open]="filterOptions.sellers.open" [class.filtered]="filterOptions.sellers.filtered">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button (click)="toggleDrop(\'sellers\')" ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Sellers\n							<!--<span [hidden]="!filterOptions.sellers.filtered">&nbsp;({{filterOptions.sellers.min.toLocaleString()}} - {{filterOptions.sellers.max.toLocaleString()}})</span> -->\n						<ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd range-dd">\n						<!--<ion-item>-->\n							<!-- .... this range slider stops working when this is added -> dualKnobs="true" .... -->\n							<!-- .... please check as it needs to have dual knobs - for max and min .... -->\n							<!--<ion-range min="1000" max="2000" color="green">-->\n								<!-- <ion-icon range-left small name="sunny"></ion-icon>\n								<ion-icon range-right name="sunny"></ion-icon> -->\n							<!--</ion-range>-->\n						<!--</ion-item>-->\n						<!-- <div> -->\n							<ion-list class="filter-boxes inline" padding-horizontal>\n								<ion-item>\n									<ion-label stacked>Min</ion-label>\n									<ion-input min="1" (keyup.enter)="updateFilter(\'sellers\')" [(ngModel)]="filterOptions.sellers.min" type="number"></ion-input>\n								</ion-item>\n								<ion-item>\n									<ion-label stacked>Max</ion-label>\n									<ion-input min="1" (keyup.enter)="updateFilter(\'sellers\')" [(ngModel)]="filterOptions.sellers.max" type="number"></ion-input>\n								</ion-item>\n							</ion-list>\n						<!-- </div> -->\n						<div [hidden]="!filterOptions.sellers.error" class="error error--danger">\n							Min should be less than Max!\n						</div>\n						<div style="text-align: center;" padding-horizontal>\n							<button ion-button color="green" class="btn-apply" block (click)="updateFilter(\'sellers\')" no-margin>Apply</button>\n						</div>\n					</div>\n				</div>\n				<div class="bt-dropdown" [class.open]="filterOptions.price.open" [class.filtered]="filterOptions.price.filtered">\n					<button (click)="toggleDrop(\'price\')" ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> My Price\n							<!--<span [hidden]="!filterOptions.price.filtered">&nbsp;({{filterOptions.price.min.toLocaleString()}} - {{filterOptions.price.max.toLocaleString()}})</span> -->\n						<ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd range-dd">\n						<!--<ion-item>-->\n							<!-- .... this range slider stops working when this is added -> dualKnobs="true" .... -->\n							<!-- .... please check as it needs to have dual knobs - for max and min .... -->\n							<!--<ion-range min="1000" max="2000" color="green">-->\n								<!-- <ion-icon range-left small name="sunny"></ion-icon>\n								<ion-icon range-right name="sunny"></ion-icon> -->\n							<!--</ion-range>-->\n						<!--</ion-item>-->\n						<!-- <div> -->\n							<ion-list class="filter-boxes inline" padding-horizontal>\n								<ion-item class="has-rupee-symbol">\n									<ion-label stacked>Min</ion-label>\n									<ion-input min="1" (keyup.enter)="updateFilter(\'price\')" [(ngModel)]="filterOptions.price.min" type="number"></ion-input>\n								</ion-item>\n								<ion-item class="has-rupee-symbol">\n									<ion-label stacked>Max</ion-label>\n									<ion-input min="1" (keyup.enter)="updateFilter(\'price\')" [(ngModel)]="filterOptions.price.max" type="number"></ion-input>\n								</ion-item>\n							</ion-list>\n						<!-- </div> -->\n						<div [hidden]="!filterOptions.price.error" class="error error--danger">\n							Min should be less than Max!\n						</div>\n						<div style="text-align: center;" padding-horizontal>\n							<button ion-button color="green" class="btn-apply" full (click)="updateFilter(\'price\')" no-margin>Apply</button>\n						</div>\n					</div>\n				</div>\n				<!--<div class="bt-dropdown">\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Pricing Rule <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						blah\n					</div>\n				</div>-->\n				<!--<div class="bt-dropdown">\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Last Repriced <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						blah\n					</div>\n				</div>-->\n				<div class="bt-dropdown" [class.open]="filterOptions.sort.open" [class.filtered]="filterOptions.sort.filtered">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button (click)="toggleDrop(\'sort\')" ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Sort by\n							<!--<span [hidden]="!filterOptions.sort.selectedname">&nbsp;({{filterOptions.sort.selectedname}})</span>-->\n						<ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						<ion-list radio-group [(ngModel)]="filterOptions.sort.selected" (ionChange)="updateFilter(\'sort\')">\n							<ion-item *ngFor="let item of filterOptions.sort.options">\n								<ion-label no-padding>{{item.name}}</ion-label>\n								<ion-radio color="green" no-padding value="{{item.slug}}"></ion-radio>\n							</ion-item>\n						</ion-list>\n					</div>\n				</div>\n				<div class="bt-dropdown" [class.open]="filterOptions.direction.open" [class.filtered]="filterOptions.direction.filtered">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button (click)="toggleDrop(\'direction\')" ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Order\n							<!--<span [hidden]="!filterOptions.direction.selectedname">&nbsp;({{filterOptions.direction.selectedname}})</span>-->\n						<ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd order-dd">\n						<ion-list radio-group [(ngModel)]="filterOptions.direction.selected" (ionChange)="updateFilter(\'direction\')">\n							<ion-item *ngFor="let item of filterOptions.direction.options">\n								<ion-label no-padding>{{item.name}}</ion-label>\n								<ion-radio color="green" no-padding value="{{item.slug}}"></ion-radio>\n							</ion-item>\n						</ion-list>\n					</div>\n				</div>\n				<!--<button ion-button color="green" class="btn-apply" no-margin>Apply</button>-->\n				 <button (click)="resetFilters()" ion-button color="secondary" no-margin class="btn-reset" clear><ion-icon name="md-refresh" class="hidden-xs"></ion-icon><span class="visible-xs">Reset</span></button>\n			</div>\n\n			<!-- <button [ngClass]="{\'visible-xs\': !hideFilter}" (click)="resetFilters()" ion-button color="secondary" no-margin class="btn-reset" clear><ion-icon name="md-refresh"></ion-icon><span class="visible-xs">Reset</span></button> -->\n			<!-- /filters -->\n		</div>\n		<!-- /test -->\n\n		<div class="tabular">\n			<div class="tabular__header flex hidden-xs">\n				<div class="tabular__cell cell-1 t-check">\n					<ion-item no-padding>\n						<ion-checkbox [disabled]="!isOnline" color="dark" no-padding></ion-checkbox>\n					</ion-item>\n				</div>\n				<div class="tabular__cell cell-7 t-product">Product</div>\n				<div class="tabular__cell cell-3 t-price  text-right">My Price</div>\n				<!-- <div class="tabular__cell cell-5 t-rule">Pricing Rule</div>  -->\n				<div class="tabular__cell cell-7 t-battle text-center"><span class="show-cursor">Price Battlefield <ion-icon (click)="showPBHelper($event)" name="md-help-circle" class="text-lighter"></ion-icon></span></div>\n				<!-- <div class="tabular__cell cell-5 t-rule"></div>   -->\n				<div class="tabular__cell cell-2 t-listing">Sellers</div>\n				<div class="tabular__cell cell-3 t-seller">Mapped Listings</div>\n				<div class="tabular__cell cell-5 t-battle text-center"><span class="show-cursor">Price Trend</span></div>\n				<div class="tabular__cell cell-2 "></div>\n				<!-- show the tooltip on click of this <span> -->\n				<!-- <div class="tabular__cell cell-5 t-battle"><span class="show-cursor">Price Battlefield <ion-icon (click)="showPBHelper($event)" name="md-help-circle" class="text-lighter"></ion-icon></span></div> -->\n			</div>\n			<!-- .... the loader .... -->\n			<div class="tabular__row flex has-anim-loader" [hidden]="priceListLoading == false" *ngFor="let dummy of dummyProducts">\n				<div class="masked masked--prices">\n					<div class="masked__bg">\n						<div class="masked__elements">\n							<div class="masked__elem masked--1"></div>\n							<div class="masked__elem masked--2"></div>\n							<div class="masked__elem masked--3"></div>\n							<div class="masked__elem masked--4"></div>\n							<div class="masked__elem masked--5"></div>\n							<div class="masked__elem masked--6"></div>\n							<div class="masked__elem masked--7"></div>\n							<div class="masked__elem masked--8"></div>\n							<div class="masked__elem masked--9"></div>\n							<div class="masked__elem masked--10"></div>\n							<div class="masked__elem masked--11"></div>\n							<div class="masked__elem masked--12"></div>\n							<div class="masked__elem masked--13"></div>\n							<div class="masked__elem masked--14"></div>\n							<div class="masked__elem masked--15"></div>\n							<div class="masked__elem masked--16"></div>\n						</div>\n					</div>\n				</div>\n			</div>\n			<!-- .... add class "violated" to this tabular__row if there\'s a violation here .... -->\n			<!-- .... add class "open" when tapped or clicked .... -->\n			<!--<div class="tabular__row flex" *ngIf="!priceListLoading && !productList.length" style="justify-content: center;">-->\n			<div class="tabular__row flex" [hidden]="!viewInitialized || priceListLoading || productList.length > 0 || priceListError || ( defaultFiltersOnNoRecords && marketName == \'all\' )" style="justify-content: center;">\n				<strong>No records found</strong>\n			</div>\n			<div class="tabular__row flex-column" [hidden]="priceListLoading || productList.length > 0 || priceListError || !defaultFiltersOnNoRecords || marketName != \'all\'" style="justify-content: center;">\n				<div class="flex-content">\n					<strong>\n						It takes a few minutes for us to fetch the data for your uploaded products. <span (click)="resetFilters()" class="pending-crawls-refresh">Click here to refresh</span>\n					</strong>\n				</div>\n			</div>\n\n			<div class="tabular__row flex" [hidden]="priceListLoading || productList.length > 0 || !priceListError" style="justify-content: center;">\n				<strong>An error occured while loading price results!</strong>\n			</div>\n			<!--<div class="tabular__row flex" [hidden]="productList.length || priceListLoading == false" style="justify-content: center;">\n				<strong>Loading...</strong>\n			</div>-->\n			<price-row \n				(click)="itemClick($event,item)" \n				(mouseleave)="itemMouseOut(item)" \n				(mouseover)="itemMouseOver(item)" \n				[ngClass]="{\'open\': item.open, \'violated\': item.repricing.violated, \'disabled-row\': !item.product_details.in_stock}" \n				[item]="item"\n				[loadingpricetrend]="loadingPriceTrend"\n				(segmentClicked)="segmentClick(item, editPrFlag)"\n				*ngFor="let item of productList | paginate: paginationConfig"\n			>\n			</price-row>\n			<pagination-controls id="productpaging" (pageChange)="pagChanged($event)" autoHide="true"></pagination-controls>\n		</div>\n	</div>\n</ion-content>\n<ion-footer>\n	<footer-element></footer-element>\n</ion-footer>\n'/*ion-inline-end:"/var/www/ENV/hotelpricer/app/src/pages/prices/prices.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__filter_history_service__["a" /* FilterHistory */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* App */],
        __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"],
        __WEBPACK_IMPORTED_MODULE_3__providers_repricer_api__["a" /* RepricerApi */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_guard__["a" /* AuthGuard */],
        __WEBPACK_IMPORTED_MODULE_5__providers_app_service__["a" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_6__providers_app_globals__["a" /* AppGlobals */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Events */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
], PricesPage);

//# sourceMappingURL=prices.js.map

/***/ })

});
//# sourceMappingURL=3.main.js.map