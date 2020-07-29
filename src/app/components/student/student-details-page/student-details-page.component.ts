import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IStudent, IStudentDetailsFormConfig } from 'src/app/interfaces';
import { StudentService } from 'src/app/services/student.service';
import { BaseComponent } from '../../base/base.component';
import { langStr } from 'src/assets/translations';

@Component({
    templateUrl: './student-details-page.component.html',
})
export class StudentDetailPageComponent extends BaseComponent {
    public config: IStudentDetailsFormConfig;
    public student: IStudent;

    public title: string = '';

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
        this.strings.documents = 'Документи';
        this.strings.exams = 'Изпити';
        this.strings.phdStudentDetails = this.getStr(langStr.students.phdStudentDetails);
    }

    private getStudent(): void {
        this._route.paramMap.subscribe((paramMap) => {
            const studentId = +paramMap.get('id');
            this._studentService
                .getStudent(studentId)
                .pipe(takeUntil(this._ngUnsubscribe))
                .subscribe((student) => {
                    this.student = student;
                    this.initConfig();
                    this.initPageTitle();
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
                        this.initPageTitle();
                    }),
                    takeUntil(this._ngUnsubscribe)
                )
                .subscribe();
        };
    }

    public onShowDetailsClick(): void {
        this.showDetails = true;
        this.showExams = false;
        this.showFiles = false;
    }

    public onShowFilesClick(): void {
        this.showDetails = false;
        this.showExams = false;
        this.showFiles = true;
    }

    public onShowExamsClick(): void {
        this.showDetails = false;
        this.showExams = true;
        this.showFiles = false;
    }

    private initConfig(): void {
        this.config = {
            student: this.student,
            editMode: true,
            addMode: false,
            submitFunction: this.updateStudent(),
        };
    }

    private initPageTitle(): void {
        this.title = `${this.student.firstName} ${this.student.lastName}`;
    }
}
