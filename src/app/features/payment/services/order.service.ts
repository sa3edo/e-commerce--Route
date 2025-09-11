import { Injectable } from '@angular/core';
import { baseHttp } from '../../../core/services/base';
import { APP_APIS } from '../../../core/constant/appAPIs';
import { ICashPaymentResponse, IOnlinePaymentResponse } from '../interfaces/IPayResponse';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends baseHttp{
  cashPayment(cartId : string,userData:{}){
    return this.post<ICashPaymentResponse>(`${APP_APIS.cashPayment}/${cartId}`, userData,{token:localStorage.getItem('token')})
  }
  onlinePayment(cartId : string,userData:{}){
    return this.post<IOnlinePaymentResponse>(`${APP_APIS.onlinePayment}/${cartId}?url=${environment.appUrl}`, userData,{token:localStorage.getItem('token')})
  }
}
