import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginPageComponent } from 'src/app/pages/login/login-page.component';
import { BaseComponent } from 'src/app/components/base/base/base.component';

const COMPONENTS = [BaseComponent];
const PAGES = [LoginPageComponent];
const IMPORTS = [FormsModule];

@NgModule({
    imports: [...IMPORTS],
    exports: [...PAGES, ...COMPONENTS],
    declarations: [...PAGES, ...COMPONENTS],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
