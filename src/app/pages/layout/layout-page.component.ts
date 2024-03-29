import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseComponent } from '../../components/base/base.component';
import { AuthService } from '../../services/auth.service';
import { RoutePath } from '../../enums';
import { langStr } from '../../../assets/translations';

@Component({
    templateUrl: './layout-page.component.html',
})
export class LayoutPageComponent extends BaseComponent {
    public readonly logoUrl = '../../../assets/images/phd_system_logo_icon_white_hat.png';

    constructor(private readonly _authService: AuthService, private readonly _router: Router) {
        super();
    }

    public stringsInit(): void {
        this.strings.logout = this.getStr(langStr.login.logout);
        this.strings.phdStudents = this.getStr(langStr.students.phdStudents);
        this.strings.supervisors = this.getStr(langStr.teachers.supervisors);
        this.strings.professionalFields = 'Професионални направления';
        this.strings.phdPrograms = 'Докторантски програми';
        this.strings.details = 'Детайли';
    }

    public logout(): void {
        this._authService.logout();
        this._router.navigate([RoutePath.login]);
    }

    public navigateToUserDashboard(): void {
        this._router.navigate([this.shared.userRoleConfig.dashboard]);
    }

    public navigateToDetailsPage(): void {
        this._router.navigate([this.shared.userRoleConfig.detailsPage]);
    }
}
