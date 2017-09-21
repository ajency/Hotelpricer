webpackJsonp([5],{

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pricingrule__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_footer_element_footer_element_module__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_logout_popover_logout_popover_module__ = __webpack_require__(483);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PricingrulePageModule", function() { return PricingrulePageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var PricingrulePageModule = (function () {
    function PricingrulePageModule() {
    }
    return PricingrulePageModule;
}());
PricingrulePageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__pricingrule__["a" /* PricingrulePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__components_footer_element_footer_element_module__["a" /* FooterElementComponentModule */],
            __WEBPACK_IMPORTED_MODULE_4__components_logout_popover_logout_popover_module__["a" /* LogoutPopoverComponentModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__pricingrule__["a" /* PricingrulePage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__pricingrule__["a" /* PricingrulePage */]
        ]
    })
], PricingrulePageModule);

//# sourceMappingURL=pricingrule.module.js.map

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

/***/ 509:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_guard__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PricingrulePage; });
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
 * Generated class for the PricingrulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PricingrulePage = (function () {
    function PricingrulePage(navCtrl, navParams, authguard, appservice) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authguard = authguard;
        this.appservice = appservice;
    }
    PricingrulePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PricingrulePage');
    };
    PricingrulePage.prototype.ionViewCanEnter = function () {
        var _this = this;
        console.log('ionviewcanenter login');
        return new Promise(function (resolve, reject) {
            _this.authguard.verifyToken('page-pricingrule')
                .then(function () {
                resolve(true);
            })
                .catch(function () {
                reject(true);
            });
        });
    };
    PricingrulePage.prototype.navTo = function (page, params) {
        if (params === void 0) { params = {}; }
        this.appservice.updateRootNav(page, false, params);
    };
    return PricingrulePage;
}());
PricingrulePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])({
        name: 'pricingrule',
        segment: 'pricingrule',
        priority: 'off'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-pricingrule',template:/*ion-inline-start:"/var/www/node/repricer/src/pages/pricingrule/pricingrule.html"*/'<!--\n  Generated template for the PricingrulePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="hidden-xs">\n\n  <ion-navbar no-padding>\n		<ion-title> \n		<!--<ion-title>Pricer - Pricing Rule</ion-title>-->\n			<div class="container">\n				<div class="header-main" padding-horizontal>\n					<!-- Main Nav tabs -->\n					<ul class="nav pri-menu pri-to-nav">\n						<li class="visible-xs pri-menu__hb"> <ion-icon name="menu"></ion-icon></li>\n						<li class="pri-menu__title hasub"><h1>Pricer</h1></li>\n						<li class="pri-menu__wrap hidden-xs-inline-block">\n							<ul class="pri-menu__full">\n								<li (click)="navTo(\'dashboard\');"><a>Dashboard</a></li>\n								<li (click)="navTo(\'prices\',\'all\');"><a>Prices</a></li>\n								<!-- <li (click)="navTo(\'competitors\');"><a>Competitors</a></li> -->\n								<!-- <li (click)="navTo(\'violations\');"><a>Violations</a></li> -->\n								<!-- <li (click)="navTo(\'products\');"><a>Products</a></li> -->\n								<!--<li class="active"><a>Pricing Rules</a></li>-->\n							</ul>\n						</li>\n						<logout-popover>\n						</logout-popover>\n					</ul>\n				</div>\n			</div>\n		</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n	<div class="container" padding-horizontal>\n		<div class="header-secondary replace-header">\n			<ul class="nav pri-menu">\n				<li class="visible-xs pri-menu__hb"> <ion-icon name="ios-arrow-back"></ion-icon></li>\n				<li class="pri-menu__title"><h2>Pricing Rule</h2></li>\n				<li class="buttons-right fab-in-small-wrap">\n					<ul class="pri-menu__full">\n						<!-- <li><a href="#">Create Rule from a Template</a></li> -->\n						<li>\n							<button ion-button small color="green" class="fab-in-small"><span class="hidden-xs">+ Create a Rule</span><span class="visible-xs"><ion-icon name="md-add"></ion-icon></span></button>\n						</li>\n					</ul>\n				</li>\n			</ul>\n		</div>\n		<!-- <div class="inner-container"> -->\n			<div class="prev-uploads">\n				<div class="filters flex">\n					<div class="filters__search flex">\n						<div class="bt-dropdown">\n							<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n							<!-- .... just adding the class will show the dropdown .... -->\n							<!-- .... if any of the elements are selected then add class "filtered" to parent div "bt-dropdown" .... -->\n							<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop btn-search">\n								<ion-icon name="ios-search"></ion-icon> Rule Name  <ion-icon name="ios-arrow-down"></ion-icon>\n							</button>\n							<div class="bt-dropdown__dd">\n								<div class="bt-dropdown__dd">\n									<button ion-button color="dark" clear no-margin block class="bt-dropdown__btn button-drop" disabled>Rule Name</button>\n									<button ion-button color="dark" clear no-margin block class="bt-dropdown__btn button-drop">Creator</button>\n									<button ion-button color="dark" clear no-margin block class="bt-dropdown__btn button-drop">Something else</button>\n								</div>\n							</div>\n						</div>\n							<!-- <button type="button" class="btn-search">\n								 <ion-icon name="ios-search"></ion-icon> Filename  <ion-icon name="ios-arrow-down"></ion-icon>\n							</button> -->\n						<input type="text" class="form-control" placeholder="Type to search" padding-left>\n					</div>\n					<!-- .... On click of this button  ... -->\n					<!-- .... toggle class "open" here ... -->\n					<a class="filters__toggle"><img src="../assets/img/filter.png" alt=""></a>\n					<!-- .... toggle class "hidden" for this one -->\n					<div class="filters__wrap hidden-xs">\n						<div class="bt-dropdown">\n							<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n							<!-- .... just adding the class will show the dropdown .... -->\n							<!-- .... if any of the elements are selected then add class "filtered" to parent div "bt-dropdown" .... -->\n							<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n								<span class="plusicon visible-xs-inline-block"></span> Channel <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n							</button>\n							<div class="bt-dropdown__dd">\n								<ion-item>\n									<ion-label no-padding>Show all</ion-label>\n									<ion-checkbox color="green" no-padding></ion-checkbox>\n								</ion-item>\n								<ion-item>\n									<ion-label no-padding>Person Name</ion-label>\n									<ion-checkbox color="green" no-padding></ion-checkbox>\n								</ion-item>\n								<ion-item>\n									<ion-label no-padding>Person Name</ion-label>\n									<ion-checkbox color="green" no-padding></ion-checkbox>\n								</ion-item>\n							</div>\n						</div>\n						<div class="bt-dropdown">\n							<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n							<!-- .... just adding the class will show the dropdown .... -->\n							<!-- .... if any of the elements are selected then add class "filtered" to parent div "bt-dropdown" .... -->\n							<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n								<span class="plusicon visible-xs-inline-block"></span> Rule Status <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n							</button>\n							<div class="bt-dropdown__dd">\n								Datepicker shud go here\n							</div>\n						</div>\n						<div class="bt-dropdown">\n							<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n							<!-- .... just adding the class will show the dropdown .... -->\n							<!-- .... if any of the elements are selected then add class "filtered" to parent div "bt-dropdown" .... -->\n							<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n								<span class="plusicon visible-xs-inline-block"></span> Pricing Rule <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n							</button>\n							<div class="bt-dropdown__dd">\n								<ion-item>\n									<ion-label no-padding>Show all</ion-label>\n									<ion-checkbox color="green" no-padding></ion-checkbox>\n								</ion-item>\n								<ion-item>\n									<ion-label no-padding>Processed</ion-label>\n									<ion-checkbox color="green" no-padding></ion-checkbox>\n								</ion-item>\n								<ion-item>\n									<ion-label no-padding>In process</ion-label>\n									<ion-checkbox color="green" no-padding></ion-checkbox>\n								</ion-item>\n							</div>\n						</div>\n						<div class="bt-dropdown">\n							<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n							<!-- .... just adding the class will show the dropdown .... -->\n							<!-- .... if any of the elements are selected then add class "filtered" to parent div "bt-dropdown" .... -->\n							<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n								<span class="plusicon visible-xs-inline-block"></span> My Price <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n							</button>\n							<div class="bt-dropdown__dd">\n								<ion-item>\n									<ion-label no-padding>Show all</ion-label>\n									<ion-checkbox color="green" no-padding></ion-checkbox>\n								</ion-item>\n								<ion-item>\n									<ion-label no-padding>Processed</ion-label>\n									<ion-checkbox color="green" no-padding></ion-checkbox>\n								</ion-item>\n								<ion-item>\n									<ion-label no-padding>In process</ion-label>\n									<ion-checkbox color="green" no-padding></ion-checkbox>\n								</ion-item>\n							</div>\n						</div>\n						<div class="bt-dropdown">\n							<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n							<!-- .... just adding the class will show the dropdown .... -->\n							<!-- .... if any of the elements are selected then add class "filtered" to parent div "bt-dropdown" .... -->\n							<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n								<span class="plusicon visible-xs-inline-block"></span> Status <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n							</button>\n							<div class="bt-dropdown__dd">\n								<ion-item>\n									<ion-label no-padding>Upload date</ion-label>\n									<ion-checkbox color="green" no-padding></ion-checkbox>\n								</ion-item>\n								<ion-item>\n									<ion-label no-padding>File name</ion-label>\n									<ion-checkbox color="green" no-padding></ion-checkbox>\n								</ion-item>\n								<ion-item>\n									<ion-label no-padding>Uploader name</ion-label>\n									<ion-checkbox color="green" no-padding></ion-checkbox>\n								</ion-item>\n							</div>\n						</div>\n						<button ion-button color="green" class="btn-apply" no-margin>Apply</button>\n						<button ion-button color="secondary" no-margin class="btn-reset" clear><ion-icon name="md-refresh" class="hidden-xs"></ion-icon><span class="visible-xs">Reset</span></button>\n						<!-- <a href="#" class="btn btn-primary btn-apply">Apply</a>\n						<a href="#" class="btn btn-link btn-reset"><ion-icon name="ios-refresh" class="hidden-xs"></ion-icon><span class="visible-xs">Reset</span></a> -->\n					</div>\n				</div>\n				<!-- 30 cols -->\n				<div class="tabular">\n					<div class="tabular__header hidden-xs flex">\n						<div class="tabular__cell cell-2">Rule ID</div>\n						<div class="tabular__cell cell-2">Channel</div>\n						<div class="tabular__cell cell-7">Rule Name</div>\n						<div class="tabular__cell cell-3">Assigned to</div>\n						<div class="tabular__cell cell-4">Min</div>\n						<div class="tabular__cell cell-4">Max</div>\n						<div class="tabular__cell cell-5">Created by/on</div>\n						<div class="tabular__cell cell-3">Status</div>\n					</div>\n\n					<!-- <div class="tabular__row flex has-anim-loader">\n						<div class="masked masked--pricing-rules">\n							<div class="masked__bg">\n								<div class="masked__elements">\n									<div class="masked__elem masked--1"></div>\n									<div class="masked__elem masked--2"></div>\n									<div class="masked__elem masked--3"></div>\n									<div class="masked__elem masked--4"></div>\n									<div class="masked__elem masked--5"></div>\n									<div class="masked__elem masked--6"></div>\n									<div class="masked__elem masked--7"></div>\n									<div class="masked__elem masked--8"></div>\n									<div class="masked__elem masked--9"></div>\n									<div class="masked__elem masked--10"></div>\n									<div class="masked__elem masked--11"></div>\n									<div class="masked__elem masked--12"></div>\n									<div class="masked__elem masked--13"></div>\n									<div class="masked__elem masked--14"></div>\n									<div class="masked__elem masked--15"></div>\n									<div class="masked__elem masked--16"></div>\n								</div>\n							</div>\n						</div>\n					</div> -->\n					\n					<div class="tabular__row flex">\n						<div class="tabular__cell cell-2 t-upid">2932238</div>\n						<div class="tabular__cell cell-2 text-wrap t-market">\n							<span class="marketplaces m-amazon"><span class="m-h"></span></span>\n						</div>\n						<div class="tabular__cell cell-7 t-filename">\n							<h6 class="prod__title text-ellipsis" no-margin><a href="#">FK Default Pricer</a></h6>\n							<span class="prod__description hidden-xs text">Description for this particular rule goes here</span>\n						</div>\n						<div class="tabular__cell cell-3 t-assign">\n							<strong><span class="product-icon"></span> 24</strong> <small class="text hidden-xs">SKUs</small>\n						</div>\n						<div class="tabular__cell cell-4 t-min hidden-xs">SKU\'s min price</div>\n						<div class="tabular__cell cell-4 t-max hidden-xs">SKU\'s MRP</div>\n						<div class="tabular__cell cell-5 t-uploader">\n							<strong>Piyush Goel</strong><br>\n							<small class="text hidden-xs">10 Apr 2017, 10:00 AM</small>\n						</div>\n						<div class="tabular__cell cell-3 t-toggler">\n							<ion-item no-padding class="toggle-left">\n								<!-- .... change this text to inactive when the toggle is off .... -->\n								<ion-label no-padding>Active</ion-label>\n								<ion-toggle checked="true" color="green"></ion-toggle>\n							</ion-item>\n						</div>\n					</div>\n				</div>\n\n			</div>\n		<!-- </div> -->\n	</div>\n</ion-content>\n<ion-footer>\n	<footer-element></footer-element>\n</ion-footer>'/*ion-inline-end:"/var/www/node/repricer/src/pages/pricingrule/pricingrule.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_guard__["a" /* AuthGuard */],
        __WEBPACK_IMPORTED_MODULE_3__providers_app_service__["a" /* AppService */]])
], PricingrulePage);

//# sourceMappingURL=pricingrule.js.map

/***/ })

});
//# sourceMappingURL=5.main.js.map