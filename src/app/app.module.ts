import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './shared/routes.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ServiceInjector } from './classes';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, PagesModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private _injector: Injector) {
        ServiceInjector.injector = this._injector;
    }
}
