webpackJsonp([7],{

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__all_products__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_footer_element_footer_element_module__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_logout_popover_logout_popover_module__ = __webpack_require__(483);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllProductsPageModule", function() { return AllProductsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AllProductsPageModule = (function () {
    function AllProductsPageModule() {
    }
    return AllProductsPageModule;
}());
AllProductsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__all_products__["a" /* AllProductsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__components_footer_element_footer_element_module__["a" /* FooterElementComponentModule */],
            __WEBPACK_IMPORTED_MODULE_4__components_logout_popover_logout_popover_module__["a" /* LogoutPopoverComponentModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__all_products__["a" /* AllProductsPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__all_products__["a" /* AllProductsPage */]
        ]
    })
], AllProductsPageModule);

//# sourceMappingURL=all-products.module.js.map

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
        selector: 'footer-element',template:/*ion-inline-start:"/var/www/node/repricer/src/components/footer-element/footer-element.html"*/'<!-- Generated template for the FooterElementComponent component -->\n<footer>\n  <div class="text-center" padding-vertical>&copy; Browntape 2017<span class="version-string">&nbsp;V{{version}}</span></div>\n</footer>\n'/*ion-inline-end:"/var/www/node/repricer/src/components/footer-element/footer-element.html"*/
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
        selector: 'logout-popover',template:/*ion-inline-start:"/var/www/node/repricer/src/components/logout-popover/logout-popover.html"*/'<li class="pri-menu__logout" float-right>\n  <ul class="pri-menu__full space-between">\n  	<li [hidden]="!topMetrics.last_updated" class="xs-text-normal"><small class="text-md-dark">Last updated at {{topMetrics.last_updated}}</small></li>  \n  	  <!-- <li class="xs-text-normal"><small class="text-md-dark">Last updated at Aug 18, 2017, 3:40 PM </small></li>   -->\n    <li (click)="showUserPopover($event)"><button ion-button clear color="dark"><ion-icon name="md-person"></ion-icon></button></li>\n  </ul>\n</li>\n\n'/*ion-inline-end:"/var/www/node/repricer/src/components/logout-popover/logout-popover.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_app_globals__["a" /* AppGlobals */],
        __WEBPACK_IMPORTED_MODULE_4__providers_repricer_api__["a" /* RepricerApi */]])
], LogoutPopoverComponent);

//# sourceMappingURL=logout-popover.js.map

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_globals__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllProductsPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AllProductsPage = (function () {
    function AllProductsPage(navCtrl, navParams, events, zone, location, appglobals, appservice) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.zone = zone;
        this.location = location;
        this.appglobals = appglobals;
        this.appservice = appservice;
        this.hideFilter = false;
        this.hideFilter = this.appglobals.isMobile() ? true : false;
    }
    AllProductsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AllProductsPage');
    };
    AllProductsPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter products');
        this.events.publish('app:updatehistory', 'products');
    };
    AllProductsPage.prototype.navTo = function (page, params) {
        if (params === void 0) { params = {}; }
        this.appservice.updateRootNav(page, false, params);
    };
    AllProductsPage.prototype.goBack = function () {
        this.location.back();
    };
    AllProductsPage.prototype.toggleFilterView = function () {
        this.hideFilter = !this.hideFilter;
        this.zone.run(function () { });
    };
    return AllProductsPage;
}());
AllProductsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPage */])({
        name: 'products',
        segment: 'products',
        priority: 'off'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-all-products',template:/*ion-inline-start:"/var/www/node/repricer/src/pages/all-products/all-products.html"*/'<ion-header class="hidden-xs">\n\n  <ion-navbar no-padding>\n		<ion-title> \n			<!--<ion-title>Pricer - All Products</ion-title>-->\n			<div class="container">\n				<div class="header-main" padding-horizontal>\n					<!-- Main Nav tabs -->\n					<ul class="nav pri-menu pri-to-nav">\n						<li class="visible-xs pri-menu__hb"> <ion-icon name="menu"></ion-icon></li>\n						<li class="pri-menu__title hasub"><h1>Pricer</h1></li>\n						<li class="pri-menu__wrap hidden-xs-inline-block">\n							<ul class="pri-menu__full">\n								<li (click)="navTo(\'dashboard\');"><a>Dashboard</a></li>\n								<li (click)="navTo(\'prices\',\'all\');"><a>Prices</a></li>\n								<!-- <li (click)="navTo(\'competitors\');"><a>Competitors</a></li> -->\n								<!-- <li (click)="navTo(\'violations\');"><a>Violations</a></li> -->\n								<!-- <li class="active"><a>Products</a></li> -->\n								<!--<li (click)="navTo(\'pricingrule\');"><a>Pricing Rules</a></li>-->\n							</ul>\n						</li>\n						<!--<li class="pri-menu__logout"><a>Logout</a></li>-->\n						<logout-popover>\n						</logout-popover>\n					</ul>\n				</div>\n			</div>\n		</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="background-bt-grey-xs">\n	<div class="container" padding-horizontal>\n		<div class="header-secondary replace-header">\n			<ul class="nav pri-menu flex">\n				<li (click)="goBack()" class="visible-xs pri-menu__hb"> <ion-icon name="ios-arrow-back"></ion-icon></li>\n				<li class="pri-menu__title hidden-xs hasub"><h2>Products</h2></li>\n				<li class="pri-menu__wrap marketplace-tabs show-white">\n					<ul class="pri-menu__full">\n						<li class="active"><a>Products added to Repricer</a></li>\n						<li><a>Products in BT</a></li>\n					</ul>\n				</li>\n				<li class="buttons-right fab-in-small-wrap">\n					<ul class="pri-menu__full">\n						<li><button ion-button small color="green" class="fab-in-small"><span class="hidden-xs">Add a Product</span><span class="visible-xs"><ion-icon name="md-add"></ion-icon></span></button></li>\n					</ul>\n				</li>\n			</ul>\n		</div>\n		<div class="filters flex">\n			<div class="filters__search flex">\n				<div class="bt-dropdown">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<!-- .... if any of the elements are selected then add class "filtered" to parent div "bt-dropdown" .... -->\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop btn-search">\n						<ion-icon name="ios-search"></ion-icon> Group ID  <ion-icon name="ios-arrow-down"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n							<button ion-button color="dark" clear no-margin block class="bt-dropdown__btn button-drop" disabled>Group ID</button>\n							<button ion-button color="dark" clear no-margin block class="bt-dropdown__btn button-drop">Product Name</button>\n							<button ion-button color="dark" clear no-margin block class="bt-dropdown__btn button-drop">Marketplace</button>\n					</div>\n				</div>\n				<input type="text" class="form-control" placeholder="Type to search" padding-left>\n			</div>\n			<!-- .... On click of this button  ... -->\n			<!-- .... toggle class "open" here ... -->\n			<a (click)="toggleFilterView()" class="filters__toggle"><img src="../assets/img/filter.png" alt=""></a>\n			<!-- .... toggle class "hidden" for this one -->\n			<div [class.hidden]="hideFilter" class="filters__wrap flex">\n				<div class="bt-dropdown">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<!-- .... if any of the elements are selected then add class "filtered" to parent div "bt-dropdown" .... -->\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Pricing Outcome <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						<ion-item>\n							<ion-label no-padding>I\'m cheapest</ion-label>\n							<ion-checkbox color="green" no-padding></ion-checkbox>\n						</ion-item>\n						<ion-item>\n							<ion-label no-padding>Seller is cheapest</ion-label>\n							<ion-checkbox color="green" no-padding></ion-checkbox>\n						</ion-item>\n						<ion-item>\n							<ion-label no-padding>Az cheapest</ion-label>\n							<ion-checkbox color="green" no-padding></ion-checkbox>\n						</ion-item>\n						<ion-item>\n							<ion-label no-padding>I have BuyBox</ion-label>\n							<ion-checkbox color="green" no-padding></ion-checkbox>\n						</ion-item>\n						<ion-item>\n							<ion-label no-padding>In Top 10</ion-label>\n							<ion-checkbox color="green" no-padding></ion-checkbox>\n						</ion-item>\n					</div>\n				</div>\n				<div class="bt-dropdown">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Marketplaces <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						<ion-list radio-group>\n							<ion-item>\n								<ion-label no-padding>Amazon</ion-label>\n								<ion-radio color="green" no-padding></ion-radio>\n							</ion-item>\n							<ion-item>\n								<ion-label no-padding>Flipkart</ion-label>\n								<ion-radio color="green" no-padding></ion-radio>\n							</ion-item>\n							<ion-item>\n								<ion-label no-padding>Snapdeal</ion-label>\n								<ion-radio color="green" no-padding></ion-radio>\n							</ion-item>\n							<ion-item>\n								<ion-label no-padding>Paytm</ion-label>\n								<ion-radio color="green" no-padding></ion-radio>\n							</ion-item>\n						</ion-list>\n					</div>\n				</div>\n				<div class="bt-dropdown">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> My Price <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						Range slider like the one in prices\n					</div>\n				</div>\n				<div class="bt-dropdown">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Sort by <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						blah\n					</div>\n				</div>\n				<!-- <button ion-button color="green" class="btn-apply" no-margin>Apply</button> -->\n				<button ion-button color="secondary" no-margin class="btn-reset" clear><ion-icon name="md-refresh" class="hidden-xs"></ion-icon><span class="visible-xs">Reset</span></button>\n			</div>\n		</div>\n\n		<div class="tabular">\n			<div class="tabular__header flex hidden-xs">\n				<div class="tabular__cell cell-8 t-group">Group</div>\n				<div class="tabular__cell cell-20 t-markets">Marketplaces being tracked</div>\n				<div class="tabular__cell cell-2 t-actions"></div>\n			</div>\n\n			<!-- loader -->\n			<!--  <div class="tabular__row flex has-anim-loader">\n				<div class="masked masked--products">\n					<div class="masked__bg">\n						<div class="masked__elements">\n							<div class="masked__elem masked--1"></div>\n							<div class="masked__elem masked--2"></div>\n							<div class="masked__elem masked--3"></div>\n							<div class="masked__elem masked--4"></div>\n							<div class="masked__elem masked--5"></div>\n							<div class="masked__elem masked--6"></div>\n							<div class="masked__elem masked--7"></div>\n							<div class="masked__elem masked--8"></div>\n							<div class="masked__elem masked--9"></div>\n							<div class="masked__elem masked--10"></div>\n							<div class="masked__elem masked--11"></div>\n							<div class="masked__elem masked--12"></div>\n							<div class="masked__elem masked--13"></div>\n							<div class="masked__elem masked--14"></div>\n							<div class="masked__elem masked--15"></div>\n							<div class="masked__elem masked--16"></div>\n							<div class="masked__elem masked--17"></div>\n							<div class="masked__elem masked--18"></div>\n							<div class="masked__elem masked--19"></div>\n							<div class="masked__elem masked--20"></div>\n							<div class="masked__elem masked--21"></div>\n						</div>\n					</div>\n				</div>\n			</div> -->\n\n			<div class="tabular__row flex">\n				<div class="tabular__cell cell-8 t-group flex">\n					<div class="img-wrap" margin-right style="background-image: url()">\n						<img src="../assets/img/iphone.png" width="65" alt="">\n					</div>\n					<div class="text-wrap">\n						<span class="sku group">GRP1425BX</span>\n						<h6 class="prod-title">\n							<a target="blank" title="Group title goes here">Group title goes here</a>\n						</h6>\n					</div>\n				</div>\n				<div class="tabular__cell cell-20 t-markets flex">\n					<div class="tabular__cell cell-6 flex clickable">\n						<div class="left text-wrap big" padding-right>\n							<span class="marketplaces m-amazon m-l-0"><span class="m-h"></span></span>\n						</div>\n						<div class="right">\n							<span class="text-lighter">\n								<span class="seller-icon"><ion-icon name="md-person"></ion-icon></span>\n								<strong class="">25</strong>\n							</span>\n							<span class="price">\n								<span class="rupee">&#8377;</span><span class="amount">14552</span>\n							</span>\n						</div>\n					</div>\n					<div class="tabular__cell cell-6 flex clickable">\n						<div class="left text-wrap big" padding-right>\n							<span class="marketplaces m-flipkart m-l-0"><span class="m-h"></span></span>\n						</div>\n						<div class="right">\n							<span class="text-lighter">\n								<span class="seller-icon"><ion-icon name="md-person"></ion-icon></span>\n								<strong class="">25</strong>\n							</span>\n							<span class="price">\n								<span class="rupee">&#8377;</span><span class="amount">14552</span>\n							</span>\n						</div>\n					</div>\n					<div class="tabular__cell cell-6 flex clickable">\n						<div class="left text-wrap big" padding-right>\n							<span class="marketplaces m-snapdeal m-l-0"><span class="m-h"></span></span>\n						</div>\n						<div class="right">\n							<span class="text-lighter">\n								<span class="seller-icon"><ion-icon name="md-person"></ion-icon></span>\n								<strong class="">25</strong>\n							</span>\n							<span class="price">\n								<span class="rupee">&#8377;</span><span class="amount">14552</span>\n							</span>\n						</div>\n					</div>\n				</div>\n				<div class="tabular__cell cell-2 t-actions text-right">\n					<button ion-button small color="green">Edit</button>\n				</div>\n			</div>\n		</div>\n\n	</div>\n</ion-content>\n<ion-footer>\n	<footer-element></footer-element>\n</ion-footer>'/*ion-inline-end:"/var/www/node/repricer/src/pages/all-products/all-products.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Events */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
        __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"],
        __WEBPACK_IMPORTED_MODULE_4__providers_app_globals__["a" /* AppGlobals */],
        __WEBPACK_IMPORTED_MODULE_3__providers_app_service__["a" /* AppService */]])
], AllProductsPage);

//# sourceMappingURL=all-products.js.map

/***/ })

});
//# sourceMappingURL=7.main.js.map