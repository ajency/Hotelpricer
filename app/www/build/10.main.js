webpackJsonp([10],{

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(512);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SettingsPageModule = (function () {
    function SettingsPageModule() {
    }
    return SettingsPageModule;
}());
SettingsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */]
        ]
    })
], SettingsPageModule);

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { AppService } from '../../providers/app-service';
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.ionViewDidEnter = function () {
        // setTimeout(() => {
        //   this.appservice.updateOnlineStatus();
        // },1000)
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])({
        name: 'settings',
        priority: 'off'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-settings',template:/*ion-inline-start:"/var/www/ENV/hotelpricer/app/src/pages/settings/settings.html"*/'<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="hidden-xs">\n\n  <ion-navbar no-padding>\n		<ion-title> \n		<!--<ion-title>Pricer - Settings</ion-title>-->\n			<div class="container">\n				<div class="header-main" padding-horizontal>\n					<!-- Main Nav tabs -->\n					<ul class="nav pri-menu pri-to-nav">\n						<li class="visible-xs pri-menu__hb"> <ion-icon name="menu"></ion-icon></li>\n						<li class="pri-menu__title hasub"><h1>Pricer</h1></li>\n						<li class="pri-menu__wrap hidden-xs-inline-block">\n							<ul class="pri-menu__full">\n								<li><a href="#">Dashboard</a></li>\n								<li><a href="#">Prices</a></li>\n								<!-- <li><a href="#">Competitors</a></li> -->\n								<!-- <li><a href="#">Violations</a></li> -->\n								<!-- <li class="active"><a href="#">Products</a></li> -->\n								<!-- <li><a href="#">Pricing Rules</a></li> -->\n							</ul>\n						</li>\n						<li class="pri-menu__logout"><a href="#">Logout</a></li>\n					</ul>\n				</div>\n			</div>\n		</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content  class="background-bt-grey-xs">\n	<div class="container settings" padding-horizontal>\n\n		<div class="header-secondary replace-header">\n			<ul class="nav pri-menu flex">\n				<li class="visible-xs pri-menu__hb"> <ion-icon name="ios-arrow-back"></ion-icon></li>\n				<li class="pri-menu__title hidden-xs hasub"><h2>Settings</h2></li>\n				<li class="pri-menu__wrap marketplace-tabs show-white">\n					<ul class="pri-menu__full">\n						<li class="active"><a>General</a></li>\n						<li><a>Pricing Rules</a></li>\n					</ul>\n				</li>\n				\n			</ul>\n		</div>\n\n		<ion-grid>\n		  <ion-row>\n		    <ion-col col-8 class="connect-bt">\n		    	<div>\n		    		<img src="../assets/img/bt-to-repricer.png" alt="">\n		      		<h6>You haven\'t connected your Browntape account!</h6>\n		      		<p class="text-lighter">You can import the products you have on Browntape to be tracked and repriced here.</p>\n\n		      		<button ion-button block>Connect your BT account</button>\n		      	</div>\n		    </ion-col>\n\n		    <ion-col col-4 class="change-pwd">\n		     	<h6 padding-left>Change your Password</h6>\n		     	<ion-list class="change-pwd">\n\n		     		<ion-item>\n		     			<ion-input type="password" value="" placeholder="Original password"></ion-input>\n		     		</ion-item>\n\n		     	  	<ion-item>\n		     	    	<ion-input type="password" placeholder="New password"></ion-input>\n		     	 	</ion-item>\n		     		\n		     		<ion-item>\n		     			<ion-input type="password" placeholder="Confirm password"></ion-input>\n		     		</ion-item>\n		     	</ion-list>\n\n		     	<div text-right>\n					<button ion-button color="green" >Change Password</button>\n				</div>\n		    </ion-col>\n\n		  </ion-row>\n		</ion-grid>\n\n	</div>\n\n</ion-content>\n'/*ion-inline-end:"/var/www/ENV/hotelpricer/app/src/pages/settings/settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ })

});
//# sourceMappingURL=10.main.js.map