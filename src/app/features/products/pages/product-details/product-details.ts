import { Component, inject, OnInit } from '@angular/core';
import { ProductServices } from '../../services/product';
import { ActivatedRoute } from '@angular/router';
import { IGetProduct, IProduct } from '../../interfaces/IGetProduct';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
import { PopularProducts } from "../../../../shared/components/popular-products/popular-products";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [LoadingSpinner, SectionTitle, PopularProducts , CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {

  // Inject Services
  private readonly productServices = inject(ProductServices)
  private readonly activatedRoute = inject(ActivatedRoute)

  //Variables
  product!: IProduct | undefined
  productId!: string
  constructor() {
     this.activatedRoute.paramMap.subscribe(
      {
        next:(response) => {
          this.productId = response.get('productId') as string;
          this.product=undefined
          this.getSingleProduct()
        }
      }
    )
  }

  getSingleProduct() {
    this.productServices.getSpecificProducts(this.productId).subscribe(
      {
        next:(response : IGetProduct) => {
          this.product=response.data
          console.log(this.product);
        },error:(error : HttpErrorResponse) => {
          console.log(error.error);
        }
      }
    )
  }

}
