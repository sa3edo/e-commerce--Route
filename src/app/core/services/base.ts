import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Params } from "@angular/router";

export class baseHttp{
    protected readonly http = inject(HttpClient)


    protected post<T>(url: string, data:{}){
        return this.http.post<T>(url,data)
    }
    protected get<T>(url: string , filters?:Params){
        return this.http.get<T>(url,{
            params: filters,
        })
    }

}