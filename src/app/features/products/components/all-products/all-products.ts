import { Component, inject, OnInit } from '@angular/core';
import { ProductServices } from '../../services/product';
import { IGetAllProducts } from '../../interfaces/IGetAllProducts';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-products',
  imports: [],
  templateUrl: './all-products.html',
  styleUrl: './all-products.css'
})
export class AllProducts implements OnInit {
  // Inject Services 
  private readonly productServices = inject(ProductServices)
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(){
    this.productServices.getAllProducts().subscribe({
      next:(response : IGetAllProducts) => {
        console.log(response.data);       
      },
      error:(error:HttpErrorResponse) => {
        console.log(error.error);
      }
    })
  }

}
