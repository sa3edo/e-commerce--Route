import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { IAllBrandsData, IGetAllBrands } from '../../interfaces/IGetAllBrands';
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
import { get } from 'http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands-page',
  imports: [LoadingSpinner, SectionTitle,RouterLink],
  templateUrl: './brands-page.html',
  styleUrl: './brands-page.css'
})
export class BrandsPage implements OnInit {

  //Inject Services 
  private readonly brandService = inject(BrandService);

  //variables
  brands!:IAllBrandsData[]
  ngOnInit(): void {
    this.getBrands();
  }
  getBrands(): void {
    this.brandService.getAllBrands().subscribe({
      next:(response:IGetAllBrands) => {
        this.brands = response.data;
      }
    })
  }

  
}
