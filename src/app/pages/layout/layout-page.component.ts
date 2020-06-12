import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserAuth } from '../../classes/security';
import { BaseComponent } from '../../components/base/base.component';
import { AuthService } from '../../services/auth.service';

@Component({
    templateUrl: './layout-page.component.html',
})
export class LayoutPageComponent extends BaseComponent {
    private _authObject: UserAuth = null;

    constructor(private readonly _authService: AuthService, private readonly _router: Router, private readonly _route: ActivatedRoute) {
        super();

        this._authObject = _authService.authObject;
    }

    public logout(): void {
        this._authService.logout();
        this._router.navigate(['login']);
    }
}
