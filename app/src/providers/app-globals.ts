import { Injectable, Inject } from '@angular/core';
import { EnvVariables } from '../config/env.token';

declare var window: any;

@Injectable()
export class AppGlobals {
  private appName: string = "Tracker";
  private semVersion: any = {
    major: 1,
    minor: 4,
    patch: '12+nat'
  }
  private miniChartDecThreshold: number = 30;
  public topMetrics: any;
  private appVersion: string = "";
  private serverUrl = '';
  private loginPeriod = 1; //time in days
  private pollInterval = 10000; //milliseconds
  public networkStatusDelay = 10000;
  private fileStackKey= "An9gpIKKZS86ipASXJaGKz";
  private hostname = '';
  private mobileWeb: boolean = false;
  public iosDevice: boolean = false;
  private pageToNavigate: any = {};
  private resultPageLimit = 200;
  private historyStack: Array<any> = [];
  private instructionSheets: any = {
    amazon: 'https://s3.amazonaws.com/repricer-prod/repricer-app/amazon_instructions.pdf',
    flipkart: 'https://s3.amazonaws.com/repricer-prod/repricer-app/flipkart_instructions.pdf',
    amazonSeller: 'https://s3.amazonaws.com/repricer-prod/repricer-app/SellerID_Amazon.pdf',
    flipkartSeller: 'https://s3.amazonaws.com/repricer-prod/repricer-app/SellerID_Flipkart.pdf'
  };
  // private dummyTrackerImports: any = {
  //   amazon: [{name: "electronics" , url: "https://s3.amazonaws.com/repricer-prod/repricer-app/electronics_amazon.xls"},{name: "appliances", url: "https://s3.amazonaws.com/repricer-prod/repricer-app/amazon_appliances.xls"}],
  //   flipkart: [{name: "electronics", url: "https://s3.amazonaws.com/repricer-prod/repricer-app/electronics_flipkart.xls"},{name: "appliances", url: "https://s3.amazonaws.com/repricer-prod/repricer-app/flipkart_appliances.xls"}],
  //   snapdeal: [],
  //   paytm: []
  // }
  private dummyTrackerImports: any = {
    electronics: "https://s3.amazonaws.com/repricer-prod/repricer-app/electronics+.xls",
    appliances: "https://s3.amazonaws.com/repricer-prod/repricer-app/appliances.xls "
  }
  private redirectExceptions = [{page:'login',requiredparam: ':token'},{page:'forgot-password'},{page:'reset-password'}];
  private activeTabsList: any = {
    dashboard:{
      component: 'SummaryPage',
      deeplink: 'dashboard',
      placeholder: 'Dashboard',
      active: true
    },
    import:{
      component: '',
      deeplink: 'import',
      placeholder: 'Import',
      active: true
    },
    prices:{
      component: 'PricesPage',
      deeplink: 'prices',
      requiredparam: 'all',
      placeholder: 'Prices',
      active: false
    },
    competitors: {
      component: '',
      deeplink: 'competitors',
      placeholder: 'Competitors',
      active: false
    },
    competitorproducts: {
      component: '',
      deeplink: 'competitor-products',
      requiredparam: ':violation',
      placeholder: 'Competitor Products',
      active: false
    },
    analytics:{ 
      component: '',
      deeplink: 'analytics',
      placeholder: 'Analytics',
      active: false
    },
    products:{ 
      component: '',
      deeplink: 'products',
      placeholder: 'Products',
      active: false
    },
    pricing_rules:{
      component: '',
      deeplink: 'pricing_rules',
      placeholder: 'Pricing Rules',
      active: false
    },
    settings: { 
      component: '',
      deeplink: 'settings',
      placeholder: 'Settings',
      active: false
    }
  };

  constructor(
    @Inject(EnvVariables) private environment
  ) {
    console.log('Hello AppGlobals Provider',this.environment);

    this.setHostname(window.location.hostname);
    this.serverUrl = this.environment.repricerApi;
    this.fileStackKey = this.environment.fileStackKey;

    for(let vpfix in this.semVersion){
      this.appVersion = this.appVersion + this.semVersion[vpfix] + '.';
    }

    this.appVersion = this.appVersion.substr(0, this.appVersion.length -1);
  }

  public getMiniChartThreshold(): number{
    return this.miniChartDecThreshold;
  }

  public getRedirectExp(): any{
    return this.redirectExceptions;
  }

  public getEnv(){
    return this.environment;
  }

  public getAppName(){
    return this.appName;
  }

  public getInstrSheetUrls(): any{
    return this.instructionSheets;
  }

  public getAppVersion(){
    return this.appVersion;
  }

  public pushToHistory(page){
    this.historyStack.push(page);
  }

  public updateCurrentHistory(page){
    if(this.historyStack.length){
      this.historyStack[this.historyStack.length - 1] = page;
    }
    else{
      this.historyStack.push(page);
    }
  }

  public getHistory(): Array<any>{
     let history = this.historyStack.map((page) => {
       return page;
     })

     return history;
  }

  public getResultPageLimit(): number{
    return this.resultPageLimit;
  }

  public getPageToNavigate(): any{
    return this.pageToNavigate;
  }

  public setPageToNavigate(pageoption: any): void{
    this.pageToNavigate = pageoption;
  }

  public getTabsContainerList(): any{
    return this.activeTabsList;
  }

  public setAsMobileWeb(type: boolean): void{
    this.mobileWeb = type;
  }

  public isMobile(): boolean{
    return this.mobileWeb;
  }

  public setHostname(host: string): void{
    this.hostname = host
  }

  public getHostname(): string{
    return this.hostname;
  }

  public getEnvironment(): string{
    return this.environment.ionicEnvName;
  }

  public getPollInterval(): number{
    return this.pollInterval;
  }

  public getServerUrl(): string{
    return this.serverUrl;
  }

  public getLoginPeriod(): number{
    return this.loginPeriod;
  }

  public getFileStackApiKey(): string{
    return this.fileStackKey;
  }

  public getDummyTrackerUrls(): any{
    return this.dummyTrackerImports;
  }

}
