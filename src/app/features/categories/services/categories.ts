import { Injectable } from '@angular/core';
import { baseHttp } from '../../../core/services/base';
import { IGetAllCategoris } from '../interfaces/IGetAllCategories';
import { APP_APIS } from '../../../core/constant/appAPIs';
import { IGetSpecificCategory } from '../interfaces/IGetSpecificCategory';
import { IGetSubCategories } from '../interfaces/IGetSubCategories';
import { IGetAllProducts } from '../../products/interfaces/IGetAllProducts';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServices extends baseHttp{

  getAllCategories(){
    return this.get<IGetAllCategoris>(APP_APIS.getAllCategories);
  }
  getSpecificCategory(categotyID : string){
    return this.get<IGetSpecificCategory>(`${APP_APIS.getAllCategories}/${categotyID}`);
  }
  getSubcategories(){
    return this.get<IGetSubCategories>(APP_APIS.getAllSubCategories);
  }
  getProductByCategory(categoryId : string){
    return this.get<IGetAllProducts>(APP_APIS.getAllProducts,{'category[in]':categoryId});
  }
  //     getProductsByBrand(brandId:string){
  //  return this.get<IGetAllProducts>(APP_APIS.getAllProducts,{'brand[in]':brandId})
  // }
}
