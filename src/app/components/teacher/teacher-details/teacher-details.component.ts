import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

import { BaseComponent } from '../../../components/base/base.component';
import { langStr } from '../../../../assets/translations';
import { ITeacher, ITeacherDetailsFormConfig } from '../../..//interfaces';
import { DEGREES, TITLES } from '../../../shared/const';

@Component({ templateUrl: './teacher-details.component.html', selector: 'teacher-details' })
export class TeacherDetailsComponent extends BaseComponent {
    @Input()
    public config: ITeacherDetailsFormConfig;

    @Output()
    public configChange: EventEmitter<ITeacherDetailsFormConfig> = new EventEmitter<ITeacherDetailsFormConfig>();

    public showForms: boolean = false;

    public initial: ITeacher;

    public readonly degreeOptions = [DEGREES.DOCTOR, DEGREES.DOCTOR_TECHNICAL_SCIENCES];
    public readonly titleOptions = [TITLES.ASSISTANT, TITLES.CHIEF_ASSISTANT, TITLES.ASSOCIATE_PROFESSOR, TITLES.PROFESSOR];

    constructor(private readonly _location: Location) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();
        console.log('int teacher details');

        if (this.config.addMode) {
            this.showForms = true;
        }
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
        this.strings.requiredField = 'Полето е задължително';
    }

    public onCancelClick(): void {
        this.showForms = false;
        this.config.teacher = this.initial;
    }

    public onBackClick(): void {
        this._location.back();
    }

    public onEditClick(): void {
        this.initial = JSON.parse(JSON.stringify(this.config.teacher)) as ITeacher;
        this.showForms = true;
    }

    public onSubmit(): void {
        if (this.config.editMode) {
            this.showForms = false;
        }

        this.configChange.emit(this.config);
        this.config.submitFunction();
    }
}
