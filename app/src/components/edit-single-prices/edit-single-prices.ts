import { Component, NgZone, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
// import { PricingRulePipe } from '../../pipes/pricing-rule/pricing-rule';
import { RepricerApi } from '../../providers/repricer-api';

@IonicPage()
@Component({
  selector: 'page-edit-single-prices',
  templateUrl: 'edit-single-prices.html',
  // providers: [PricingRulePipe]
})
export class EditSinglePricesPage {

  @ViewChild('competitorListings') competitorListings;

  private product_details: any;
  private repricing: any;
  private channel_details: any;

  @Input('item') item: any;
  @Input('productdetailsfromapi') product_details_from_api: any;

  @Output() productObtained = new EventEmitter<any>();

  private naText = '--';
  private pricingRules: any = {};
  private selectedRule: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private viewctrl: ViewController,
    private repricerapi: RepricerApi,
    private events: Events,
    private zone: NgZone
    // private pricingrulepipe: PricingRulePipe
    ) {
    
  }

  ngOnInit(){
    console.log('entering single prices',this.item);
    // careful all data here is passed by reference
    this.product_details = Object.assign({},this.item.product_details);
    this.repricing = Object.assign({},this.item.repricing);
    this.channel_details = Object.assign({}, this.item.channel_details);
    console.log("pr detilas =>",this.product_details);
    console.log("repricing =>",this.repricing)
    console.log("channel details => ",this.channel_details)

    let allrules = this.repricerapi.getPriceRules();

    // this.selectedRule = this.pricingrulepipe.transform(this.repricing.rule_id, this.channel_details.channel_id);    
    this.selectedRule = `${this.repricing.rule_id}`;

    if(this.channel_details['channel_id']){
      this.pricingRules = allrules[`${this.channel_details['channel_id']}`]
      console.log('price rules ',this.pricingRules)
      console.log('selected rules', this.selectedRule);
    }
  }

  ngOnChanges(){
    // this.product_details_from_api = this.item.product_details_from_api;
    console.log("products from api ", this.product_details_from_api)
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad EditSinglePricesPage');
    this.competitorListings.setFocus();
    // this.events.publish('app:updatehistory',{page: "/edit-product/" + this.product_details.id, state: {id: this.product_details.id}});
  }

  private updatedProduct: any;
  private updateInProgress: boolean = false;
  private updateFailMessage: string = '';

  private validateFields(): boolean{
    // if(this.product_details_from_api.mrp && this.product_details_from_api.mop && ( Number(this.product_details_from_api.mrp) < Number(this.product_details_from_api.mop) ) ){
    //   this.updateFailMessage = 'MRP cannot be less than MOP!'
    //   return false
    // }

    // if(!this.product_details_from_api.min && !this.product_details_from_api.max){
    //   this.updateFailMessage = 'Min and max prices are required!'
    //   return false
    // }

    // if(!this.product_details_from_api.min){
    //    this.updateFailMessage = 'Min price is required!'
    //    return false
    // }

    // if(!this.product_details_from_api.max){
    //   this.updateFailMessage = 'Max price is required!'
    //   return false
    // }

    // if(this.product_details_from_api.mop && ( Number(this.product_details_from_api.min) < Number(this.product_details_from_api.mop) ) ){
    //   this.updateFailMessage = 'Your min price cannot be less than the MOP!'
    //   return false
    // }

    // if(this.product_details_from_api.mop &&  ( Number(this.product_details_from_api.max) < Number(this.product_details_from_api.mop) ) ){
    //   this.updateFailMessage = 'Your max price cannot be less than the MOP!'
    //   return false
    // }

    // if(this.product_details_from_api.mrp && ( Number(this.product_details_from_api.min) > Number(this.product_details_from_api.mrp) ) ){
    //   this.updateFailMessage = 'Your min price cannot be greater than the MRP!'
    //   return false
    // }

    // if(Number(this.product_details_from_api.min) >= Number(this.product_details_from_api.max) ){
    //   this.updateFailMessage = 'Your min price needs to be less than your max!'
    //   return false
    // }

    this.updateFailMessage = ''
    this.zone.run(() => {});

    return true
  }

  private update(): void{

    if(this.validateFields() === false){
      return
    }

    let payload = {
      "min": this.product_details_from_api.min,
      "max": this.product_details_from_api.max,
      "mrp": this.product_details_from_api.mrp,
      "mop": this.product_details_from_api.mop,
      "cost_price": this.product_details_from_api.cost_price, 
      "shipping": this.product_details_from_api.shipping,
      // "rule_id":this.selectedRule,
      "tracked_listings": this.product_details_from_api.tracked_listings
    }

    // if(this.product_details_from_api.min){
    //   payload["min"] = Number(this.product_details_from_api.min);
    // }

    // if(this.product_details_from_api.max){
    //   payload["max"] = Number(this.product_details_from_api.max);
    // }

    // if(this.product_details_from_api.mrp){
    //   payload["mrp"] = Number(this.product_details_from_api.mrp);
    // }

    // if(this.product_details_from_api.mop){
    //   payload["mop"] = Number(this.product_details_from_api.mop);
    // }

    // if(this.product_details_from_api.cost_price){
    //   payload["cost_price"] = Number(this.product_details_from_api.cost_price);
    // }

    // if(this.product_details_from_api.shipping){
    //   payload["shipping"] = Number(this.product_details_from_api.shipping);
    // }

    // if(this.selectedRule){
    //   payload["rule_id"] = Number(this.selectedRule);
    // }

    // if(this.product_details_from_api.tracked_listings){
    //   payload["tracked_listings"] = Number(this.product_details_from_api.tracked_listings);
    // }

    this.updateInProgress = true
    this.repricerapi.updateProduct(this.product_details.id, payload)
    .then((res) => {
      console.log('res',res);


      if(res.success == true){
        this.updatedProduct = res.product;
        this.productObtained.emit(res.product);
        // this.dismiss()
      }
      else{
        this.updateFailMessage = 'Update failed!'
      }
      this.updateInProgress = false;
    })
    .catch(() => {
      this.updateInProgress = false;
      this.updateFailMessage = 'Failed to update the product. Try again in a while.';
    })
  }

  // private dismiss(){
  //   this.viewctrl.dismiss(this.updatedProduct);
  // }

}
