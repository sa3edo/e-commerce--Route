import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessage } from "../error-message/error-message";
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../services/auth-services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css'
})
export class SignupForm implements OnInit {

  //Inject Services
  private readonly authSirvec = inject(AuthService)

  // Variables
  errorMessage?:string //for error response message
  isLoading: boolean = false // track the request
  ngOnInit() {
    // this.registerForm.setValue({
    //   name: "mohammed",
    //   email: "mohamed20@gmail.com",
    //   password: "01091215398@My",
    //   rePassword: "01091215398@My",
    //   phone: "01091215398",
    // })
  }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    rePassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0-2,5][0-9]{8}$/)]),

  },
    {
      validators: this.passMissMatch
    }
  )
  onSubmit() {
    console.log(this.registerForm);
    if(this.registerForm.valid){
      this.handleBeforeSubmit()

      const userData = this.registerForm.value
      this.authSirvec.signUp(userData).subscribe({
        next: response => {
          console.log(response);
        }, error: (err: HttpErrorResponse) => {
          console.log(err.error);
          this.handleErrorResponse(err);
        }
      })
    }
    console.log(this.registerForm.value);
  }
  handleBeforeSubmit():void{
    this.registerForm.markAllAsTouched()
    this.errorMessage=undefined
    this.isLoading=true
  }
  handleAfterSucces():void{
    this.registerForm.reset()
    this.errorMessage=undefined
    this.isLoading = false
  }
  handleErrorResponse(error:HttpErrorResponse){
  this.errorMessage=error.error.message;
  this.isLoading = false
  }
  passMissMatch(FormGroup: any) {

    return FormGroup.get('rePassword').value === FormGroup.get("password").value ? null : { missMatch: true };
  }
}
