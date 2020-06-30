import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { TeacherTableComponent } from './teacher-table/teacher-table.component';
import { TeacherMainPageComponent } from './teacher-main-page/teacher-main-page.component';
import { AddTeacherMainPageComponent } from './add-teacher-page/add-teacher-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeacherDetailsPageComponent } from './teacher-details-page/teacher-details-page.component';

const COMPONENTS = [TeacherTableComponent, TeacherDetailsComponent];
const IMPORTS = [CommonModule, FormsModule, RouterModule, SharedModule];
const PAGES = [TeacherMainPageComponent, AddTeacherMainPageComponent, TeacherDetailsPageComponent];

@NgModule({
    imports: [...IMPORTS],
    exports: [...PAGES, ...COMPONENTS],
    declarations: [...PAGES, ...COMPONENTS],
})
export class TeacherModule {}
