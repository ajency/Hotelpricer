webpackJsonp([4],{

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__violations__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_footer_element_footer_element_module__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_logout_popover_logout_popover_module__ = __webpack_require__(483);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViolationsPageModule", function() { return ViolationsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ViolationsPageModule = (function () {
    function ViolationsPageModule() {
    }
    return ViolationsPageModule;
}());
ViolationsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__violations__["a" /* ViolationsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__components_footer_element_footer_element_module__["a" /* FooterElementComponentModule */],
            __WEBPACK_IMPORTED_MODULE_4__components_logout_popover_logout_popover_module__["a" /* LogoutPopoverComponentModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__violations__["a" /* ViolationsPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__violations__["a" /* ViolationsPage */]
        ]
    })
], ViolationsPageModule);

//# sourceMappingURL=violations.module.js.map

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

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_globals__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViolationsPage; });
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
 * Generated class for the ViolationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ViolationsPage = (function () {
    function ViolationsPage(navCtrl, navParams, events, zone, appservice, appglobals, location) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.zone = zone;
        this.appservice = appservice;
        this.appglobals = appglobals;
        this.location = location;
        this.hideFilter = false;
        this.hideFilter = this.appglobals.isMobile() ? true : false;
    }
    ViolationsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ViolationsPage');
    };
    ViolationsPage.prototype.navTo = function (page, params) {
        if (params === void 0) { params = {}; }
        console.log('navigating to page', params);
        // let params = {};
        // if(market){
        //   params['marketplace'] = market;
        // }
        this.appservice.updateRootNav(page, false, params);
    };
    ViolationsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log('ionViewDidEnter violations');
        setTimeout(function () {
            _this.appservice.updateOnlineStatus();
        }, 1000);
        this.events.publish('app:updatehistory', 'violations');
    };
    ViolationsPage.prototype.goBack = function () {
        this.location.back();
    };
    ViolationsPage.prototype.toggleFilterView = function () {
        this.hideFilter = !this.hideFilter;
        this.zone.run(function () { });
    };
    return ViolationsPage;
}());
ViolationsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPage */])({
        name: 'violations',
        segment: 'violations-page',
        priority: 'off'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-violations',template:/*ion-inline-start:"/var/www/ENV/hotelpricer/app/src/pages/violations/violations.html"*/'<ion-header class="hidden-xs">\n\n  <ion-navbar no-padding>\n	  	<!--<ion-title>Pricer - Violations</ion-title>-->\n  		<ion-title> \n  			<div class="container">\n  				<div class="header-main" padding-horizontal>\n  					<!-- Main Nav tabs -->\n  					<ul class="nav pri-menu pri-to-nav">\n  						<li class="visible-xs pri-menu__hb"> <ion-icon name="menu"></ion-icon></li>\n  						<li class="pri-menu__title hasub"><h1>Pricer</h1></li>\n  						<li class="pri-menu__wrap hidden-xs-inline-block">\n  							<ul class="pri-menu__full">\n  								<li (click)="navTo(\'dashboard\');"><a>Dashboard</a></li>\n  								<li (click)="navTo(\'prices\',{\'marketplace\': \'all\'});"><a>Prices</a></li>\n  								<!-- <li (click)="navTo(\'competitors\');"><a>Competitors</a></li> -->\n  								  <li class="active"><a>Violations</a></li>  \n  								<!-- <li (click)="navTo(\'products\');"><a>Products</a></li> -->\n  								<!--<li (click)="navTo(\'pricingrule\');"><a>Pricing Rules</a></li>-->\n  								<!--<li><a>Settings</a></li>-->\n  							</ul>\n  						</li>\n  						<logout-popover>\n						</logout-popover>\n  					</ul>\n  				</div>\n  			</div>\n  		</ion-title>\n  	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="background-bt-grey-xs">\n	<div class="container" padding-horizontal>\n		<div class="header-secondary replace-header">\n			<ul class="nav pri-menu">\n				<li (click)="goBack()" class="visible-xs pri-menu__hb"> <ion-icon name="ios-arrow-back"></ion-icon></li>\n				<!-- <li class="pri-menu__title"><h2>Import product details from a CSV</h2></li> -->\n				<li class="pri-menu__wrap marketplace-tabs show-white">\n					<ul class="pri-menu__full">\n						<li class="active"><a>All</a></li>\n						<li><a class="marketplaces m-amazon"><span class="m-h"></span></a></li>\n						<li><a class="marketplaces m-flipkart"><span class="m-h"></span></a></li>\n						<li><a class="marketplaces m-snapdeal"><span class="m-h"></span></a></li>\n						<li><a class="marketplaces m-paytm"><span class="m-h"></span></a></li>\n					</ul>\n				</li>\n\n				<!-- <li class="visible-xs"><h5 no-margin="">Violations</h5></li> -->\n\n				<li class="buttons-right hidden-xs">\n					<ul class="pri-menu_full">\n						<li>1 - 40 of <strong>1005</strong></li>\n					</ul>\n				</li>\n\n\n			</ul>\n		</div>\n\n		<div class="filters flex">\n			<div class="filters__search flex">\n				<div class="bt-dropdown">\n							<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n							<!-- .... just adding the class will show the dropdown .... -->\n							<!-- .... if any of the elements are selected then add class "filtered" to parent div "bt-dropdown" .... -->\n							<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop btn-search">\n								<ion-icon name="ios-search"></ion-icon> Seller Name  <ion-icon name="ios-arrow-down"></ion-icon>\n							</button>\n							<div class="bt-dropdown__dd">\n									<button ion-button color="dark" clear no-margin block class="bt-dropdown__btn button-drop" disabled>SKU</button>\n									<button ion-button color="dark" clear no-margin block class="bt-dropdown__btn button-drop">Product Name</button>\n									<button ion-button color="dark" clear no-margin block class="bt-dropdown__btn button-drop">Marketplace</button>\n							</div>\n						</div>\n				<input type="text" class="form-control" placeholder="Type to search" padding-left>\n			</div>\n			<!-- .... On click of this button  ... -->\n			<!-- .... toggle class "open" here ... -->\n			<a (click)="toggleFilterView()" class="filters__toggle"><img src="../assets/img/filter.png" alt=""></a>\n			<!-- .... toggle class "hidden" for this one -->\n			<div [class.hidden]="hideFilter" class="filters__wrap flex">\n				<div class="bt-dropdown">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<!-- .... if any of the elements are selected then add class "filtered" to parent div "bt-dropdown" .... -->\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Violation on <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						options here\n					</div>\n				</div>\n				\n				<div class="bt-dropdown">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Sort <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						blah\n					</div>\n				</div>\n				\n				<button ion-button color="green" class="btn-apply" no-margin>Apply</button>\n				<button ion-button color="secondary" no-margin class="btn-reset" clear><ion-icon name="md-refresh" class="hidden-xs"></ion-icon><span class="visible-xs">Reset</span></button>\n			</div>\n		</div>\n\n		<!-- table -->\n		<div class="tabular violations">\n\n			<div class="tabular__header flex hidden-xs">\n				<div class="tabular__cell cell-1"></div>\n				<div class="tabular__cell cell-10">Seller Name</div>\n				<div class="flex cell-19">\n					<div class="tabular__cell cell-10">Competing listings</div>\n					<div class="tabular__cell cell-10">MOP violations</div>\n					<div class="tabular__cell cell-10">MRP Violations</div>\n				</div>				\n			</div>\n\n			<!-- filters -->\n			<!-- <div class="tabular__row flex has-anim-loader">\n				<div class="masked masked--violations">\n					<div class="masked__bg">\n						<div class="masked__elements">\n							<div class="masked__elem masked--1"></div>\n							<div class="masked__elem masked--2"></div>\n							<div class="masked__elem masked--3"></div>\n							<div class="masked__elem masked--4"></div>\n							<div class="masked__elem masked--5"></div>\n							<div class="masked__elem masked--6"></div>\n							<div class="masked__elem masked--7"></div>\n							<div class="masked__elem masked--8"></div>\n							<div class="masked__elem masked--9"></div>\n							<div class="masked__elem masked--10"></div>\n							<div class="masked__elem masked--11"></div>\n							<div class="masked__elem masked--12"></div>\n							<div class="masked__elem masked--13"></div>\n							<div class="masked__elem masked--14"></div>\n							<div class="masked__elem masked--15"></div>\n							<div class="masked__elem masked--16"></div>\n						</div>\n					</div>\n				</div>\n			</div> -->\n\n			<div class="tabular__row flex" text-nowrap>\n				<div class="tabular__cell cell-1 market-place_col">\n					<div class="text-wrap">\n						<span class="marketplaces m-amazon m-l-0"><span class="m-h"></span></span>\n					</div>\n				</div>\n\n				<div class="tabular__cell cell-10 seller-name_col">\n					<h6 class="prod-title" no-margin>\n						<a target="blank" href="http://www.amazon.in/gp/aag/main/ref=olp_merch_name_1?ie=UTF8&asin=B01N1O6KOK&isAmazonFulfilled=1&seller=A3CK88X7N64QYJ" class="">Muta Fashions</a>\n					</h6>\n					<!-- .... for the amazon like star rating below are the classes .... -->\n					<!-- .... 0.0 stars - "star-0_0"   |   0.5 stars - "star-0_5"   |   1.0 stars - "star-1_0" .... -->\n					<!-- .... 1.5 stars - "star-1_5"   |   2.0 stars - "star-2_0"   |   2.5 stars - "star-2_5" .... -->\n					<!-- .... 3.0 stars - "star-3_0"   |   3.5 stars - "star-3_5"   |   4.0 stars - "star-4_0" .... -->\n					<!-- .... 4.5 stars - "star-4_5"   |   5.0 stars - "star-5_0"   |                          .... -->\n					<div class="amazon-stars inline-elem star-2_5">\n					</div><span class="text-lighter" padding-left>2.5</span><br><span class="text-lighter">(5,075 ratings)</span>\n				</div>\n				\n				<div class="other_col flex cell-19">\n					<div class="tabular__cell cell-10 competing-listings">\n						<strong class="big">611</strong>\n						<br class="visible-xs"><small class="visible-xs">Competing</small>\n					</div>\n\n					<div class="tabular__cell cell-10 mop">\n						<span class="text-primary">10</span>\n						<br class="visible-xs"><small class="visible-xs">MOP</small>\n					</div>\n\n					<div class="tabular__cell cell-10 mrp">\n						<span class="text-primary">200</span>\n						<br class="visible-xs"><small class="visible-xs">MRP</small>\n					</div>\n				</div>\n			</div>\n\n			<div class="tabular__row flex" text-nowrap>\n				<div class="tabular__cell cell-1 market-place_col">\n					<div class="text-wrap">\n						<span class="marketplaces m-amazon m-l-0"><span class="m-h"></span></span>\n					</div>\n				</div>\n\n				<div class="tabular__cell cell-10 seller-name_col">\n					<h6 class="prod-title" no-margin>\n						<a target="blank" href="http://www.amazon.in/gp/aag/main/ref=olp_merch_name_1?ie=UTF8&asin=B01N1O6KOK&isAmazonFulfilled=1&seller=A3CK88X7N64QYJ" class="" >Muta Fashions</a>\n					</h6>\n					<!-- .... for the amazon like star rating below are the classes .... -->\n					<!-- .... 0.0 stars - "star-0_0"   |   0.5 stars - "star-0_5"   |   1.0 stars - "star-1_0" .... -->\n					<!-- .... 1.5 stars - "star-1_5"   |   2.0 stars - "star-2_0"   |   2.5 stars - "star-2_5" .... -->\n					<!-- .... 3.0 stars - "star-3_0"   |   3.5 stars - "star-3_5"   |   4.0 stars - "star-4_0" .... -->\n					<!-- .... 4.5 stars - "star-4_5"   |   5.0 stars - "star-5_0"   |                          .... -->\n					<div class="amazon-stars inline-elem star-2_5">\n					</div><span class="text-lighter" padding-left>2.5</span><br><span class="text-lighter">(5,075 ratings)</span>\n				</div>\n				\n				<div class="other_col flex cell-19">\n					<div class="tabular__cell cell-10 competing-listings">\n						<strong class="big">611</strong>\n						<br class="visible-xs"><small class="visible-xs">Competing</small>\n					</div>\n\n					<div class="tabular__cell cell-10 mop">\n						<strong class="big text-primary">10</strong>\n						<br class="visible-xs"><small class="visible-xs">MOP</small>\n					</div>\n\n					<div class="tabular__cell cell-10 mrp">\n						<strong class="big text-primary">200</strong>\n						<br class="visible-xs"><small class="visible-xs">MRP</small>\n					</div>\n				</div>\n			</div>\n\n			\n		</div>\n		<!-- /table -->\n\n	</div>\n\n</ion-content>\n<ion-footer>\n	<footer-element></footer-element>\n</ion-footer>\n'/*ion-inline-end:"/var/www/ENV/hotelpricer/app/src/pages/violations/violations.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Events */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
        __WEBPACK_IMPORTED_MODULE_3__providers_app_service__["a" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_4__providers_app_globals__["a" /* AppGlobals */],
        __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"]])
], ViolationsPage);

//# sourceMappingURL=violations.js.map

/***/ })

});
//# sourceMappingURL=4.main.js.map