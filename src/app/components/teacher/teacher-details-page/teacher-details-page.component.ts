import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, finalize } from 'rxjs/operators';

import { BaseComponent } from '../../base/base.component';
import { TeacherService } from 'src/app/services/teacher.service';
import { ITeacherDetailsFormConfig, ITeacher } from 'src/app/interfaces';

@Component({
    templateUrl: './teacher-details-page.component.html',
})
export class TeacherDetailsPageComponent extends BaseComponent {
    public config: ITeacherDetailsFormConfig;
    public teacher: ITeacher;

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private readonly _teacherService: TeacherService, private readonly _route: ActivatedRoute) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.getTeacher();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    private getTeacher(): void {
        this._route.paramMap.subscribe((paramMap) => {
            const teacherId = +paramMap.get('id');
            this._teacherService
                .getTeacher(teacherId)
                .pipe(
                    finalize(() => {
                        this.initConfig();
                    }),
                    takeUntil(this._ngUnsubscribe)
                )
                .subscribe((teacher: ITeacher) => {
                    this.teacher = teacher;
                });
        });
    }

    public updateTeacher(): () => void {
        return () => {
            this._teacherService
                .updateTeacher(this.config.teacher)
                .pipe(
                    finalize(() => {
                        this.getTeacher();
                    }),
                    takeUntil(this._ngUnsubscribe)
                )
                .subscribe();
        };
    }

    private initConfig() {
        console.log('init config');
        this.config = {
            teacher: this.teacher,
            editMode: true,
            addMode: false,
            submitFunction: this.updateTeacher(),
        };
    }
}
