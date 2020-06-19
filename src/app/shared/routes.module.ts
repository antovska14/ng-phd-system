import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from '../pages/login/login-page.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LayoutPageComponent } from '../pages/layout/layout-page.component';
import { AuthGuard } from '../services/guards/auth.guard';
import { RoutePath } from '../enums';
import { StudentPageComponent } from '../pages/student/student-page/student-page.component';
import { StudentDetailPageComponent } from '../pages/student/student-details/student-detail-page.component';
import { AddStudentComponent } from '../pages/student/add-student/add-student.component';
import { TeacherListComponent } from '../pages/teacher/teacher-list/teacher-list.component';
import { TeacherDetailsComponent } from '../pages/teacher/teacher-details/teacher-details.component';

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
            { path: `${RoutePath.teachers}`, component: TeacherListComponent },
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
