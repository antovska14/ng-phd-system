import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { BaseComponent } from '../../base/base.component';
import { RoutePath } from 'src/app/enums';
import { langStr } from 'src/assets/translations';
import { TeacherService } from 'src/app/services/teacher.service';
import { ITeacher } from 'src/app/interfaces';

@Component({
    templateUrl: './teacher-main-page.component.html',
})
export class TeacherMainPageComponent extends BaseComponent {
    public teachers: ITeacher[];
    public isLoading = false;

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _teacherService: TeacherService
    ) {
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
        this.strings.addSupervisor = this.getStr(langStr.teachers.addSupervisor);
        this.strings.supervisorsDoNotExist = 'Не съществуват научни ръководители';
    }

    public onAddTeacherClick(): void {
        this._router.navigate([RoutePath.add], { relativeTo: this._route });
    }

    public onDeleteClick(teacherId: number): void {
        this._teacherService
            .deleteTeacher(teacherId)
            .pipe(
                takeUntil(this._ngUnsubscribe),
                finalize(() => {
                    this.getTeachers();
                })
            )
            .subscribe();
    }

    private getTeachers(): void {
        this.isLoading = true;
        this._teacherService
            .getTeachers()
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                }),
                takeUntil(this._ngUnsubscribe)
            )
            .subscribe((teachers: ITeacher[]) => {
                this.teachers = teachers;
            });
    }
}
