import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { BaseComponent } from 'src/app/components/base/base.component';
import { langStr } from 'src/assets/translations';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/classes/security/student';
import { IStudent } from 'src/app/interfaces';
import { RoutePath } from 'src/app/enums';

@Component({
    templateUrl: './view-edit-student.component.html',
})
export class ViewEditStudentComponent extends BaseComponent {
    public student: IStudent = new Student();
    public readonly formOfEducationMap: Map<string, number[]> = new Map();
    public formsOfEducation: any;
    public isInEditMode: boolean = false;

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private readonly _studentService: StudentService, private readonly _router: Router, private readonly _route: ActivatedRoute) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.formOfEducationMap.set(this.strings.fullTime, [1, 2, 3]);
        this.formOfEducationMap.set(this.strings.distance, [1, 2, 3, 4]);
        this.formOfEducationMap.set(this.strings.free, [1, 2, 3]);
        this.formsOfEducation = Array.from(this.formOfEducationMap.keys());
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public stringsInit(): void {
        this.strings.add = this.getStr(langStr.common.add);
        this.strings.chooseCurrentYear = this.getStr(langStr.students.chooseCurrentYear);
        this.strings.currentYear = this.getStr(langStr.students.currentYear);
        this.strings.chooseCurrentYear = this.getStr(langStr.students.chooseCurrentYear);
        this.strings.distance = this.getStr(langStr.students.distance);
        this.strings.email = this.getStr(langStr.login.email);
        this.strings.enterEmail = this.getStr(langStr.login.enterEmail);
        this.strings.enterFirstName = this.getStr(langStr.common.enterFirstName);
        this.strings.enterMiddleName = this.getStr(langStr.common.enterMiddleName);
        this.strings.enterLastName = this.getStr(langStr.common.enterLastName);
        this.strings.enterSpecialty = this.getStr(langStr.students.enterSpecialty);
        this.strings.enterFacultyCouncilDate = this.getStr(langStr.students.enterFacultyCouncilDate);
        this.strings.enterFormOfEducation = this.getStr(langStr.students.enterFormOfEducation);
        this.strings.facultyCouncilDate = this.getStr(langStr.students.facultyCouncilDate);
        this.strings.formOfEducation = this.getStr(langStr.students.formOfEducation);
        this.strings.firstName = this.getStr(langStr.common.firstName);
        this.strings.free = this.getStr(langStr.students.free);
        this.strings.fullTime = this.getStr(langStr.students.fullTime);
        this.strings.middleName = this.getStr(langStr.common.middleName);
        this.strings.lastName = this.getStr(langStr.common.lastName);
        this.strings.specialty = this.getStr(langStr.students.specialty);
    }

    public onSubmit(): void {
        this.student.currentYear = +this.student.currentYear;
        this._studentService
            .createStudent(this.student)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(() => {
                this._router.navigate([RoutePath.students], { relativeTo: this._route });
            });
    }
}
