import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductsData } from '../../../products/interfaces/IGetAllProducts';
import { ICategoryData, IGetSpecificCategory } from '../../interfaces/IGetSpecificCategory';
import { CategoriesServices } from '../../services/categories';
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
import { DatePipe } from '@angular/common';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";

@Component({
  selector: 'app-single-category',
  imports: [SectionTitle, DatePipe, ProductCardComponent, LoadingSpinner],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css'
})
export class SingleCategoryComponent {
private readonly categoryService = inject(CategoriesServices);
  private readonly activatedRoute = inject(ActivatedRoute);

  categoryId!: string;
  category!: ICategoryData;
  products!: IProductsData[];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('catId') as string;
        this.getCategory();
        this.getProducts();
      }
    });
  }

  getCategory() {
    this.categoryService.getSpecificCategory(this.categoryId).subscribe({
      next: (res) => {
        this.category = res.data;
      }
    });
  }

  getProducts() {
    this.categoryService.getProductByCategory(this.categoryId).subscribe({
      next: (res) => {
        this.products = res.data;
        console.log(this.products);
      }
    });
  }
}
