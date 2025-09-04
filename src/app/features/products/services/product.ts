import { Injectable } from '@angular/core';
import { baseHttp } from '../../../core/services/base';
import { IGetAllProducts } from '../interfaces/IGetAllProducts';
import { environment } from '../../../../environments/environment';
import { APP_APIS } from '../../../core/constant/appAPIs';
import { IGetProduct } from '../interfaces/IGetProduct';
import { Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServices extends baseHttp {
  getAllProducts(filters?:Params){
    const params = new HttpParams().appendAll(filters || {});
    return this.get<IGetAllProducts>(APP_APIS.getAllProducts , filters)
  }
  getSpecificProducts(productId : string){
    return this.get<IGetProduct>(`${APP_APIS.getAllProducts}/${productId}`)
  }
  
}
