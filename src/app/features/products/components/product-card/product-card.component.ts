import { Component, inject, Input } from '@angular/core';
import { IProductsData } from '../../interfaces/IGetAllProducts';
import { AddToCartBtnComponent } from "../../../../shared/components/add-to-cart-btn/add-to-cart-btn.component";
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../wishList/services/wishlist.service';
import { IAddToWishList } from '../../../wishList/interfaces/IAddToWishList';
import { ToastrService } from 'ngx-toastr';
import { AddToWishlistBtnComponent } from "../../../../shared/components/add-to-wishlist-btn/add-to-wishlist-btn.component";

@Component({
  selector: 'app-product-card',
  imports: [AddToCartBtnComponent, RouterLink, AddToWishlistBtnComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  //inject services
  private readonly wishlistService = inject(WishlistService)
  private readonly toastrService = inject(ToastrService)
  @Input() prd!: IProductsData;

  //variables
  isWishlistLoading = false;
  addedToWishlist = false;

  addTowishlist(productId: string) {
    if (this.isWishlistLoading) return; // prevent multiple clicks
    this.isWishlistLoading = true;
    this.wishlistService.addToWoshlist(productId).subscribe(
      {
        next: (response: IAddToWishList) => {
          console.log(response);
          this.toastrService.info("", response.message)
          this.isWishlistLoading = false;
          this.addedToWishlist=true
        }
      }
    )
  }
}
