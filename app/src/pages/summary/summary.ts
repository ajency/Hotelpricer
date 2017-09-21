import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, PopoverController, App, Events, Content } from 'ionic-angular';
import { RepricerApi } from '../../providers/repricer-api';
import { AuthGuard } from '../../providers/auth-guard';
import { AppService } from '../../providers/app-service';
import { AppGlobals } from '../../providers/app-globals';
import { PieChartComponent } from '../../components/pie-chart/pie-chart';
import { Storage } from '@ionic/storage';
import {BaseChartDirective} from 'ng2-charts';

import { VerifyAccountPopoverPage } from '../../modals/verify-account/verify-account';
import { IMyDrpOptions } from 'mydaterangepicker';

declare var webengage;

@IonicPage({
  name: 'dashboard',
  segment: 'dashboard',
  priority: 'off'
})
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {
  @ViewChild(PieChartComponent)
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  @ViewChild(Content) content: Content;
  private chartNativeElement: any;

  // private  chart: BaseChartDirective;
  private pieChart: PieChartComponent;
  private myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
        alignSelectorRight: false
    };
  private customDateRangeModel: Object = {
                            beginDate: {year: 2018, month: 10, day: 9},
                            endDate: {year: 2018, month: 10, day: 19}
                          };


  private currentPage = 'dashboard';
  private menuOpen: boolean = false;
  private naText: string = '--';
  private dashData: any = {};
  private topMetrics: any = {};
  private lastDayCounts: any = {};
  private marketMetrics: any = [];
  private byMarketplace: any = {};

  private gotTopMetrics: boolean = false;
  private gotTrendChart: boolean = false;
  private gotLastDayCount: boolean = false;
  private gotMarketMetrics: boolean = false;

  private $: any;
  private storageMeta:any;

  private trendChartFilterLabel: string = 'Last 7 Days';

  private defaultDate: any = {
    beginDate: {year: 2018, month: 10, day: 9},
    endDate: {year: 2018, month: 10, day: 19}
  }
  private defaultFilters: any = {
          trendchart: {
                    rangeslug: '',
                    rangemodel: {}
                  },
          lastday: {
                    rangeslug: '',
                    rangemodel: {}
                  }
        };;

  private chartData: any;
  private trendChart: Array<any> = [
        {data: [0, 0, 0, 0, 0, 0, 0], label: 'Total Products'},
        {data: [10, 15, 12, 7, 21, 25, 9], label: "You're Selling"},
        {data: [0, 0, 0, 0, 0, 0, 0], label: "You're Lowest"},
        {data: [0, 5, 0, 0, 10, 0, 0], label: 'You have Buybox'},
        {data: [0, 0, 0, 0, 0, 0, 0], label: 'Your average rank'}
    ];
  //private lineChartLabels:Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saurday', 'Sunday'];
  private lineChartLabels: any = [];
  private lineChartOptions:any = {
    responsive: true
  };
  private lineChartColors:Array<any> = [
    { // Lowest
      // backgroundColor: 'rgba(0,173,243,0.4)',
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: '#00adf3',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // At min
      // backgroundColor: 'rgba(171,205,14,0.4)',
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: '#abcd0e',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // At max
      // backgroundColor: 'rgba(239,71,72,0.4)',
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: '#ef4748',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // At max
      // backgroundColor: 'rgba(239,71,128,0.4)',
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: ' #6633ff',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // At max
      // backgroundColor: 'rgba(239,144,72,0.4)',
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: '#ff9900',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  // private lineChartLegend:boolean = true;
  private lineChartType:string = 'line';
  private nativeElement: any;

  constructor(
    private repricerapi: RepricerApi,
    private authguard: AuthGuard,
    private appservice: AppService,
    private navCtrl: NavController,
    private element: ElementRef,
    private appglobals: AppGlobals,
    private popoverctrl: PopoverController,
    private zone: NgZone,
    private events: Events,
    private storage: Storage,
    private app: App) {
      this.$ = this.appservice.jQuery;
      this.nativeElement = this.element.nativeElement;
      // console.log(this.nativeElement)
      this.getStorageMeta();
  }

  ionViewCanEnter(): Promise<boolean>{

    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('dashboard')
      .then(() => {
        console.log('can enter dashboard')
        // this.appglobals.setPageToNavigate({page: 'dashboard'});
        // this.currentPage = 'dashboard';
        resolve(true)
      })
      .catch(() => {
        reject(true)
      })
    });

  }

  private setRange(rangetype, slug, update: boolean = true): void{
    let filter = this.defaultFilters[rangetype];
    filter['rangeslug'] = slug;

    if(rangetype == 'trendchart' && slug != 'custom'){

      if(slug == '24h'){
        this.trendChartFilterLabel = 'Last 24 Hours';
      }else if(slug == '48h'){
        this.trendChartFilterLabel = 'Last 48 Hours';
      }else if(slug == '7d'){
        this.trendChartFilterLabel = 'Last 7 Days';
      }else if(slug == '30d'){
        this.trendChartFilterLabel = 'Last 30 Days';
      }else{
        this.trendChartFilterLabel = slug;
      }

      if(update){
        this.getTrendChart();
      }
    }
  }


  dateselected(event){
    console.log("date",event)
    if(event.beginJsDate && event.endJsDate){
      this.setRange('trendchart', event.formatted);
    }
    else{
      this.setRange('trendchart', '7d');
    }
  }


  private chartClicked(e:any):void {
    console.log(e);
  }

  private chartHovered(e:any):void {
    console.log(e);
  }

  // private reqComplete: boolean = false;
  private reqComplete: boolean = true;

  ngOnInit(){
    this.chartNativeElement = this.$(this.content.getNativeElement()).find('.por.chart canvas')[0];

    if(this.appglobals.isMobile()){
      this.chartNativeElement.height = 400;
    }
    else{
      this.chartNativeElement.height = 200;
    }
  }

  private urlMeta: any;
  ionViewDidEnter(){
    console.log('ionViewDidEnter dashboard');

    // this.app.setTitle(`${this.appglobals.getAppName()} - Dashboard`);
    this.urlMeta = this.appservice.getURLfromOmnibox('dashboard');

    this.defaultFilters = {
          trendchart: {
                    rangeslug: '7d',
                    rangemodel: {}
                  },
          lastday: {
                    rangeslug: '24h',
                    rangemodel: {}
                  }
        };
    this.dashData = {}

    if(this.urlMeta.currentpage){
      if(this.urlMeta.jsonfilter){
        if(this.urlMeta.jsonfilter['range']){
          this.setRange('trendchart', this.urlMeta.jsonfilter['range'], false);
        }
        // this.setRange('trendchart',);
      }
    }

    this.getDashData();

    // this.repricerapi.getTestAPI()
    //     .then((res) => {console.log(res)})
    //     .catch((err) => {console.warn(err)})

    this.appservice.updateOnlineStatus();

    this.events.publish('app:updatehistory','dashboard');
  }

  private getDashData(): any{
    this.gotTopMetrics = false;
    this.repricerapi.getDashTopMetrics()
    .then((res) => {
      this.gotTopMetrics = true;
      this.topMetrics = res.data;

      webengage.user.setAttribute(res.data);

      this.getTrendChart();
    })
    .catch((err) =>{
      // this.gotTopMetrics = true;
      console.warn(err);
    });
  };

  private dashSubscription: any = null;
  private retrivingTrendChart: boolean = true;
  private getTrendChart(): any{
    //console.log(this.defaultFilters['trendchart']);
    //this.lineChartLabels = ['Monday', 'Tuesday', 'January', 'Thursday', 'Friday', 'Saurday', 'Sunday'];
    this.retrivingTrendChart = true;
    this.gotTrendChart = false;
    this.dashSubscription = this.repricerapi.getDashTrendChart(this.defaultFilters['trendchart']['rangeslug'])
                                            .subscribe((res) => {
                                              this.chartData = res.data.values;
                                              this.lineChartLabels = res.data.labels;

                                              this.trendChart = [
                                                      {data: res.data.values['total_products'] || [], label: 'Total Products'},
                                                      {data: res.data.values['im_selling'] || [], label: "You're Selling"},
                                                      {data: res.data.values['im_lowest'] || [], label: "You're Lowest"},
                                                      {data: res.data.values['i_have_buybox'] || [], label: 'You have Buybox'},
                                                      {data: res.data.values['my_average_rank'] || [], label: 'Your average rank'}
                                                  ];


                                                  //setTimeout(() => {
                                                    if (this.chart && this.chart.chart && this.chart.chart.config) {
                                                        this.chart.chart.config.data.labels = this.lineChartLabels || [];
                                                        this.chart.chart.update();
                                                    }
                                                //});

                                              this.gotTrendChart = true;
                                              this.getLastDayCounts();
                                              this.retrivingTrendChart = false;
                                              this.dashSubscription.unsubscribe();
                                              // this.getMarketMetrics();
                                            },(err) => {
                                              console.warn(err);
                                              this.retrivingTrendChart = false;
                                              this.dashSubscription.unsubscribe();
                                            });
  }

  ionViewWillUnload(){
    if(this.dashSubscription){
      this.dashSubscription.unsubscribe();
    }
  }

  private getLastDayCounts(): any{
    this.gotLastDayCount = false;
    this.repricerapi.getDashlastDayCounts()
    .then((res) => {
      this.lastDayCounts = res.data;
      this.gotLastDayCount = true;
      this.getMarketMetrics();
    })
    .catch((err) => {
      console.warn(err);
      // this.gotLastDayCount = true;
    });
  }

  private getMarketMetrics(): any{
    this.gotMarketMetrics = false;
    this.repricerapi.getDashMarketMetrics()
    .then((res) => {
      console.log("market metrics => ",res);
      this.marketMetrics = res.data;
      this.gotMarketMetrics = true;
    })
    .catch((err) => {
      console.warn(err)
      // this.gotMarketMetrics = true;
    })
  }

  private navTo(page: string, market: string = '',priceoutcome: string = ''): any{
    console.log('navigating to page', page);
    let params = {};
    if(market){
      params['marketplace'] = market;
    }

    if(priceoutcome){
      this.repricerapi.priceFilter = {
          "limit": "20",
          "page": "1",
          "includesellers": "no",
          "sort": "created_at",
          "direction": "desc",
          "filters": {
              "pricing_outcome": priceoutcome
          }
      }
    }

    this.$(event.currentTarget).removeAttr('href');
    this.appservice.updateRootNav(page,false,params)
  }

  private toggleMenu(): void{
    this.menuOpen = !this.menuOpen;
    console.log("menu open ", this.menuOpen)
    this.zone.run(() => {});
  }

  getStorageMeta(){
    this.storage.get('appMeta').then((val) => {
      this.storageMeta = val;
    });
  }

  private onContextMenu(event,page): void{
    console.log("on context menu",event.currentTarget)
    this.$(event.currentTarget).attr('href',`/${page}`);
  }


}
