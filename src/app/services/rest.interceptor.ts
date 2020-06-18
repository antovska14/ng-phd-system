import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, NgModule } from '@angular/core';

import { SharedDataService } from './shared-data.service';
import { ServiceInjector } from '../classes';
import { AuthService } from './auth.service';

@Injectable()
export class RestInterceptor implements HttpInterceptor {
    sharedService: SharedDataService = null;
    authService: AuthService = null;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.sharedService) {
            this.sharedService = ServiceInjector.injector.get(SharedDataService);
        }
        const token = this.sharedService.currentUser.bearerToken;
        const nowDate = Date.now() / 1000;
        const tokenExpired: boolean = this.sharedService.currentUser.exp < nowDate;
        if (tokenExpired) {
            // this.authService = ServiceInjector.injector.get(AuthService);
            // this.authService.logout();
        }

        if (this.sharedService.currentUser.bearerToken) {
            const authenticatedRequest = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + token),
            });

            return next.handle(authenticatedRequest);
        }

        return next.handle(request);
    }
}

@NgModule({
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: RestInterceptor, multi: true }],
})
export class RestInterceptorModule {}
