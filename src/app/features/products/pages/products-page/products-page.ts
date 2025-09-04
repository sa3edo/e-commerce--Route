import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ProductServices } from '../../services/product';
import { HttpErrorResponse } from '@angular/common/http';
import { IGetAllProducts, IProductsData } from '../../interfaces/IGetAllProducts';
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-products-page',
  imports: [SectionTitle, LoadingSpinner, RouterLink, NgxPaginationModule],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css'
})
export class ProductsPage implements OnInit {

  allProducts!: IProductsData[] | undefined
  // Inject Services 
  private readonly productServices = inject(ProductServices)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)

  // Variables
  itemsPerPage: number = 1;
  limit: number = 9;
  page: number = 1;
  totalItems: number = 1;

  constructor(){
    this.page= Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
  }
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productServices.getAllProducts({page:this.page,limit:this.limit}).subscribe({
      next: (response: IGetAllProducts) => {
        console.log(response.data);
        this.allProducts = response.data
        this.itemsPerPage= response.metadata.limit;
        this.totalItems= response.results;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    })
  }
  pageChanged(pageNumber : number){
    this.page = pageNumber;
    this.getAllProducts()
    this.router.navigate([],{
      queryParams: {page:this.page},
    });
    this.allProducts=undefined
  }

}
