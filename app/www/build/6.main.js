webpackJsonp([6],{

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__competitor_products__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_logout_popover_logout_popover_module__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_pagination__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_star_ratings_star_ratings_module__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_footer_element_footer_element_module__ = __webpack_require__(481);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompetitorProductsPageModule", function() { return CompetitorProductsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var CompetitorProductsPageModule = (function () {
    function CompetitorProductsPageModule() {
    }
    return CompetitorProductsPageModule;
}());
CompetitorProductsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__competitor_products__["a" /* CompetitorProductsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__components_logout_popover_logout_popover_module__["a" /* LogoutPopoverComponentModule */],
            __WEBPACK_IMPORTED_MODULE_4_ngx_pagination__["a" /* NgxPaginationModule */],
            __WEBPACK_IMPORTED_MODULE_5__components_star_ratings_star_ratings_module__["a" /* StarRatingsComponentModule */],
            __WEBPACK_IMPORTED_MODULE_6__components_footer_element_footer_element_module__["a" /* FooterElementComponentModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__competitor_products__["a" /* CompetitorProductsPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__competitor_products__["a" /* CompetitorProductsPage */]
        ]
    })
], CompetitorProductsPageModule);

//# sourceMappingURL=competitor-products.module.js.map

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

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_globals__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_repricer_api__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompetitorProductsPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CompetitorProductsPage = (function () {
    function CompetitorProductsPage(navCtrl, navParams, appservice, location, zone, events, appglobals, repricerapi) {
        // this.hideFilter = this.appglobals.isMobile() ? true : false;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appservice = appservice;
        this.location = location;
        this.zone = zone;
        this.events = events;
        this.appglobals = appglobals;
        this.repricerapi = repricerapi;
        this.hideFilter = true;
        this.naText = '--';
        this.dummyProducts = [];
        this.filterOptions = {
            search: {
                open: false,
                filtered: false,
                selected: 'seller_name',
                selectedname: 'Seller Name',
                value: '',
                options: [
                    { slug: 'product_title', name: 'Product Title' },
                    { slug: 'listing_id', name: 'Seller ID' },
                    { slug: 'seller_name', name: 'Seller Name' }
                ]
            },
            marketplace_id: {
                open: false,
                filtered: false,
                selected: '',
                options: [{ slug: 'all', name: 'All' }, { slug: '1', name: 'Amazon' }, { slug: '2', name: 'Flipkart' }, { slug: '3', name: 'Snapdeal' }, { slug: '4', name: 'Paytm' }]
            },
            attribute: {
                open: false,
                filtered: false,
                selected: '',
                options: [{ slug: 'mop_violation', name: 'MOP Violation' }, { slug: 'mrp_violation', name: 'MRP Violation' }]
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
                selected: 'updated_on',
                options: [
                    { slug: 'updated_on', name: 'Updated On' }
                ]
            }
        };
        this.disableFilter = true;
        this.referer = '';
        this.sellerDetails = {};
        this.paginationConfig = {
            itemsPerPage: 20,
            currentPage: 1,
            totalItems: 0
        };
        this.defaultFilters = {
            limit: 20,
            page: 1,
            sort: 'updated_on',
            direction: 'desc'
        };
        this.firstPageItem = 0;
        this.lastPageItem = 0;
        this.listLoading = false;
        this.compProducts = [];
        this.listSubscription = null;
        this.violation = '';
        // ngOnInit(): void{
        // }
        this.hideUniqueSeller = false;
        this.compProductError = false;
        this.filters = Object.assign({}, this.defaultFilters);
        for (var x = 0; x < this.defaultFilters.limit; x++) {
            this.dummyProducts.push({});
        }
    }
    CompetitorProductsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CompetitorProductsPage');
    };
    CompetitorProductsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log('ionViewDidEnter compproducts');
        this.referer = this.navParams.get("referer");
        this.violation = this.navParams.get("violation");
        this.sellerDetails = this.navParams.get('sellerdetails');
        console.log('seller d', this.sellerDetails);
        if (this.sellerDetails && this.sellerDetails.id) {
            console.log("sellerDetaulas present");
            this.filters['seller_id'] = this.sellerDetails.id;
            if (this.violation) {
                console.log("violation", this.violation);
                this.filterOptions.attribute.selected = this.violation;
                this.updateFilter('attribute', 'forceupdate');
                this.filterOptions.search.value = this.sellerDetails.seller_name;
            }
        }
        else {
            this.resetFilter();
        }
        this.events.publish('app:updatehistory', 'competitor-products');
        this.appservice.searchDebounceInit();
        this.searchChangeCallback = function () {
            console.log('updating filter...');
            _this.updateFilter('search', 'forceupdate');
        };
        this.events.subscribe('app:searchtermchanged', this.searchChangeCallback);
    }; //end ionViewDidEnter
    CompetitorProductsPage.prototype.ionViewWillUnload = function () {
        this.events.unsubscribe('app:searchtermchanged', this.searchChangeCallback);
    };
    CompetitorProductsPage.prototype.showAllProducts = function () {
        this.filterOptions.attribute.selected = '';
        this.updateFilter('attribute', 'forceupdate');
        // this.hideUniqueSeller = true;
        this.zone.run(function () { });
    };
    CompetitorProductsPage.prototype.changeSearchField = function (field) {
        this.filterOptions['search'].selected = field;
        this.updateFilter('search');
    };
    CompetitorProductsPage.prototype.searchItem = function (event) {
        this.appservice.triggerSearchChange(this.filterOptions.search.value);
    };
    CompetitorProductsPage.prototype.toggleDrop = function (filtertype) {
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
    CompetitorProductsPage.prototype.updateFilter = function (filtertype, force) {
        if (force === void 0) { force = ''; }
        if (this.disableFilter && force === '') {
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
                    // this.filters["direction"] = 'asc';
                    // this.filterOptions["direction"].selected = 'asc';
                    // this.filterOptions["direction"].selectedname = 'Asc';
                    // this.disableFilter = true;
                }
                ;
                break;
            case 'marketplace_id':
            case 'attribute':
                {
                    if (currentfilter.selected) {
                        this.filters['filters'] = this.filters['filters'] ? this.filters['filters'] : {};
                        if (filtertype === 'marketplace_id' && currentfilter.selected === 'all') {
                            delete this.filters['filters'][filtertype];
                        }
                        else {
                            this.filters['filters'][filtertype] = currentfilter.selected;
                        }
                    }
                    else {
                        currentfilter.filtered = false;
                        if (this.filters['filters']) {
                            if (this.filters['filters'][filtertype]) {
                                delete this.filters['filters'][filtertype];
                            }
                            if (Object.keys(this.filters['filters']).length === 0) {
                                delete this.filters['filters'];
                            }
                        }
                        if (force === '') {
                            return;
                        }
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
        }
        console.log(this.filterOptions[filtertype]);
        console.log('price filters', this.filters);
        this.zone.run(function () { });
        this.listCompProducts();
    };
    CompetitorProductsPage.prototype.resetFilter = function () {
        this.filters = Object.assign({}, this.defaultFilters);
        this.resetFilterTemplate();
        this.listCompProducts();
        this.hideUniqueSeller = true;
    };
    CompetitorProductsPage.prototype.resetFilterTemplate = function () {
        this.disableFilter = true;
        for (var filter in this.filterOptions) {
            this.filterOptions[filter].open = false;
            if (filter === 'search') {
                this.filterOptions[filter].filtered = true;
                this.filterOptions[filter].value = '';
                this.filterOptions[filter].selectedname = 'Seller Name';
                this.filterOptions[filter].selected = 'seller_name';
            }
            else if (filter === 'direction') {
                this.filterOptions[filter].filtered = true;
                this.filterOptions[filter].selectedname = 'Desc';
                this.filterOptions[filter].selected = 'desc';
            }
            else if (filter === 'sort') {
                this.filterOptions[filter].filtered = true;
                this.filterOptions[filter].selectedname = 'Updated On';
                this.filterOptions[filter].selected = 'updated_on';
            }
            else {
                this.filterOptions[filter].filtered = false;
                this.filterOptions[filter].selectedname = '';
                this.filterOptions[filter].selected = '';
            }
        }
        // this.zone.run(() => {})
    };
    CompetitorProductsPage.prototype.listCompProducts = function (page) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (this.listSubscription) {
            this.listSubscription.unsubscribe();
            this.listSubscription = null;
        }
        this.paginationConfig.currentPage = page;
        this.filters['page'] = this.paginationConfig.currentPage;
        this.listLoading = true;
        this.compProductError = false;
        this.compProducts = [];
        this.listSubscription = this.repricerapi.getCompetitorProducts(this.filters)
            .subscribe(function (res) {
            console.log(res);
            if (res.success) {
                // this.paginationConfig.itemsPerPage = res.results_per_page
                _this.firstPageItem = ((res.page - 1) * res.results_per_page) + 1;
                _this.lastPageItem = (res.results_per_page < res.result_count) ? ((res.results_per_page * res.page > res.result_count) ? res.result_count : res.results_per_page * res.page) : res.result_count; //TBD refactor this
                _this.paginationConfig.totalItems = res.result_count;
                _this.listLoading = false;
                _this.compProducts = res.data;
            }
            else {
                _this.appservice.presentToast("failed to load list", 'error');
            }
        }, function (err) {
            console.warn(err);
            _this.paginationConfig.totalItems = 0;
            _this.listLoading = false;
            _this.compProductError = true;
            _this.zone.run(function () { });
        }, function () {
            _this.listSubscription.unsubscribe();
            _this.listSubscription = null;
            _this.disableFilter = false;
            _this.zone.run(function () { });
        });
    };
    CompetitorProductsPage.prototype.pagChanged = function (page) {
        this.content.scrollToTop();
        this.listCompProducts(page);
    };
    CompetitorProductsPage.prototype.assignColorClass = function (flag, type) {
        var classtype = 'orange';
        switch (type) {
            case 'fbm':
                { }
                ;
                break;
            case 'mop':
                { }
                ;
                break;
            case 'mrp':
                { }
                ;
                break;
        }
        return classtype;
    };
    CompetitorProductsPage.prototype.navTo = function (page, params) {
        if (params === void 0) { params = {}; }
        console.log('navigating to page', params);
        this.appservice.updateRootNav(page, false, params);
    };
    CompetitorProductsPage.prototype.goBack = function () {
        console.log('going back');
        this.location.back();
    };
    CompetitorProductsPage.prototype.toggleFilterView = function () {
        this.hideFilter = !this.hideFilter;
        this.zone.run(function () { });
    };
    CompetitorProductsPage.prototype.hideAllFilters = function (event) {
        // console.log(event.target.className)
        var _this = this;
        // if(event.target.className === 'button-inner') return;
        // for(let filter in this.filterOptions){
        //   this.filterOptions[filter].open = false;
        // }
        // this.zone.run(() => {});
        this.appservice.hideAllDrops(event, this.filterOptions)
            .then(function (res) {
            _this.zone.run(function () { });
        })
            .catch(function (err) {
            console.warn(err);
        });
    };
    return CompetitorProductsPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Content */])
], CompetitorProductsPage.prototype, "content", void 0);
CompetitorProductsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])({
        name: 'competitor-products',
        segment: 'competitor-products/:violation',
        priority: 'off'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-competitor-products',template:/*ion-inline-start:"/var/www/ENV/hotelpricer/app/src/pages/competitor-products/competitor-products.html"*/'<ion-header class="hidden-xs">\n  <ion-navbar no-padding>\n  		<ion-title>\n			<!--<ion-title>Pricer - Competitor Products</ion-title>-->\n  			<div class="container">\n  				<div class="header-main" padding-horizontal>\n  					<!-- Main Nav tabs -->\n  					<ul class="nav pri-menu pri-to-nav">\n  						<!--<li class="visible-xs pri-menu__hb"> <ion-icon name="menu"></ion-icon></li>-->\n						<li style="Width: 150px;" margin-right class="hidden-xs"><img src="../assets/img/browntape_logo.png" alt=""></li>\n						<li class="pri-menu__title hasub"><h1>Tracker</h1></li>\n  						<li class="pri-menu__wrap hidden-xs-inline-block">\n  							<ul class="pri-menu__full">\n								<li (click)="navTo(\'dashboard\');"><a>Dashboard</a></li>\n								<li (click)="navTo(\'import\')"><a>Import</a></li> \n  								<li (click)="navTo(\'prices\',\'all\');"><a>Prices</a></li>\n  								<li (click)="navTo(\'competitors\');"><a>Competitors</a></li>\n  								<!-- <li (click)="navTo(\'violations\');"><a>Violations</a></li> -->\n  								<!-- <li (click)="navTo(\'products\');"><a>Products</a></li> -->\n  								<!--<li (click)="navTo(\'pricingrule\');"><a>Pricing Rules</a></li>-->\n  							</ul>\n  						</li>\n  						<logout-popover>\n						</logout-popover>\n  					</ul>\n  				</div>\n  			</div>\n  		</ion-title>\n  	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content (click)="hideAllFilters($event)" class="background-bt-grey-xs">\n	<div class="container" padding-horizontal>\n		<div class="back-to-link hidden-xs">\n			<a (click)="navTo(\'competitors\')" [hidden]="referer != \'competitors\'"><ion-icon name="ios-arrow-back" ></ion-icon> Back to Competitors</a>\n			<a (click)="navTo(\'violations\')" [hidden]="referer == \'competitors\'"><ion-icon name="ios-arrow-back" ></ion-icon> Back to Violations</a>\n		</div>\n		<div class="header-secondary replace-header">\n			<ul class="nav pri-menu">\n				<li (click)="goBack();" class="visible-xs pri-menu__hb"> <ion-icon name="ios-arrow-back"></ion-icon></li>\n				<!-- <li class="pri-menu__title"><h2>Import product details from a CSV</h2></li> -->\n				<li class="pri-menu__wrap marketplace-tabs show-white">\n					<ul class="pri-menu__full">\n						<li class="pri-menu__title"><h5 no-margin>Competitor Products</h5></li>\n					</ul>\n				</li>\n\n				<!-- <li class="pri-menu__title"><h1>Competitor Products</h1></li> -->\n\n				<li class="buttons-right hidden-xs">\n					<ul class="pri-menu_full">\n						<li><a class="" style="transition: none;">Export</a></li>\n						<li padding-left>{{firstPageItem}} to {{lastPageItem}} of <strong>{{paginationConfig.totalItems}}</strong></li>\n					</ul>\n				</li>\n\n\n			</ul>\n		</div>\n\n		<div class="filters flex">\n			<div class="filters__search flex">\n				<div class="bt-dropdown" [class.open]="filterOptions.search.open">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<!-- .... if any of the elements are selected then add class "filtered" to parent div "bt-dropdown" .... -->\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop btn-search" (click)="toggleDrop(\'search\')">\n						<ion-icon name="ios-search"></ion-icon> {{filterOptions.search.selectedname}}  <ion-icon name="ios-arrow-down"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						<button ion-button color="dark" (click)="changeSearchField(field.slug)" *ngFor="let field of filterOptions.search.options" clear no-margin block class="bt-dropdown__btn button-drop">{{field.name}}</button>\n					</div>\n				</div>\n				<input [(ngModel)]="filterOptions.search.value" (keyup)="searchItem($event)" type="text" class="form-control" placeholder="Type to search" padding-left>\n			</div>\n			<!-- .... On click of this button  ... -->\n			<!-- .... toggle class "open" here ... -->\n			<a class="filters__toggle" (click)="toggleFilterView()" [class.open]="!hideFilter"><img src="../assets/img/filter.png" alt=""></a>\n			<!-- .... toggle class "hidden" for this one -->\n			<div [class.hidden]="hideFilter" class="filters__wrap flex">\n\n				<div class="bt-dropdown" [class.open]="filterOptions.attribute.open" [class.filtered]="filterOptions.attribute.filtered">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button (click)="toggleDrop(\'attribute\')" ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Attributes\n							<!--<span [hidden]="!filterOptions.attribute.selectedname">&nbsp;({{filterOptions.attribute.selectedname}})</span>-->\n						<ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						<ion-list radio-group [(ngModel)]="filterOptions.attribute.selected" (ionChange)="updateFilter(\'attribute\')">\n							<ion-item *ngFor="let item of filterOptions.attribute.options">\n								<ion-label no-padding>{{item.name}}</ion-label>\n								<ion-radio color="green" no-padding value="{{item.slug}}"></ion-radio>\n							</ion-item>\n						</ion-list>\n					</div>\n				</div>\n\n				<div class="bt-dropdown" [class.open]="filterOptions.marketplace_id.open" [class.filtered]="filterOptions.marketplace_id.filtered">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button (click)="toggleDrop(\'marketplace_id\')" ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Marketplaces\n							<!--<span [hidden]="!filterOptions.marketplace_id.selectedname">&nbsp;({{filterOptions.marketplace_id.selectedname}})</span>-->\n						<ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						<ion-list radio-group [(ngModel)]="filterOptions.marketplace_id.selected" (ionChange)="updateFilter(\'marketplace_id\')">\n							<ion-item *ngFor="let item of filterOptions.marketplace_id.options">\n								<ion-label no-padding>{{item.name}}</ion-label>\n								<ion-radio color="green" no-padding value="{{item.slug}}"></ion-radio>\n							</ion-item>\n						</ion-list>\n					</div>\n				</div>\n\n				<div class="bt-dropdown" [class.open]="filterOptions.sort.open" [class.filtered]="filterOptions.sort.filtered">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button (click)="toggleDrop(\'sort\')" ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Order by\n							<!--<span [hidden]="!filterOptions.sort.selectedname">&nbsp;({{filterOptions.sort.selectedname}})</span>-->\n						<ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						<ion-list radio-group [(ngModel)]="filterOptions.sort.selected" (ionChange)="updateFilter(\'sort\')">\n							<ion-item *ngFor="let item of filterOptions.sort.options">\n								<ion-label no-padding>{{item.name}}</ion-label>\n								<ion-radio color="green" no-padding value="{{item.slug}}"></ion-radio>\n							</ion-item>\n						</ion-list>\n					</div>\n				</div>\n\n				<div class="bt-dropdown" [class.open]="filterOptions.direction.open" [class.filtered]="filterOptions.direction.filtered">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button (click)="toggleDrop(\'direction\')" ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Direction\n							<!--<span [hidden]="!filterOptions.direction.selectedname">&nbsp;({{filterOptions.direction.selectedname}})</span>-->\n						<ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						<ion-list radio-group [(ngModel)]="filterOptions.direction.selected" (ionChange)="updateFilter(\'direction\')">\n							<ion-item *ngFor="let item of filterOptions.direction.options">\n								<ion-label no-padding>{{item.name}}</ion-label>\n								<ion-radio color="green" no-padding value="{{item.slug}}"></ion-radio>\n							</ion-item>\n						</ion-list>\n					</div>\n				</div>\n\n				<!--<button ion-button color="green" class="btn-apply" no-margin>Apply</button>-->\n				<button (click)="resetFilter()" ion-button color="secondary" no-margin class="btn-reset" clear><ion-icon name="md-refresh" class="hidden-xs"></ion-icon><span class="visible-xs">Reset</span></button>\n			</div>\n		</div>\n\n		<!-- table -->\n		<div [hidden]="hideUniqueSeller" class="flex show-all-section" padding>\n\n			<div>\n				<div class="seller-name_col">\n					<div class="flex">\n\n						<div class="text-wrap" padding-right>\n							<span class="marketplaces m-l-0" [ngClass]="{\'m-amazon\': sellerDetails.channel_id == \'1\',\'m-flipkart\': sellerDetails.channel_id == \'2\', \'m-snapdeal\': sellerDetails.channel_id == \'3\', \'m-paytm\': sellerDetails.channel_id == \'4\'}"><span class="m-h"></span></span>\n						</div>\n\n						<div class="flex to-column">\n							<div class="text-lighter">\n								{{ filterOptions.attribute.selected == \'mop_violation\' ? \'MOP violated\' : (filterOptions.attribute.selected == \'mrp_violation\' ? \'MRP violated\' : \'All\') }} products of\n							</div>\n							<div class="flex to-column-xs">\n								<div class="text-wrap">\n									<h6 class="prod-title" no-margin padding-right>\n										<a target="blank" [href]="sellerDetails.seller_url" class="">{{sellerDetails.seller_name || naText}}</a>\n									</h6>\n								</div>\n\n								<div>\n									<star-ratings [stars]="sellerDetails.rating"></star-ratings>\n									<span class="text-lighter" padding-left>{{sellerDetails.rating || naText}}</span>\n								</div>\n								<span padding-left class="text-lighter">( {{sellerDetails.rating_count ? sellerDetails.rating_count.toLocaleString() : \'No\' }} ratings )</span>\n							</div>\n\n						</div>\n\n					</div>\n				</div>\n			</div>\n\n\n			<div class="show-all-link" text-wrap>\n				<a (click)="showAllProducts()" >Show all products of this seller</a>\n			</div>\n		</div>\n\n		<div class="tabular competitor-products">\n\n			<div class="tabular__header flex hidden-xs">\n\n				<div class="tabular__cell cell-9 t_product">Product</div>\n				<div class="tabular__cell cell-1"></div>\n				<div class="tabular__cell cell-4 t-seller">Seller</div>\n				<div class="tabular__cell cell-1"></div>\n\n				<div class="other-col flex cell-15">\n					<div class="other-col__child cell-one-fourth">\n						<div class="tabular__cell cell-full t-price">Price</div>\n					</div>\n\n					<div class="other-col__child cell-three-fourth flex">\n						<div class="tabular__cell cell-10 fbm">FBM</div>\n						<div class="tabular__cell cell-10 mop-violation">MOP Violation</div>\n						<div class="tabular__cell cell-10 mrp-violation">MRP Violation</div>\n					</div>\n				</div>\n			</div>\n\n			<div class="tabular__row flex has-anim-loader" [hidden]="compProducts.length || listLoading == false" *ngFor="let dummy of dummyProducts">\n				<div class="masked masked--competitor-products">\n					<div class="masked__bg">\n						<div class="masked__elements">\n							<div class="masked__elem masked--1"></div>\n							<div class="masked__elem masked--2"></div>\n							<div class="masked__elem masked--3"></div>\n							<div class="masked__elem masked--4"></div>\n							<div class="masked__elem masked--5"></div>\n							<div class="masked__elem masked--6"></div>\n							<div class="masked__elem masked--7"></div>\n							<div class="masked__elem masked--8"></div>\n							<div class="masked__elem masked--9"></div>\n							<div class="masked__elem masked--10"></div>\n							<div class="masked__elem masked--11"></div>\n							<div class="masked__elem masked--12"></div>\n							<div class="masked__elem masked--13"></div>\n							<div class="masked__elem masked--14"></div>\n							<div class="masked__elem masked--15"></div>\n							<div class="masked__elem masked--16"></div>\n						</div>\n					</div>\n				</div>\n			</div>\n\n			<div class="tabular__row flex" [hidden]="listLoading || compProducts.length > 0 || compProductError" style="justify-content: center;">\n				<strong>No records found</strong>\n			</div>\n\n			<div class="tabular__row flex" [hidden]="listLoading || compProducts.length > 0 || !compProductError" style="justify-content: center;">\n				<strong>An error occured while loading competitor product results!</strong>\n			</div>\n\n			<div class="tabular__row flex" text-nowrap *ngFor="let item of compProducts | paginate: paginationConfig">\n				<div class="tabular__cell cell-9 flex t-product">\n					<div class="img-wrap" margin-right="" style="background-image: url()" [ngStyle]="{\'background-image\': \'url(\' + (item.product_image || \'./assets/img/no-img.png\') + \')\'}">\n						<!--<img alt="" width="65" [src]="item.product_image">-->\n					</div>\n					<div class="text-wrap">\n						<span class="sku">{{item.listing_id || naText}}</span> <span class="marketplaces" [ngClass]="{\'m-amazon\': item.marketplace_id == \'1\',\'m-flipkart\': item.marketplace_id == \'2\', \'m-snapdeal\': item.marketplace_id == \'3\', \'m-paytm\': item.marketplace_id == \'4\'}"><span class="m-h"></span></span>\n						<h6 class="prod-title" no-margin=""><a target="blank" [href]="item.product_url">{{item.product_title || naText}}</a></h6>\n					</div>\n				</div>\n\n				<div class="tabular__cell cell-1 hidden-xs"></div>\n\n				<div class="tabular__cell cell-4 t-seller flex">\n					<span class="visible-xs text-light-grey" padding-right>Seller</span>\n					<span text-wrap>{{item.seller_name || naText}}</span>\n				</div>\n\n				<div class="other-col flex cell-1 hidden-xs"></div>\n\n				<div class="other-col flex cell-15">\n					<div class="other-col__child cell-one-fourth">\n						<div class="tabular__cell cell-full t-price">\n							<span class="price">\n								<span class="rupee">₹</span><span class="amount">{{item.price ? item.price.toLocaleString() : naText}}</span>\n								<!--<ion-badge color="success" text-uppercase="" class="badge badge-md badge-md-success">Lowest</ion-badge>-->\n							</span>\n							<!--<ion-badge class="bb badge badge-md badge-md-orange" color="orange" text-uppercase="">BB</ion-badge>-->\n						</div>\n					</div>\n\n					<div class="other-col__child flex cell-three-fourth ">\n						<div class="tabular__cell cell-10 fbm">\n							<ion-icon [hidden]="!item.fullfilled_by_marketplace" name="checkmark" color="success" class="fw600 hidden-xs"></ion-icon>\n							<!--<ion-icon [hidden]="item.fullfilled_by_marketplace" name="alert" color="danger" class="hidden-xs"></ion-icon>-->\n							<ion-icon [hidden]="item.fullfilled_by_marketplace" name="close"  class="hidden-xs text-light-grey"></ion-icon>\n							<ion-badge [hidden]="!item.fullfilled_by_marketplace" class="bb badge badge-md badge-md-success visible-xs" color="success" text-uppercase="">FBM</ion-badge>\n						</div>\n\n						<div class="tabular__cell cell-10 mop-violation">\n							<!--<ion-icon [hidden]="!item.mop_violation" name="close" color="success"></ion-icon> -->\n\n							<!-- <ion-icon [hidden]="item.mop_violation" name="checkmark" color="success" class="fw600 hidden-xs"></ion-icon> -->\n							<span [hidden]="item.mop_violation" class="hidden-xs">--</span>\n							<!-- <ion-icon [hidden]="!item.mop_violation" name="alert" color="danger" class="hidden-xs"></ion-icon> -->\n							<img src="../assets/img/viol.png" [hidden]="!item.mop_violation" alt="" class="hidden-xs" name="alert">\n\n							<!--<span class="hidden-xs">--</span>-->\n							<ion-badge [hidden]="!item.mop_violation" class="bb badge badge-md badge-md-danger visible-xs" color="danger" text-uppercase="">MOP</ion-badge>\n						</div>\n\n						<div class="tabular__cell cell-10 mrp-violation">\n							<!-- <ion-icon [hidden]="item.mrp_violation" name="checkmark" color="success" class="fw600 hidden-xs"></ion-icon> -->\n							<!-- <ion-icon [hidden]="!item.mrp_violation" name="alert" color="danger" class="hidden-xs"></ion-icon> -->\n              <span [hidden]="item.mrp_violation" class="hidden-xs">--</span>\n							<img src="../assets/img/viol.png" [hidden]="!item.mrp_violation" alt="" class="hidden-xs" name="alert">\n							<ion-badge [hidden]="!item.mrp_violation" class="bb badge badge-md badge-md-orange visible-xs" color="orange" text-uppercase="">MRP</ion-badge>\n						</div>\n					</div>\n				</div>\n			</div>\n\n			<pagination-controls (pageChange)="pagChanged($event)" autoHide="true"></pagination-controls>\n			<!--<div class="tabular__row flex" text-nowrap>\n				<div class="tabular__cell cell-10 flex t-product">\n					<div class="img-wrap" margin-right="" style="background-image: url()">\n						<img alt="" width="65" src="https://images-eu.ssl-images-amazon.com/images/I/9121cJUKrPL._UY535_.jpg">\n					</div>\n					<div class="text-wrap">\n						<span class="sku">B01N7FIMI2</span> <span class="marketplaces m-amazon"><span class="m-h"></span></span>\n						<h6 class="prod-title" no-margin=""><a target="blank" href="http://www.amazon.in/dp/B01N7FIMI2">Hidesign Women\'s Shoulder Bag (Brown)</a></h6>\n					</div>\n				</div>\n\n				<div class="tabular__cell cell-4 t-seller flex">\n					<span class="visible-xs" padding-right>Seller</span>\n					<span>WP Retails</span>\n				</div>\n\n				<div class="other-col flex cell-16">\n					<div class="other-col__child cell-one-fourth">\n						<div class="tabular__cell cell-full t-price">\n							<span class="price">\n								<span class="rupee">₹</span><span class="amount">3147</span>\n								<ion-badge color="success" text-uppercase="" class="badge badge-md badge-md-success">Lowest</ion-badge>\n							</span>\n							<ion-badge class="bb badge badge-md badge-md-orange" color="orange" text-uppercase="">BB</ion-badge>\n						</div>\n					</div>\n\n					<div class="other-col__child flex cell-three-fourth ">\n						<div class="tabular__cell cell-10 fbm">\n							 <ion-icon name="close" color="danger" class="fw600 hidden-xs"></ion-icon>\n							<img src="../assets/img/viol.png" alt="" class="hidden-xs">\n							<ion-badge class="bb badge badge-md badge-md-success visible-xs" color="success" text-uppercase="">FBM</ion-badge>\n						</div>\n\n						<div class="tabular__cell cell-10 mop-violation">\n							 <ion-icon name="close" color="success"></ion-icon>\n							<span class="hidden-xs">--</span>\n							<ion-badge class="bb badge badge-md badge-md-danger visible-xs" color="danger" text-uppercase="">MOP</ion-badge>\n						</div>\n\n						<div class="tabular__cell cell-10 mrp-violation">\n							 <ion-icon name="alert" color="danger" class="hidden-xs"></ion-icon>\n							<img src="../assets/img/viol.png" alt="" class="hidden-xs">\n							<ion-badge class="bb badge badge-md badge-md-orange visible-xs" color="orange" text-uppercase="">MRP</ion-badge>\n						</div>\n					</div>\n				</div>\n			</div>-->\n\n\n		</div>\n		<!-- /table -->\n	</div>\n\n</ion-content>\n<ion-footer>\n	<footer-element></footer-element>\n</ion-footer>\n'/*ion-inline-end:"/var/www/ENV/hotelpricer/app/src/pages/competitor-products/competitor-products.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_app_service__["a" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Events */],
        __WEBPACK_IMPORTED_MODULE_4__providers_app_globals__["a" /* AppGlobals */],
        __WEBPACK_IMPORTED_MODULE_5__providers_repricer_api__["a" /* RepricerApi */]])
], CompetitorProductsPage);

//# sourceMappingURL=competitor-products.js.map

/***/ })

});
//# sourceMappingURL=6.main.js.map