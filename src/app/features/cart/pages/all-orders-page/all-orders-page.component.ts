import { Component, inject, OnInit } from '@angular/core';
import { CartServices } from '../../services/cart.service';
import { jwtDecode } from "jwt-decode";
import { IGetUserOrder } from '../../interfaces/IGetUserOrders';
import { CommonModule, DatePipe } from '@angular/common';
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
@Component({
  selector: 'app-all-orders-page',
  imports: [CommonModule, DatePipe, LoadingSpinner, SectionTitle],
  templateUrl: './all-orders-page.component.html',
  styleUrl: './all-orders-page.component.css'
})
export class AllOrdersPageComponent implements OnInit {
    private readonly cartServices = inject(CartServices)
    
    //variable 
     isLoading = false;
  errorMessage?: string;
    userId !:string
      orders: IGetUserOrder []= [];


  ngOnInit(): void {
    this.getUserId()
    this.getOrders();
  }

  getOrders() {
    this.cartServices.getUserOrder(this.userId).subscribe({
      next:(response ) => {
        console.log(response);
                this.orders = response;
        this.isLoading = false;
      }
    })

  }
  getUserId(){
    this.userId= localStorage.getItem('userId') !
  }
}
