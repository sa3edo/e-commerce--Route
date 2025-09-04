import { AfterViewChecked, AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ProductServices } from '../../../features/products/services/product';
import { IGetAllProducts, IProductsData } from '../../../features/products/interfaces/IGetAllProducts';
import { HttpErrorResponse } from '@angular/common/http';
import { SectionTitle } from "../section-title/section-title";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { interval, take } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-products',
  imports: [SectionTitle, LoadingSpinner, RouterLink],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.css'
})
export class PopularProducts implements OnInit {


  //Inject Services
  private readonly productServices = inject(ProductServices)
  //Variables
  allProducts!: IProductsData[];
  popProducts: IProductsData[] = [];
  limit: number = 6


  ngOnInit(): void {
    this.getAllProducts();
    console.log(this.popProducts);
  }

  getAllProducts() {
    this.productServices.getAllProducts().subscribe({
      next: (response: IGetAllProducts) => {
        console.log(response.data);
        this.allProducts = response.data
        this.shuffleProducts(this.allProducts)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    })
  }
  shuffleProducts(products: IProductsData[]) {

    const copyArr = [...products];
    for (let i = 0; i < this.limit; i++) {
      const index = Math.floor(Math.random() * copyArr.length);
      this.popProducts[i] = copyArr[index];
      copyArr.splice(index, 1);
    }

  }


}


