import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { BaseComponent } from '../../../components/base/base.component';
import { StudentService } from '../../../services/student.service';
import { IStudent } from 'src/app/interfaces';
import { langStr } from 'src/assets/translations';

@Component({
    selector: 'student-list',
    templateUrl: './student-list.component.html',
})
export class StudentListComponent extends BaseComponent implements OnDestroy {
    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    public students: IStudent[];

    constructor(private readonly _studentService: StudentService) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.getStudents();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public stringsInit(): void {
        this.strings.delete = this.getStr(langStr.common.delete);
        this.strings.firstName = this.getStr(langStr.common.firstName);
        this.strings.lastName = this.getStr(langStr.common.lastName);
        this.strings.viewEdit = this.getStr(langStr.common.viewEdit);
    }

    public onDeleteClick(studentId: number): void {
        this._studentService
            .deleteStudent(studentId)
            .pipe(
                takeUntil(this._ngUnsubscribe),
                finalize(() => {
                    this.getStudents();
                })
            )
            .subscribe();
    }

    private getStudents(): void {
        this._studentService
            .getStudents()
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((students: IStudent[]) => {
                this.students = students;
            });
    }
}
