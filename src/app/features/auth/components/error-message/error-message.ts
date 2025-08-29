import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  imports: [FormsModule],
  templateUrl: './error-message.html',
  styleUrl: './error-message.css'
})
export class ErrorMessage {
isVisible = true;

hideAlert() {
  this.isVisible = false;
}

showAlert() {
  this.isVisible = true;
}
}
