import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StudentDetailPageComponent } from './student-details/student-details.component';

import { StudentTableComponent } from '../student/student-table/student-table.component';
import { SelectTeachersComponent } from '../student/select-teachers/select-teachers.component';
import { StudentFilesComponent } from './student-files/student-files.component';
import { StudentMainPageComponent } from './student-main-page/student-main-page.component';
import { AddStudentPageComponent } from './add-student-page/add-student-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

const COMPONENTS = [StudentTableComponent, SelectTeachersComponent, StudentFilesComponent];
const IMPORTS = [CommonModule, FormsModule, RouterModule, SharedModule];
const PAGES = [StudentMainPageComponent, AddStudentPageComponent, StudentDetailPageComponent];

@NgModule({
    imports: [...IMPORTS],
    exports: [...PAGES, ...COMPONENTS],
    declarations: [...PAGES, ...COMPONENTS],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentModule {}
