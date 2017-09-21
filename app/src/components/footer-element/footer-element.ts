import { Component } from '@angular/core';
import { AppGlobals } from '../../providers/app-globals';
/**
 * Generated class for the FooterElementComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'footer-element',
  templateUrl: 'footer-element.html'
})
export class FooterElementComponent {

  private version: string = "";

  constructor(private appglobals: AppGlobals) {
    // console.log('Hello FooterElementComponent Component');
    // this.text = 'Hello World';
    this.version = this.appglobals.getAppVersion();
  }

}
