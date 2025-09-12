import { Injectable } from '@angular/core';
import { baseHttp } from '../../../core/services/base';
import { APP_APIS } from '../../../core/constant/appAPIs';
import { IAddToWishList } from '../interfaces/IAddToWishList';
import { IGetUserWishlist } from '../interfaces/IGetUserWishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService extends baseHttp {

  addToWoshlist(productId:string){
    return this.post<IAddToWishList>(APP_APIS.WishList, {productId} , {token:localStorage.getItem("token")});
  }
  getUserWishlist(){
    return this.get<IGetUserWishlist>(APP_APIS.WishList,{},{token:localStorage.getItem("token")});
  }
  
}
