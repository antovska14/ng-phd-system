import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { BaseComponent } from '../../components/base/base.component';
import { langStr } from '../../../assets/translations';
import { AuthService } from '../../services/auth.service';
import { User, UserAuth } from '../../classes/';
import { RoutePath } from '../../enums';
import { takeUntil } from 'rxjs/operators';

@Component({
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends BaseComponent implements OnDestroy {
    private _loginForm: NgForm;
    private _returnUrl: string;

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    public user: User = new User();
    public userAuth: UserAuth = null;

    constructor(
        private readonly _authService: AuthService,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute
    ) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this._returnUrl = this._route.snapshot.queryParamMap.get('returnUrl');
        localStorage.removeItem('bearerToken');
        this.shared.currentUser = new UserAuth();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public stringsInit(): void {
        this.strings.enterEmail = this.getStr(langStr.login.enterEmail);
        this.strings.enterPassword = this.getStr(langStr.login.enterPassword);
        this.strings.password = this.getStr(langStr.login.password);
        this.strings.login = this.getStr(langStr.login.login);
        this.strings.email = this.getStr(langStr.login.email);
        this.strings.invalidEmailOrPassword = this.getStr(langStr.login.invalidEmailOrPassword);
        this.strings.pleaseEnterPassword = this.getStr(langStr.login.pleaseEnterPassword);
        this.strings.pleaseEnterValidEmail = this.getStr(langStr.login.pleaseEnterValidEmail);
    }

    public login(): void {
        this._authService
            .login(this.user)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(
                (userAuth: UserAuth) => {
                    this.userAuth = userAuth;
                    this.shared.currentUser = userAuth;
                    if (this._returnUrl) {
                        this._router.navigateByUrl(this._returnUrl);
                    } else {
                        if (!userAuth.passwordSet) {
                            this._router.navigate([RoutePath.setpassword]);
                        } else {
                            this._router.navigate([RoutePath.dashboard]);
                        }
                    }
                },
                () => {
                    this.shared.currentUser = new UserAuth();
                    this.userAuth = new UserAuth();
                }
            );
    }
}
