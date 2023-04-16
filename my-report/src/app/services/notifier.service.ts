import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  constructor(private toastr: ToastrService) { }

  ShowSuccess(title: any, message: any) {
    this.toastr.success(message, title, {
      easing: 'ease-in',
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      disableTimeOut: 'extendedTimeOut',
      progressAnimation: 'decreasing',
      closeButton: true
    });
  }

  ShowError(title: any, message: any) {
    this.toastr.error(message, title, {
      easing: 'ease-in',
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      disableTimeOut: 'extendedTimeOut',
      progressAnimation: 'decreasing',
      closeButton: true
    });
  }

  ShowWarning(title: any, message: any) {
    this.toastr.warning(message, title, {
      easing: 'ease-in',
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      disableTimeOut: 'extendedTimeOut',
      progressAnimation: 'decreasing',
      closeButton: true
    });
  }

  ShowInfo(title: any, message: any) {
    this.toastr.info(message, title, {
      easing: 'ease-in',
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      disableTimeOut: 'extendedTimeOut',
      progressAnimation: 'decreasing',
      closeButton: true
    });
  }
}


