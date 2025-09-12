import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../../../components/navbar/navbar";
import { CartIconComponent } from "../../../../shared/components/cart-icon/cart-icon.component";
import { CartServices } from '../../../../features/cart/services/cart.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Navbar, CartIconComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {
  
}
