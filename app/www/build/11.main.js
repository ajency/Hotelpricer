webpackJsonp([11],{

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reset_login__ = __webpack_require__(511);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetLoginPageModule", function() { return ResetLoginPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ResetLoginPageModule = (function () {
    function ResetLoginPageModule() {
    }
    return ResetLoginPageModule;
}());
ResetLoginPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__reset_login__["a" /* ResetLoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__reset_login__["a" /* ResetLoginPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__reset_login__["a" /* ResetLoginPage */]
        ]
    })
], ResetLoginPageModule);

//# sourceMappingURL=reset-login.module.js.map

/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_guard__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_repricer_api__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetLoginPage; });
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
 * Generated class for the ResetLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ResetLoginPage = (function () {
    function ResetLoginPage(authguard, navparams, navCtrl, repricerapi, appservice) {
        this.authguard = authguard;
        this.navparams = navparams;
        this.navCtrl = navCtrl;
        this.repricerapi = repricerapi;
        this.appservice = appservice;
        this.password = '';
        this.confirmPassword = '';
        this.minLength = 6;
        this.validationFailMessage = '';
        this.validFields = false;
        this.token = '';
        this.resetMailSent = false;
        this.resetingMail = false;
        this.token = this.navparams.get('token');
        console.log("token", this.token);
    }
    ResetLoginPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        console.log('ionviewcanenter ResetLoginPage');
        // TBD update this logic
        return new Promise(function (resolve, reject) {
            _this.authguard.verifyToken('reset-password')
                .then(function () {
                console.warn('reset pass page not authorised');
                reject(true);
            })
                .catch(function () {
                resolve(true);
            });
        });
    };
    ResetLoginPage.prototype.resetPassword = function () {
        var _this = this;
        if (!this.password) {
            this.validationFailMessage = "Password cannot be blank!";
            return;
        }
        if (!this.confirmPassword) {
            this.validationFailMessage = 'Confirm password cannot be blank!';
            return;
        }
        if (this.password !== this.confirmPassword) {
            this.validationFailMessage = "Password & confirm password do not match!";
            return;
        }
        var pload = {
            "token": this.token,
            "new_password": this.password,
            "confirm_password": this.confirmPassword
        };
        this.resetingMail = true;
        this.repricerapi.resetPassword(pload)
            .then(function (res) {
            if (res.success == true) {
                _this.resetingMail = false;
                _this.resetMailSent = true;
                _this.appservice.presentToast(res.status);
                _this.appservice.updateRootNav('login', true, {}, false);
            }
            else {
                _this.appservice.presentToast(res.status, 'error');
            }
        })
            .catch(function (err) {
            if (err.message) {
                _this.appservice.presentToast(err.message, 'error');
            }
            else {
                _this.appservice.presentToast('reset failed', 'error');
            }
        });
    };
    ResetLoginPage.prototype.comparePasswords = function (passdirty, confpassdirty) {
        console.log("pass " + passdirty + " confirm pass " + confpassdirty);
        this.validationFailMessage = '';
        this.validFields = false;
        if (this.password.length !== this.confirmPassword.length)
            return;
        if (this.password === this.confirmPassword) {
            if (this.password.length >= this.minLength) {
                this.validFields = true;
            }
            else {
                this.validationFailMessage = "Password should have at least " + this.minLength + " characters!";
            }
        }
        else {
            if (passdirty && confpassdirty) {
                this.validationFailMessage = "Password & confirm password do not match!";
            }
        }
    };
    return ResetLoginPage;
}());
ResetLoginPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])({
        name: 'reset-password',
        segment: 'reset-password/:token',
        priority: 'off'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-reset-login',template:/*ion-inline-start:"/var/www/node/repricer/src/pages/reset-login/reset-login.html"*/'<!--\n  Generated template for the Login page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="hidden">\n\n  <ion-navbar>\n    <ion-title>Reset Password</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="background-bt-grey login-page">\n\n<div class="container" padding-horizontal padding-top>\n	<div class="text-center" margin-top padding-top>\n		<a class="bt-logo">\n			<img src="../assets/img/browntape_logo.png" alt="">\n		</a>\n	</div>\n	<ion-grid no-padding>\n	  <ion-row no-padding>\n	    <ion-col col-12 offset-0 col-lg-4 col-md-6 offset-lg-4 offset-md-3 no-padding>\n	      <div class="pricer-wrap">\n	      	<h1 class="pricer-title">Pricer</h1>\n	      	<h5 class="pricer-sub">Reset your login password</h5>\n\n	      	<ion-list>\n	      		<ion-item no-padding>\n	      			<ion-label floating>Password</ion-label>\n	      			<ion-input type="password" (keyup)="comparePasswords(passwordRef.dirty, confirmPasswordRef.dirty)" [disabled]="resetingMail || resetMailSent" #passwordRef="ngModel" [(ngModel)]="password" (change)="comparePasswords(passwordRef.dirty, confirmPasswordRef.dirty)"></ion-input>\n	      		</ion-item>\n	      		<br>\n	      		<ion-item no-padding>\n	      			<ion-label floating>Confirm Password</ion-label>\n	      			<ion-input type="password" (keyup)="comparePasswords(passwordRef.dirty, confirmPasswordRef.dirty)" [disabled]="resetingMail || resetMailSent" #confirmPasswordRef="ngModel" [(ngModel)]="confirmPassword" (change)="comparePasswords(passwordRef.dirty, confirmPasswordRef.dirty)"></ion-input>\n	      		</ion-item>\n            <div padding-vertical>\n	      			<!--<div [hidden]="!validFields" class="error error--danger">\n                Passwords match\n              </div>-->\n	      		</div>\n	      		<div [hidden]="validationFailMessage == \'\'" class="error error--danger">\n	      			{{validationFailMessage}}\n	      		</div>\n	      		<div padding-top class="pricer-footer">\n	      			<!-- .... add class "loading" to this button to get the loader .... -->\n      				<button [disabled]="resetingMail || !validFields || resetMailSent" ion-button float-right color="green" medium (click)="resetPassword();">Change Password</button>\n      			</div>\n	      	</ion-list>\n	      </div>\n	      <div class="text-center" padding-top>&copy; Browntape 2017</div>\n	    </ion-col>\n	  </ion-row>\n	</ion-grid>\n</div>\n\n</ion-content>\n\n'/*ion-inline-end:"/var/www/node/repricer/src/pages/reset-login/reset-login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_guard__["a" /* AuthGuard */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_repricer_api__["a" /* RepricerApi */],
        __WEBPACK_IMPORTED_MODULE_4__providers_app_service__["a" /* AppService */]])
], ResetLoginPage);

//# sourceMappingURL=reset-login.js.map

/***/ })

});
//# sourceMappingURL=11.main.js.map