import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable, NgModule } from '@angular/core';
import { Observable, empty, throwError } from 'rxjs';

import { ServiceInjector } from '../classes';
import { AuthService } from './auth.service';

@Injectable()
export class RestInterceptor implements HttpInterceptor {
    private _authService: AuthService = null;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const interceptedRequest = request.clone();
        return next.handle(interceptedRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 401:
                        this.handle401Error();
                        return throwError(error);
                    default:
                        this.handleUnknownError();
                        return throwError(error);
                }
            })
        );
    }

    private handle401Error(): void {
        if (!this._authService) {
            this._authService = ServiceInjector.injector.get(AuthService);
        }

        this._authService.logout();
    }

    private handleUnknownError(): void {
        // TODO [DA]: Implement notification service and display internal server error message
        const message = 'Сървърна грешка!';
        console.error(message);
    }
}

@NgModule({
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: RestInterceptor, multi: true }],
})
export class RestInterceptorModule {}
