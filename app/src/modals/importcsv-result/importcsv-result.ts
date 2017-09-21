import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, Content, Events } from 'ionic-angular';
import { RepricerApi } from '../../providers/repricer-api';
import { AppService } from '../../providers/app-service';

import { AppGlobals } from '../../providers/app-globals';
import { AuthGuard } from '../../providers/auth-guard';

/**
 * Generated class for the ImportcsvResultPopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'page-importcsv-result',
  segment: 'page-importcsv'
})
@Component({
  selector: 'page-importcsv-result',
  templateUrl: 'importcsv-result.html',
})
export class ImportcsvResultPopoverPage {
  private results: any;
  private pollInterval;
  @ViewChild(Content) content: Content;

  private paginationConfig: any = {
    itemsPerPage: this.appglobals.getResultPageLimit(), 
    currentPage: 1,
    totalItems: 0
  };

  private importPending: boolean = false;
  constructor(
    private viewCtrl: ViewController, 
    private params: NavParams, 
    private repricerapi: RepricerApi,
    private appservice: AppService,
    private appglobals: AppGlobals,
    private authguard:  AuthGuard,
    private events: Events,
    private navCtrl: NavController
    ) {
    
    this.results = this.repricerapi.getResultPopover();
    
    this.importPending = this.results.status.match(/importing/i) ? true : false;

    this.paginationConfig.totalItems = this.results.result_count;

    // console.log(this.results)

  }

  ngOnInit() {
    console.log('ionViewDidLoad ImportcsvResultPopoverPage');
    this.events.publish('app:updatehistory',{page: "/result/", state: {id: "result"},  frompath: '/import' });
    this.pollResult();

    this.pollInterval = setInterval(() => {
      this.pollResult();
    },this.appglobals.getPollInterval())
  }

  // ionViewCanEnter(): Promise<boolean>{
  //   console.log('ionviewcanenter import csv')
  //   return new Promise((resolve,reject) => {
  //     this.authguard.verifyToken('page-importcsv-result',false)
  //     .then(() => {
  //       resolve(true)
  //     })
  //     .catch(() => {
  //       reject(true) 
  //     })
  //   })

  // }

  ionViewDidEnter(){
    console.log("ionVIew Did Enter importcsv");
  }

  ngOnDestroy(){
    console.log('view destroyed');

    clearInterval(this.pollInterval);
  }

  private filters = {
      limit: this.appglobals.getResultPageLimit(),
      page: 1
    }

  private pollSubscription = null;
  private pollError: boolean = false;
  private pollResult(){
    if(this.pollSubscription) return;

    this.filters['page'] = this.paginationConfig.currentPage;
    this.pollError = false;
    this.pollSubscription = this.repricerapi.getProductResult(this.results.item_id, this.filters)
    .subscribe((res) => {
      // console.log("poll res",res)
      this.paginationConfig.totalItems = res.result_count;
      this.results.listing = res.data;
      this.pollError = false;
    },(err) => {
      // console.warn(err)
      this.pollError = true;
    },() => {
      this.pollSubscription.unsubscribe()
      this.pollSubscription = null;
    });
  }

  dismiss() {
   this.viewCtrl.dismiss({gracefullclose: true});
  }

  private pagChanged(page): void{
    // this.repricerapi.getProductResult(this.results.item_id, payload)
    this.results.listing = [];
    this.content.scrollToTop();
    this.paginationConfig.currentPage = page;
    this.pollResult();
  }

}
