import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, PopoverController, Events, Content, App } from 'ionic-angular';
import { Location }  from '@angular/common';
import { RepricerApi } from '../../providers/repricer-api';
import { AppService } from '../../providers/app-service';
import { IDatePickerConfig } from 'ng2-date-picker';
import { Storage } from '@ionic/storage';

import { ModalController } from 'ionic-angular';
import { ImportcsvResultPopoverPage } from '../../modals/importcsv-result/importcsv-result';
import { AppGlobals } from '../../providers/app-globals';
import { AuthGuard } from '../../providers/auth-guard';
import filestack from 'filestack-js';

import { UserPopoverPage } from '../../popovers/user-popover/user-popover';
import { ImportSellerInput } from '../../popovers/import-sellerid-input/import-sellerid-input';
// declare const filestack: {
//   init(apiKey: string,{ policy, signature }): {
//     pick({ maxFiles, accept, fromSources }: { maxFiles: number, accept: string[], fromSources: string[] }):
//       Promise<{ filesUploaded: { url: string }[] }>
//   }
// };


declare var moment: any;
// export interface Search{
//   field: string;
//   value: string;
// }

// export interface Filters{
//   status: string;
//   uploaded_on: string;
// }

// export interface filterDef: {
//     sort: string;
//     direction: string;
//     search: {
//       [key: string]: Search
//     };
//     filters: {
//       [key: string]: Filters
//     };
//     limit: string;
//     Page: string;
// }

@IonicPage({
  name: 'import',
  segment: 'import',
  priority: 'off'
})
@Component({
  selector: 'page-importcsv',
  templateUrl: 'importcsv.html',
})
export class ImportcsvPage {
  @ViewChild('customSelect') customSelect;
  @ViewChild(Content) content: Content;

  private selectedMarket: any;

  private importMarkets = [
    {value: "1", label: 'Amazon'},
    {value: "2", label: 'Flipkart'},
    {value: "all", label: 'Custom'},
  ]

  private currentPage = '';
  private showAlertSuccess = false;

  private showIsPartialCrawl = false;
  private showIsCrawling = false;
  private showIsImport = false;

  private messageVars:any = {};
  private listNaText = "NA";
  private selectedDate: string;
  private datePickerConfig: IDatePickerConfig = {
    format: "DD/MM/YYYY",
    closeOnSelect: true,
    drops: 'down',
    disableKeypress: true
  }
  private uploadedFileUrls: string[] = [];
  private hideFilterView = true;
  private $: any = null;
  private files: any[];
  private templatepayload: object = {
    "file_type": "xlsx"
  };
  private blankTemplateName = "Products-empty-template";
  private csvList = [];
  private dummyCsvList = [];
  private username = '';
  private filterOptions: any = {
    sortBy: {
      open: false,
      filtered: true,
      selected: 'created',
      selectedname: 'Updated on',
      options: [{name:"ID",slug:"id"}, {name: "File name",slug: "file_name"}, {name: "No of listings",slug: "no_of_listing"}, {name: "No of rows", slug: "no_of_rows"}, {name: "Updated on", slug: "created"}]
    },
    direction: {
      open: false,
      filtered: true,
      selected: 'desc',
      selectedname: 'Descending',
      options: [{name: "Ascending", slug: "asc"},{name: "Descending", slug: "desc"}]
    },
    search: {
      value: '',
      selected: 'filename',
      selectedname: 'Filename',
      open: false,
      filtered: true,
      options: [{name: "Filename", slug: 'filename'},{name: 'ID', slug: 'id'}]
    },
    uploadeOn:{
      open: false,
      filtered: false,
      selected: ''
    },
    status: {
      open: false,
      filtered: false,
      selected: '',
      selectedname: '',
      options: [
         {slug: "processed", name: "Processed"}, {slug: "failed", name: "Failed" }, {slug: "crawling", name: "Crawling"}
      ]
    }
  }
  private defaultFilters: any = {
      limit: 20,
      page: 1,
      direction: 'desc',
      sort: 'created',
      hideAlertBox : 0
  }

  private paginationConfig: any = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };

  private filters: any
  private fileStackClient: any;
  private pollingInterval: any;
  private resultModal: any;
  private importingSheet: boolean = false;
  private appMeta: any;
  private dummyCleared: any;
  private showFadeIn: boolean = false;

  constructor(
    private app: App,
    private storage: Storage,
    private location: Location,
    private repricerapi: RepricerApi,
    private appservice: AppService,
    private modalctrl: ModalController,
    private appglobals: AppGlobals,
    private authguard: AuthGuard,
    private navCtrl: NavController,
    private popoverctrl:PopoverController,
    private events: Events,
    private zone: NgZone
    ) {
    this.fileStackClient = filestack.init(this.appglobals.getFileStackApiKey(),{policy: 'policy', signature: 'signature'});
    this.filters = Object.assign({},this.defaultFilters);
    this.$ = this.appservice.jQuery

    // this.selectedMarket = this.importMarkets[0];
    this.selectedMarket = {};

    for(let x = 0; x < this.defaultFilters.limit; x++){
      this.dummyCsvList.push({});
    }

    this.paginationConfig["itemsPerPage"] = this.defaultFilters.limit;
    this.paginationConfig["currentPage"] = this.defaultFilters.page;

    // console.log("custom element => ",this.customSelect.nativeElement)
    // this.hideFilterView = this.appglobals.isMobile() ? true : false;
  }

  public marketSelected(market){
    console.log(market)
    this.selectedMarket = {
      slug: market.value,
      name: market.label
    }

    // this.$(this.ngSelectHandle).find('.single .value:contains("Amazon")').closest('.value').addClass('amazon');
    // this.$(this.ngSelectHandle).find('.single .value:contains("Flipkart")').closest('.value').addClass('flipkart');
    this.$(this.ngSelectHandle).find(".single .value").removeClass('amazon');
    this.$(this.ngSelectHandle).find(".single .value").removeClass('flipkart');

    setTimeout(() => {
      if(this.selectedMarket.slug == '1'){
        // this.$(this.ngSelectHandle).find(".single .value:contains('" +this.selectedMarket.name+ "')").removeClass('flipkart');
        this.$(this.ngSelectHandle).find(".single .value:contains('" +this.selectedMarket.name+ "')").addClass('amazon')
      }
      else if(this.selectedMarket.slug == '2'){
        // this.$(this.ngSelectHandle).find(".single .value:contains('" +this.selectedMarket.name+ "')").removeClass('amazon');
        this.$(this.ngSelectHandle).find(".single .value:contains('" +this.selectedMarket.name+"')").addClass('flipkart');
      }
      else if(this.selectedMarket.slug == 'all'){
        // this.$(this.ngSelectHandle).find(".single .value:contains('" +this.selectedMarket.name+"')").removeClass('amazon');
        // this.$(this.ngSelectHandle).find(".single .value:contains('" +this.selectedMarket.name+"')").removeClass('flipkart');
      }

    },250);



  }

  private enableUpdateFilter = false; // control update of filter from ngChange events in view
  // ngOnInit() {
  //   console.log('ngOnInit ImportcsvPage');
  //   this.listAllCsv()
  //   .then(() => {
  //     this.enableUpdateFilter = true
  //   })
  //   .catch(() => this.enableUpdateFilter = true)

  //   this.pollCsvListData();
  // }

  ionViewCanEnter(): Promise<boolean>{
    console.log('ionviewcanenter ImportcsvPage')
    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('import')
      .then(() => {
        this.appglobals.setPageToNavigate({page: 'import'});
        this.currentPage = 'import';
        resolve(true)
      })
      .catch(() => {
        reject(true)
      })
    })

  }

  private onPopStateHandler: any;
  private searchChangeCallback: any;
  private ngSelectHandle: any;
  private viewInitialized: boolean = false;

  ionViewDidEnter(){
    // setTimeout(() => {
    //   this.appservice.updateOnlineStatus();
    // },1000)
    // this.app.setTitle(`${this.appglobals.getAppName()} - Import`);

    this.appMeta = this.repricerapi.getAppMeta();
    this.dummyCleared = this.appMeta.user['dummy_cleared'];
    this.username = this.appMeta.user["username"];

    this.listAllCsv()
    .then(() => {
      this.enableUpdateFilter = true
    })
    .catch(() => this.enableUpdateFilter = true)

    this.pollCsvListData();

    this.onPopStateHandler = (history) => {
      // console.log('onpop history => ', history);
      if(this.resultModal){
        this.resultModal.dismiss();
      }
    }
    this.events.subscribe('app:popstate',this.onPopStateHandler);

    this.events.publish('app:updatehistory','import');

    this.appservice.searchDebounceInit();

    this.searchChangeCallback = () => {
      console.log('updating filter...')
      this.paginationConfig.currentPage = 1;
      this.updateFilter('search','searchtext');
    }
    this.events.subscribe('app:searchtermchanged',this.searchChangeCallback);

    this.ngSelectHandle = this.$(this.customSelect.nativeElement).find("ng-select");
    console.log("custom element => ",this.ngSelectHandle[0]);

    this.viewInitialized = true;
  }

  ionViewWillLeave(){
    console.log("imortcsv ionViewWillLeave")
    this.stopPollingCsvList();
  }

  ionViewWillUnload(){
    console.log("imortcsv ionViewWillUnload")
    this.events.unsubscribe('app:searchtermchanged',this.searchChangeCallback);
    this.events.unsubscribe('app:popstate',this.onPopStateHandler);
  }

  private stopPollingCsvList(){
    clearInterval(this.pollingInterval)
  }

  private autoSearchUploads(event: any): any{
    console.log("keycode",event.keyCode)

    // let searchFieldLength = this.filterOptions.search.value && this.filterOptions.search.value.length ? this.filterOptions.search.value.length : false;
    // if( event.keyCode === 13 || this.filterOptions.search.value.length === 0 || (searchFieldLength && searchFieldLength % 3 === 0) ){
    //   console.log('model',this.filterOptions.search.value)
    //   this.paginationConfig.currentPage = 1;
    //   this.updateFilter('search',event);
    // }

    this.appservice.triggerSearchChange(this.filterOptions.search.value);
  }

  private pagChanged(page): void{
    console.log(page)
    this.paginationConfig.currentPage = page;
    this.listAllCsv(page)
      .then(() => console.log('fetched'))
      .catch(() => console.warn('fetche error'))
  }

  private pickerClosed: boolean = false;
  private showPicker(payload) {
    this.pickerClosed = false;
    console.log("payload",payload)
    console.log("filestack version => ", filestack.version)
    this.stopPollingCsvList();
    let fileStackClient = filestack.init(this.appglobals.getFileStackApiKey(),{policy: 'policy', signature: 'signature'});
    fileStackClient.pick({
      maxFiles: 1,
      accept: [".xlsx","xls",".csv",".txt"],
      fromSources: ['local_file_system','googledrive','dropbox'],
      // onOpen: () => {console.log("picker open")},
      onClose: (event) => {console.log("picker close",event); setTimeout(() => {this.pickerClosed = true}, 500); this.pollCsvListData();},
      // rejectOnCancel: true
     })
     .then((result) => {
        console.log("pick then =>",result.filesUploaded);
        console.log('picker closed', this.pickerClosed);
        if(this.pickerClosed) return;

        let filesuploaded = result.filesUploaded;

        if(filesuploaded.length){          
          payload['filename'] = filesuploaded[0]["filename"];
          payload['url'] = filesuploaded[0]["url"];
          this.importsheet(payload);
        }
        else{
          let mes = "file upload to filestack failed";
          console.warn(mes);
          this.appservice.presentToast(mes,'error');
        }
     })
     .catch((err) => {
       console.warn("picker cancel",err);
     });

  }

  private showResult(id,filename,status){

    this.$(this.content.getNativeElement()).addClass("disabled-view");

    this.stopPollingCsvList();

    // let payload = {
    //   limit:this.appglobals.getResultPageLimit(),
    //   page:1
    // }

    // this.repricerapi.getProductResult(id, payload,'promise')
    // .then((res) => {
    //   console.log("res",res);
    //   let modaldata = {
    //     filename: filename,
    //     listing: res.data,
    //     item_id: id,
    //     result_count: res.result_count
    //   }

    //   this.repricerapi.setResultPopover(modaldata);
    //   this.resultModal = this.modalctrl.create(ImportcsvResultPopoverPage);
    //   this.resultModal.present({
    //     updateUrl: false
    //   });

    //   this.resultModal.onDidDismiss((data) => {
    //     console.log("result modal dismissed");
    //     this.pollCsvListData();
    //     this.resultModal = null;
    //     this.$(this.content.getNativeElement()).removeClass("disabled-view");
    //   });
    // })
    // .catch((err) => {
    //   console.warn(err)
    // });

    let modaldata = {
      filename: filename,
      status: status,
      listing: [],
      item_id: id,
      result_count: 0
    }

    this.events.publish('app:updatehistory',{page:``, state: {id: 'import'}, frompath: `/import`, replace: true});

    this.repricerapi.setResultPopover(modaldata);
    this.resultModal = this.modalctrl.create(ImportcsvResultPopoverPage);
    this.resultModal.present({
      updateUrl: false
    });

    this.resultModal.onDidDismiss((data) => {
      console.log("result modal dismissed");
      this.pollCsvListData(true);
      this.pollCsvListData();
      this.resultModal = null;
      this.$(this.content.getNativeElement()).removeClass("disabled-view");

      if(data){
        this.location.back();
      }
    });

  }

  // private filters: {
  //   sort: 'id',
  //   direction: 'desc',
  //   search: {
  //     field: 'filename',
  //     value: 'lorem'
  //   },
  //   filters: {
  //     uploaded_on: '01/05/2017',
  //     status: 'processed'
  //   }
  // }

  private updateSearchType(slug): void{
    this.filterOptions.search.selected = slug;

    // this.toggleFileNameDrop();
    this.updateFilter('search');
  }

  private delayModelUpdate(type: string){
    setTimeout(() => {
      this.updateFilter(type)
    },250);
  }

  private updateFilter(type: string, searchtext: string = null): void{
    console.log("$event",event)
    if(!this.enableUpdateFilter){
      return
    }

    let container = this.filterOptions[type];

    console.log(`type '${type}' selected '${container.selected}'`)
    if(!container.selected){
      return
    }

    if(container.options){
      let opts = container.options;

      for(let opt in opts){
        if(opts[opt].slug === container.selected){
          container.selectedname = opts[opt].name
        }
      }
    }

    if(type === 'search'){
      if(container.value && container.selected){
        this.filters.search = this.filters.search ? this.filters.search : {};

        this.filters.search["field"] = container.selected;
        this.filters.search["value"] = container.value;

        container.filtered = true;
      }
      else{
        if(this.filters.search){
          delete this.filters.search;
          container.filtered = false
        }
      }

      // if(event.target === undefined){
      //   this.toggleFileNameDrop();
      // }

      if(searchtext){

      }
      else{
        this.toggleFileNameDrop();
        return;
      }

    }else if(type === 'uploadeOn'){
      if(container.selected){
        this.filters.filters = this.filters.filters ? this.filters.filters : {};

        // container.selected = moment(container.selected).format("DD/MM/YYYY");

        this.filters.filters["uploaded_on"] = container.selected;
        container.filtered = true;
      }
      else{
        if(this.filters.filters){
          if(this.filters.filters.uploaded_on){
            delete this.filters.filters.uploaded_on;
            container.filtered = false;
          }

          if(Object.keys(this.filters.filters).length === 0){
            delete this.filters.filters;
          }
        }
      }
      this.toggleUploadedOnDrop();
    }else if(type === 'status'){
      if(container.selected){
        this.filters.filters = this.filters.filters ? this.filters.filters : {}
        this.filters.filters["status"] = container.selected;
        container.filtered = true;
      }
      else{
        if(this.filters.filters){
          if(this.filters.filters.status){
            delete this.filters.filters.status;
            container.filtered = false;
          }

          if(Object.keys(this.filters.filters).length === 0){
            delete this.filters.filters;
          }
        }
      }
      this.toggleStatusDrop();
    }
    else if(type === 'sortBy'){
      if(container.selected){
        this.filters['sort'] = container.selected;
        container.filtered = true;
      }
      else{
        if(this.filters['sort']){
          delete this.filters['sort'];
          container.filtered = false;
        }
      }
      this.toggleSortByDrop();
    }
    else if(type === 'direction'){
      if(container.selected){
        this.filters['direction'] = container.selected;
        container.filtered = true;
      }
      else{
        if(this.filters['direction']){
          delete this.filters['direction'];
          container.filtered = false;
        }
      }
      this.toggleDirectionDrop();
    }

    console.log("updated filters", this.filters)

    if(type === 'search'){
      this.listAllCsv(this.paginationConfig.currentPage,'observable')
    }
    else{
      this.applyFilters();
    }
    this.zone.run(() => {});
  } //end updateFilter

  private applyFilterFlag = false;
  private applyFilters(resolvetype: string = 'promise'): void{
    this.applyFilterFlag = true;
    this.paginationConfig["itemsPerPage"] = this.defaultFilters.limit;
    this.paginationConfig["currentPage"] = this.defaultFilters.page;
    this.listAllCsv(1,resolvetype)
    .then(() => this.applyFilterFlag = false)
    .catch(() => this.applyFilterFlag = false)
  }

  private resetFilters(): void{
    this.enableUpdateFilter = false;
    this.filters = Object.assign({},this.defaultFilters);
    this.paginationConfig["itemsPerPage"] = this.defaultFilters.limit;
    this.paginationConfig["currentPage"] = this.defaultFilters.page;
    this.resetFilterTemlate();
    this.listAllCsv()
    .then(() => {
      console.log('fetched')
      this.enableUpdateFilter = true;
    })
    .catch(() => {
      console.warn('fetche error')
      this.enableUpdateFilter = true;
    })
    this.zone.run(() => {})
  }

  private hideAllDrops(excludekey): void{
    let x: any;
    for(x in this.filterOptions){
      if(x !== excludekey){
        this.filterOptions[x].open = false
      }
    }
  }

  private resetFilterTemlate(): void{
    let filteroptions = this.filterOptions;
    for(let filter in filteroptions){
      filteroptions[filter]["open"] = false;
      if(filter === 'search'){
        filteroptions[filter]["filtered"] = true;
        filteroptions[filter]["selected"] = 'filename';
        filteroptions[filter]["selectedname"] = 'Filename';
        filteroptions[filter]["value"] = '';
      }
      else if(filter === 'direction'){
        filteroptions[filter]["filtered"] = true;
        filteroptions[filter]["selected"] = 'desc';
        filteroptions[filter]["selectedname"] = 'Descending';
      }
      else if(filter === 'sortBy'){
        filteroptions[filter]["filtered"] = true;
        filteroptions[filter]["selected"] = 'created';
        filteroptions[filter]["selectedname"] = 'Updated on';
      }
      else{
        filteroptions[filter]["filtered"] = false;
        filteroptions[filter]["selected"] = '';
        filteroptions[filter]["selectedname"] = '';
      }
    }
  }

  private toggleFileNameDrop(): void{
    console.log("saffsd")
    this.hideAllDrops("search");
    this.filterOptions.search.open = !this.filterOptions.search.open;
    this.zone.run(() => {});
  }

  // private toggleUploadedByDrop(): void{
  //   this.hideAllDrops("uploadedBy");
  //   this.filterOptions.uploadedBy.open = !this.filterOptions.uploadedBy.open;
  // }

  private toggleDirectionDrop(): void{
    this.hideAllDrops("direction");
    this.filterOptions.direction.open = !this.filterOptions.direction.open;
    this.zone.run(() => {});
  }

  private toggleUploadedOnDrop(): void{
    this.hideAllDrops("uploadeOn");
    this.filterOptions.uploadeOn.open = !this.filterOptions.uploadeOn.open;
    this.zone.run(() => {});
  }

  private toggleStatusDrop(): void{
    this.hideAllDrops("status");
    this.filterOptions.status.open = !this.filterOptions.status.open;
    this.zone.run(() => {});
  }

  private toggleSortByDrop(): void{
    this.hideAllDrops("sortBy");
    this.filterOptions.sortBy.open = !this.filterOptions.sortBy.open;
    this.zone.run(() => {});
  }

  private reqSubscription: any = null;
  private csvListloading = false;
  private csvLoadError: boolean = false;


  private showUploadMessage(message: any, hideAlertBox: any) {
    if(hideAlertBox == 0) {
      this.showFadeIn = false;
      this.hideAlert(0, message.last_import_id);
      if(message.is_crawling == 1) {
        this.showIsCrawling = true;
      } else {
        this.showIsCrawling = false;
      }

      if(message.is_processed == 1){
        if(message.marked_as_inactive > 0) {
          this.showIsPartialCrawl = true;
        }
      }

      if(message.is_import == 1) {
        this.showIsImport = true;
      } 
      else {
        this.showIsImport = false;
      }
      this.messageVars = message;
      this.showFadeIn = true;
      this.showAlertSuccess = true;
    }
  }

  private listAllCsv(page: number = 1, type: string = 'promise'): any{
    console.log("genfilters",this.filters);
    this.csvListloading = true;
    this.filters["page"] = page;
    this.csvList = [];
    this.csvLoadError = false;

    if(type === 'promise'){
        return new Promise((resolve,reject) => {
          this.repricerapi.listCsvUploads(this.filters,type)
          .then((res) => {
            console.log("response", res);
            this.csvListloading = false;
            this.paginationConfig.totalItems = res.result_count;
            this.paginationConfig.itemsPerPage = res.results_per_page;
            this.csvList = res.data;

            this.showUploadMessage(res.message, res.query_data.hideAlertBox);


            this.zone.run(() => {});
            resolve(res.data)
          })
          .catch((err) => {
            console.warn("err", err);
            this.paginationConfig.totalItems = 0;
            this.csvListloading = false;
            this.csvLoadError = true;
            // this.csvListloading = false;

            // if(err.message){
            //   this.appservice.presentToast(err.message,'error');
            // }
            // else{
            //   this.appservice.presentToast('Generic listing error!','error');
            // }
            this.zone.run(() => {});
            reject(err)
          });
        });
    }
    else{
      if(this.reqSubscription){
        console.warn('unsubscribing to previous reqsubscription')
        this.reqSubscription.unsubscribe();
      }

      this.reqSubscription = this.repricerapi.listCsvUploads(this.filters,type)
      .subscribe((res) => {
        console.log("response observable", res);
        this.csvListloading = false;
        this.paginationConfig.totalItems = res.result_count;
        this.paginationConfig.itemsPerPage = res.results_per_page;
        this.csvList = res.data;
        this.showUploadMessage(res.message, res.query_data.hideAlertBox);
      },
      (err) => {
        console.warn("err", err);
        this.csvListloading = false;
      },
      () => {
        this.reqSubscription.unsubscribe();
        this.reqSubscription = null;
        this.zone.run(() => {});
      });
    }
  }

  private pollSubscription: any = null;
  private subscribeToCsvList(): void{
    if(this.pollSubscription){
      // console.warn('unsubsuscribing to previous poll')
      this.pollSubscription.unsubscribe();
    }

    this.filters["page"] = this.paginationConfig['currentPage'];

    this.pollSubscription = this.repricerapi.listCsvUploads(this.filters,'observable')
    .subscribe((res) => {
      // console.log("poll response observable", res);
      this.paginationConfig.totalItems = res.result_count;
      this.paginationConfig.itemsPerPage = res.results_per_page;
      this.csvList = res.data;
      this.showUploadMessage(res.message, res.query_data.hideAlertBox);

      this.zone.run(() => {});
    },
    (err) => {
      // console.warn("err", err);
    },
    () => {
      this.pollSubscription.unsubscribe();
      this.pollSubscription = null;
    });
  }

  private pollCsvListData(singlepoll: boolean = false): void{

    if(singlepoll){
      this.subscribeToCsvList();
    }
    else{
      this.pollingInterval = setInterval(() => {
        this.subscribeToCsvList();
      }, this.appglobals.getPollInterval());
    }
  }

  public goBack(): void{
    this.location.back();
  }

  public toggleFilterView(): void{
    this.hideFilterView = !this.hideFilterView;
    console.log('filter view ' + (this.hideFilterView ? 'hidden' : 'visible') )
    this.zone.run(() => {});
  }

  public downloadBlankTemplate(): void{
    let reqbody = Object.assign({},this.templatepayload);

    reqbody["is_empty"] = true;

    // console.log("this.templatepayload", this.templatepayload);
    // console.log("reqbody",reqbody);
    this.appservice.presentToast('Downloading empty template ...');
    this.repricerapi.exportTemplate(reqbody)
    .then( (res) => {
      console.log(res)
      this.appservice.downloadFile(res.file, this.blankTemplateName);
    })
    .catch((err) => {
      console.warn(err);
    });
  }

  public downImportedFile(id: any): any{
    this.appservice.presentToast('Downloading file ...')
    this.repricerapi.exportImportedFile(id)
    .then((res) => {
      if(res.success == true){
        this.appservice.downloadFile(res.file, res.name);
      }
    })
    .catch((err) => {
      console.warn("err",err)
    })
  }

  public uploadSheet(): void{
    let formdata = new FormData();
    formdata.append("file",this.files[0]);
    // console.log("formdata",this.files);
    this.repricerapi.importTemplate(formdata)
    .then((res) => {
      console.log(res)
    })
    .catch((Err) => {
      console.warn(Err)
    })
  }

  private navTo(page: string, market: string = '',filter: any): any{
    console.log('navigating to page', page);
    let params = {};
    if(market){
      params['marketplace'] = market;
    }

    if(page === 'prices' && filter){
      this.repricerapi.priceFilter = filter;
    }

    this.$(event.currentTarget).removeAttr('href');
    this.appservice.updateRootNav(page,false,params)
  }

  private sellerPopover: any;
  private showSellerPopover(): void{

    let payload = {
      type: "import",
      filename: '',
      url: ''
    }

    payload["marketplace_id"] = this.selectedMarket.slug === 'all' ? 'custom' : this.selectedMarket.slug;
    
    if(payload["marketplace_id"] === 'custom'){
      this.showPicker(payload);
    }
    else{
      this.sellerPopover = this.popoverctrl.create(ImportSellerInput,{payload: payload}, {enableBackdropDismiss: false});
      this.sellerPopover.present();

      this.sellerPopover.onDidDismiss((sellerid) => {
        if(!sellerid) return;
        console.log('seller popover dismisses ', sellerid);
        payload["seller_id"] = sellerid;
        this.showPicker(payload);
      });
    }

  } //end showSellerPopover

  private importSuccess: boolean = false;
  private importsheet(payload: any){
    this.importSuccess = false;
    this.importingSheet = true;

    this.stopPollingCsvList();
    this.hideAlert(0,this.messageVars.last_import_id);

    this.repricerapi.importTemplate(payload)
    .then((res) => {
      console.log("import",res)

      this.paginationConfig['currentPage'] = 1;
      // this.pollCsvListData(true)

      // hide import result banner
      this.showFadeIn = false;
      this.showAlertSuccess = false;

      this.listAllCsv()
      .then(() => console.log('fetched'))
      .catch(() => console.warn('fetche error'))

      if(res.success == true){

        if(!this.appMeta.user['dummy_cleared']){
          this.appMeta.user['dummy_cleared'] = this.dummyCleared = true;
          this.repricerapi.setUser(this.appMeta.user);
          this.storage.set("appMeta",this.appMeta);
        }


        this.appservice.presentToast('Sheet uploaded successfully');
        this.importSuccess = true;
        this.saveSellerID(payload);
      }
      else{
        let errmess = ''
        if(res.errors && res.errors.length){
          errmess = 'Errors in file import:\n'
          let errors = []
          for(let err of res.errors){
            if(typeof err === 'string'){
              errors.push(err);
            }
            else if(err["error"]){
              let line = `(Row: ${err["row"]}, Error: ${err["error"]})`
              errors.push(line);
            }
          }

          errmess = errmess + errors.join('\n');

          this.appservice.presentToast(errmess,'error',15000);
        }
        else{
          errmess = res.status ? res.status : 'File import failed!'

          this.appservice.presentToast(errmess,'error');
        }

      }

      this.pollCsvListData();
      this.importingSheet = false;
      this.zone.run(() => {});
    })
    .catch((err) => {
      console.warn('import',err)
      // let body = JSON.parse(err._body);
      if(err.message){
        this.appservice.presentToast(err.message,'error');
      }

      this.pollCsvListData();
      this.importingSheet = false;
      this.zone.run(() => {});
    });
  } //end importsheet

  private saveSellerID(payload): void{
    if(payload['seller_id']){
      this.repricerapi.addSeller({'marketplace_id': payload['marketplace_id'], 'seller_id': payload['seller_id']})
                .then((res) => {
                  if(res.status){
                  }
                  else{
                    // this.appservice.presentToast(res.message);
                  }
                })
                .catch((err) => {
                  console.warn('err',err);
                });
    }
  } //end saveSellerID

  private hideAllFilters(event){
    // if(event.target.className === 'button-inner') return;

    // for(let filter in this.filterOptions){
    //   this.filterOptions[filter].open = false;
    // }
    // this.zone.run(() => {});
    this.appservice.hideAllDrops(event, this.filterOptions)
    .then((res) => {
      this.zone.run(() => {})
    })
    .catch((err) => {
      console.warn(err)
    });
  } // end hideAllFilters

  private setImportMarket(){
    console.log("import sfasf")
  }

  private downloadFile(market,name): void{
    let url = this.appglobals.getInstrSheetUrls()[market];
    this.appservice.downloadFile(url,name,'pdf');
  }

  private hideAlert(keepHidden: any, last_import_id : any){
    this.showAlertSuccess = false;
    if(keepHidden == 1) {
      this.filters.hideAlertBox = 1;
      this.filters.last_import_id = last_import_id;
    } else {
      this.filters.hideAlertBox = 0;
      this.filters.last_import_id = last_import_id;
    }
  }

  private onContextMenu(event,page): void{
    console.log("on context menu",event.currentTarget)
    this.$(event.currentTarget).attr('href',`/${page}`);
  }

}
