import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TeacherListComponent } from '../teacher/teacher-list/teacher-list.component';
import { TeacherDetailsComponent } from '../teacher/teacher-details/teacher-details.component';

const COMPONENTS = [TeacherListComponent, TeacherDetailsComponent];
const IMPORTS = [CommonModule, FormsModule, RouterModule];
const PAGES = [];

@NgModule({
    imports: [...IMPORTS],
    exports: [...PAGES, ...COMPONENTS],
    declarations: [...PAGES, ...COMPONENTS],
})
export class TeacherModule {}
