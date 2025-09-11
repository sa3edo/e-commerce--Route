import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../products/interfaces/IGetProduct';
import { IGetAllProducts, IProductsData } from '../../../products/interfaces/IGetAllProducts';
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
import { CommonModule } from '@angular/common';
import { IBrand, IBrandDAta } from '../../interfaces/IGetSpecificBrand';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";

@Component({
  selector: 'app-single-brand',
  imports: [LoadingSpinner, SectionTitle, CommonModule, ProductCardComponent],
  templateUrl: './single-brand.component.html',
  styleUrl: './single-brand.component.css'
})
export class SingleBrandComponent implements OnInit {
  ngOnInit(): void {
    
  }
 //Inject Services 
  private readonly brandService = inject(BrandService);
    private readonly activatedRoute = inject(ActivatedRoute)

      //Variables
      products!: IProductsData[] | undefined
      brandId!: string
      brand!:IBrandDAta
      constructor() {
         this.activatedRoute.paramMap.subscribe(
          {
            next:(response) => {
              this.brandId = response.get('brandId') as string;
            this.getProducts()
            }
          }
        )
       this.getBrand()
      }
      getProducts() {
        this.brandService.getProductsByBrand(this.brandId).subscribe({
          next:(response:IGetAllProducts) => {
              this.products=response.data
              console.log(response);
              console.log(this.products);
          }
        })
      }
      getBrand(){
        this.brandService.getSpecifivBrand(this.brandId).subscribe({
          next:(response :IBrand) => {
            this.brand = response.data
          }
        })
      }
}
