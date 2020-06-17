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
    public routes = RoutePath;

    constructor(private readonly _authService: AuthService, private readonly _router: Router, private readonly _route: ActivatedRoute) {
        super();
    }

    public stringsInit(): void {
        this.strings.logout = this.getStr(langStr.login.logout);
        this.strings.phdStudents = this.getStr(langStr.students.phdStudents);
    }

    public logout(): void {
        this._authService.logout();
        this._router.navigate([RoutePath.login]);
    }
}
