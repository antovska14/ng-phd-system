import { Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { BaseComponent } from '../../base/base.component';
import { StudentService } from '../../../services/student.service';
import { IStudentListModel } from '../../../interfaces';
import { langStr } from '../../../../assets/translations';

@Component({
    selector: 'student-table',
    templateUrl: './student-table.component.html',
})
export class StudentTableComponent extends BaseComponent implements OnDestroy {
    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    @Input()
    public students: IStudentListModel[];

    @Output()
    public studentDeleted: EventEmitter<void> = new EventEmitter<void>();

    constructor(private readonly _studentService: StudentService) {
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
        this.strings.delete = this.getStr(langStr.common.delete);
        this.strings.firstName = this.getStr(langStr.common.firstName);
        this.strings.middleName = this.getStr(langStr.common.middleName);
        this.strings.lastName = this.getStr(langStr.common.lastName);
        this.strings.specialty = this.getStr(langStr.students.specialty);
        this.strings.viewEdit = this.getStr(langStr.common.viewEdit);
    }

    public onDeleteClick(studentId: number): void {
        this._studentService
            .deleteStudent(studentId)
            .pipe(
                takeUntil(this._ngUnsubscribe),
                finalize(() => {
                    this.studentDeleted.emit();
                })
            )
            .subscribe();
    }
}
