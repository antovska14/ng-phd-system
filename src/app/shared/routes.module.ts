import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from '../pages/login/login-page.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LayoutPageComponent } from '../pages/layout/layout-page.component';

import { StudentPageComponent } from '../components/student/student-page/student-page.component';
import { StudentDetailPageComponent } from '../components/student/student-details/student-details.component';
import { AddStudentComponent } from '../components/student/add-student/add-student.component';
import { TeacherDetailsComponent } from '../components/teacher/teacher-details/teacher-details.component';

import { AuthGuard } from '../services/guards/auth.guard';
import { RoutePath } from '../enums';
import { TeacherPageComponent } from '../components/teacher/teacher-page/teacher-page.component';
import { AddTeacherComponent } from '../components/teacher/add-teacher/add-teacher.component';

const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    {
        path: '',
        component: LayoutPageComponent,
        children: [
            { path: '', redirectTo: RoutePath.dashboard, pathMatch: 'full' },
            { path: RoutePath.dashboard, component: DashboardComponent },

            { path: RoutePath.students, component: StudentPageComponent },
            { path: `${RoutePath.students}/${RoutePath.add}`, component: AddStudentComponent },
            { path: `${RoutePath.students}/:id`, component: StudentDetailPageComponent },

            { path: RoutePath.teachers, component: TeacherPageComponent },
            { path: `${RoutePath.teachers}/${RoutePath.add}`, component: AddTeacherComponent },
            { path: `${RoutePath.teachers}/:id`, component: TeacherDetailsComponent },
        ],
        canActivate: [AuthGuard],
    },
    { path: '', redirectTo: RoutePath.login, pathMatch: 'full' },
    { path: '**', redirectTo: RoutePath.login, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
