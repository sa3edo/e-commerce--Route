import { Component, Input } from '@angular/core';
import { IProductsData } from '../../interfaces/IGetAllProducts';
import { AddToCartBtnComponent } from "../../../../shared/components/add-to-cart-btn/add-to-cart-btn.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [AddToCartBtnComponent, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() prd!: IProductsData;
}
