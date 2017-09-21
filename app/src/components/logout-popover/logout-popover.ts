import { Component, Input } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { UserPopoverPage } from '../../popovers/user-popover/user-popover';
import { AppGlobals } from '../../providers/app-globals';
import { RepricerApi } from '../../providers/repricer-api';

@Component({
  selector: 'logout-popover',
  templateUrl: 'logout-popover.html'
})
export class LogoutPopoverComponent {
  @Input('topmetrics') topMetrics: any = {};
  @Input('source') Source: string;

  constructor(
    private popoverctrl: PopoverController,
    private appglobals: AppGlobals,
    private repricerapi: RepricerApi
  ) {
    console.log('Hello LogoutPopoverComponent Component');
  }

  ngOnChanges(){
    console.log("logout popover changes", this.topMetrics);
    if(this.topMetrics && Object.keys(this.topMetrics).length > 0){
      this.appglobals.topMetrics = this.topMetrics;
    }
    
  }

  ngOnInit(){
    console.log("logout popover inti", this.appglobals.topMetrics)
    // this.topMetrics = this.appglobals.topMetrics ? this.appglobals.topMetrics : {};
    if(this.appglobals.topMetrics && Object.keys(this.appglobals.topMetrics).length > 0){
      this.topMetrics = this.appglobals.topMetrics;
    }

    if(this.Source === 'dashboard') return;

    this.repricerapi.getDashTopMetrics()
                    .then((res) => {
                      this.topMetrics = res.data;
                      this.appglobals.topMetrics = this.topMetrics;
                    })
                    .catch((err) =>{
                      console.warn(err);
                    });

  }

  private showUserPopover(event: any): void{
    console.log("creating popover")
    let userpopover = this.popoverctrl.create(UserPopoverPage)

    userpopover.present({
      ev: event
    });
  }
}
