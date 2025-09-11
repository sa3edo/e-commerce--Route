import { AfterViewInit, Component } from '@angular/core';
import { MainSlider } from "../../components/main-slider/main-slider";
import { CategotiesSlider } from "../../components/categoties-slider/categoties-slider";
import { PopularProducts } from "../../../../shared/components/popular-products/popular-products";
import * as AOS from 'aos';
@Component({
  selector: 'app-user-home-page',
  imports: [MainSlider, CategotiesSlider, PopularProducts],
  templateUrl: './user-home-page.html',
  styleUrl: './user-home-page.css'
})
export class UserHomePage  {

}
