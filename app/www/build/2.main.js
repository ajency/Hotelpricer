webpackJsonp([2],{

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__competitors__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_pagination__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_logout_popover_logout_popover_module__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_star_ratings_star_ratings_module__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_pie_chart_pie_chart_module__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_footer_element_footer_element_module__ = __webpack_require__(481);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompetitorsPageModule", function() { return CompetitorsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var CompetitorsPageModule = (function () {
    function CompetitorsPageModule() {
    }
    return CompetitorsPageModule;
}());
CompetitorsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__competitors__["a" /* CompetitorsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_ngx_pagination__["a" /* NgxPaginationModule */],
            __WEBPACK_IMPORTED_MODULE_4__components_logout_popover_logout_popover_module__["a" /* LogoutPopoverComponentModule */],
            __WEBPACK_IMPORTED_MODULE_5__components_star_ratings_star_ratings_module__["a" /* StarRatingsComponentModule */],
            __WEBPACK_IMPORTED_MODULE_6__components_pie_chart_pie_chart_module__["a" /* PieChartComponentModule */],
            __WEBPACK_IMPORTED_MODULE_7__components_footer_element_footer_element_module__["a" /* FooterElementComponentModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__competitors__["a" /* CompetitorsPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__competitors__["a" /* CompetitorsPage */]
        ]
    })
], CompetitorsPageModule);

//# sourceMappingURL=competitors.module.js.map

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

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PieChartComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PieChartComponent = (function () {
    function PieChartComponent() {
        // [
        //   // { percent: 0.1, color: 'Coral' },
        //   // { percent: 0.65, color: 'CornflowerBlue' },
        //   // { percent: 0.2, color: '#00ab6b' },
        //   {percent: 0.3, color: '#00ab6b'},
        //   {percent: 0.7,color: '#eeeeee'}
        // ]
    }
    PieChartComponent.prototype.getCoordinatesForPercent = function (percent) {
        var x = Math.cos(2 * Math.PI * percent);
        var y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };
    PieChartComponent.prototype.ngOnInit = function () {
        this.containerDimension = this.containerDimension ? this.containerDimension : "100";
        this.init();
    };
    PieChartComponent.prototype.init = function (slices) {
        if (slices === void 0) { slices = []; }
        // console.log('pie chart init ',this.PieChart);
        if (slices.length) {
            this.slices = slices;
        }
        if (this.slices && this.slices.length) {
            var totalpercent_1 = 0;
            this.slices.map(function (val) {
                totalpercent_1 += val['percent'];
            });
            if (totalpercent_1 < 100) {
                var bufferpercent = 100 - totalpercent_1;
                var bufferpiece = { percent: bufferpercent, color: '#eeeeee' };
                this.slices.push(bufferpiece);
            }
            // console.log("new code here")
        }
        else {
            this.slices = [{ percent: 100, color: '#eeeeee' }];
        }
        this.contructSVG();
    };
    PieChartComponent.prototype.contructSVG = function () {
        var _this = this;
        var svgEl = this.PieChart.nativeElement;
        var cumulativePercent = 0;
        this.slices.forEach(function (slice) {
            // destructuring assignment sets the two variables at once
            var _a = _this.getCoordinatesForPercent(cumulativePercent), startX = _a[0], startY = _a[1];
            var decimalpercent = slice.percent / 100;
            // each slice starts where the last slice ended, so keep a cumulative percent
            cumulativePercent += decimalpercent;
            var _b = _this.getCoordinatesForPercent(cumulativePercent), endX = _b[0], endY = _b[1];
            // if the slice is more than 50%, take the large arc (the long way around)
            var largeArcFlag = decimalpercent > 0.5 ? 1 : 0;
            // create an array and join it just for code readability
            var pathData = [
                "M " + startX + " " + startY,
                "A 1 1 0 " + largeArcFlag + " 1 " + endX + " " + endY,
                "L 0 0",
            ].join(' ');
            // create a <path> and append it to the <svg> element
            var pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathEl.setAttribute('d', pathData);
            pathEl.setAttribute('fill', slice.color);
            svgEl.appendChild(pathEl);
        });
    }; // end constructSVG
    return PieChartComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('PieChart'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], PieChartComponent.prototype, "PieChart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('dimensions'),
    __metadata("design:type", String)
], PieChartComponent.prototype, "containerDimension", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('pieces'),
    __metadata("design:type", Array)
], PieChartComponent.prototype, "slices", void 0);
PieChartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'pie-chart',template:/*ion-inline-start:"/var/www/node/repricer/src/components/pie-chart/pie-chart.html"*/'<div [style.width.px]="containerDimension" [style.height.px]="containerDimension">\n  <svg #PieChart  width="100%" height="100%" viewBox="-1 -1 2 2" style="transform: rotate(-90deg)" xmlns="http://www.w3.org/2000/svg">\n  </svg>\n</div>\n'/*ion-inline-end:"/var/www/node/repricer/src/components/pie-chart/pie-chart.html"*/
    }),
    __metadata("design:paramtypes", [])
], PieChartComponent);

//# sourceMappingURL=pie-chart.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pie_chart__ = __webpack_require__(486);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PieChartComponentModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PieChartComponentModule = (function () {
    function PieChartComponentModule() {
    }
    return PieChartComponentModule;
}());
PieChartComponentModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__pie_chart__["a" /* PieChartComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__pie_chart__["a" /* PieChartComponent */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__pie_chart__["a" /* PieChartComponent */]
        ]
    })
], PieChartComponentModule);

//# sourceMappingURL=pie-chart.module.js.map

/***/ }),

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_repricer_api__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_guard__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_app_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_app_globals__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompetitorsPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CompetitorsPage = (function () {
    function CompetitorsPage(navCtrl, navParams, authguard, appservice, location, repricerapi, appglobals, events, zone) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authguard = authguard;
        this.appservice = appservice;
        this.location = location;
        this.repricerapi = repricerapi;
        this.appglobals = appglobals;
        this.events = events;
        this.zone = zone;
        this.hideFilter = true;
        this.naText = "--";
        this.competitorList = [];
        this.disableFilter = false;
        this.defaultFilters = {
            limit: 20,
            page: 1,
            direction: 'desc',
            sort: 'id'
        };
        this.paginationConfig = {
            itemsPerPage: 20,
            currentPage: 1,
            totalItems: 0
        };
        this.dummyProducts = [];
        this.marketOptions = {
            all: { id: 0, active: true },
            amazon: { id: 1, active: false },
            flipkart: { id: 2, active: false },
            snapdeal: { id: 3, active: false },
            paytm: { id: 4, active: false }
        };
        this.filterOptions = {
            search: {
                open: false,
                filtered: false,
                selected: 'sku_code',
                selectedname: 'SKU Code',
                value: '',
                options: [
                    { slug: 'seller_id', name: 'Seller ID' },
                    { slug: 'seller_name', name: 'Seller Name' }
                ]
            },
            ratings: {
                open: false,
                filtered: false,
                min: '',
                max: ''
            },
            reviews: {
                open: false,
                filtered: false,
                min: '',
                max: ''
            },
            listings: {
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
                selected: 'id',
                options: [
                    { slug: 'id', name: 'ID' },
                    { slug: 'seller_id', name: 'Seller ID' },
                    { slug: 'seller_name', name: 'Seller Name' }
                ]
            }
        };
        this.firstPageItem = 0;
        this.lastPageItem = 0;
        this.listSubscription = null;
        this.listLoading = false;
        this.competitorListError = false;
        this.lockMainHeader = false;
        // this.hideFilter = this.appglobals.isMobile() ? true : false;
        this.filters = Object.assign({}, this.defaultFilters);
        for (var x = 0; x < this.defaultFilters.limit; x++) {
            this.dummyProducts.push({});
        }
        // this.resetFilter();
    }
    CompetitorsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log('ionViewDidEnter competitors');
        this.resetFilter();
        this.events.publish('app:updatehistory', 'competitors');
        this.appservice.searchDebounceInit();
        this.searchChangeCallback = function () {
            console.log('updating filter...');
            _this.updateFilter('search', 'forceupdate');
        };
        this.events.subscribe('app:searchtermchanged', this.searchChangeCallback);
    };
    CompetitorsPage.prototype.ionViewWillUnload = function () {
        this.events.unsubscribe('app:searchtermchanged', this.searchChangeCallback);
    };
    // ionViewDidEnter() {
    //   console.log('ionViewDidEnter CompetitorsPage');
    //   setTimeout(() => {
    //     this.appservice.updateOnlineStatus();
    //   },1000)
    // }
    CompetitorsPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        console.log('ionviewcanenter CompetitorsPage');
        return new Promise(function (resolve, reject) {
            _this.authguard.verifyToken('competitors')
                .then(function () {
                resolve(true);
            })
                .catch(function () {
                reject(true);
            });
        });
    };
    CompetitorsPage.prototype.resetFilterTemplate = function () {
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
                this.filterOptions[filter].selectedname = 'ID';
                this.filterOptions[filter].selected = 'id';
            }
            else if (filter === 'ratings' || filter === 'reviews' || filter === 'listings') {
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
    CompetitorsPage.prototype.resetFilter = function () {
        this.filters = Object.assign({}, this.defaultFilters);
        this.resetFilterTemplate();
        this.listCompetitors();
    };
    CompetitorsPage.prototype.changeSearchField = function (field) {
        this.filterOptions['search'].selected = field;
        this.updateFilter('search');
    };
    CompetitorsPage.prototype.searchItem = function (event) {
        this.appservice.triggerSearchChange(this.filterOptions.search.value);
    };
    CompetitorsPage.prototype.updateFilter = function (filtertype, force) {
        if (force === void 0) { force = ''; }
        if (this.disableFilter) {
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
            case 'ratings':
            case 'reviews':
            case 'listings':
                {
                    if (currentfilter.min && currentfilter.max && (Number(currentfilter.min) <= Number(currentfilter.max))) {
                        this.filters['filters'] = this.filters['filters'] ? this.filters['filters'] : {};
                        this.filters['filters'][filtertype] = {};
                        this.filters['filters'][filtertype]['min'] = Number(currentfilter.min);
                        this.filters['filters'][filtertype]['max'] = Number(currentfilter.max);
                        currentfilter.error = false;
                        currentfilter.filtered = true;
                        currentfilter.open = false;
                    }
                    else {
                        currentfilter.filtered = false;
                        // currentfilter.open = false;
                        currentfilter.error = true;
                        if (this.filters['filters']) {
                            if (this.filters['filters'][filtertype]) {
                                delete this.filters['filters'][filtertype];
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
        this.listCompetitors();
    };
    CompetitorsPage.prototype.toggleDrop = function (filtertype) {
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
    CompetitorsPage.prototype.filterMarket = function (market) {
        // this.navTo('prices',{market: marketname});
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
        this.listCompetitors();
        this.zone.run(function () { });
    };
    CompetitorsPage.prototype.navTo = function (page, params) {
        if (params === void 0) { params = {}; }
        console.log('navigating to page', params);
        this.appservice.updateRootNav(page, false, params);
    };
    CompetitorsPage.prototype.toggleFilterView = function () {
        this.hideFilter = !this.hideFilter;
        this.zone.run(function () { });
    };
    CompetitorsPage.prototype.listCompetitors = function (page) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (this.listSubscription) {
            this.listSubscription.unsubscribe();
        }
        this.paginationConfig.currentPage = page;
        this.filters['page'] = this.paginationConfig.currentPage;
        this.listLoading = true;
        this.competitorListError = false;
        this.competitorList = [];
        this.listSubscription = this.repricerapi.getAllCompetitors(this.filters)
            .subscribe(function (res) {
            if (res.success == true) {
                _this.firstPageItem = ((res.page - 1) * res.results_per_page) + 1;
                _this.lastPageItem = (res.results_per_page < res.result_count) ? ((res.results_per_page * res.page > res.result_count) ? res.result_count : res.results_per_page * res.page) : res.result_count; //TBD refactor this
                _this.paginationConfig.totalItems = res.result_count;
                _this.competitorList = res.data;
                _this.addProperties();
                _this.zone.run(function () { });
            }
        }, function (err) {
            console.warn(err);
            _this.paginationConfig.totalItems = 0;
            // let ermess;
            // try{
            //   ermess = ermess.message ? ermess.message : ermess;
            // }
            // catch(e){
            //   ermess = 'Server Error'
            // }
            // if(ermess){
            //   this.appservice.presentToast(ermess,'error');
            // }
            _this.listLoading = false;
            _this.competitorListError = true;
            _this.zone.run(function () { });
        }, function () {
            _this.listSubscription.unsubscribe();
            _this.listLoading = false;
            _this.disableFilter = false;
        });
        this.zone.run(function () { });
    };
    CompetitorsPage.prototype.addProperties = function () {
        this.competitorList.map(function (val) {
            val['tracked_since_time'] = __WEBPACK_IMPORTED_MODULE_7_moment__(val.tracked_since, 'MMM DD, YYYY, h:mm A');
            val['tracked_since_date'] = __WEBPACK_IMPORTED_MODULE_7_moment__(val['tracked_since_time']).format('MMM DD, YYYY');
            // val['rating'] = 4.1;
        });
    };
    CompetitorsPage.prototype.goBack = function () {
        console.log('going back');
        this.location.back();
    };
    CompetitorsPage.prototype.pagChanged = function (page) {
        this.content.scrollToTop();
        this.listCompetitors(page);
    };
    CompetitorsPage.prototype.gotoCompProducts = function (item, type) {
        if (type === 'mop_violation') {
            if (item["mop_violation"]) {
                this.navTo('competitor-products', { 'violation': 'mop_violation', 'referer': 'competitors', sellerdetails: item });
            }
        }
        else if (type === 'mrp_violation') {
            if (item["mrp_violation"]) {
                this.navTo('competitor-products', { 'violation': 'mrp_violation', 'referer': 'competitors', sellerdetails: item });
            }
        }
    }; //end gotoCompProducts
    CompetitorsPage.prototype.getContentHeight = function () {
        this.content.getContentDimensions();
        // console.log('content dimensions => content top: ' + this.content.contentTop + ' scroll top: ' + this.content.scrollTop);
        if (this.content.scrollTop >= this.content.contentTop) {
            this.lockMainHeader = true;
        }
        else {
            this.lockMainHeader = false;
        }
        this.zone.run(function () { });
    };
    CompetitorsPage.prototype.hideAllFilters = function (event) {
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
    return CompetitorsPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Content */])
], CompetitorsPage.prototype, "content", void 0);
CompetitorsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])({
        name: 'competitors',
        segment: 'competitors',
        priority: 'off'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-competitors',template:/*ion-inline-start:"/var/www/node/repricer/src/pages/competitors/competitors.html"*/'<ion-header class="hidden-xs">\n\n  <ion-navbar no-padding>\n		<ion-title>\n			<!--<ion-title>Pricer - Competitors</ion-title>-->\n			<div class="container">\n				<div class="header-main" padding-horizontal>\n					<!-- Main Nav tabs -->\n					<ul class="nav pri-menu pri-to-nav">\n						<li style="Width: 150px;" margin-right class="hidden-xs"><img src="../assets/img/tracker-logo.png" alt=""></li>\n						<!--<li class="visible-xs pri-menu__hb"> <ion-icon name="menu"></ion-icon></li>-->\n						<!-- <li class="pri-menu__title hasub"><h1>Tracker</h1></li> -->\n						<li class="pri-menu__wrap hidden-xs-inline-block">\n							<ul class="pri-menu__full">\n								<li (click)="navTo(\'dashboard\');"><a>Dashboard</a></li>\n								 <li (click)="navTo(\'import\')"><a>Import</a></li> \n								<li (click)="navTo(\'prices\',{\'marketplace\': \'all\'});"><a>Prices</a></li>\n								 <li class="active"><a>Competitors</a></li> \n								<!-- <li (click)="navTo(\'violations\');"><a>Violations</a></li> -->\n								<!-- <li (click)="navTo(\'products\');"><a>Products</a></li> -->\n								<!--<li (click)="navTo(\'pricingrule\');"><a>Pricing Rules</a></li>-->\n							</ul>\n						</li>\n						<logout-popover>\n						</logout-popover>\n					</ul>\n				</div>\n			</div>\n		</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n\n\n<ion-content (click)="hideAllFilters($event)" class="background-bt-grey-xs" (ionScroll)="getContentHeight()">\n	<div class="container" padding-horizontal>\n		<div class="header-secondary replace-header">\n			<ul class="nav pri-menu">\n				<li (click)="goBack()" class="visible-xs pri-menu__hb"> <ion-icon name="ios-arrow-back"></ion-icon></li>\n				<!-- <li class="pri-menu__title"><h2>Import product details from a CSV</h2></li> -->\n				<li class="pri-menu__wrap marketplace-tabs show-white">\n					<ul class="pri-menu__full">\n						<li [class.active]="marketOptions.all.active"><a (click)="filterMarket(marketOptions.all)">All</a></li>\n						<li [class.active]="marketOptions.amazon.active"><a (click)="filterMarket(marketOptions.amazon)" class="marketplaces m-amazon"><span class="m-h"></span></a></li>\n						<li [class.active]="marketOptions.flipkart.active"><a (click)="filterMarket(marketOptions.flipkart)" class="marketplaces m-flipkart"><span class="m-h"></span></a></li>\n						<li [class.active]="marketOptions.snapdeal.active"><span class="not-allowed text-tooltip"><span class="tooltip-text">Coming Soon</span><a (click)="filterMarket(marketOptions.snapdeal)" class="marketplaces m-snapdeal"><span class="m-h"></span></a></span></li>\n						<li [class.active]="marketOptions.paytm.active"><span class="not-allowed text-tooltip"><span class="tooltip-text">Coming Soon</span><a (click)="filterMarket(marketOptions.paytm)" class="marketplaces m-paytm"><span class="m-h"></span></a></span></li>\n					</ul>\n				</li>\n\n				<!-- <li class="visible-xs"><h5 no-margin="">Competitors</h5></li> -->\n\n				<li class="buttons-right hidden-xs">\n					<ul class="pri-menu_full">\n						<li>{{firstPageItem}} - {{lastPageItem}} of <strong>{{paginationConfig.totalItems}}</strong></li>\n					</ul>\n				</li>\n\n\n			</ul>\n		</div>\n\n		<div class="filters flex">\n			<div class="filters__search flex">\n				<div class="bt-dropdown" [class.open]="filterOptions.search.open">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<!-- .... if any of the elements are selected then add class "filtered" to parent div "bt-dropdown" .... -->\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop btn-search" (click)="toggleDrop(\'search\')">\n						<ion-icon name="ios-search"></ion-icon> {{filterOptions.search.selectedname}}  <ion-icon name="ios-arrow-down"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						<button ion-button color="dark" (click)="changeSearchField(field.slug)" *ngFor="let field of filterOptions.search.options" clear no-margin block class="bt-dropdown__btn button-drop">{{field.name}}</button>\n					</div>\n				</div>\n				<input [(ngModel)]="filterOptions.search.value" (keyup)="searchItem($event)" type="text" class="form-control" placeholder="Type to search" padding-left>\n			</div>\n			<!-- .... On click of this button  ... -->\n			<!-- .... toggle class "open" here ... -->\n			<a (click)="toggleFilterView()" [class.open]="!hideFilter" class="filters__toggle"><img src="../assets/img/filter.png" alt=""></a>\n			<!-- .... toggle class "hidden" for this one -->\n			<div [class.hidden]="hideFilter" class="filters__wrap flex">\n				<div class="bt-dropdown" [class.open]="filterOptions.ratings.open" [class.filtered]="filterOptions.ratings.filtered">\n					<button (click)="toggleDrop(\'ratings\')" ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Ratings\n							<!--<span [hidden]="!filterOptions.ratings.filtered">&nbsp;({{filterOptions.ratings.min.toLocaleString()}} - {{filterOptions.ratings.max.toLocaleString()}})</span> -->\n						<ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd range-dd">\n						<!--<ion-item>-->\n							<!-- .... this range slider stops working when this is added -> dualKnobs="true" .... -->\n							<!-- .... please check as it needs to have dual knobs - for max and min .... -->\n							<!--<ion-range min="1000" max="2000" color="green">-->\n								<!-- <ion-icon range-left small name="sunny"></ion-icon>\n								<ion-icon range-right name="sunny"></ion-icon> -->\n							<!--</ion-range>-->\n						<!--</ion-item>-->\n						<!-- <div> -->\n							<ion-list class="filter-boxes inline" padding-horizontal>\n								<!-- <ion-item class="has-rupee-symbol"> -->\n								<ion-item class="">\n									<ion-label stacked>Min</ion-label>\n									<ion-input min="0" max="5" (keyup.enter)="updateFilter(\'ratings\')" [(ngModel)]="filterOptions.ratings.min" type="number"></ion-input>\n								</ion-item>\n								<ion-item class="">\n									<ion-label stacked>Max</ion-label>\n									<ion-input min="0" max="5" (keyup.enter)="updateFilter(\'ratings\')" [(ngModel)]="filterOptions.ratings.max" type="number"></ion-input>\n								</ion-item>\n							</ion-list>\n						<!-- </div> -->\n						<div [hidden]="!filterOptions.ratings.error" class="error error--danger">\n							Min should be less than Max!\n						</div>\n						<div style="text-align: center;" padding-horizontal>\n							<button ion-button color="green" class="btn-apply" full (click)="updateFilter(\'ratings\')" no-margin>Apply</button>\n						</div>\n					</div>\n				</div>\n\n				<div class="bt-dropdown" [class.open]="filterOptions.reviews.open" [class.filtered]="filterOptions.reviews.filtered">\n					<button (click)="toggleDrop(\'reviews\')" ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Reviews\n							<!--<span [hidden]="!filterOptions.reviews.filtered">&nbsp;({{filterOptions.reviews.min.toLocaleString()}} - {{filterOptions.reviews.max.toLocaleString()}})</span> -->\n						<ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd range-dd">\n						<!--<ion-item>-->\n							<!-- .... this range slider stops working when this is added -> dualKnobs="true" .... -->\n							<!-- .... please check as it needs to have dual knobs - for max and min .... -->\n							<!--<ion-range min="1000" max="2000" color="green">-->\n								<!-- <ion-icon range-left small name="sunny"></ion-icon>\n								<ion-icon range-right name="sunny"></ion-icon> -->\n							<!--</ion-range>-->\n						<!--</ion-item>-->\n						<!-- <div> -->\n							<ion-list class="filter-boxes inline" padding-horizontal>\n								<ion-item class="">\n									<ion-label stacked>Min</ion-label>\n									<ion-input min="1" (keyup.enter)="updateFilter(\'reviews\')" [(ngModel)]="filterOptions.reviews.min" type="number"></ion-input>\n								</ion-item>\n								<ion-item class="">\n									<ion-label stacked>Max</ion-label>\n									<ion-input min="1" (keyup.enter)="updateFilter(\'reviews\')" [(ngModel)]="filterOptions.reviews.max" type="number"></ion-input>\n								</ion-item>\n							</ion-list>\n						<!-- </div> -->\n						<div [hidden]="!filterOptions.reviews.error" class="error error--danger">\n							Min should be less than Max!\n						</div>\n						<div style="text-align: center;" padding-horizontal>\n							<button ion-button color="green" class="btn-apply" full (click)="updateFilter(\'reviews\')" no-margin>Apply</button>\n						</div>\n					</div>\n				</div>\n				<div class="bt-dropdown" [class.open]="filterOptions.listings.open" [class.filtered]="filterOptions.listings.filtered">\n					<button (click)="toggleDrop(\'listings\')" ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Listings\n							<!--<span [hidden]="!filterOptions.listings.filtered">&nbsp;({{filterOptions.listings.min.toLocaleString()}} - {{filterOptions.listings.max.toLocaleString()}})</span> -->\n						<ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd range-dd">\n						<!--<ion-item>-->\n							<!-- .... this range slider stops working when this is added -> dualKnobs="true" .... -->\n							<!-- .... please check as it needs to have dual knobs - for max and min .... -->\n							<!--<ion-range min="1000" max="2000" color="green">-->\n								<!-- <ion-icon range-left small name="sunny"></ion-icon>\n								<ion-icon range-right name="sunny"></ion-icon> -->\n							<!--</ion-range>-->\n						<!--</ion-item>-->\n						<!-- <div> -->\n							<ion-list class="filter-boxes inline" padding-horizontal>\n								<ion-item class="">\n									<ion-label stacked>Min</ion-label>\n									<ion-input min="1" (keyup.enter)="updateFilter(\'listings\')" [(ngModel)]="filterOptions.listings.min" type="number"></ion-input>\n								</ion-item>\n								<ion-item class="">\n									<ion-label stacked>Max</ion-label>\n									<ion-input min="1" (keyup.enter)="updateFilter(\'listings\')" [(ngModel)]="filterOptions.listings.max" type="number"></ion-input>\n								</ion-item>\n							</ion-list>\n						<!-- </div> -->\n						<div [hidden]="!filterOptions.listings.error" class="error error--danger">\n							Min should be less than Max!\n						</div>\n						<div style="text-align: center;" padding-horizontal>\n							<button ion-button color="green" class="btn-apply" full (click)="updateFilter(\'listings\')" no-margin>Apply</button>\n						</div>\n					</div>\n				</div>\n				<!-- <div class="bt-dropdown">\n\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Stockouts <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						blah\n					</div>\n				</div> -->\n				<div class="bt-dropdown" [class.open]="filterOptions.sort.open" [class.filtered]="filterOptions.sort.filtered">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button (click)="toggleDrop(\'sort\')" ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Sort by\n							<!--<span [hidden]="!filterOptions.sort.selectedname">&nbsp;({{filterOptions.sort.selectedname}})</span>-->\n						<ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						<ion-list radio-group [(ngModel)]="filterOptions.sort.selected" (ionChange)="updateFilter(\'sort\')">\n							<ion-item *ngFor="let item of filterOptions.sort.options">\n								<ion-label no-padding>{{item.name}}</ion-label>\n								<ion-radio color="green" no-padding value="{{item.slug}}"></ion-radio>\n							</ion-item>\n						</ion-list>\n					</div>\n				</div>\n				<div class="bt-dropdown" [class.open]="filterOptions.direction.open" [class.filtered]="filterOptions.direction.filtered">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button (click)="toggleDrop(\'direction\')" ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Order\n							<!--<span [hidden]="!filterOptions.direction.selectedname">&nbsp;({{filterOptions.direction.selectedname}})</span>-->\n						<ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						<ion-list radio-group [(ngModel)]="filterOptions.direction.selected" (ionChange)="updateFilter(\'direction\')">\n							<ion-item *ngFor="let item of filterOptions.direction.options">\n								<ion-label no-padding>{{item.name}}</ion-label>\n								<ion-radio color="green" no-padding value="{{item.slug}}"></ion-radio>\n							</ion-item>\n						</ion-list>\n					</div>\n				</div>\n				<!--<button ion-button color="green" class="btn-apply" no-margin>Apply</button>-->\n				<button (click)="resetFilter()" ion-button color="secondary" no-margin class="btn-reset" clear><ion-icon name="md-refresh" class="hidden-xs"></ion-icon><span class="visible-xs">Reset</span></button>\n			</div>\n		</div>\n\n		<div class="tabular">\n			<div class="competitors-theader hidden-xs" [ngClass]="{\'scroll-fixed-header\': lockMainHeader}">\n				<div class="tabular__header flex hidden-xs">\n					<div class="tabular__cell cell-1"></div>\n\n					<div class="tabular__cell cell-6">Seller Name</div>\n\n					<div class="flex cell-20">\n						<div class="tabular__cell cell-4">Competing</div>\n						<div class="tabular__cell cell-4">BuyBox</div>\n						<div class="tabular__cell cell-3">FBM</div> <!--21-->\n						<div class="tabular__cell cell-4">Lowest on</div>\n						<div class="tabular__cell cell-5">MOP violations</div>\n						<div class="tabular__cell cell-5">MRP violations</div>\n						<!--<div class="tabular__cell cell-3">Stockouts</div>-->\n						<div class="tabular__cell cell-4">Tracked Since</div>\n					</div>\n\n					<!-- <div class="tabular__cell cell-3">Visual Overview</div> -->\n\n\n				</div>\n			</div>\n\n			<!-- loader -->\n			 <div class="tabular__row flex has-anim-loader" [hidden]="competitorList.length || listLoading == false" *ngFor="let dummy of dummyProducts">\n				<div class="masked masked--competitors">\n					<div class="masked__bg">\n						<div class="masked__elements">\n							<div class="masked__elem masked--1"></div>\n							<div class="masked__elem masked--2"></div>\n							<div class="masked__elem masked--3"></div>\n							<div class="masked__elem masked--4"></div>\n							<div class="masked__elem masked--5"></div>\n							<div class="masked__elem masked--6"></div>\n							<div class="masked__elem masked--7"></div>\n							<div class="masked__elem masked--8"></div>\n							<div class="masked__elem masked--9"></div>\n							<div class="masked__elem masked--10"></div>\n							<div class="masked__elem masked--11"></div>\n							<div class="masked__elem masked--12"></div>\n							<div class="masked__elem masked--13"></div>\n							<div class="masked__elem masked--14"></div>\n							<div class="masked__elem masked--15"></div>\n							<div class="masked__elem masked--16"></div>\n							<div class="masked__elem masked--17"></div>\n							<div class="masked__elem masked--18"></div>\n							<div class="masked__elem masked--19"></div>\n							<div class="masked__elem masked--20"></div>\n						</div>\n					</div>\n				</div>\n			</div>\n\n			<!--<div class="tabular__row flex" *ngIf="!listLoading && !competitorList.length" style="justify-content: center;">-->\n			<div class="tabular__row flex" [hidden]="listLoading || competitorList.length > 0 || competitorListError" style="justify-content: center;">\n				<strong>No records found</strong>\n			</div>\n\n			<div class="tabular__row flex" [hidden]="listLoading || competitorList.length > 0 || !competitorListError" style="justify-content: center;">\n				<strong>An error occured while loading competitor results!</strong>\n			</div>\n\n			<div class="competitors tabular__row flex" text-nowrap *ngFor="let item of competitorList | paginate: paginationConfig">\n\n				<div class="tabular__cell cell-1 market-place_col">\n					<div class="text-wrap">\n						<span class="marketplaces m-l-0" [ngClass]="{\'m-amazon\': item.channel_id == \'1\',\'m-flipkart\': item.channel_id == \'2\', \'m-snapdeal\': item.channel_id == \'3\', \'m-paytm\': item.channel_id == \'4\'}"><span class="m-h"></span></span>\n					</div>\n				</div>\n\n				<div class="tabular__cell cell-6 seller-name_col">\n					<h6 class="prod-title" no-margin>\n						<a target="blank" [href]="item.seller_url" class="">{{item.seller_name || naText}}</a>\n					</h6>\n					<!-- .... for the amazon like star rating below are the classes .... -->\n					<!-- .... 0.0 stars - "star-0_0"   |   0.5 stars - "star-0_5"   |   1.0 stars - "star-1_0" .... -->\n					<!-- .... 1.5 stars - "star-1_5"   |   2.0 stars - "star-2_0"   |   2.5 stars - "star-2_5" .... -->\n					<!-- .... 3.0 stars - "star-3_0"   |   3.5 stars - "star-3_5"   |   4.0 stars - "star-4_0" .... -->\n					<!-- .... 4.5 stars - "star-4_5"   |   5.0 stars - "star-5_0"   |                          .... -->\n					<!--<div\n						class="amazon-stars inline-elem"\n						[ngClass]="{\'star-0_0\': item.rating == 0 || ( item.rating > 0 && item.rating < 0.5 ) ,\'star-0_5\': item.rating == 0.5 || ( item.rating > 0.5 && item.rating < 1 ),\n									\'star-1_0\': item.rating == 1 || ( item.rating > 1 && item.rating < 1.5 ), \'star-1_5\': item.rating == 1.5 || ( item.rating > 1.5 && item.rating < 2 ),\n									\'star-2_0\': item.rating == 2 || ( item.rating > 2 && item.rating < 2.5 ), \'star-2_5\': item.rating == 2.5 || ( item.rating > 2.5 && item.rating < 3 ),\n									\'star-3_0\': item.rating == 3 || ( item.rating > 3 && item.rating < 3.5 ), \'star-3_5\': item.rating == 3.5 || ( item.rating > 3.5 && item.rating < 4 ),\n									\'star-4_0\': item.rating == 4 || ( item.rating > 4 && item.rating < 4.5 ), \'star-4_5\': item.rating == 4.5 || ( item.rating > 4.5 && item.rating < 5 ),\n									\'star-5_0\': item.rating == 5 || ( item.rating > 5 && item.rating < 5.5 )}"\n					>\n					</div>-->\n					<div class="flex flex-items-center">\n						<star-ratings [stars]="item.rating"></star-ratings>\n						<!--<span class="text-lighter hidden-xs" padding-left>{{item.rating || naText}}</span>-->\n						<span class="text-lighter">{{item.rating || naText}}</span>\n					</div>\n					<br>\n					<span class="text-lighter">( {{item.rating_count ? item.rating_count.toLocaleString() : \'No\'}} ratings )</span>\n				</div>\n\n				<div class="other_col flex cell-20">\n					<div class="tabular__cell cell-4 competing">\n						<span class="product-icon"></span>\n						<strong class="big">{{item.competes_on >= 0 ? item.competes_on.toLocaleString() : naText}}</strong>\n						<br class="visible-xs">\n						<small class="visible-xs">Competing</small>\n					</div>\n\n					<div class="tabular__cell cell-4 buybox">\n						<!--<ion-badge class="bb badge badge-md badge-md-orange" color="orange" text-uppercase="">BB</ion-badge>-->\n						<span>{{item.buy_box >= 0 ? item.buy_box.toLocaleString() : naText}}</span>\n						<br class="visible-xs">\n						<small class="visible-xs">BuyBox</small>\n					</div>\n\n					<div class="tabular__cell cell-3 fbm">\n						<span>{{item.fbm_listings >= 0 ? item.fbm_listings.toLocaleString() : naText}}</span>\n						<br class="visible-xs">\n						<small class="visible-xs">FBM</small>\n					</div>\n\n					<div class="tabular__cell cell-4 cheapest">\n						<span>{{item.cheapest_on >= 0 ? item.cheapest_on.toLocaleString() : naText}}</span>\n						<br class="visible-xs">\n						<small class="visible-xs">Cheapest</small>\n					</div>\n\n					<div (click)="gotoCompProducts(item, \'mop_violation\')" [ngClass]="{showPointer: item.mop_violation }" class="tabular__cell cell-5 mop">\n						<span class="text-primary">{{item.mop_violation >= 0 ? item.mop_violation.toLocaleString() : naText}}</span>\n						<br class="visible-xs">\n						<small class="visible-xs">MOP</small>\n					</div>\n\n					<div (click)="gotoCompProducts(item, \'mrp_violation\')" [ngClass]="{showPointer: item.mrp_violation }" class="tabular__cell cell-5 mrp">\n						<span class="text-primary">{{item.mrp_violation >= 0 ? item.mrp_violation.toLocaleString() : naText}}</span>\n						<br class="visible-xs">\n						<small class="visible-xs">MRP</small>\n					</div>\n\n					<!--<div class="tabular__cell cell-3 stockouts">\n						<span>78</span>\n						<br class="visible-xs">\n						<small class="visible-xs">Stockouts</small>\n					</div>-->\n\n					<div class="tabular__cell cell-4 tracked-since_col">\n						<span class="date">{{item.tracked_since_date || naText}}</span><br>\n						<small class="time text-lighter">{{item.tracked_since_time | date:\'shortTime\'}}</small>\n						<br class="visible-xs">\n						<small class="visible-xs">Tracked</small>\n					</div>\n				</div>\n\n				<!-- <div class="tabular__cell cell-3 graph-col">\n					<div class="tooltip">\n						<pie-chart [dimensions]="40" [pieces]="[{ percent: (item.im_cheaper / item.competes_on) * 100, color: \'#accd0e\' }]"></pie-chart>\n						<div class="tooltip__content direction-left">\n							<span [hidden]="item.cheaper_than_me > 0">No listings cheaper than mine</span>\n							<span [hidden]="item.cheaper_than_me == 0">\n								<span class="big">{{(item.cheaper_than_me / item.competes_on) * 100}}%</span> listings cheaper than mine\n							</span>\n						</div>\n					</div>\n				</div> -->\n\n\n			</div>\n\n			<pagination-controls (pageChange)="pagChanged($event)" autoHide="true"></pagination-controls>\n		</div>\n	</div>\n</ion-content>\n<ion-footer>\n	<footer-element></footer-element>\n</ion-footer>\n'/*ion-inline-end:"/var/www/node/repricer/src/pages/competitors/competitors.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_guard__["a" /* AuthGuard */],
        __WEBPACK_IMPORTED_MODULE_5__providers_app_service__["a" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"],
        __WEBPACK_IMPORTED_MODULE_3__providers_repricer_api__["a" /* RepricerApi */],
        __WEBPACK_IMPORTED_MODULE_6__providers_app_globals__["a" /* AppGlobals */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Events */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
], CompetitorsPage);

//# sourceMappingURL=competitors.js.map

/***/ })

});
//# sourceMappingURL=2.main.js.map