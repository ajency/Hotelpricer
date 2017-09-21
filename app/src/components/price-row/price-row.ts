import { Component, EventEmitter ,Input, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'price-row',
  templateUrl: 'price-row.html'
})
export class PriceRowComponent {

  @Input('sellertabview') sellertabview: boolean = false;
  @Input() item: any = {};
  @Input('loadingpricetrend') loadingPriceTrend;
  @Output() segmentClicked = new EventEmitter<any>();

  private 

  constructor() {
    console.log('Hello PriceRowComponent Component');
  }

  ngOnInit(){
    // console.log("price row: ",this.item);
    if(!this.item.parentsubject){
      this.item.parentsubject = new Subject<string>();
      this.item.parentsubjectstream = this.item.parentsubject.asObservable();
    }
  }

  mouseEnter(){
    // console.log(this.item.parentsubject);
    if(this.item.parentsubject){
      this.item.parentsubject.next('mouseover');
    }
  }

  mouseLeave(){
    if(this.item.parentsubject){
      this.item.parentsubject.next('mouseleave');
    }
  }

  segmentClick(){
    this.segmentClicked.emit(this.item);
  }
}
