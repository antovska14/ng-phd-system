import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginPageComponent } from '../pages/login/login-page.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LayoutPageComponent } from '../pages/layout/layout-page.component';

import { BaseComponent } from '../components/base/base.component';
import { StudentListComponent } from './student/student-list/student-list.component';

const COMPONENTS = [BaseComponent, StudentListComponent];
const IMPORTS = [CommonModule, FormsModule, RouterModule];
const PAGES = [LoginPageComponent, LayoutPageComponent, DashboardComponent];

@NgModule({
    imports: [...IMPORTS],
    exports: [...PAGES, ...COMPONENTS],
    declarations: [...PAGES, ...COMPONENTS],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
