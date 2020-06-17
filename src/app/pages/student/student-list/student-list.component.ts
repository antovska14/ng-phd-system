import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { BaseComponent } from '../../../components/base/base.component';
import { StudentService } from '../../../services/student.service';
import { IStudent } from 'src/app/interfaces/student.interface';
import { langStr } from 'src/assets/translations';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'student-list',
    templateUrl: './student-list.component.html',
})
export class StudentListComponent extends BaseComponent implements OnInit, OnDestroy {
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
        this.strings.firstName = this.getStr(langStr.common.firstName);
        this.strings.operations = this.getStr(langStr.students.operations);
        this.strings.lastName = this.getStr(langStr.common.lastName);
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
