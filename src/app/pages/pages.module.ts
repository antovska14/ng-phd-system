import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginPageComponent } from '../pages/login/login-page.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LayoutPageComponent } from '../pages/layout/layout-page.component';
import { SetPasswordPageComponent } from './set-password/set-password-page.component';
import { BaseComponent } from '../components/base/base.component';

import { StudentModule } from '../components/student/student.module';
import { TeacherModule } from '../components/teacher/teacher.module';
import { ProfessionalFieldModule } from '../components/professional-field/professional-field.module';
import { PhdProgramModule } from '../components/phd-program/phd-program.module';

const COMPONENTS = [BaseComponent];
const IMPORTS = [
    CommonModule,
    FormsModule,
    RouterModule,
    StudentModule,
    TeacherModule,
    ProfessionalFieldModule,
    PhdProgramModule,
];
const PAGES = [LoginPageComponent, LayoutPageComponent, DashboardComponent, SetPasswordPageComponent];

@NgModule({
    imports: [...IMPORTS],
    exports: [...PAGES, ...COMPONENTS],
    declarations: [...PAGES, ...COMPONENTS],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
