import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const PAGES = [];

const COMPONENTS = [];

@NgModule({
    imports: [],
    exports: [...PAGES, ...COMPONENTS],
    declarations: [...PAGES, ...COMPONENTS],
})
export class SharedModule {}
