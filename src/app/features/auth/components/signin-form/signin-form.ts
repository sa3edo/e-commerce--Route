import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-services';
import { HttpErrorResponse } from '@angular/common/http';
import { IRegisterUserResponse } from '../../interfaces/IRegisterUserResponse';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-signin-form',
  imports: [ReactiveFormsModule],
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.css'
})
export class SigninForm {
  // Variables
  isLoading: boolean = false;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  timer: number = 3; // for redirect after login
  //Inject Services
  private readonly authSirvec = inject(AuthService)
  private router = inject(Router)



  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  })

    onSubmit() {
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.handleBeforeSubmit()

      const userData = this.loginForm.value
      this.authSirvec.signIn(userData).subscribe({
        next: response => {
          this.handleAfterSucces(response)
        }, error: (err: HttpErrorResponse) => {
          this.handleErrorResponse(err);
        }
      })
    }
    console.log(this.loginForm.value);
  }
  handleBeforeSubmit(): void {
    this.loginForm.markAllAsTouched()
    this.errorMessage = undefined
    this.isLoading = true
  }
  handleAfterSucces(response: IRegisterUserResponse): void {
    this.isLoading = false
    this.errorMessage = undefined
    console.log(response)
    const token = response.token;
    localStorage.setItem("token", token)
    this.successMessage = response.message;
    this.loginForm.reset()
        interval(1000).pipe(take(3)).subscribe(
      () => {
        this.timer--
        if (this.timer === 0)
          this.redirectTo('/home')
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
}

