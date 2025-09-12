import { Component, inject, Input } from '@angular/core';
import { CartServices } from '../../../features/cart/services/cart.service';
import { IAddToCartResponse } from '../../../features/cart/interfaces/IAddToCartResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-to-cart-btn',
  imports: [],
  templateUrl: './add-to-cart-btn.component.html',
  styleUrl: './add-to-cart-btn.component.css'
})
export class AddToCartBtnComponent {
  @Input() productId!: string;
  //variables
  isLoading: boolean = false;
  isAdded: boolean = false;
  //Inject services
  private readonly cartServices = inject(CartServices)
  private readonly toast = inject(ToastrService)


  addToCart(productId: string): void {

    this.isLoading = true;
    this.cartServices.addToCart(productId).subscribe({
      next: (response: IAddToCartResponse) => {
        console.log(response);
        this.isLoading = false;
        this.isAdded = true;
        this.toast.success("", response.message);
      }, error: (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    })
  }
}
