import { Component, inject } from '@angular/core';
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ICashPaymentResponse, IOnlinePaymentResponse } from '../../interfaces/IPayResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { interval, take } from 'rxjs';
import { ErrorMessage } from "../../../auth/components/error-message/error-message";

@Component({
  selector: 'app-check-out-page',
  imports: [SectionTitle, ReactiveFormsModule, ErrorMessage],
  templateUrl: './check-out-page.component.html',
  styleUrl: './check-out-page.component.css'
})
export class CheckOutPageComponent {

  // Inject Services
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);

  // Variables
  isLoadingOnline: boolean = false;
  isLoadingCash: boolean = false;
  errorMessage?: string;
  successMessage?: string;
  checkoutForm!: FormGroup;
  cartId!: string;
  timer: number = 5;

  constructor() {
    this.cartId = this.activatedRoute.snapshot.paramMap.get("cartId") as string;
    console.log("CartId:", this.cartId);

    this.checkoutForm = this.fb.group({
      details: [
        'Some street, Apt 12',
        [Validators.required, Validators.minLength(10)]
      ],
      phone: [
        '01010700999',
        [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]
      ],
      city: [
        'Cairo',
        [Validators.required, Validators.minLength(3)]
      ]
    });
  }

  // قبل أي Submit
  handleBeforeSubmit(method: string): void {
    this.checkoutForm.markAllAsTouched();
    this.errorMessage = undefined;
    this.successMessage = undefined;
    if (method === "online") {

      this.isLoadingOnline = true;
    } else {
      this.isLoadingCash = true;
    }
  }

  // بعد النجاح
  handleAfterSuccess(url: string, method: string) {
    if (method === "online") {

      this.isLoadingOnline = false;
      window.open(url, "_self");
    } else {
      this.isLoadingCash = false;
    }
    this.errorMessage = undefined;
    // this.successMessage = message;
    this.checkoutForm.reset();


  }

  // بعد الخطأ
  handleErrorResponse(error: HttpErrorResponse, method: string): void {
    this.errorMessage = error.error.message || "Something went wrong, please try again.";

    if (method === "online") {

      this.isLoadingOnline = false;
    } else {
      this.isLoadingCash = false;
    }
  }


  pay(method: string) {

    if (this.checkoutForm.valid) {

      console.log("Pay Method:", method);
      console.log("Form Data:", this.checkoutForm.value);

      this.handleBeforeSubmit(method);
      const shippingAddress = this.checkoutForm.value;

      switch (method) {
        case "online":
          this.onlinePay(this.cartId, shippingAddress);
          break;
        case "cash":
          this.cashPay(this.cartId, shippingAddress);
          break;
      }
    }
  }

  onlinePay(cartId: string, userData: {}) {
    this.orderService.onlinePayment(cartId, { shippingAddress: userData }).subscribe({
      next: (response: IOnlinePaymentResponse) => {
        console.log(response);
        
        this.handleAfterSuccess(response.session.url, "online");
      },
      error: (err: HttpErrorResponse) => this.handleErrorResponse(err, "online")
    });
  }

  cashPay(cartId: string, userData: {}) {
    this.orderService.cashPayment(cartId, { shippingAddress: userData }).subscribe({
      next: (response: ICashPaymentResponse) => {
        console.log(response);
        this.handleAfterSuccess(response.status, "cash");
      },
      error: (err: HttpErrorResponse) => this.handleErrorResponse(err, "cash")
    });
  }



























}
