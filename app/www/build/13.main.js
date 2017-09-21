webpackJsonp([13],{

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_not_found__ = __webpack_require__(507);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNotFoundModule", function() { return PageNotFoundModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PageNotFoundModule = (function () {
    function PageNotFoundModule() {
    }
    return PageNotFoundModule;
}());
PageNotFoundModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__page_not_found__["a" /* PageNotFound */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__page_not_found__["a" /* PageNotFound */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__page_not_found__["a" /* PageNotFound */]
        ]
    })
], PageNotFoundModule);

//# sourceMappingURL=page-not-found.module.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_guard__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFound; });
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
 * Generated class for the PageNotFound page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PageNotFound = (function () {
    function PageNotFound(authguard, navCtrl, navparams, appservice, location) {
        this.authguard = authguard;
        this.navCtrl = navCtrl;
        this.navparams = navparams;
        this.appservice = appservice;
        this.location = location;
        this.networkFailure = false;
        this.invalidNavParams = false;
        this.networkFailure = this.navparams.get("networkfailure");
        this.invalidNavParams = this.navparams.get("invalidurlparams");
    }
    PageNotFound.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PageNotFound');
    };
    // ionViewCanEnter(): Promise<boolean>{
    //   console.log('ionviewcanenter PageNotFound')
    //   // TBD do custum logic here
    //   return new Promise((resolve,reject) => {
    //     this.authguard.verifyToken('not-found')
    //     .then(() => {
    //       resolve(true)
    //     })
    //     .catch(() => {
    //       reject(true) 
    //     })
    //   })
    // }
    PageNotFound.prototype.navTo = function (page, market) {
        if (market === void 0) { market = ''; }
        console.log('navigating to page', page);
        var params = {};
        if (market) {
            params['marketplace'] = market;
        }
        this.appservice.updateRootNav(page, true, params);
    };
    PageNotFound.prototype.goBack = function () {
        this.location.back();
    };
    return PageNotFound;
}());
PageNotFound = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPage */])({
        name: 'not-found',
        segment: 'not-found',
        priority: 'high'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-not-found',template:/*ion-inline-start:"/var/www/node/repricer/src/pages/page-not-found/page-not-found.html"*/'<!--\n  Generated template for the PageNotFound page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="hidden">\n\n  <ion-navbar>\n    <ion-title>404</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	<div class="container" padding-horizontal>\n		\n		<div>\n			<img class="404" src="../assets/img/404.png" alt="">\n			<div [hidden]="networkFailure == true">\n				<div [hidden]="invalidNavParams == true">\n					<h3>Oops! Looks like a wrong turn!</h3>\n					<p class="text-lighter">The page you\'re looking for doesn\'t exist on Repricer :(</p>\n				</div>\n				<div [hidden]="invalidNavParams != true">\n					<h3>There appear to be missing parameters in url!</h3>\n				</div>\n			</div>\n\n			<div [hidden]="networkFailure != true">\n				<h3>Oops! Couldn\'t load the requested page!</h3>\n				<p class="text-lighter">A gateway, timeout or page parsing error occurred. Try reloading the page :(</p>\n			</div>\n		</div>\n\n		<hr margin-vertical>\n\n		<p [hidden]="networkFailure == true" margin-bottom padding-bottom>\n			<span class="text-lighter">You can go back to -</span>\n			<a (click)="navTo(\'dashboard\')" style="cursor: pointer" class="download-link">Dashboard</a> <span class="text-lighter">or</span>\n			<a (click)="navTo(\'prices\',\'all\')" style="cursor: pointer" class="download-link">Prices</a>\n		</p>\n\n		<p [hidden]="networkFailure != true" margin-bottom padding-bottom>\n			<span class="text-lighter">You can go back </span>\n			<a (click)="goBack()" style="cursor: pointer" class="download-link">Back</a>\n		</p>\n\n\n\n		<p padding-top class="last-p">\n			<a><img src="../assets/img/browntape_logo.png" alt="" height="35px"></a>\n			<span class="text-lighter">&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; &copy; Browntape 2017</span>\n		</p>\n	</div>\n  <!-- <p></p> -->\n</ion-content>\n'/*ion-inline-end:"/var/www/node/repricer/src/pages/page-not-found/page-not-found.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_auth_guard__["a" /* AuthGuard */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__providers_app_service__["a" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"]])
], PageNotFound);

//# sourceMappingURL=page-not-found.js.map

/***/ })

});
//# sourceMappingURL=13.main.js.map