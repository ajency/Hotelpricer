import { Component, Input, SimpleChange, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'price-battlefield',
  templateUrl: 'price-battlefield.html'
})
export class PriceBattlefieldComponent {
  @ViewChild('mrpElement') mrpElement;
  @ViewChild('rankElement') rankElement;
  @ViewChild('rankLoader') rankLoader;

  @Input('mymin') my_min;
  @Input('mymax') my_max;
  @Input('marketmin') market_min;
  @Input('marketmax') market_max;
  @Input('myprice') my_price;
  @Input('buyboxprice') buy_box_price;
  @Input('isbuybox') is_buy_box;
  @Input('ismin') is_min;
  @Input('mrp') mrp;
  @Input('salesrank') sales_rank;
  @Input('rankobtained') rank_obtained;
  @Input('subject') parent_subject: any;
  @Input('forcehover') force_hover: boolean;

  private parent_subject_subscription: any;

  private hoverTextColor: string = "rgb(100,100,100)";
  private naText = '--';
  private rangeContainerWidth = 150;
  private rangeContainerHeight = 60;
  private rangeContainerPadding = 48;
  private rangeOuterContainerWidth: number;
  private allRangValues: Array<any>;
  private myBuyBox: boolean;

  private circleStartAt;
  private myRangerStartAt;
  private myRangerEndAt;
  private myRangerPointerPath;
  private myRangerLinePath;
  private myPointerColor;
  private marketRangerStartAt;
  private marketRangerEndAt;
  private marketRangerLinePath;
  private containerStyle = '';
  private marketLineColor = '#337ab7';

  private rangeLine;
  private myPricePointer;
  private mpricepointerPixel;
  private myPricePointerColor;
  private buyBoxStartAt;
  private viewBoxDimensions;

  constructor() {
    this.rangeOuterContainerWidth = (this.rangeContainerPadding * 2) + this.rangeContainerWidth;
    // this.containerStyle = `width:${this.rangeOuterContainerWidth}px;`;
    this.viewBoxDimensions = "0 0 " + this.rangeContainerWidth + " " + this.rangeContainerHeight;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    // console.log("svg changes", this.parent_subject)
    for (let propName in changes) {
      let changedProp = changes[propName];
      // let to = JSON.stringify(changedProp.currentValue);
      if(propName !== 'is_buy_box' && propName !== 'is_min'){
        changedProp.currentValue = Number(changedProp.currentValue);
        // console.log("changeProp [" + propName + "] => " + typeof changedProp.currentValue);
      }
    }

    if(this.parent_subject){
      this.parent_subject_subscription = this.parent_subject.subscribe((data) => {
        // console.log(data)
        if(data === 'mouseover'){
          this.mouseenter();
        }
        else if(data === 'mouseleave'){
          this.mouseleave();
        }
      });
    }

    this.mrpElement.nativeElement.style.display = "none";
    this.rankElement.nativeElement.style.display = "none";
    this.rankLoader.nativeElement.style.display = "none";

    this.allRangValues = [
      this.my_min,
      this.my_max,
      this.market_min,
      this.market_max
    ]

    let min_price = Math.min.apply(null,this.allRangValues);
    let max_price = Math.max.apply(null,this.allRangValues);

    let totalRangeValue = max_price - min_price;
    let pixelValue = totalRangeValue / this.rangeContainerWidth;

    let myStartPixel, marketStartPixel;
    if(this.my_min == min_price){
      myStartPixel = 0;
      let marketStartDiff = this.market_min - min_price;
      marketStartPixel = Math.round( marketStartDiff / pixelValue * 10 ) / 10;
    }else{
      let myStartDiff = this.my_min - min_price;
      myStartPixel = Math.round( myStartDiff / pixelValue * 10 ) / 10;
      marketStartPixel = 0;
    }

    let myRangeDiff = this.my_max - this.my_min;
    let myRangePixel = Math.round( myRangeDiff / pixelValue * 10 ) / 10;
    let myEndPixel = myStartPixel + myRangePixel;

    let marketRangeDiff = this.market_max - this.market_min;
    let marketRangePixel = Math.round(marketRangeDiff/pixelValue * 10) / 10;
    let marketEndPixel = marketStartPixel + marketRangePixel;

    let myPriceRangeDiff = this.my_price - this.my_min;
    let myPricePointerPixel = myStartPixel + Math.round( myPriceRangeDiff / pixelValue * 10 ) / 10;

    let buyBoxPointerPixel;
    if(this.is_buy_box == 'no'){
      this.myBuyBox = false;
      let marketPriceRangeDiff = this.buy_box_price - this.market_min;
      buyBoxPointerPixel = marketStartPixel + Math.round( marketPriceRangeDiff/pixelValue * 10 ) / 10;
    }else{
      this.myBuyBox = true;
      buyBoxPointerPixel = myPricePointerPixel;
    }

    this.circleStartAt = buyBoxPointerPixel;

    this.myRangerStartAt = myStartPixel;
    this.myRangerEndAt = myEndPixel;
    this.myRangerPointerPath = 'M ' + myPricePointerPixel + ' 15 l -7 0 l 7 9 l 7 -9 l -7 0';
    // this.myRangerLinePath = 'M '+myStartPixel+' 30 h '+myEndPixel+' Z';
    this.myRangerLinePath = 'M'+myStartPixel+' 30 L'+myEndPixel+' 30';

    if(this.is_min == 'no'){
      this.myPointerColor = 'red';
    }else{
      this.myPointerColor = '#abcd0e';
    }

    this.marketRangerStartAt = marketStartPixel;
    this.marketRangerEndAt = marketEndPixel;
    this.marketRangerLinePath = 'M '+marketStartPixel+' 42 L '+marketEndPixel+' 42';









    let rangeValue = this.market_max - this.market_min;
    let rangePixelValue = rangeValue / this.rangeContainerWidth;

    this.rangeLine = 'M0 30 L'+this.rangeContainerWidth+' 30';

    let myPricePointerDiff = this.my_price - this.market_min;
    this.mpricepointerPixel = Math.round( myPricePointerDiff / rangePixelValue * 10 ) / 10;
    this.mpricepointerPixel = isNaN(this.mpricepointerPixel) ? -1 : this.mpricepointerPixel;
    // console.log('mpricepointerPixel ',this.mpricepointerPixel)
    this.myPricePointer = 'M ' + this.mpricepointerPixel + ' 35 l -7 9 l 14 0 l -7 -9';
    // console.log('myPricePointer ',this.myPricePointer)

    if(this.is_buy_box == 'no'){
      this.myPricePointerColor = 'black';
    }else{
      this.myPricePointerColor = 'orange';
    }

    let buyBoxPointerDiff = this.buy_box_price - this.market_min;
    this.buyBoxStartAt = Math.round( buyBoxPointerDiff/rangePixelValue * 10 ) / 10;


    // console.log('difference => ',myPricePointerDiff);
    // if(this.mouse_enter === 'yes'){
    //   console.log('battlefield mouse over')
    //   this.mouseenter();
    // }

    // if(this.mouse_leave == 'yes'){
    //   console.log('battlefield mouse leave')
    //   this.mouseleave();
    // }

    if((this.rank_obtained && this.sales_rank) || this.force_hover){
      this.mouseenter();
    }
  }

  // ngOnInit(){
  //   this.parent_subject.subscribe((data) => {
  //     console.log(data)
  //   });
  // }

  ngOnDestroy(){
    if(this.parent_subject_subscription){
      this.parent_subject_subscription.unsubscribe();
    }
  }

  mouseenter(){
    this.mrpElement.nativeElement.style.display = "inline";
    if(this.my_price > 0){
      if(this.sales_rank === 'NA'){

      }
      else if(this.sales_rank){
        this.rankElement.nativeElement.style.display = "inline";
      }
      else{
        this.rankLoader.nativeElement.style.display = "inline";
      }
    }
  }

  mouseleave(){
    if(this.force_hover) return;

    this.mrpElement.nativeElement.style.display = "none";
    this.rankElement.nativeElement.style.display = "none";
    this.rankLoader.nativeElement.style.display = "none"
  }

}
