import { Component } from '@angular/core';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { BaseComponent } from '../../../components/base/base.component';
import { langStr } from '../../../../assets/translations';
import { IStudentListModel } from '../../../interfaces';
import { StudentService } from '../../../services/student.service';
import { ROLES } from '../../../shared/const';

@Component({
    templateUrl: './student-page.component.html',
})
export class StudentPageComponent extends BaseComponent {
    public students: IStudentListModel[];
    public adminRole = ROLES.ADMIN;
    public isLoading = false;

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private readonly _studentService: StudentService) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.getStudents();
    }

    public stringsInit(): void {
        this.strings.addPhdStudent = this.getStr(langStr.students.addPhdStudent);
    }

    public refreshList(): void {
        this.getStudents();
    }

    private getStudents(): void {
        let obs: Observable<IStudentListModel[]>;
        if (this.shared.currentUser.role === ROLES.ADMIN) {
            obs = this._studentService.getStudents();
        } else if (this.shared.currentUser.role === ROLES.TEACHER) {
            obs = this._studentService.getStudentsByTeacherUserId(this.shared.currentUser.id);
        }

        this.isLoading = true;
        obs.pipe(
            finalize(() => {
                this.isLoading = false;
            }),
            takeUntil(this._ngUnsubscribe)
        ).subscribe((students: IStudentListModel[]) => {
            this.students = students;
        });
    }
}
