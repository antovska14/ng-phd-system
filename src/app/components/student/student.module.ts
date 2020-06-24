import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StudentPageComponent } from '../student/student-page/student-page.component';
import { StudentDetailPageComponent } from './student-details/student-details.component';

import { StudentTableComponent } from '../student/student-table/student-table.component';
import { AddStudentComponent } from '../student/add-student/add-student.component';
import { SelectTeachersComponent } from '../student/select-teachers/select-teachers.component';
import { StudentFilesComponent } from './student-files/student-files.component';

const COMPONENTS = [StudentTableComponent, AddStudentComponent, SelectTeachersComponent, StudentFilesComponent];
const IMPORTS = [CommonModule, FormsModule, RouterModule];
const PAGES = [StudentPageComponent, StudentDetailPageComponent];

@NgModule({
    imports: [...IMPORTS],
    exports: [...PAGES, ...COMPONENTS],
    declarations: [...PAGES, ...COMPONENTS],
})
export class StudentModule {}
