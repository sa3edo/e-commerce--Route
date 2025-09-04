import { Injectable } from '@angular/core';
import { baseHttp } from '../../../core/services/base';
import { IGetAllCategoris } from '../interfaces/IGetAllCategories';
import { APP_APIS } from '../../../core/constant/appAPIs';
import { IGetSpecificCategory } from '../interfaces/IGetSpecificCategory';

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
  
}
