import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private readonly toastOptions = {
        timeOut: 2000,
        easeTime: 300,
        closeButton: true,
        positionClass: 'toast-bottom-right',
    };

    constructor(private readonly toastr: ToastrService) {}

    public info(message: string, title?: string): void {
        this.toastr.info(message, title, this.toastOptions);
    }

    public success(message: string, title?: string): void {
        this.toastr.success(message, title, this.toastOptions);
    }

    public warning(message: string, title?: string): void {
        this.toastr.warning(message, title, this.toastOptions);
    }

    public error(message: string, title?: string): void {
        this.toastr.error(message, title, this.toastOptions);
    }
}
