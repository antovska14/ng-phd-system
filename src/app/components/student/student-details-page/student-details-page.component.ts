import { Component } from '@angular/core';
import { IStudent } from 'src/app/interfaces';

@Component({
    templateUrl: './student-details-page.component.html',
})
export class StudentDetailsPageComponent {
    public student: IStudent;
    public showForm: boolean = true;
}
