import { takeUntil } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

import { BaseComponent } from 'src/app/components/base/base.component';
import { TeacherService } from 'src/app/services/teacher.service';
import { langStr } from 'src/assets/translations';
import { ITeacher } from 'src/app/interfaces';
import { DEGREES } from 'src/app/shared/const/degree.const';
import { TITLES } from 'src/app/shared/const/title.const';

@Component({ templateUrl: './teacher-details.component.html' })
export class TeacherDetailsComponent extends BaseComponent {
    public isInEditMode: boolean = false;

    public initialTeacher: ITeacher;
    public teacher: ITeacher;

    public readonly degreeOptions = [DEGREES.DOCTOR, DEGREES.DOCTOR_TECHNICAL_SCIENCES];
    public readonly titleOptions = [TITLES.ASSISTANT, TITLES.CHIEF_ASSISTANT, TITLES.ASSOCIATE_PROFESSOR, TITLES.PROFESSOR];

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private readonly _teacherService: TeacherService, private readonly _route: ActivatedRoute, private readonly _location: Location) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.getTeacher();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public stringsInit(): void {
        this.strings.add = this.getStr(langStr.common.add);
        this.strings.back = this.getStr(langStr.common.back);
        this.strings.cancel = this.getStr(langStr.common.cancel);
        this.strings.degree = this.getStr(langStr.common.degree);
        this.strings.edit = this.getStr(langStr.common.edit);
        this.strings.email = this.getStr(langStr.login.email);
        this.strings.enterEmail = this.getStr(langStr.login.enterEmail);
        this.strings.enterFirstName = this.getStr(langStr.common.enterFirstName);
        this.strings.enterMiddleName = this.getStr(langStr.common.enterMiddleName);
        this.strings.enterLastName = this.getStr(langStr.common.enterLastName);
        this.strings.firstName = this.getStr(langStr.common.firstName);
        this.strings.middleName = this.getStr(langStr.common.middleName);
        this.strings.lastName = this.getStr(langStr.common.lastName);
        this.strings.save = this.getStr(langStr.common.save);
        this.strings.supervisorDetails = this.getStr(langStr.teachers.supervisorDetails);
        this.strings.title = this.getStr(langStr.common.title);
    }

    public onSubmit(): void {
        this._teacherService
            .updateTeacher(this.teacher)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(() => {
                this.isInEditMode = false;
            });
    }

    public onCancelClick(): void {
        this.isInEditMode = false;
        this.teacher = this.initialTeacher;
    }

    public onBackClick(): void {
        this._location.back();
    }

    public onEditClick(): void {
        this.isInEditMode = true;
    }

    public onSaveClick(): void {
        this._teacherService.updateTeacher(this.teacher).subscribe();
    }

    private getTeacher(): void {
        this._route.paramMap.subscribe((paramMap) => {
            const teacherId = +paramMap.get('id');
            this._teacherService
                .getTeacher(teacherId)
                .pipe(takeUntil(this._ngUnsubscribe))
                .subscribe((teacher: ITeacher) => {
                    this.teacher = teacher;
                    this.initialTeacher = JSON.parse(JSON.stringify(teacher)) as ITeacher;
                });
        });
    }
}
