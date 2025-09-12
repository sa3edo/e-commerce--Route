import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { IGetUserWishlist } from '../../interfaces/IGetUserWishlist';
import { IProductsData } from '../../../products/interfaces/IGetAllProducts';
import { AddToCartBtnComponent } from "../../../../shared/components/add-to-cart-btn/add-to-cart-btn.component";
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist-page',
  imports: [AddToCartBtnComponent, SectionTitle, LoadingSpinner,RouterLink],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.css'
})
export class WishlistPageComponent implements OnInit {

  //inject services
  private readonly wishlistService = inject(WishlistService)

  //variables
  products!:IProductsData[]
  ngOnInit(): void {
    this.getWishlistProduct()
  }
  getWishlistProduct(){
    this.wishlistService.getUserWishlist().subscribe({
      next:(response:IGetUserWishlist) => {
        console.log(response);
        this.products=response.data
      }
    })
  }

}
