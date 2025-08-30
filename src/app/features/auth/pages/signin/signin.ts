import { Component } from '@angular/core';
import { SigninForm } from "../../components/signin-form/signin-form";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [SigninForm,RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin {

}
