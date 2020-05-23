import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login/login-page.component';

const PAGES = [LoginPageComponent];

@NgModule({
    imports: [],
    exports: [...PAGES],
    declarations: [...PAGES],
})
export class PagesModule {}
