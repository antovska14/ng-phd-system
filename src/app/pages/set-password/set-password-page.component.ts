import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { BaseComponent } from '../../components/base/base.component';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { langStr } from 'src/assets/translations';

@Component({
    templateUrl: './set-password-page.component.html',
    styleUrls: ['./set-password-page.component.scss'],
})
export class SetPasswordPageComponent extends BaseComponent {
    public newPassword: string = '';
    public repeatPassword: string = '';

    private _setPasswordForm: NgForm;
    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private readonly _authService: AuthService,
        private readonly _router: Router,
        private readonly _notificationService: NotificationService
    ) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public stringsInit(): void {
        this.strings.newPassword = 'Нова парола';
        this.strings.repeatPassword = 'Повторете паролата';
        this.strings.passwordsDoNotMatch = 'Паролите не съвпадат';
        this.strings.setPassword = 'Задай парола';
        this.strings.passwordSet = 'Паролата е успешно зададена';
        this.strings.invalidPassword = 'Невалидна парола!';
        this.strings.pleaseEnterPassword = this.getStr(langStr.login.pleaseEnterPassword);
    }

    public setPassword(form: NgForm): void {
        if (this.newPassword !== this.repeatPassword) {
            this._notificationService.error(this.strings.passwordsDoNotMatch);
        } else {
            this._setPasswordForm = form;
            const password = this.repeatPassword;
            if (!this.isPasswordValid(password)) {
                this._notificationService.error(this.strings.invalidPassword);
            } else {
                this._authService
                    .setPassword(password)
                    .pipe(takeUntil(this._ngUnsubscribe))
                    .subscribe(() => {
                        this._notificationService.success(this.strings.passwordSet);
                        this._router.navigate([this.shared.userRoleConfig.dashboard]);
                        this._setPasswordForm.reset();
                    });
            }
        }
    }

    private isPasswordValid(password: string): boolean {
        return password === null || password === '' || password === undefined ? false : true;
    }
}
