webpackJsonp([11],{451:function(l,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=e(0),u=e(537),i=e(6),o=e(14),a=e(136),s=e(316),d=e(317),r=e(318),c=e(319),g=e(320),p=e(321),h=e(322),_=e(323),f=e(538),v=e(491),m=e(49);e.d(n,"ResetLoginPageModuleNgFactory",function(){return M});var w=this&&this.__extends||function(){var l=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(l,n){l.__proto__=n}||function(l,n){for(var e in n)n.hasOwnProperty(e)&&(l[e]=n[e])};return function(n,e){function t(){this.constructor=n}l(n,e),n.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)}}(),b=function(l){function n(n){return l.call(this,n,[s.a,d.a,r.a,c.a,g.a,p.a,h.a,_.a,f.a],[])||this}return w(n,l),Object.defineProperty(n.prototype,"_NgLocalization_7",{get:function(){return null==this.__NgLocalization_7&&(this.__NgLocalization_7=new i.NgLocaleLocalization(this.parent.get(t.LOCALE_ID))),this.__NgLocalization_7},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_ɵi_8",{get:function(){return null==this.__ɵi_8&&(this.__ɵi_8=new o["ɵi"]),this.__ɵi_8},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_FormBuilder_9",{get:function(){return null==this.__FormBuilder_9&&(this.__FormBuilder_9=new o.FormBuilder),this.__FormBuilder_9},enumerable:!0,configurable:!0}),n.prototype.createInternal=function(){return this._CommonModule_0=new i.CommonModule,this._ɵba_1=new o["ɵba"],this._FormsModule_2=new o.FormsModule,this._ReactiveFormsModule_3=new o.ReactiveFormsModule,this._IonicModule_4=new a.b,this._IonicPageModule_5=new a.c,this._ResetLoginPageModule_6=new u.a,this._LAZY_LOADED_TOKEN_10=v.a,this._ResetLoginPageModule_6},n.prototype.getInternal=function(l,n){return l===i.CommonModule?this._CommonModule_0:l===o["ɵba"]?this._ɵba_1:l===o.FormsModule?this._FormsModule_2:l===o.ReactiveFormsModule?this._ReactiveFormsModule_3:l===a.b?this._IonicModule_4:l===a.c?this._IonicPageModule_5:l===u.a?this._ResetLoginPageModule_6:l===i.NgLocalization?this._NgLocalization_7:l===o["ɵi"]?this._ɵi_8:l===o.FormBuilder?this._FormBuilder_9:l===m.d?this._LAZY_LOADED_TOKEN_10:n},n.prototype.destroyInternal=function(){},n}(t["ɵNgModuleInjector"]),M=new t.NgModuleFactory(b,u.a)},491:function(l,n,e){"use strict";e(0),e(11),e(34),e(20),e(22);e.d(n,"a",function(){return t});var t=(this&&this.__decorate,this&&this.__metadata,function(){function l(l,n,e,t,u){this.authguard=l,this.navparams=n,this.navCtrl=e,this.repricerapi=t,this.appservice=u,this.password="",this.confirmPassword="",this.minLength=6,this.validationFailMessage="",this.validFields=!1,this.token="",this.resetMailSent=!1,this.resetingMail=!1,this.token=this.navparams.get("token"),console.log("token",this.token)}return l.prototype.ionViewCanEnter=function(){var l=this;return console.log("ionviewcanenter ResetLoginPage"),new Promise(function(n,e){l.authguard.verifyToken("reset-password").then(function(){console.warn("reset pass page not authorised"),e(!0)}).catch(function(){n(!0)})})},l.prototype.resetPassword=function(){var l=this;if(!this.password)return void(this.validationFailMessage="Password cannot be blank!");if(!this.confirmPassword)return void(this.validationFailMessage="Confirm password cannot be blank!");if(this.password!==this.confirmPassword)return void(this.validationFailMessage="Password & confirm password do not match!");var n={token:this.token,new_password:this.password,confirm_password:this.confirmPassword};this.resetingMail=!0,this.repricerapi.resetPassword(n).then(function(n){1==n.success?(l.resetingMail=!1,l.resetMailSent=!0,l.appservice.presentToast(n.status),l.appservice.updateRootNav("login",!0,{},!1)):l.appservice.presentToast(n.status,"error")}).catch(function(n){n.message?l.appservice.presentToast(n.message,"error"):l.appservice.presentToast("reset failed","error")})},l.prototype.comparePasswords=function(l,n){console.log("pass "+l+" confirm pass "+n),this.validationFailMessage="",this.validFields=!1,this.password.length===this.confirmPassword.length&&(this.password===this.confirmPassword?this.password.length>=this.minLength?this.validFields=!0:this.validationFailMessage="Password should have at least "+this.minLength+" characters!":l&&n&&(this.validationFailMessage="Password & confirm password do not match!"))},l}())},537:function(l,n,e){"use strict";e(0),e(11),e(491);e.d(n,"a",function(){return t});var t=(this&&this.__decorate,function(){function l(){}return l}())},538:function(l,n,e){"use strict";function t(l){return i["ɵvid"](0,[(l()(),i["ɵted"](null,["\n"])),(l()(),i["ɵeld"](0,null,null,10,"ion-header",[["class","hidden"]],null,null,null,null,null)),i["ɵdid"](16384,null,0,o.a,[a.c,i.ElementRef,i.Renderer,[2,s.a]],null,null),(l()(),i["ɵted"](null,["\n\n  "])),(l()(),i["ɵeld"](0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,d.a,d.b)),i["ɵdid"](49152,null,0,r.a,[c.a,[2,s.a],[2,g.a],a.c,i.ElementRef,i.Renderer],null,null),(l()(),i["ɵted"](3,["\n    "])),(l()(),i["ɵeld"](0,null,3,2,"ion-title",[],null,null,null,p.a,p.b)),i["ɵdid"](49152,null,0,h.a,[a.c,i.ElementRef,i.Renderer,[2,_.a],[2,r.a]],null,null),(l()(),i["ɵted"](0,["Reset Password"])),(l()(),i["ɵted"](3,["\n  "])),(l()(),i["ɵted"](null,["\n\n"])),(l()(),i["ɵted"](null,["\n\n\n"])),(l()(),i["ɵeld"](0,null,null,94,"ion-content",[["class","background-bt-grey login-page"],["padding",""]],[[2,"statusbar-padding",null]],null,null,f.a,f.b)),i["ɵdid"](4374528,null,0,v.a,[a.c,m.b,w.a,i.ElementRef,i.Renderer,c.a,b.a,i.NgZone,[2,s.a],[2,g.a]],null,null),(l()(),i["ɵted"](1,["\n\n"])),(l()(),i["ɵeld"](0,null,1,90,"div",[["class","container"],["padding-horizontal",""],["padding-top",""]],null,null,null,null,null)),(l()(),i["ɵted"](null,["\n\t"])),(l()(),i["ɵeld"](0,null,null,6,"div",[["class","text-center"],["margin-top",""],["padding-top",""]],null,null,null,null,null)),(l()(),i["ɵted"](null,["\n\t\t"])),(l()(),i["ɵeld"](0,null,null,3,"a",[["class","bt-logo"]],null,null,null,null,null)),(l()(),i["ɵted"](null,["\n\t\t\t"])),(l()(),i["ɵeld"](0,null,null,0,"img",[["alt",""],["src","../assets/img/browntape_logo.png"]],null,null,null,null,null)),(l()(),i["ɵted"](null,["\n\t\t"])),(l()(),i["ɵted"](null,["\n\t"])),(l()(),i["ɵted"](null,["\n\t"])),(l()(),i["ɵeld"](0,null,null,79,"ion-grid",[["class","grid"],["no-padding",""]],null,null,null,null,null)),i["ɵdid"](16384,null,0,M.a,[],null,null),(l()(),i["ɵted"](null,["\n\t  "])),(l()(),i["ɵeld"](0,null,null,75,"ion-row",[["class","row"],["no-padding",""]],null,null,null,null,null)),i["ɵdid"](16384,null,0,y.a,[],null,null),(l()(),i["ɵted"](null,["\n\t    "])),(l()(),i["ɵeld"](0,null,null,71,"ion-col",[["class","col"],["col-12",""],["col-lg-4",""],["col-md-6",""],["no-padding",""],["offset-0",""],["offset-lg-4",""],["offset-md-3",""]],null,null,null,null,null)),i["ɵdid"](16384,null,0,P.a,[],null,null),(l()(),i["ɵted"](null,["\n\t      "])),(l()(),i["ɵeld"](0,null,null,64,"div",[["class","pricer-wrap"]],null,null,null,null,null)),(l()(),i["ɵted"](null,["\n\t      \t"])),(l()(),i["ɵeld"](0,null,null,1,"h1",[["class","pricer-title"]],null,null,null,null,null)),(l()(),i["ɵted"](null,["Pricer"])),(l()(),i["ɵted"](null,["\n\t      \t"])),(l()(),i["ɵeld"](0,null,null,1,"h5",[["class","pricer-sub"]],null,null,null,null,null)),(l()(),i["ɵted"](null,["Reset your login password"])),(l()(),i["ɵted"](null,["\n\n\t      \t"])),(l()(),i["ɵeld"](0,null,null,55,"ion-list",[],null,null,null,null,null)),i["ɵdid"](16384,null,0,C.a,[a.c,i.ElementRef,i.Renderer,m.b,R.a,w.a],null,null),(l()(),i["ɵted"](null,["\n\t      \t\t"])),(l()(),i["ɵeld"](0,null,null,16,"ion-item",[["class","item item-block"],["no-padding",""]],null,null,null,F.a,F.b)),i["ɵdid"](1097728,null,3,N.a,[L.a,a.c,i.ElementRef,i.Renderer,[2,k.a]],null,null),i["ɵqud"](335544320,1,{contentLabel:0}),i["ɵqud"](603979776,2,{_buttons:1}),i["ɵqud"](603979776,3,{_icons:1}),i["ɵdid"](16384,null,0,E.a,[],null,null),(l()(),i["ɵted"](2,["\n\t      \t\t\t"])),(l()(),i["ɵeld"](0,null,1,2,"ion-label",[["floating",""]],null,null,null,null,null)),i["ɵdid"](16384,[[1,4]],0,O.a,[a.c,i.ElementRef,i.Renderer,[8,""],[8,null],[8,null],[8,null]],null,null),(l()(),i["ɵted"](null,["Password"])),(l()(),i["ɵted"](2,["\n\t      \t\t\t"])),(l()(),i["ɵeld"](0,null,3,4,"ion-input",[["type","password"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"keyup"],[null,"ngModelChange"],[null,"change"]],function(l,n,e){var t=!0,u=l.component;if("keyup"===n){t=!1!==u.comparePasswords(i["ɵnov"](l,58).dirty,i["ɵnov"](l,78).dirty)&&t}if("ngModelChange"===n){t=!1!==(u.password=e)&&t}if("change"===n){t=!1!==u.comparePasswords(i["ɵnov"](l,58).dirty,i["ɵnov"](l,78).dirty)&&t}return t},I.a,I.b)),i["ɵdid"](671744,[["passwordRef",4]],0,S.NgModel,[[8,null],[8,null],[8,null],[8,null]],{isDisabled:[0,"isDisabled"],model:[1,"model"]},{update:"ngModelChange"}),i["ɵprd"](2048,null,S.NgControl,null,[S.NgModel]),i["ɵdid"](16384,null,0,S.NgControlStatus,[S.NgControl],null,null),i["ɵdid"](2342912,null,0,T.a,[a.c,m.b,L.a,c.a,i.ElementRef,i.Renderer,[2,v.a],[2,N.a],[2,g.a],[2,S.NgControl],w.a],{type:[0,"type"],disabled:[1,"disabled"]},null),(l()(),i["ɵted"](2,["\n\t      \t\t"])),(l()(),i["ɵted"](null,["\n\t      \t\t"])),(l()(),i["ɵeld"](0,null,null,0,"br",[],null,null,null,null,null)),(l()(),i["ɵted"](null,["\n\t      \t\t"])),(l()(),i["ɵeld"](0,null,null,16,"ion-item",[["class","item item-block"],["no-padding",""]],null,null,null,F.a,F.b)),i["ɵdid"](1097728,null,3,N.a,[L.a,a.c,i.ElementRef,i.Renderer,[2,k.a]],null,null),i["ɵqud"](335544320,4,{contentLabel:0}),i["ɵqud"](603979776,5,{_buttons:1}),i["ɵqud"](603979776,6,{_icons:1}),i["ɵdid"](16384,null,0,E.a,[],null,null),(l()(),i["ɵted"](2,["\n\t      \t\t\t"])),(l()(),i["ɵeld"](0,null,1,2,"ion-label",[["floating",""]],null,null,null,null,null)),i["ɵdid"](16384,[[4,4]],0,O.a,[a.c,i.ElementRef,i.Renderer,[8,""],[8,null],[8,null],[8,null]],null,null),(l()(),i["ɵted"](null,["Confirm Password"])),(l()(),i["ɵted"](2,["\n\t      \t\t\t"])),(l()(),i["ɵeld"](0,null,3,4,"ion-input",[["type","password"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"keyup"],[null,"ngModelChange"],[null,"change"]],function(l,n,e){var t=!0,u=l.component;if("keyup"===n){t=!1!==u.comparePasswords(i["ɵnov"](l,58).dirty,i["ɵnov"](l,78).dirty)&&t}if("ngModelChange"===n){t=!1!==(u.confirmPassword=e)&&t}if("change"===n){t=!1!==u.comparePasswords(i["ɵnov"](l,58).dirty,i["ɵnov"](l,78).dirty)&&t}return t},I.a,I.b)),i["ɵdid"](671744,[["confirmPasswordRef",4]],0,S.NgModel,[[8,null],[8,null],[8,null],[8,null]],{isDisabled:[0,"isDisabled"],model:[1,"model"]},{update:"ngModelChange"}),i["ɵprd"](2048,null,S.NgControl,null,[S.NgModel]),i["ɵdid"](16384,null,0,S.NgControlStatus,[S.NgControl],null,null),i["ɵdid"](2342912,null,0,T.a,[a.c,m.b,L.a,c.a,i.ElementRef,i.Renderer,[2,v.a],[2,N.a],[2,g.a],[2,S.NgControl],w.a],{type:[0,"type"],disabled:[1,"disabled"]},null),(l()(),i["ɵted"](2,["\n\t      \t\t"])),(l()(),i["ɵted"](null,["\n            "])),(l()(),i["ɵeld"](0,null,null,2,"div",[["padding-vertical",""]],null,null,null,null,null)),(l()(),i["ɵted"](null,["\n\t      \t\t\t"])),(l()(),i["ɵted"](null,["\n\t      \t\t"])),(l()(),i["ɵted"](null,["\n\t      \t\t"])),(l()(),i["ɵeld"](0,null,null,1,"div",[["class","error error--danger"]],[[8,"hidden",0]],null,null,null,null)),(l()(),i["ɵted"](null,["\n\t      \t\t\t","\n\t      \t\t"])),(l()(),i["ɵted"](null,["\n\t      \t\t"])),(l()(),i["ɵeld"](0,null,null,6,"div",[["class","pricer-footer"],["padding-top",""]],null,null,null,null,null)),(l()(),i["ɵted"](null,["\n\t      \t\t\t"])),(l()(),i["ɵted"](null,["\n      \t\t\t\t"])),(l()(),i["ɵeld"](0,null,null,2,"button",[["color","green"],["float-right",""],["ion-button",""],["medium",""]],[[8,"disabled",0]],[[null,"click"]],function(l,n,e){var t=!0,u=l.component;if("click"===n){t=!1!==u.resetPassword()&&t}return t},z.a,z.b)),i["ɵdid"](1097728,null,0,B.a,[[8,""],a.c,i.ElementRef,i.Renderer],{color:[0,"color"]},null),(l()(),i["ɵted"](0,["Change Password"])),(l()(),i["ɵted"](null,["\n      \t\t\t"])),(l()(),i["ɵted"](null,["\n\t      \t"])),(l()(),i["ɵted"](null,["\n\t      "])),(l()(),i["ɵted"](null,["\n\t      "])),(l()(),i["ɵeld"](0,null,null,1,"div",[["class","text-center"],["padding-top",""]],null,null,null,null,null)),(l()(),i["ɵted"](null,["© Browntape 2017"])),(l()(),i["ɵted"](null,["\n\t    "])),(l()(),i["ɵted"](null,["\n\t  "])),(l()(),i["ɵted"](null,["\n\t"])),(l()(),i["ɵted"](null,["\n"])),(l()(),i["ɵted"](1,["\n\n"])),(l()(),i["ɵted"](null,["\n\n"]))],function(l,n){var e=n.component;l(n,58,0,e.resetingMail||e.resetMailSent,e.password);l(n,61,0,"password",e.resetingMail||e.resetMailSent),l(n,78,0,e.resetingMail||e.resetMailSent,e.confirmPassword);l(n,81,0,"password",e.resetingMail||e.resetMailSent);l(n,95,0,"green")},function(l,n){var e=n.component;l(n,4,0,i["ɵnov"](n,5)._hidden,i["ɵnov"](n,5)._sbPadding),l(n,13,0,i["ɵnov"](n,14).statusbarPadding),l(n,57,0,i["ɵnov"](n,60).ngClassUntouched,i["ɵnov"](n,60).ngClassTouched,i["ɵnov"](n,60).ngClassPristine,i["ɵnov"](n,60).ngClassDirty,i["ɵnov"](n,60).ngClassValid,i["ɵnov"](n,60).ngClassInvalid,i["ɵnov"](n,60).ngClassPending),l(n,77,0,i["ɵnov"](n,80).ngClassUntouched,i["ɵnov"](n,80).ngClassTouched,i["ɵnov"](n,80).ngClassPristine,i["ɵnov"](n,80).ngClassDirty,i["ɵnov"](n,80).ngClassValid,i["ɵnov"](n,80).ngClassInvalid,i["ɵnov"](n,80).ngClassPending),l(n,88,0,""==e.validationFailMessage),l(n,89,0,e.validationFailMessage),l(n,94,0,e.resetingMail||!e.validFields||e.resetMailSent)})}function u(l){return i["ɵvid"](0,[(l()(),i["ɵeld"](0,null,null,1,"page-reset-login",[],null,null,null,t,Z)),i["ɵdid"](49152,null,0,D.a,[j.a,q.a,g.a,A.a,x.a],null,null)],null,null)}var i=e(0),o=e(39),a=e(2),s=e(5),d=e(137),r=e(29),c=e(7),g=e(17),p=e(58),h=e(35),_=e(30),f=e(40),v=e(24),m=e(4),w=e(9),b=e(21),M=e(107),y=e(108),P=e(106),C=e(60),R=e(8),F=e(59),N=e(18),L=e(16),k=e(31),E=e(42),O=e(32),D=e(491),I=e(76),S=e(14),T=e(44),z=e(23),B=e(15),j=e(34),q=e(10),A=e(20),x=e(22);e.d(n,"a",function(){return K});var V=[],Z=i["ɵcrt"]({encapsulation:2,styles:V,data:{}}),K=i["ɵccf"]("page-reset-login",D.a,u,{},{},[])}});
//# sourceMappingURL=/Users/cyrusAjency/Documents/pricerApp/www/build/11.main.js.map