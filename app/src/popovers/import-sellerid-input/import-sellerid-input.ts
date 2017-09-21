import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppService } from '../../providers/app-service';
import { AppGlobals } from '../../providers/app-globals';
import { RepricerApi } from '../../providers/repricer-api';

@IonicPage()
@Component({
  selector: 'import-sellerid-input',
  templateUrl: 'import-sellerid-input.html'
})
export class ImportSellerInput {
  private sellerID: string;
  private nativeElement: any;
  private $: any;
  private payload: any;
  private sellerIds: any = [];
  private addNewSeller: boolean = false;
  private retrievedSellers: boolean = false;
  private failureMessage: string;
  private filterOptions: boolean = false;

  constructor(
    public repricerapi: RepricerApi,
    public navCtrl: NavController,
    public navParams: NavParams,
    public appservice: AppService,
    private appglobals: AppGlobals,
    public element: ElementRef,
    public viewctrl: ViewController) {
      this.nativeElement = this.element.nativeElement;
      this.$ = this.appservice.jQuery;
  }

  sellerIdSelected(event): void{
    console.log("seller id", event);
    this.sellerID = event.value;
    // this.submit(event['value']);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImportSellerInput');
  }

  ngOnInit(){
    // this.$(this.nativeElement).parent().addClass("marketplace-sellerid");
    this.$(this.nativeElement).parents().find('.popover-content').addClass("marketplace-sellerid");
    this.payload = this.navParams.get('payload');

    this.repricerapi.getSellerIDs({'marketplace_id': this.payload['marketplace_id']})
                    .then((res) => {
                      if(res.status && res.sellers_data){

                        if(res.sellers_data.length){
                          let ids = [];
                          res.sellers_data.map((val) => {
                            ids.push({value: val['seller_id'], label: `${val['seller_name']} (${val['seller_id']})`})
                          })
                          this.sellerIds = ids;

                          console.log('sellerids => ', this.sellerIds)
                        }
                        else{
                          this.addSeller()
                        }

                      }
                      else{
                        this.addSeller()
                      }

                      this.retrievedSellers = true;
                    })
                    .catch(() => {
                      this.addSeller();
                      this.retrievedSellers = true;
                    });
  }

  addSeller(){
    this.addNewSeller = true;
  }

  hideNewSellerView(){
    this.addNewSeller = false;
  }

  private updateSeller: boolean = false;
  update(): void{
    this.failureMessage = '';

    if(this.sellerID){
      this.updateSeller = true;
      this.repricerapi.addSeller({'marketplace_id': this.payload['marketplace_id'], 'seller_id': this.sellerID})
                .then((res) => {
                  this.updateSeller = false;
                  if(res.status){
                  }
                  else{
                    this.appservice.presentToast(res.message);
                  }
                  this.submit(this.sellerID);
                })
                .catch((err) => {
                  this.updateSeller = false;
                  this.failureMessage = "Failed to add seller ID";
                });
    }
    else{
      this.failureMessage = "Please enter an ID";
    }
  }

  submit(sid){
    if(sid){
        this.viewctrl.dismiss(sid);
    }
    else{
      this.failureMessage = "No Seller ID set";
    }
  }

  dismiss(){
    // this.appservice.presentToast('Unable to import without seller ID','error');
    this.viewctrl.dismiss();
  }

  private downloadFile(market,name): void{
    let url = this.appglobals.getInstrSheetUrls()[market];
    this.appservice.downloadFile(url,name,'pdf');
  }

  private toggleSellerIdDrop(): void{
    this.filterOptions = !this.filterOptions;
  }
}
