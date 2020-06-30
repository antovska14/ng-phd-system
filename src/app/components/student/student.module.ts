import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StudentTableComponent } from '../student/student-table/student-table.component';
import { SelectTeachersComponent } from '../student/select-teachers/select-teachers.component';
import { StudentFilesComponent } from './student-files/student-files.component';
import { StudentMainPageComponent } from './student-main-page/student-main-page.component';
import { AddStudentPageComponent } from './add-student-page/add-student-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentDetailPageComponent } from './student-details-page/student-details-page.component';
import { ExamsComponent } from './exams/exams.component';

const COMPONENTS = [
    StudentTableComponent,
    SelectTeachersComponent,
    StudentFilesComponent,
    StudentDetailsComponent,
    ExamsComponent,
];
const IMPORTS = [CommonModule, FormsModule, RouterModule, SharedModule];
const PAGES = [StudentMainPageComponent, AddStudentPageComponent, StudentDetailPageComponent];

@NgModule({
    imports: [...IMPORTS],
    exports: [...PAGES, ...COMPONENTS],
    declarations: [...PAGES, ...COMPONENTS],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentModule {}
