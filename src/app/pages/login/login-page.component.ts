import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseComponent } from '../../components/base/base.component';
import { langStr } from '../../../assets/translations';
import { AuthService } from '../../services/auth.service';
import { User, UserAuth } from '../../classes/security';
import { RoutePath } from '../../enums';

@Component({
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends BaseComponent {
    private _loginForm: NgForm;
    private _returnUrl: string;

    public user: User = new User();
    public userAuth: UserAuth = null;

    constructor(private readonly _authService: AuthService, private readonly _router: Router, private readonly _route: ActivatedRoute) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this._returnUrl = this._route.snapshot.queryParamMap.get('returnUrl');
        localStorage.removeItem('bearerToken');
        this.shared.currentUser = new UserAuth();
    }

    public stringsInit(): void {
        this.strings.enterUsername = this.getStr(langStr.login.enterUsername);
        this.strings.enterPassword = this.getStr(langStr.login.enterPassword);
        this.strings.password = this.getStr(langStr.login.password);
        this.strings.login = this.getStr(langStr.login.login);
        this.strings.username = this.getStr(langStr.login.username);
        this.strings.invalidUsernameOrPassword = this.getStr(langStr.login.invalidUsernameOrPassword);
        this.strings.pleaseEnterPassword = this.getStr(langStr.login.pleaseEnterPassword);
        this.strings.pleaseEnterValidUsername = this.getStr(langStr.login.pleaseEnterValidUsername);
    }

    public login(): void {
        this._authService.login(this.user).subscribe(
            (userAuth: UserAuth) => {
                this.userAuth = userAuth;
                this.shared.currentUser = userAuth;
                if (this._returnUrl) {
                    this._router.navigateByUrl(this._returnUrl);
                } else {
                    this._router.navigate([RoutePath.dashboard]);
                }
            },
            () => {
                this.shared.currentUser = new UserAuth();
                this.userAuth = new UserAuth();
            }
        );
    }
}
