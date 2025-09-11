import { Component, EventEmitter, inject, Input, output, Output } from '@angular/core';
import { ICartProduct, IProduct } from '../../interfaces/IGetUserCart';
import { CurrencyPipe } from '@angular/common';
import { CartServices } from '../../services/cart.service';
import { response } from 'express';
import { IRemoveItemCartResponse } from '../../interfaces/IRemoveItemCartResponse';
import { IUpdateCartResponse } from '../../interfaces/IUpdateCartResponse';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  // Inject Services
  private readonly cartServices = inject(CartServices)
  private readonly toastrService = inject(ToastrService)


  @Input() item!: ICartProduct;
  @Input() removingProductId: string | null = null;
  isRemoving: boolean = false;
  isUpdating: boolean = false;
  @Output() update = new EventEmitter();
  onRemove(itemId : string) {
    this.isRemoving=true

    this.cartServices.deleteProduct(itemId).subscribe({
      next:(response : IRemoveItemCartResponse) => {
        console.log(response);
        this.isRemoving = false;
        this.update.emit();
      }
    })
  }
  onUpdeteProduct(product: ICartProduct) {
    this.isUpdating = true;
    this.cartServices.updateCart(product.product._id,product.count).subscribe({
      next: (response : IUpdateCartResponse)  => {
        console.log(response);
        this.isUpdating=false;
        this.toastrService.success("Item updated successfuly");
        if(product.count==0)
          this.update.emit()
      }
    })
  }
  updateCount(product :ICartProduct ,action:string){
    product.count = action === 'increment' ? ++product.count : --product.count;

  }

  }

