import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './shared/routes.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ServiceInjector } from './classes';
import { RestInterceptorModule } from './services/rest.interceptor';
import { AppConfigService } from './services/app-config.service';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, PagesModule, RestInterceptorModule],
    providers: [
        AppConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: (config: AppConfigService) => () => config.init(),
            deps: [AppConfigService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private _injector: Injector) {
        ServiceInjector.injector = this._injector;
    }
}
