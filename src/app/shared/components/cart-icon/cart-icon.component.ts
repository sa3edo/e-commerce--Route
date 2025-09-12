import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartServices } from '../../../features/cart/services/cart.service';

@Component({
  selector: 'app-cart-icon',
  imports: [RouterLink],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.css'
})
export class CartIconComponent implements OnInit {
  private readonly cartService = inject(CartServices);

  cartCount: number = 0;

 ngOnInit(): void {
    this.cartService.getUserCart().subscribe({
      next: (res: any) => {
        this.cartCount = res.numOfCartItems;
      },
      error: err => console.error(err)
    });

   
  }
  

}
