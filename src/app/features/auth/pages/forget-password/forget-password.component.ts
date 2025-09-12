import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth-services';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  imports: [FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastrService);

  // Step control
  step: 'request' | 'verify' = 'request';

  // Form fields
  email: string = '';
  code: string = '';
  newPassword: string = '';

  // Loading
  isLoading: boolean = false;

  // Fields for @for loop
  fields = [
    { name: 'code', placeholder: 'Enter reset code', type: 'text' },
    { name: 'newPassword', placeholder: 'Enter new password', type: 'password' }
  ];

  // Request reset password
  requestReset() {
    if (!this.email) return;
    this.isLoading = true;
    this.http.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email: this.email })
      .subscribe({
        next: (res: any) => {
          this.toast.success('', res.message || 'Code sent to your email');
          this.step = 'verify';
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.toast.error('', err.error.message || 'Error sending reset code');
          this.isLoading = false;
        }
      });
  }

  // Verify code & set new password
  verifyCode() {
    if (!this.code || !this.newPassword) return;
    this.isLoading = true;
    this.http.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
      code: this.code,
      newPassword: this.newPassword
    }).subscribe({
      next: (res: any) => {
        this.toast.success('', res.message || 'Password reset successfully');
        this.isLoading = false;
        this.step = 'request';
        this.email = '';
        this.code = '';
        this.newPassword = '';
      },
      error: (err: HttpErrorResponse) => {
        this.toast.error('', err.error.message || 'Invalid code or password');
        this.isLoading = false;
      }
    });
  }
}