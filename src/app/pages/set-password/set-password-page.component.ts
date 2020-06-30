import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent } from 'src/app/components/base/base.component';
import { langStr } from 'src/assets/translations';
import { AuthService } from 'src/app/services/auth.service';
import { RoutePath } from 'src/app/enums';

@Component({
    templateUrl: './set-password-page.component.html',
    styleUrls: ['./set-password-page.component.scss'],
})
export class SetPasswordPageComponent extends BaseComponent {
    public newPassword: string = '';
    public repeatPassword: string = '';

    constructor(private readonly _authService: AuthService, private readonly _router: Router) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

    public stringsInit(): void {
        this.strings.newPassword = 'Нова парола';
        this.strings.repeatPassword = 'Повторете паролата';
        this.strings.passwordsDoNotMatch = 'Паролите не съвпадат';
        this.strings.enterPassword = this.getStr(langStr.login.enterPassword);
        this.strings.setPassword = 'Задай парола';
    }

    public setPassword(): void {
        this._authService.setPassword(this.repeatPassword).subscribe(() => {
            this._router.navigate([RoutePath.dashboard]);
        });
    }
}
