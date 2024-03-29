import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../../../components/base/base.component';
import { ITeacherDetailsFormConfig } from '../../../interfaces';
import { langStr } from '../../../../assets/translations';
import { RoutePath } from '../../../enums';
import { Teacher } from '../../../classes';
import { DEGREES, TITLES } from '../../../shared/const/';
import { TeacherService } from '../../../services/teacher.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
    templateUrl: './add-teacher-page.component.html',
})
export class AddTeacherMainPageComponent extends BaseComponent {
    public config: ITeacherDetailsFormConfig;

    public readonly degreeOptions = [DEGREES.DOCTOR, DEGREES.DOCTOR_TECHNICAL_SCIENCES];
    public readonly titleOptions = [TITLES.ASSISTANT, TITLES.CHIEF_ASSISTANT, TITLES.ASSOCIATE_PROFESSOR, TITLES.PROFESSOR];

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private readonly _teacherService: TeacherService,
        private readonly _router: Router,
        private readonly _notificationService: NotificationService
    ) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.initConfig();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public stringsInit(): void {
        this.strings.add = this.getStr(langStr.common.add);
        this.strings.email = this.getStr(langStr.login.email);
        this.strings.enterEmail = this.getStr(langStr.login.enterEmail);
        this.strings.enterFirstName = this.getStr(langStr.common.enterFirstName);
        this.strings.enterMiddleName = this.getStr(langStr.common.enterMiddleName);
        this.strings.enterLastName = this.getStr(langStr.common.enterLastName);
        this.strings.firstName = this.getStr(langStr.common.firstName);
        this.strings.middleName = this.getStr(langStr.common.middleName);
        this.strings.lastName = this.getStr(langStr.common.lastName);
        this.strings.degree = this.getStr(langStr.common.degree);
        this.strings.title = this.getStr(langStr.common.title);
    }

    public createTeacher(): () => void {
        return () => {
            this._teacherService
                .createTeacher(this.config.teacher)
                .pipe(takeUntil(this._ngUnsubscribe))
                .subscribe(() => {
                    this._router.navigate([RoutePath.teachers]);
                    this._notificationService.success('Ръководителят е успешно добавен!');
                });
        };
    }

    public initConfig(): void {
        this.config = {
            teacher: new Teacher(),
            editMode: false,
            addMode: true,
            submitFunction: this.createTeacher(),
        };
    }
}
