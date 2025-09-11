// brand.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseHttp } from '../../../core/services/base';
import { IGetAllBrands } from '../interfaces/IGetAllBrands';
import { APP_APIS } from '../../../core/constant/appAPIs';
import { IGetAllProducts } from '../../products/interfaces/IGetAllProducts';
import { IBrand } from '../interfaces/IGetSpecificBrand';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends baseHttp {


  getAllBrands() {
    return this.get<IGetAllBrands>(APP_APIS.getAllBrands);
  }
    getProductsByBrand(brandId:string){
   return this.get<IGetAllProducts>(APP_APIS.getAllProducts,{'brand[in]':brandId})
  }
  getSpecifivBrand(brandId:string){
    return this.get<IBrand>(`${APP_APIS.getAllBrands}/${brandId}`)
  }

}
