import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component } from '@angular/core';

import { BaseComponent } from '../../../components/base/base.component';
import { ITeacher } from 'src/app/interfaces';
import { TeacherService } from 'src/app/services/teacher.service';
import { langStr } from 'src/assets/translations';

@Component({
    selector: 'teacher-list',
    templateUrl: './teacher-list.component.html',
})
export class TeacherListComponent extends BaseComponent {
    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    public teachers: ITeacher[];

    constructor(private readonly _teacherService: TeacherService) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.getTeachers();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public stringsInit(): void {
        this.strings.firstName = this.getStr(langStr.common.firstName);
        this.strings.lastName = this.getStr(langStr.common.lastName);
        this.strings.viewEdit = this.getStr(langStr.common.viewEdit);
    }

    private getTeachers(): void {
        this._teacherService
            .getTeachers()
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((teachers: ITeacher[]) => {
                this.teachers = teachers;
            });
    }
}
