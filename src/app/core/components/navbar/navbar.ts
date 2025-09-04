import { Component, inject, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth-services';
import { SweetAlert } from "../../../shared/components/sweet-alert/sweet-alert";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SweetAlert],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @ViewChild(SweetAlert) alert!:SweetAlert 
  //inject services 
  private readonly authService = inject(AuthService)
  //variables 
  

  @Input() isLoggedIn = false;
  
  logout(){
  this.alert.open()
  }
  onConfirmed(){
    this.authService.singOut()

  }
}
