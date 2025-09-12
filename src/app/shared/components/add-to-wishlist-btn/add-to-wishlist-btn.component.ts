import { Component, inject, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/wishList/services/wishlist.service';
import { IAddToWishList } from '../../../features/wishList/interfaces/IAddToWishList';
import { CommonModule } from '@angular/common';
import { ProductServices } from '../../../features/products/services/product';

@Component({
  selector: 'app-add-to-wishlist-btn',
  imports: [CommonModule],
  templateUrl: './add-to-wishlist-btn.component.html',
  styleUrl: './add-to-wishlist-btn.component.css'
})
export class AddToWishlistBtnComponent {
  @Input() productId!: string;
  
  //inject services
  private readonly wishlistService = inject(WishlistService)
  private readonly toastrService = inject(ToastrService)
  private readonly productServices = inject(ProductServices)
  //variables
  isWishlistLoading = false;
  addedToWishlist = false;
  constructor() {
    console.log('isWishlistLoading', this.isWishlistLoading);

  }

  addTowishlist() {

    if (this.isWishlistLoading) return; // prevent multiple clicks
    this.isWishlistLoading = true;
    this.wishlistService.addToWoshlist(this.productId).subscribe(
      {
        next: (response: IAddToWishList) => {
          console.log(response);
          this.toastrService.info("", response.message)
          this.isWishlistLoading = false;
          this.addedToWishlist = true
        }
      }
    )
  }
}
