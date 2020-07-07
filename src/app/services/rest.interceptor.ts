import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
    HttpEventType,
    HttpResponse,
} from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable, empty } from 'rxjs';

import { ServiceInjector } from '../classes';
import { AuthService } from './auth.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class RestInterceptor implements HttpInterceptor {
    private _authService: AuthService = null;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const interceptedRequest = request.clone();
        return next.handle(interceptedRequest).pipe(
            tap((event: HttpEvent<any>) => {
                console.log(event instanceof HttpResponse);
            }),
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 401:
                        this.handle401Error();
                        return empty();
                    default:
                        this.handleUnknownError();
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
