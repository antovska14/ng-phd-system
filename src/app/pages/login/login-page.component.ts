import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BaseComponent } from 'src/app/components/base/base.component';
import { langStr } from 'src/assets/translations';
import { AuthService } from 'src/app/services/login.service';
import { ILoginModel } from 'src/app/interfaces';
import { LoginModel } from 'src/app/classes';

@Component({
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends BaseComponent {
    public loginModel: ILoginModel = new LoginModel();

    private _loginForm: NgForm;

    constructor(private readonly _authService: AuthService) {
        super();
    }

    public stringsInit(): void {
        this.strings.enterUsername = this.getStr(langStr.login.enterUsername);
        this.strings.enterPassword = this.getStr(langStr.login.enterPassword);
        this.strings.password = this.getStr(langStr.login.password);
        this.strings.submit = this.getStr(langStr.common.submit);
        this.strings.username = this.getStr(langStr.login.username);
    }

    public onSubmit(loginForm: NgForm): void {
        this._authService.login(this.loginModel).subscribe();
    }
}
