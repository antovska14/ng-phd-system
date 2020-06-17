import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginPageComponent } from '../pages/login/login-page.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LayoutPageComponent } from '../pages/layout/layout-page.component';
import { StudentPageComponent } from './student/student-page/student-page.component';
import { StudentDetailPageComponent } from './student/student-details/student-detail-page.component';

import { BaseComponent } from '../components/base/base.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { UpsertStudentModalComponent } from './student/upsert-student-modal/upsert-student-modal.component';

const COMPONENTS = [BaseComponent, StudentListComponent, UpsertStudentModalComponent];
const IMPORTS = [CommonModule, FormsModule, RouterModule];
const PAGES = [LoginPageComponent, LayoutPageComponent, DashboardComponent, StudentPageComponent, StudentDetailPageComponent];

@NgModule({
    imports: [...IMPORTS],
    exports: [...PAGES, ...COMPONENTS],
    declarations: [...PAGES, ...COMPONENTS],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
