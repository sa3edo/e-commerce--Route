import { Component } from '@angular/core';
import { SignupForm } from "../../components/signup-form/signup-form";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [SignupForm,RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

}
