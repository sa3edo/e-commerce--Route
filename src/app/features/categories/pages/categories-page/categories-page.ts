import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CategoriesServices } from '../../services/categories';
import { ICategoriesData, IGetAllCategoris } from '../../interfaces/IGetAllCategories';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";
import { SectionTitle } from "../../../../shared/components/section-title/section-title";

@Component({
  selector: 'app-categories-page',
  imports: [LoadingSpinner, SectionTitle],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.css'
})
export class CategoriesPage implements OnInit {
  // Inject Services
  private readonly categoriesServices = inject(CategoriesServices)

  //variables
  allCategories!:ICategoriesData[]

  ngOnInit(): void {
    this.getAllCategoris()
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


}
