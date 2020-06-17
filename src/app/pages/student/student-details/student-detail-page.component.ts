import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { BaseComponent } from 'src/app/components/base/base.component';
import { StudentService } from 'src/app/services/student.service';
import { IStudent } from 'src/app/interfaces/student.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'student-detail-page',
    templateUrl: './student-detail-page.component.html',
})
export class StudentDetailPageComponent extends BaseComponent implements OnInit {
    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();
    public student: IStudent;

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

    private getStudent(): void {
        this._route.paramMap.subscribe((paramMap) => {
            const studentId = +paramMap.get('id');
            this._studentService
                .getStudent(studentId)
                .pipe(takeUntil(this._ngUnsubscribe))
                .subscribe((student) => {
                    this.student = student;
                });
        });
    }
}
