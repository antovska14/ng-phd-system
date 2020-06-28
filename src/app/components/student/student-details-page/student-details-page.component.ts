import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IStudent, IDetailsFormConfig } from 'src/app/interfaces';
import { StudentService } from 'src/app/services/student.service';
import { BaseComponent } from '../../base/base.component';
import { langStr } from 'src/assets/translations';

@Component({
    templateUrl: './student-details-page.component.html',
})
export class StudentDetailPageComponent extends BaseComponent {
    public config: IDetailsFormConfig;

    public student: IStudent;
    public showForm: boolean = true;

    public showDetails: boolean = true;
    public showFiles: boolean = false;
    public showExams: boolean = false;

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private readonly _studentService: StudentService, private readonly _route: ActivatedRoute) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.getStudent();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public stringsInit() {
        this.strings.files = 'Файлови';
        this.strings.exams = 'Изпити';
        this.strings.phdStudentDetails = this.getStr(langStr.students.phdStudentDetails);
    }

    private getStudent(): void {
        this._route.paramMap.subscribe((paramMap) => {
            const studentId = +paramMap.get('id');
            this._studentService
                .getStudent(studentId)
                .pipe(
                    finalize(() => {
                        this.initConfig();
                    }),
                    takeUntil(this._ngUnsubscribe)
                )
                .subscribe((student) => {
                    this.student = student;
                });
        });
    }

    public updateStudent(): () => void {
        return () => {
            this.config.student.currentYear = +this.config.student.currentYear;
            this._studentService
                .updateStudent(this.config.student)
                .pipe(
                    finalize(() => {
                        this.getStudent();
                    }),
                    takeUntil(this._ngUnsubscribe)
                )
                .subscribe();
        };
    }

    private initConfig(): void {
        this.config = {
            student: this.student,
            editMode: true,
            addMode: false,
            submitFunction: this.updateStudent(),
        };
    }
}
