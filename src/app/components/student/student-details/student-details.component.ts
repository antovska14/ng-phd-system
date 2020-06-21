import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

import { BaseComponent } from '../../../components/base/base.component';
import { StudentService } from '../../../services/student.service';
import { IStudent } from '../../../interfaces';
import { langStr } from '../../../../assets/translations';

@Component({
    templateUrl: './student-details.component.html',
})
export class StudentDetailPageComponent extends BaseComponent {
    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();
    public readonly formOfEducationMap: Map<string, number[]> = new Map();
    public formsOfEducation: any;
    public isInEditMode: boolean = false;

    public initialStudent: IStudent;
    public student: IStudent;

    public showDetails: boolean = true;
    public showFiles: boolean = false;
    public showExams: boolean = false;

    constructor(private readonly _studentService: StudentService, private readonly _route: ActivatedRoute, private readonly _location: Location) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.getStudent();
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
        this.strings.back = this.getStr(langStr.common.back);
        this.strings.save = this.getStr(langStr.common.save);
        this.strings.edit = this.getStr(langStr.common.edit);
        this.strings.cancel = this.getStr(langStr.common.cancel);
        this.strings.phdStudentDetails = this.getStr(langStr.students.phdStudentDetails);
        this.strings.files = 'Файлови';
        this.strings.exams = 'Изпити';
    }

    public onSubmit(): void {
        this.student.currentYear = +this.student.currentYear;
        this._studentService
            .updateStudent(this.student)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(() => {
                this.isInEditMode = false;
                this.initialStudent = JSON.parse(JSON.stringify(this.student)) as IStudent;
            });
    }

    public onCancelClick(): void {
        this.isInEditMode = false;
        this.student = this.initialStudent;
    }

    public onBackClick(): void {
        this._location.back();
    }

    public onEditClick(): void {
        this.isInEditMode = true;
    }

    private getStudent(): void {
        this._route.paramMap.subscribe((paramMap) => {
            const studentId = +paramMap.get('id');
            this._studentService
                .getStudent(studentId)
                .pipe(takeUntil(this._ngUnsubscribe))
                .subscribe((student) => {
                    this.student = student;
                    this.initialStudent = JSON.parse(JSON.stringify(student)) as IStudent;
                });
        });
    }
}
