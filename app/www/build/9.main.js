webpackJsonp([9],{

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__forgotpassword__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_footer_element_footer_element_module__ = __webpack_require__(481);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotpasswordPageModule", function() { return ForgotpasswordPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ForgotpasswordPageModule = (function () {
    function ForgotpasswordPageModule() {
    }
    return ForgotpasswordPageModule;
}());
ForgotpasswordPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__forgotpassword__["a" /* ForgotpasswordPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__components_footer_element_footer_element_module__["a" /* FooterElementComponentModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__forgotpassword__["a" /* ForgotpasswordPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__forgotpassword__["a" /* ForgotpasswordPage */]
        ]
    })
], ForgotpasswordPageModule);

//# sourceMappingURL=forgotpassword.module.js.map

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

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_repricer_api__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_guard__ = __webpack_require__(46);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotpasswordPage; });
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
 * Generated class for the ForgotpasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ForgotpasswordPage = (function () {
    function ForgotpasswordPage(repricerapi, appservice, authguard, navCtrl) {
        this.repricerapi = repricerapi;
        this.appservice = appservice;
        this.authguard = authguard;
        this.navCtrl = navCtrl;
        this.restPassEmail = '';
        this.resetPassMessage = '';
        this.resetInProgress = false;
        this.resetComplete = false;
        this.emailRegExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    ForgotpasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgotpasswordPage');
    };
    ForgotpasswordPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        console.log('ionviewcanenter ForgotpasswordPage');
        return new Promise(function (resolve, reject) {
            _this.authguard.verifyToken('forgot-password')
                .then(function () {
                reject(true);
            })
                .catch(function () {
                resolve(true);
            });
        });
    };
    ForgotpasswordPage.prototype.validateEmail = function () {
        if (this.emailRegExpression.test(this.restPassEmail)) {
            this.resetPassMessage = '';
            return true;
        }
        else {
            this.resetPassMessage = "This email isn't valid!";
            return false;
        }
    };
    ForgotpasswordPage.prototype.sendResetLink = function () {
        var _this = this;
        if (!this.restPassEmail) {
            this.resetPassMessage = "Email cannot be blank!";
            this.appservice.presentToast(this.resetPassMessage, 'error');
            return;
        }
        if (!this.validateEmail()) {
            this.appservice.presentToast(this.resetPassMessage, 'error');
            return;
        }
        this.resetInProgress = true;
        this.repricerapi.sendForgotPassLink(this.restPassEmail)
            .then(function (res) {
            console.log(res);
            _this.resetInProgress = false;
            var toast_type = '';
            if (res.success == true) {
                toast_type = 'success';
                _this.resetComplete = true;
            }
            else {
                toast_type = 'error';
            }
            _this.appservice.presentToast(res.status, toast_type);
            // this.appservice.updateRootNav('login',true);
        })
            .catch(function (error) {
            _this.resetInProgress = false;
            if (error.message) {
                _this.appservice.presentToast(error.message, 'error');
            }
            else {
                _this.appservice.presentToast('Failed to send reset link', 'error');
            }
        });
    };
    ForgotpasswordPage.prototype.cancelReset = function () {
        this.appservice.updateRootNav('login', true, {}, false);
    };
    return ForgotpasswordPage;
}());
ForgotpasswordPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])({
        name: 'forgot-password',
        segment: 'forgot-password',
        priority: 'off'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-forgotpassword',template:/*ion-inline-start:"/var/www/ENV/hotelpricer/app/src/pages/forgotpassword/forgotpassword.html"*/'<!--\n  Generated template for the ForgotpasswordPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="hidden">\n\n  <ion-navbar>\n    <ion-title>Forgotpassword</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="background-bt-grey login-page">\n\n<div class="container" padding-horizontal padding-top>\n	<div class="text-center" margin-top padding-top>\n		<a href="#" class="bt-logo">\n			<img src="../assets/img/tracker-logo.png" alt="">\n		</a>\n	</div>\n	<ion-grid no-padding>\n	  <ion-row no-padding>\n	    <ion-col col-12 offset-0 col-lg-4 col-md-6 offset-lg-4 offset-md-3 no-padding>\n	      <div class="pricer-wrap">\n	      	<h1 class="pricer-title">Tracker</h1>\n	      	<h5 class="pricer-sub">Track your products on the go!</h5>\n\n	      	<hr margin-top margin-bottom>\n\n	      	<h5 class="pricer-title">Forgot Password?</h5>\n	      	<br>\n	      	<ion-list>\n	      		<ion-item no-padding>\n	      			<ion-label floating>Email</ion-label>\n	      			<ion-input #resetEmail="ngModel" [disabled]="resetComplete || resetInProgress" type="email" (keyup.enter)="sendResetLink()" (change)="validateEmail()" [(ngModel)]="restPassEmail" required></ion-input>\n	      		</ion-item>\n	      		<div [hidden]="!resetPassMessage" class="error error--danger">\n	      			<strong>Something\'s wrong!</strong><br>{{resetPassMessage}}\n	      		</div>\n	      		<br>\n	      		<div padding-top class="pricer-footer">\n	      			<button ion-button clear medium color="secondary" (click)="cancelReset()">Cancel</button>\n	      			<!-- .... add class "loading" to this button to get the loader .... -->\n      				<button ion-button float-right color="green" [ngClass]="{loading: resetInProgress}" [disabled]="resetComplete || resetInProgress || resetPassMessage" (click)="sendResetLink()" medium >Reset Password</button>\n      			</div>\n	      	</ion-list>\n	      </div>\n	      <div class="text-center" padding-top>&copy; Browntape 2017</div>\n	    </ion-col>\n	  </ion-row>\n	</ion-grid>\n</div>\n\n</ion-content>\n\n'/*ion-inline-end:"/var/www/ENV/hotelpricer/app/src/pages/forgotpassword/forgotpassword.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_repricer_api__["a" /* RepricerApi */],
        __WEBPACK_IMPORTED_MODULE_3__providers_app_service__["a" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_guard__["a" /* AuthGuard */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
], ForgotpasswordPage);

//# sourceMappingURL=forgotpassword.js.map

/***/ })

});
//# sourceMappingURL=9.main.js.map