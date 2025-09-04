import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-sweet-alert',
  imports: [SwalComponent],
  templateUrl: './sweet-alert.html',
  styleUrl: './sweet-alert.css'
})
export class SweetAlert {
  @ViewChild('swalRef') swalRef!:SwalComponent

@Input() title :string = "" 
@Input() text :string = ""
@Input() icon: 'warning' | 'error' | 'success' | 'info' | 'question' = 'warning';
@Input() cancelButtonText : string = "Cancel"
@Input() confirmButtonText : string = "Yes"

@Output() onConfirm = new EventEmitter()
@Output() onCancel = new EventEmitter()

open(){
  this.swalRef.fire().then((result) => {
    if (result.isConfirmed) {
      this.onConfirm.emit()
    }else{
      this.onCancel.emit()
    }
  })
}
}
