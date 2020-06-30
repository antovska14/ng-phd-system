import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { BaseComponent } from '../../../components/base/base.component';
import { IStudentDetailsFormConfig } from '../../../interfaces';
import { Student } from '../../../classes/';
import { StudentService } from '../../../services/student.service';
import { RoutePath } from '../../../enums';

@Component({
    templateUrl: './add-student-page.component.html',
})
export class AddStudentPageComponent extends BaseComponent {
    public config: IStudentDetailsFormConfig;

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private readonly _studentService: StudentService, private readonly _router: Router) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.initConfig();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public createStudent(): () => void {
        return () => {
            this.config.student.currentYear = +this.config.student.currentYear;
            this._studentService
                .createStudent(this.config.student)
                .pipe(takeUntil(this._ngUnsubscribe))
                .subscribe(() => {
                    this._router.navigate([RoutePath.students]);
                });
        };
    }

    public initConfig(): void {
        this.config = {
            student: new Student(),
            editMode: false,
            addMode: true,
            submitFunction: this.createStudent(),
        };
    }
}
