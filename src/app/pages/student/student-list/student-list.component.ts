import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '../../../components/base/base.component';
import { StudentService } from '../../../services/student.service';
import { IStudent } from 'src/app/interfaces/student.interface';

@Component({
    selector: 'student-list',
    templateUrl: './student-list.component.html',
})
export class StudentListComponent extends BaseComponent implements OnInit {
    public students: IStudent[];

    constructor(private readonly _studentService: StudentService) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.getStudents();
    }

    private getStudents(): void {
        this._studentService.getStudents().subscribe((students: IStudent[]) => {
            this.students = students;
        });
    }
}
