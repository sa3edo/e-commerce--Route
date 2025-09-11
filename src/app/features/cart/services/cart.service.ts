import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { baseHttp } from "../../../core/services/base";
import { APP_APIS } from "../../../core/constant/appAPIs";
import { IAddToCartResponse } from "../interfaces/IAddToCartResponse";
import { IGetUserCart } from "../interfaces/IGetUserCart";
import { isPlatformBrowser } from "@angular/common";
import { IUpdateCartResponse } from "../interfaces/IUpdateCartResponse";
import { IRemoveItemCartResponse } from "../interfaces/IRemoveItemCartResponse";
import { IGetUserOrder } from "../interfaces/IGetUserOrders";

@Injectable({
    providedIn: 'root'
})
export class CartServices extends baseHttp {
    // private readonly platform = inject(PLATFORM_ID)

    addToCart(productId: string) {

        return this.post<IAddToCartResponse>(APP_APIS.Cart, { productId: productId }, { token: localStorage.getItem('token') })
    }

    getUserCart() {
        return this.get<IGetUserCart>(`${APP_APIS.Cart}`,undefined,{ token: localStorage.getItem("token") })
    }
    updateCart(productId: string,count: number) {

        return this.put<IUpdateCartResponse>(`${APP_APIS.Cart}/${productId}`,{count:count},{ token: localStorage.getItem('token') })
    }
    deleteProduct(productId: string) {
        return this.delete<IRemoveItemCartResponse>(`${APP_APIS.Cart}/${productId}`,{ token: localStorage.getItem('token') })
    }
    clearCart(){
        return this.delete<{message:string}>(APP_APIS.Cart,{ token: localStorage.getItem("token") })
    }
    getUserOrder(userId : string){
        return this.get<IGetUserOrder[]>(`${APP_APIS.allOrders}/${userId}`)
    }
    }

