import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ProductServices } from '../../services/product';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IGetAllProducts, IProductsData } from '../../interfaces/IGetAllProducts';
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartServices } from '../../../cart/services/cart.service';
import { IAddToCartResponse } from '../../../cart/interfaces/IAddToCartResponse';
import { ProductSearchPipe } from '../../../../shared/pipes/product-search-pipe';
import { SideBarComponent } from "../../../../core/components/side-bar/side-bar.component";
import { ICategoriesData, IGetAllCategoris } from '../../../categories/interfaces/IGetAllCategories';
import { CategoriesServices } from '../../../categories/services/categories';
import { IGetSubCategories, ISubCatData } from '../../../categories/interfaces/IGetSubCategories';
import { ProductCardComponent } from "../../components/product-card/product-card.component";

@Component({
  selector: 'app-products-page',
  imports: [SectionTitle, ProductSearchPipe, LoadingSpinner, NgxPaginationModule, SideBarComponent, ProductCardComponent],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css'
})
export class ProductsPage implements OnInit {

  allProducts!: IProductsData[];
  allCategories!: ICategoriesData[];
  allSubcategories!: ISubCatData[];
  selectedSubCategories: string[] = [];
  searchTerm: string = "";
  isLoading: boolean = true;

  // Pagination
  itemsPerPage: number = 12;
  page: number = 1;
  totalItems: number = 1;

  // Inject Services 
  private readonly productServices = inject(ProductServices);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoriesServices = inject(CategoriesServices);
  private readonly router = inject(Router);
  private readonly cartServices = inject(CartServices);

  constructor() {
    const queryPage = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    if(queryPage) this.page = queryPage;
  }

  ngOnInit(): void {
    this.getCategories();
    this.getAllSubCategories();
    this.getAllProductsWithFilters();
  }

  // Fetch Products with Pagination & Filters
   getAllProductsWithFilters() {
    this.isLoading = true;
    let params = new HttpParams()
      .set('page', this.page.toString())
      .set('limit', this.itemsPerPage.toString());

    this.selectedSubCategories.forEach(id => {
      params = params.append('subcategory[in]', id);
    });

    this.productServices.getAllProducts(params).subscribe({
      next: (res: IGetAllProducts) => {
        this.allProducts = res.data;
        this.totalItems = res.results;
        this.itemsPerPage = res.metadata.limit;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  // Category Filters
  onSubCategoryFilter(selected: string[]) {
    this.selectedSubCategories = selected;
    this.page = 1; // reset page on filter
    this.getAllProductsWithFilters();
  }

  // Pagination Change
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.getAllProductsWithFilters();
    this.router.navigate([], { queryParams: { page: this.page } });
  }

  // Fetch Categories & Subcategories
  getCategories() {
    this.categoriesServices.getAllCategories().subscribe({
      next: (res: IGetAllCategoris) => this.allCategories = res.data
    });
  }

  getAllSubCategories() {
    this.categoriesServices.getSubcategories().subscribe({
      next: (res: IGetSubCategories) => this.allSubcategories = res.data
    });
  }

  // 

}
