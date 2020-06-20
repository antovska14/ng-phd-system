import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TeacherPageComponent } from './teacher-page/teacher-page.component';

import { TeacherListComponent } from '../teacher/teacher-list/teacher-list.component';
import { TeacherDetailsComponent } from '../teacher/teacher-details/teacher-details.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';

const COMPONENTS = [TeacherListComponent, TeacherDetailsComponent, AddTeacherComponent];
const IMPORTS = [CommonModule, FormsModule, RouterModule];
const PAGES = [TeacherPageComponent];

@NgModule({
    imports: [...IMPORTS],
    exports: [...PAGES, ...COMPONENTS],
    declarations: [...PAGES, ...COMPONENTS],
})
export class TeacherModule {}
