import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from 'src/app/components/base/base.component';
import { ITeacher } from 'src/app/interfaces';
import { langStr } from 'src/assets/translations';
import { RoutePath } from 'src/app/enums';
import { Teacher } from 'src/app/classes';
import { DEGREES, TITLES } from 'src/app/shared/const/';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
    templateUrl: './add-teacher.component.html',
})
export class AddTeacherComponent extends BaseComponent {
    public teacher: ITeacher = new Teacher();

    public formsOfEducation: any;

    public readonly degreeOptions = [DEGREES.DOCTOR, DEGREES.DOCTOR_TECHNICAL_SCIENCES];
    public readonly titleOptions = [TITLES.ASSISTANT, TITLES.CHIEF_ASSISTANT, TITLES.ASSOCIATE_PROFESSOR, TITLES.PROFESSOR];

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private readonly _teacherService: TeacherService, private readonly _router: Router, private readonly _route: ActivatedRoute) {
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

    public onSubmit(): void {
        this._teacherService
            .createTeacher(this.teacher)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(() => {
                this._router.navigate([RoutePath.teachers]);
            });
    }
}
