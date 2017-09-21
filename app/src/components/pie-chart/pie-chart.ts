import { Component, ElementRef, ViewChild, Input } from '@angular/core';

declare var document: any;

@Component({
  selector: 'pie-chart',
  templateUrl: 'pie-chart.html'
})

export class PieChartComponent {
  @ViewChild('PieChart') PieChart: ElementRef;

  @Input('dimensions') containerDimension: string;

  @Input('pieces') slices: Array<{percent: number, color: string}>;

  constructor() {
    // [
    //   // { percent: 0.1, color: 'Coral' },
    //   // { percent: 0.65, color: 'CornflowerBlue' },
    //   // { percent: 0.2, color: '#00ab6b' },
    //   {percent: 0.3, color: '#00ab6b'},
    //   {percent: 0.7,color: '#eeeeee'}
    // ]

  }

  private getCoordinatesForPercent(percent: number) {
    let x = Math.cos(2 * Math.PI * percent);
    let y = Math.sin(2 * Math.PI * percent);
    
    return [x, y];
  }

  ngOnInit(){
    this.containerDimension = this.containerDimension ? this.containerDimension : "100";
    this.init();
  }

  public init(slices: Array<any> = []): void{
    // console.log('pie chart init ',this.PieChart);
    if(slices.length){
      this.slices = slices;
    }

    if(this.slices && this.slices.length){

      let totalpercent = 0
      this.slices.map((val) => {
        totalpercent += val['percent'];
      });

      if(totalpercent < 100){
        let bufferpercent = 100 - totalpercent;
        let bufferpiece = {percent: bufferpercent, color: '#eeeeee'}

        this.slices.push(bufferpiece);
      }
      // console.log("new code here")
    }
    else{
      this.slices = [{percent: 100, color: '#eeeeee'}];
    }

    this.contructSVG();
  }

  private contructSVG(): any{
    let svgEl = this.PieChart.nativeElement;
    let cumulativePercent = 0;

    this.slices.forEach(slice => {
      // destructuring assignment sets the two variables at once
      let [startX, startY] = this.getCoordinatesForPercent(cumulativePercent);
      
      let decimalpercent = slice.percent / 100;
      // each slice starts where the last slice ended, so keep a cumulative percent
      cumulativePercent += decimalpercent;
      
      let [endX, endY] = this.getCoordinatesForPercent(cumulativePercent);

      // if the slice is more than 50%, take the large arc (the long way around)
      let largeArcFlag = decimalpercent > 0.5 ? 1 : 0;

      // create an array and join it just for code readability
      let pathData = [
        `M ${startX} ${startY}`, // Move
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        `L 0 0`, // Line
      ].join(' ');

      // create a <path> and append it to the <svg> element
      let pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathEl.setAttribute('d', pathData);
        pathEl.setAttribute('fill', slice.color);
        svgEl.appendChild(pathEl);
      });
  } // end constructSVG

}
