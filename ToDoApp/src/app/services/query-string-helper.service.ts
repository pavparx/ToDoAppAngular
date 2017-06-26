import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class QueryStringHelperService {

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router) {}

    getQueryStringParams() {
     
        var urlParams = new URLSearchParams(window.location.href.split('?')[1]);        

        var result = {};

        urlParams.paramsMap.forEach((val: string[], key: string) => {
            result[key] = decodeURIComponent(val[0]).trim();
        })

        return result; 
    }

    getQueryStringByKey(key: string) {
        return this.getQueryStringParams()[key];
    }

    subscribe(fn: Function) {
        return this.activatedRoute.queryParams.subscribe(() => {
            fn(this.getQueryStringParams());
        })
    }

    setQueryStringParam(param:string, value:string) {
        var currentParams = this.getQueryStringParams();   
        currentParams[param] = value;                   
        this.router.navigate([], {
            queryParams: currentParams,
            relativeTo: this.activatedRoute
        });        
    }
}
