import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetPasswordPageComponent } from '../pages/set-password/set-password-page.component';
import { LoginPageComponent } from '../pages/login/login-page.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LayoutPageComponent } from '../pages/layout/layout-page.component';

import { StudentMainPageComponent } from '../components/student/student-main-page/student-main-page.component';
import { StudentDetailPageComponent } from '../components/student/student-details-page/student-details-page.component';
import { AddStudentPageComponent } from '../components/student/add-student-page/add-student-page.component';
import { StudentFilesComponent } from '../components/student/student-files/student-files.component';
import { ProfessionalFieldMainPageComponent } from '../components/professional-field/professional-field-main-page/professional-field-main-page.component';
import { ExamsComponent } from '../components/student/exams/exams.component';
import { PhdProgramMainPageComponent } from '../components/phd-program/phd-program-main-page/phd-program-main-page.component';

import { AuthGuard } from '../services/guards/auth.guard';
import { RoutePath } from '../enums';
import { TeacherMainPageComponent } from '../components/teacher/teacher-main-page/teacher-main-page.component';
import { AddTeacherMainPageComponent } from '../components/teacher/add-teacher-page/add-teacher-page.component';
import { TeacherDetailsPageComponent } from '../components/teacher/teacher-details-page/teacher-details-page.component';

const routes: Routes = [
    { path: RoutePath.login, component: LoginPageComponent },
    { path: RoutePath.setpassword, component: SetPasswordPageComponent },
    {
        path: '',
        component: LayoutPageComponent,
        children: [
            { path: '', redirectTo: RoutePath.dashboard, pathMatch: 'full' },
            { path: RoutePath.dashboard, component: DashboardComponent },

            { path: RoutePath.students, component: StudentMainPageComponent },
            { path: `${RoutePath.students}/${RoutePath.add}`, component: AddStudentPageComponent },
            { path: `${RoutePath.students}/:id`, component: StudentDetailPageComponent },
            { path: `${RoutePath.students}/:id/${RoutePath.files}`, component: StudentFilesComponent },
            { path: `${RoutePath.students}/:id/${RoutePath.exams}`, component: ExamsComponent },

            { path: RoutePath.teachers, component: TeacherMainPageComponent },
            { path: `${RoutePath.teachers}/${RoutePath.add}`, component: AddTeacherMainPageComponent },
            { path: `${RoutePath.teachers}/:id`, component: TeacherDetailsPageComponent },

            { path: RoutePath.professionalFields, component: ProfessionalFieldMainPageComponent },

            { path: RoutePath.phdPrograms, component: PhdProgramMainPageComponent },
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
