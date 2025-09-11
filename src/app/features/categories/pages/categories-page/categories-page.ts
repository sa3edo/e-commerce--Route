import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CategoriesServices } from '../../services/categories';
import { ICategoriesData, IGetAllCategoris } from '../../interfaces/IGetAllCategories';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
import { IGetSubCategories, ISubCatData } from '../../interfaces/IGetSubCategories';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-page',
  imports: [LoadingSpinner, SectionTitle, RouterLink],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.css'
})
export class CategoriesPage implements OnInit {
  // Inject Services
  private readonly categoriesServices = inject(CategoriesServices)

  //variables
  allCategories!:ICategoriesData[]
  allSubcategories!:ISubCatData[]

  ngOnInit(): void {
    this.getAllCategoris()
    this.getAllSubCategoris()
  }

  getAllCategoris(){
    this.categoriesServices.getAllCategories().subscribe({
      next:(response : IGetAllCategoris) => {
        console.log(response);
        this.allCategories = response.data;
      },error:(error : HttpErrorResponse) => {
        console.log(error.error);
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


}
