webpackJsonp([8],{

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_footer_element_footer_element_module__ = __webpack_require__(481);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__components_footer_element_footer_element_module__["a" /* FooterElementComponentModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]
        ]
    })
], LoginModule);

//# sourceMappingURL=login.module.js.map

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

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_repricer_api__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_globals__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_cookie__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_guard__ = __webpack_require__(46);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { Router } from '@angular/router';



var LoginPage = (function () {
    function LoginPage(repricerapi, popctrl, 
        // private router: Router,
        storage, cookieservice, appglobals, appservice, navCtrl, navparams, authguard) {
        this.repricerapi = repricerapi;
        this.popctrl = popctrl;
        this.storage = storage;
        this.cookieservice = cookieservice;
        this.appglobals = appglobals;
        this.appservice = appservice;
        this.navCtrl = navCtrl;
        this.navparams = navparams;
        this.authguard = authguard;
        this.loginFailMessage = "Somethings not right...";
        this.keepLoggedIn = false;
        this.loginEmail = "";
        this.loginPass = "";
        this.loginFailed = false;
        this.loginInProcess = false;
        this.loginTokenFound = false;
        // this.navTo = this.appservice.navToPage;
        this.token = this.navparams.get('token');
    }
    LoginPage.prototype.ngOnInit = function () {
        console.log('ngOninit Login');
    };
    LoginPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        console.log('ionviewcanenter login');
        return new Promise(function (resolve, reject) {
            _this.authguard.verifyToken('login')
                .then(function () {
                console.warn('login page not authorised');
                reject(true);
            })
                .catch(function () {
                resolve(true);
            });
        });
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        console.log("ionViewDidEnter login");
        console.log("token => ", this.token);
        if (this.token && this.token !== ':token') {
            this.loaderInstance = this.appservice.showLoader();
        }
    };
    LoginPage.prototype.ionViewWillUnload = function () {
        if (this.loaderInstance) {
            this.loaderInstance.dismiss();
        }
    };
    LoginPage.prototype.validInputBeforeSubmit = function (event) {
        if (event.keyCode === 13) {
            if (this.loginEmail && this.loginPass) {
                this.signin();
            }
        }
    };
    LoginPage.prototype.navTo = function (page, showloader) {
        if (showloader === void 0) { showloader = false; }
        console.log('navigating to page', page);
        this.appservice.updateRootNav(page, true, {}, showloader);
    };
    LoginPage.prototype.signin = function () {
        var _this = this;
        console.log("email => " + this.loginEmail + " pass => " + this.loginPass + " serverUrl => ");
        if (!this.loginEmail && !this.loginPass) {
            this.loginFailed = true;
            this.loginFailMessage = 'Username and Password cannot be blank';
            return;
        }
        if (!this.loginEmail) {
            this.loginFailed = true;
            this.loginFailMessage = 'Username cannot be blank';
            return;
        }
        if (!this.loginPass) {
            this.loginFailed = true;
            this.loginFailMessage = 'Password cannot be blank';
            return;
        }
        this.loginInProcess = true;
        this.repricerapi.login({ username: this.loginEmail, password: this.loginPass }, this.keepLoggedIn)
            .then(function (response) {
            console.log("response", response);
            _this.loginFailed = response;
            if (!_this.loginFailed) {
                _this.navTo('dashboard', true);
            }
            _this.loginInProcess = false;
        })
            .catch(function (e) {
            // let errmess;
            // try{
            //   errmess = JSON.parse(e._body);
            // }
            // catch(e){
            //   errmess = {message: 'network failed'};
            // }
            console.log(e);
            _this.loginFailMessage = e.message;
            _this.loginFailed = true;
            _this.loginInProcess = false;
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])({
        name: 'login',
        segment: 'login/:token',
        priority: 'off'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"/var/www/node/repricer/src/pages/login/login.html"*/'<!--\n  Generated template for the Login page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="hidden">\n\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="background-bt-grey login-page">\n\n<div class="container" padding-horizontal padding-top>\n	<div class="text-center" margin-top padding-top>\n		<a class="bt-logo">\n			<img src="../assets/img/tracker-logo.png" alt="">\n		</a>\n	</div>\n	<ion-grid no-padding>\n	  <ion-row no-padding>\n	    <ion-col col-12 offset-0 col-lg-4 col-md-6 offset-lg-4 offset-md-3 no-padding>\n	      <div class="pricer-wrap">\n	      	<!-- <h1 class="pricer-title">Tracker</h1> -->\n	      	<h5 class="pricer-sub" text-center>Track your products on the go!</h5>\n\n	      	<ion-list>\n	      		<ion-item no-padding>\n	      			<ion-label floating>Username/Email</ion-label>\n	      			<ion-input type="email" [disabled]="loginInProcess" [(ngModel)]="loginEmail" (keyup)="validInputBeforeSubmit($event)"></ion-input>\n	      		</ion-item>\n	      		<br>\n	      		<ion-item no-padding>\n	      			<ion-label floating>Password</ion-label>\n	      			<ion-input type="password" [disabled]="loginInProcess" [(ngModel)]="loginPass" (keyup)="validInputBeforeSubmit($event)"></ion-input>\n	      		</ion-item>\n	      		<div padding-vertical>\n	      			<!--<a routerLink="/forgotlogin" routerLinkActive="active" class="forgot-pass">Forgot Password?</a>-->\n							<a style="cursor: pointer;" (click)="navTo(\'forgot-password\')" class="forgot-pass">Forgot Password?</a>\n						</div>\n	      		<div [hidden]="!loginFailed" class="error error--danger">\n	      			<strong>Hold it!</strong><br>{{loginFailMessage}}\n	      		</div>\n	      		<div padding-top class="pricer-footer">\n	      			<ion-item no-padding float-left class="inline-items">\n	      				<ion-label no-padding>Remember me</ion-label>\n	      				<ion-checkbox no-padding color="green" [(ngModel)]="keepLoggedIn"></ion-checkbox>\n	      			</ion-item>\n	      			<!-- .... add class "loading" to this button to get the loader .... -->\n      				<button [disabled]="loginInProcess" [ngClass]="{loading: loginInProcess}" ion-button float-right color="green" medium (click)="signin();">Sign in</button>\n      			</div>\n	      	</ion-list>\n	      </div>\n\n	      	<div text-center padding margin-vertical>\n	      		<h6>\n	      			<div class="text-lighter">New to Tracker?</div>\n	      			<a href="http://browntape.com/competition-tracker/" target="_blank">Create an account</a>\n	      		</h6>\n	      	</div>\n	    </ion-col>\n	  </ion-row>\n	</ion-grid>\n</div>\n\n</ion-content>\n<ion-footer>\n	<footer-element></footer-element>\n</ion-footer>\n\n'/*ion-inline-end:"/var/www/node/repricer/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_repricer_api__["a" /* RepricerApi */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5_ngx_cookie__["b" /* CookieService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_app_globals__["a" /* AppGlobals */],
        __WEBPACK_IMPORTED_MODULE_4__providers_app_service__["a" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_7__providers_auth_guard__["a" /* AuthGuard */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=8.main.js.map