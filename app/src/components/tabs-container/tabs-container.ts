import { Component, ApplicationRef, Input } from '@angular/core';
import { IonicPage, NavController, Events, ViewController } from 'ionic-angular';
import { Location } from '@angular/common';
import { AppService } from '../../providers/app-service';
import { RepricerApi } from '../../providers/repricer-api';
import { AppGlobals } from '../../providers/app-globals';

@Component({
  selector: 'tabs-container',
  templateUrl: 'tabs-container.html'
})
export class TabsContainerComponent {
  @Input('currentpage') currentPage: any;
  private $:any;
  private activeTabsList: any = [];

  constructor(
    private location: Location,
    private appservice: AppService,
    private repricerapi: RepricerApi,
    private navCtrl: NavController,
    private appglobals: AppGlobals,
    private events: Events,
    private viewCtrl: ViewController,
    private ref: ApplicationRef
    ) {
      this.$ = this.appservice.jQuery;

      this.activeTabsList = this.appglobals.getTabsContainerList();

      console.log("tabs contructor init")
      // this.events.subscribe('app:navComplete',(data => {
      //   console.log('app:navComplete subscription',data)
      // }));
  }

  ngOnChanges(){
    console.log('ngOnChanges tabs component',this.currentPage);
    this.setActiveTab(this.currentPage);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad Tabcomponets');
    console.log(this.appglobals.getEnvironment());
    console.log(this.appglobals.isMobile());
  }

  private currentView: any = {};
  ngOnInit(){
    console.log('ngOnInit TabsContainer');
    console.log("oninit location: [" + this.location.path() + '] window location [' + window.location.href + '] path: [' + window.location.pathname + ']');

    this.currentView = this.appglobals.getPageToNavigate();

    console.log("page",this.currentView)
    // this.setActiveTab(this.currentView.page);

  }

  ngAfterContentInit(){
    console.log('ngAfterContentInit TabsContainer');
  }

  ngAfterViewInit(){
    console.log("ngngAfterViewInit TabsContainer location ",this.location.path())
  }

  ngOnDestroy(){
    console.log('ngOnDestroy TabsContainer');
  }

  public goBack(): void{
    this.location.back();
  }

  private menuOpen = false;
  private toggleMenu(): void{
    this.menuOpen = !this.menuOpen;
    // console.log("menu open ", this.menuOpen)
  }

  signOut(): void{
    this.repricerapi.logout()
    .then(() => {
      console.log('logout success')
    })
    .catch((err) => {
      console.warn(err)
    });
  }

  private setActiveTab(routepagecomponent): void{
    for(let tabindex in this.activeTabsList){
      let tab = this.activeTabsList[tabindex]
      if(routepagecomponent === tab.deeplink){
        tab.active = true;
        // this.$(`#${tab.segment}`).addClass('active')
      }
      else{
        tab.active = false;
        // this.$(`#${tab.segment}`).removeClass('active')
      }
    }
    console.log(this.activeTabsList)
  }

  private navTo(page: string, market: string = ''): any{
    console.log('navigating to page', page);
    // let loader = this.appservice.showLoader();
    // this.navCtrl.setRoot(page)
    // .then(() => {
    //   console.log('root [' + this.viewCtrl.component.name + '] set')
    //   // this.setActiveTab(this.viewCtrl.component.name);
    //   loader.dismiss()
    // })
    // .catch((err) => {
    //   console.warn(err)
    //   loader.dismiss()
    // })

    let params = {};
    if(market){
      params['marketplace'] = market;
    }
    this.appservice.updateRootNav(page,true,params)
  }
}
