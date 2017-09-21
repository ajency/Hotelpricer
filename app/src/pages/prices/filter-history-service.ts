import { Injectable } from "@angular/core";

@Injectable()
export class FilterHistory{
    public filters: any;
    public filterOptions: any;
    public productList: Array<any>;
    public paginationConfig: any;
    public firstPageItem: any;
    public lastPageItem: any;
    public pendingCrawls: any;
    public firstCrawlFailed: any;
    public showFailed: boolean;
    public showInactive: boolean;
    public internalNavigation: boolean;

    constructor(){
        console.log("filterhistory service init");
    }


}