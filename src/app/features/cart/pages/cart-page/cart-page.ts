import { Component, inject, OnInit } from '@angular/core';
import { CartServices } from '../../services/cart.service';
import { ICartProduct, IGetUserCart, IUserCartData } from '../../interfaces/IGetUserCart';
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";
import { CurrencyPipe } from '@angular/common';
import { IUpdateCartResponse } from '../../interfaces/IUpdateCartResponse';
import { IAddToCartResponse } from '../../interfaces/IAddToCartResponse';
import { IRemoveItemCartResponse } from '../../interfaces/IRemoveItemCartResponse';
import { CartItemComponent } from "../../components/cart-item/cart-item.component";
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-page',
  imports: [LoadingSpinner, CurrencyPipe, CartItemComponent, SectionTitle, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css'
})
export class CartPage implements OnInit {
  //Inject variables
  private readonly cartServices = inject(CartServices)
  private readonly toastrService = inject(ToastrService)
  //Variables
  cartItems!: ICartProduct[]
  cartId!: string
  totalPrice: number = 0
  totalCartItems: number = 0
  isReomving:boolean = false;
  isClear:boolean = false;
  ngOnInit(): void {
    this.getCart()
  }

  getCart() {
    this.cartServices.getUserCart().subscribe({
      next: (response: IGetUserCart) => {
        console.log(response);
        this.cartItems = response.data.products
        console.log(this.cartItems);
        this.totalCartItems = response.numOfCartItems
        this.totalPrice = response.data.totalCartPrice
        this.cartId = response.cartId
      }
    })
  }
  updateCart(productId:string,count:number) {
    
    this.cartServices.updateCart(productId,count).subscribe({
      next:(response:IUpdateCartResponse) => {
        console.log(response);
      }
    })
  }
  removeItem(productId:string) {
    this.isReomving = true
    this.cartServices.deleteProduct(productId).subscribe({
      next:(response:any)=> {
        this.isReomving=false
        console.log(response);
        this.getCart()
      }
    })
  }
  clearCart() {
    this.isClear = true
    this.cartServices.clearCart().subscribe({
      next:(response)=> {
        this.isClear=false
        console.log(response);
        this.toastrService.info("",'clear ' + response.message)
        this.cartItems=[]
      }
    })
  }
}
