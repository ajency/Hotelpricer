webpackJsonp([12],{

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__products_in_bt__ = __webpack_require__(510);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsInBtPageModule", function() { return ProductsInBtPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProductsInBtPageModule = (function () {
    function ProductsInBtPageModule() {
    }
    return ProductsInBtPageModule;
}());
ProductsInBtPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__products_in_bt__["a" /* ProductsInBtPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__products_in_bt__["a" /* ProductsInBtPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__products_in_bt__["a" /* ProductsInBtPage */]
        ]
    })
], ProductsInBtPageModule);

//# sourceMappingURL=products-in-bt.module.js.map

/***/ }),

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductsInBtPage; });
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
 * Generated class for the ProductsInBtPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProductsInBtPage = (function () {
    function ProductsInBtPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ProductsInBtPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductsInBtPage');
    };
    return ProductsInBtPage;
}());
ProductsInBtPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])({
        name: 'products-in-bt',
        priority: 'off'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-products-in-bt',template:/*ion-inline-start:"/var/www/ENV/hotelpricer/app/src/pages/products-in-bt/products-in-bt.html"*/'<!--\n  Generated template for the ProductsInBtPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>products-in-BT</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content> -->\n<ion-header class="hidden-xs">\n\n  <ion-navbar no-padding>\n		<ion-title> \n			<!--<ion-title>Pricer - Products</ion-title>-->\n			<div class="container">\n				<div class="header-main" padding-horizontal>\n					<!-- Main Nav tabs -->\n					<ul class="nav pri-menu pri-to-nav">\n						<li class="visible-xs pri-menu__hb"> <ion-icon name="menu"></ion-icon></li>\n						<li class="pri-menu__title hasub"><h1>Pricer</h1></li>\n						<li class="pri-menu__wrap hidden-xs-inline-block">\n							<ul class="pri-menu__full">\n								<li><a href="#">Dashboard</a></li>\n								<li><a href="#">Prices</a></li>\n								<!-- <li><a href="#">Competitors</a></li> -->\n								<!-- <li><a href="#">Violations</a></li> -->\n								<!-- <li class="active"><a href="#">Products</a></li> -->\n								<!-- <li><a href="#">Violations</a></li> -->\n								<!-- <li><a href="#">Pricing Rules</a></li> -->\n							</ul>\n						</li>\n						<li class="pri-menu__logout"><a href="#">Logout</a></li>\n					</ul>\n				</div>\n			</div>\n		</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="background-bt-grey-xs">\n	<div class="container" padding-horizontal>\n		<div class="header-secondary replace-header">\n			<ul class="nav pri-menu flex">\n				<li class="visible-xs pri-menu__hb"> <ion-icon name="ios-arrow-back"></ion-icon></li>\n				<li class="pri-menu__title hidden-xs hasub"><h2>Products</h2></li>\n				<li class="pri-menu__wrap marketplace-tabs show-white">\n					<ul class="pri-menu__full">\n						<li><a href="#">Products added to Repricer</a></li>\n						<li class="active"><a>Products in BT</a></li>\n					</ul>\n				</li>\n				<li class="buttons-right fab-in-small-wrap">\n					<ul class="pri-menu__full">\n						<li><button ion-button small color="green" class="fab-in-small"><span class="hidden-xs">Add a Product</span><span class="visible-xs"><ion-icon name="md-add"></ion-icon></span></button></li>\n					</ul>\n				</li>\n			</ul>\n		</div>\n		<div class="filters flex">\n			<div class="filters__search flex">\n				<div class="bt-dropdown">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<!-- .... if any of the elements are selected then add class "filtered" to parent div "bt-dropdown" .... -->\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop btn-search">\n						<ion-icon name="ios-search"></ion-icon> SKU  <ion-icon name="ios-arrow-down"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n							<button ion-button color="dark" clear no-margin block class="bt-dropdown__btn button-drop" disabled>Group ID</button>\n							<button ion-button color="dark" clear no-margin block class="bt-dropdown__btn button-drop">Product Name</button>\n							<button ion-button color="dark" clear no-margin block class="bt-dropdown__btn button-drop">Marketplace</button>\n					</div>\n				</div>\n				<input type="text" class="form-control" placeholder="Type to search" padding-left>\n			</div>\n			<!-- .... On click of this button  ... -->\n			<!-- .... toggle class "open" here ... -->\n			<a href="#" class="filters__toggle open"><img src="../assets/img/filter.png" alt=""></a>\n			<!-- .... toggle class "hidden" for this one -->\n			<div class="filters__wrap flex">\n				\n				<div class="bt-dropdown">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Marketplaces <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						<ion-list radio-group>\n							<ion-item>\n								<ion-label no-padding>Amazon</ion-label>\n								<ion-radio color="green" no-padding></ion-radio>\n							</ion-item>\n							<ion-item>\n								<ion-label no-padding>Flipkart</ion-label>\n								<ion-radio color="green" no-padding></ion-radio>\n							</ion-item>\n							<ion-item>\n								<ion-label no-padding>Snapdeal</ion-label>\n								<ion-radio color="green" no-padding></ion-radio>\n							</ion-item>\n							<ion-item>\n								<ion-label no-padding>Paytm</ion-label>\n								<ion-radio color="green" no-padding></ion-radio>\n							</ion-item>\n						</ion-list>\n					</div>\n				</div>\n				<div class="bt-dropdown">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Price <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						Range slider like the one in prices\n					</div>\n				</div>\n				<div class="bt-dropdown">\n					<!-- .... On click of this button, add class "open" to the parent div "bt-dropdown" .... -->\n					<!-- .... just adding the class will show the dropdown .... -->\n					<button ion-button color="dark" outline no-margin class="bt-dropdown__btn button-drop">\n						<span class="plusicon visible-xs-inline-block"></span> Sort by <ion-icon name="ios-arrow-down" class="hidden-xs icon-small"></ion-icon>\n					</button>\n					<div class="bt-dropdown__dd">\n						blah\n					</div>\n				</div>\n				<!-- <button ion-button color="green" class="btn-apply" no-margin>Apply</button> -->\n				<button ion-button color="secondary" no-margin class="btn-reset" clear><ion-icon name="md-refresh" class="hidden-xs"></ion-icon><span class="visible-xs">Reset</span></button>\n			</div>\n		</div>\n\n		<div class="tabular products-in-bt">\n			<div class="tabular__header flex hidden-xs">\n				<div class="tabular__cell cell-8 product-col">Product</div>\n\n				<div class="tabular__cell cell-18 flex combo-col">\n					<div class="tabular__cell cell-15 track-markets_col">Trackable Marketplaces</div>\n					<div class="tabular__cell cell-15 other-markets_col">Other Marketplaces</div>\n				</div>\n\n				<div class="tabular__cell cell-4 actions-col"></div>\n			</div>\n\n			<div class="tabular__row flex">\n				<div class="tabular__cell cell-8 product-col flex">\n					<div class="img-wrap" margin-right style="background-image: url()">\n						<img src="../assets/img/iphone.png" width="65" alt="">\n					</div>\n					<div class="text-wrap">\n						<span class="sku group">GRP1425BX</span>\n						<h6 class="prod-title">\n							<a target="blank" title="Group title goes here">Group title goes here</a>\n						</h6>\n					</div>\n				</div>\n				\n				<div class="cell-18 flex combo-col">\n					<div class="tabular__cell cell-15 track-markets_col flex" padding-right>\n						<div class="tabular__cell clickable">\n							<div class="text-wrap big">\n								<span class="marketplaces m-amazon"><span class="m-h"></span></span>\n							</div>\n							<div class="">\n								\n								<span class="price">\n									<span class="rupee">&#8377;</span><span class="amount">14552</span>\n								</span>\n							</div>\n						</div>\n\n						<div class="tabular__cell  clickable">\n							<div class=" text-wrap big">\n								<span class="marketplaces m-flipkart"><span class="m-h"></span></span>\n							</div>\n							<div >\n								\n								<span class="price">\n									<span class="rupee">&#8377;</span><span class="amount">14552</span>\n								</span>\n							</div>\n						</div>\n\n						<div class="tabular__cell  clickable">\n							<div class="text-wrap big">\n								<span class="marketplaces m-snapdeal"><span class="m-h"></span></span>\n							</div>\n							<div class="right">\n								\n								<span class="price">\n									<span class="rupee">&#8377;</span><span class="amount">14552</span>\n								</span>\n							</div>\n						</div>\n\n						<div class="tabular__cell  clickable">\n							<div class="text-wrap big">\n								<span class="marketplaces m-paytm"><span class="m-h"></span></span>\n							</div>\n							<div class="right">\n								\n								<span class="price">\n									<span class="rupee">&#8377;</span><span class="amount">14552</span>\n								</span>\n							</div>\n						</div>\n					</div>\n\n					<div class="tabular__cell cell-15 other-markets_col">\n						<div class="img-holder">\n							<img src="../assets/img/jabong.png" alt="">\n						</div>		\n						\n					</div>\n				</div>\n\n				<div class="tabular__cell cell-4 actions-col text-right">\n					<button ion-button small color="green">Track</button>\n				</div>\n			</div><!--/tabular__row-->\n\n			<div class="tabular__row flex">\n				<div class="tabular__cell cell-8 product-col flex">\n					<div class="img-wrap" margin-right style="background-image: url()">\n						<img src="../assets/img/iphone.png" width="65" alt="">\n					</div>\n					<div class="text-wrap">\n						<span class="sku group">GRP1425BX</span>\n						<h6 class="prod-title">\n							<a target="blank" title="Group title goes here">Group title goes here</a>\n						</h6>\n					</div>\n				</div>\n				\n				<div class="cell-18 flex combo-col">\n					<div class="tabular__cell cell-15 track-markets_col flex" padding-right>\n						<div class="tabular__cell clickable">\n							<div class="text-wrap big">\n								<span class="marketplaces m-amazon"><span class="m-h"></span></span>\n							</div>\n							<div class="">\n								\n								<span class="price">\n									<span class="rupee">&#8377;</span><span class="amount">14552</span>\n								</span>\n							</div>\n						</div>\n\n						<div class="tabular__cell  clickable">\n							<div class=" text-wrap big">\n								<span class="marketplaces m-flipkart"><span class="m-h"></span></span>\n							</div>\n							<div >\n								\n								<span class="price">\n									<span class="rupee">&#8377;</span><span class="amount">14552</span>\n								</span>\n							</div>\n						</div>\n\n						<div class="tabular__cell  clickable">\n							<div class="text-wrap big">\n								<span class="marketplaces m-snapdeal"><span class="m-h"></span></span>\n							</div>\n							<div class="right">\n								\n								<span class="price">\n									<span class="rupee">&#8377;</span><span class="amount">14552</span>\n								</span>\n							</div>\n						</div>\n\n						<div class="tabular__cell  clickable">\n							<div class="text-wrap big">\n								<span class="marketplaces m-paytm"><span class="m-h"></span></span>\n							</div>\n							<div class="right">\n								\n								<span class="price">\n									<span class="rupee">&#8377;</span><span class="amount">14552</span>\n								</span>\n							</div>\n						</div>\n					</div>\n\n					<div class="tabular__cell cell-15 other-markets_col">\n						<div class="img-holder">\n							<img src="../assets/img/jabong.png" alt="">\n						</div>	\n					</div>\n				</div>\n\n				<div class="tabular__cell cell-4 actions-col text-right">\n					<button ion-button small color="green">Track</button>\n				</div>\n			</div><!--/tabular__row-->\n\n		</div><!--/products-in-bt-->\n\n	</div>\n</ion-content>'/*ion-inline-end:"/var/www/ENV/hotelpricer/app/src/pages/products-in-bt/products-in-bt.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], ProductsInBtPage);

//# sourceMappingURL=products-in-bt.js.map

/***/ })

});
//# sourceMappingURL=12.main.js.map