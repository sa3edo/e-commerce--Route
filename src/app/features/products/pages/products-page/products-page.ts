import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ProductServices } from '../../services/product';
import { HttpErrorResponse } from '@angular/common/http';
import { IGetAllProducts, IProductsData } from '../../interfaces/IGetAllProducts';
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartServices } from '../../../cart/services/cart.service';
import { IAddToCartResponse } from '../../../cart/interfaces/IAddToCartResponse';
import { AddToCartBtnComponent } from "../../../../shared/components/add-to-cart-btn/add-to-cart-btn.component";
import { ProductSearchPipe } from '../../../../shared/pipes/product-search-pipe';
import { SideBarComponent } from "../../../../core/components/side-bar/side-bar.component";
import { ICategoriesData, IGetAllCategoris } from '../../../categories/interfaces/IGetAllCategories';
import { CategoriesServices } from '../../../categories/services/categories';
import { IGetSubCategories, ISubCatData } from '../../../categories/interfaces/IGetSubCategories';
@Component({
  selector: 'app-products-page',
  imports: [SectionTitle, ProductSearchPipe, LoadingSpinner, RouterLink, NgxPaginationModule, AddToCartBtnComponent, SideBarComponent],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css'
})
export class ProductsPage implements OnInit {

  allProducts!: IProductsData[] | undefined
  // Inject Services 
  private readonly productServices = inject(ProductServices)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly categoriesServices = inject(CategoriesServices)
  private readonly router = inject(Router)
  private readonly cartServices = inject(CartServices)
  // Variables
  itemsPerPage: number = 1;
  limit: number = 9;
  page: number = 1;
  totalItems: number = 1;
  searchTerm: string = "";
  allCategories !: ICategoriesData[]
  allSubcategories!: ISubCatData[]

  constructor() {
    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
  }
  ngOnInit(): void {
    this.getAllProducts();
    this.getCategories()
    this.getAllSubCategoris()
  }

  getAllProducts() {
    this.productServices.getAllProducts({ page: this.page, limit: this.limit }).subscribe({
      next: (response: IGetAllProducts) => {
        console.log(response.data);
        this.allProducts = response.data
        this.itemsPerPage = response.metadata.limit;
        this.totalItems = response.results;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    })
  }
  getCategories() {
    this.categoriesServices.getAllCategories().subscribe({
      next: (response: IGetAllCategoris) => {
        this.allCategories = response.data
      }
    })
  }
    getAllSubCategoris(){
    this.categoriesServices.getSubcategories().subscribe({
      next:(response : IGetSubCategories) => {
        console.log(response);
        this.allSubcategories = response.data;
      },error:(error : HttpErrorResponse) => {
        console.log(error.error);
      }
    })
  }
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.getAllProducts()
    this.router.navigate([], {
      queryParams: { page: this.page },
    });
    this.allProducts = undefined
  }

}
