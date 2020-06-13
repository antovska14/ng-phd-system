import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from '../pages/login/login-page.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LayoutPageComponent } from '../pages/layout/layout-page.component';
import { AuthGuard } from '../services/guards/auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    {
        path: 'app',
        component: LayoutPageComponent,
        children: [{ path: 'dashboard', component: DashboardComponent, data: { claimType: 'isAuthenticated' } }],
        canActivate: [AuthGuard],
        data: { claimType: 'isAuthenticated' },
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
