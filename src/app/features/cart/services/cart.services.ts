import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { baseHttp } from "../../../core/services/base";
import { APP_APIS } from "../../../core/constant/appAPIs";
import { IAddToCartResponse } from "../interfaces/IAddToCartResponse";
import { IGetUserCart } from "../interfaces/IGetUserCart";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn:'root'
})
export class CartServices extends baseHttp {
    private readonly platform=inject(PLATFORM_ID)
    getToken():string | null {
        if(isPlatformBrowser(this.platform)) {
            return localStorage.getItem("token");
        }else
            return null;
    }
    addToCart(productId:string){

            return this.post<IAddToCartResponse>(`${APP_APIS.Cart}`,{Headers: {token:this.getToken()},productId})
    }

    getUserCart(){
        return this.get<IGetUserCart>(`${APP_APIS.Cart}`)
    }

}