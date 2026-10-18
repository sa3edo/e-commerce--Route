import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessage } from "../error-message/error-message";
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../services/auth-services';
import { HttpErrorResponse } from '@angular/common/http';
import { IRegisterUserResponse } from '../../interfaces/IRegisterUserResponse';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css'
})
export class SignupForm implements OnInit {

  //Inject Services
  private readonly authSirvec = inject(AuthService)
  private router = inject(Router)

  // Variables
  errorMessage?: string //for error response message
  successMessage?: string //for success response message
  isLoading: boolean = false // track the request
  timer: number = 5;
  ngOnInit() {
    // this.registerForm.setValue({
    //   name: "mohammed",
    //   email: "mohamed20@gmail.com",
    //   password: "123456789@My",
    //   rePassword: "123456789@My",
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
    if (this.registerForm.valid) {
      this.handleBeforeSubmit()

      const userData = this.registerForm.value
      this.authSirvec.registerUser(userData).subscribe({
        next: response => {
          this.handleAfterSucces(response)
        }, error: (err: HttpErrorResponse) => {
          this.handleErrorResponse(err);
        }
      })
    }
    console.log(this.registerForm.value);
  }
  handleBeforeSubmit(): void {
    this.registerForm.markAllAsTouched()
    this.errorMessage = undefined
    this.isLoading = true
  }
  handleAfterSucces(response: IRegisterUserResponse): void {
    this.isLoading = false
    this.errorMessage = undefined
    console.log(response)
    this.successMessage = response.message;
    this.registerForm.reset()
    interval(1000).pipe(take(5)).subscribe(
      () => {
        this.timer--
        if (this.timer === 0)
          this.redirectTo('/signin')
      }
    )

  }

  handleErrorResponse(error: HttpErrorResponse) {
    console.log(error.error);
    this.errorMessage = error.error.message;
    this.isLoading = false
  }
  redirectTo(url: string) {
    this.router.navigateByUrl(url)
  }
  passMissMatch(FormGroup: any) {

    return FormGroup.get('rePassword').value === FormGroup.get("password").value ? null : { missMatch: true };
  }
}
