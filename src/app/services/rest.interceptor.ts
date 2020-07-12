import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable, NgModule } from '@angular/core';
import { Observable, empty, throwError } from 'rxjs';

import { ServiceInjector } from '../classes';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { RestService } from './rest.service';
import { InterceptorEnum } from '../enums';

@Injectable()
export class RestInterceptor implements HttpInterceptor {
    private _authService: AuthService = null;
    private _notificationService: NotificationService = null;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const interceptedRequest = request.clone();
        return next.handle(interceptedRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                let skipErrorHandling: boolean = false;
                const interceptor = RestService.getInterceptorOption(request.url);
                if (interceptor === InterceptorEnum.ignoreError) {
                    skipErrorHandling = true;
                }

                switch (error.status) {
                    case 401:
                        this.handle401Error();
                        return empty();
                    default:
                        if (!skipErrorHandling) {
                            this.handleUnknownError();
                        }
                        return throwError(error);
                }
            })
        );
    }

    private handle401Error(): void {
        if (!this._authService) {
            this._authService = ServiceInjector.injector.get(AuthService);
        }

        if (!this._notificationService) {
            this._notificationService = ServiceInjector.injector.get(NotificationService);
        }

        this._notificationService.error('Не сте оторизирани да извършите следното действие');
        this._authService.logout();
    }

    private handleUnknownError(): void {
        if (!this._notificationService) {
            this._notificationService = ServiceInjector.injector.get(NotificationService);
        }

        this._notificationService.error('Сървърна грешка!');
    }
}

@NgModule({
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: RestInterceptor, multi: true }],
})
export class RestInterceptorModule {}
