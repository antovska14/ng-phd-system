import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from '../pages/login/login-page.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LayoutPageComponent } from '../pages/layout/layout-page.component';
import { AuthGuard } from '../services/guards/auth.guard';
import { RoutePath } from '../enums';
import { StudentPageComponent } from '../pages/student/student-page/student-page.component';
import { StudentDetailPageComponent } from '../pages/student/student-details/student-detail-page.component';
import { UpsertStudentComponent } from '../pages/student/upsert-student/upsert-student.component';

const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    {
        path: '',
        component: LayoutPageComponent,
        children: [
            { path: '', redirectTo: RoutePath.dashboard, pathMatch: 'full' },
            { path: RoutePath.dashboard, component: DashboardComponent },
            { path: `${RoutePath.students}/${RoutePath.create}`, component: UpsertStudentComponent },
            { path: `${RoutePath.students}/${RoutePath.detail}/:id`, component: StudentDetailPageComponent },
            { path: RoutePath.students, component: StudentPageComponent },
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
