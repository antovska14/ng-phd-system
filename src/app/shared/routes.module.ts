import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from '../pages/login/login-page.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LayoutPageComponent } from '../pages/layout/layout-page.component';
import { AuthGuard } from '../services/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    {
        path: 'app',
        component: LayoutPageComponent,
        children: [{ path: 'dashboard', component: DashboardComponent }],
        canActivate: [AuthGuard],
        data: { claimType: 'isAuthenticated' },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
