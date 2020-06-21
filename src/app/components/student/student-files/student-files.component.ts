import { Component, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { BaseComponent } from '../../base/base.component';
import { StudentFileService } from '../../../services/student-file.service';
import { IStudentFileDetails } from 'src/app/interfaces';

@Component({
    selector: 'student-files',
    templateUrl: './student-files.component.html',
})
export class StudentFilesComponent extends BaseComponent {
    @Input()
    public studentId: number;
    @Input()
    public currentYear: number;

    public fileGroups: string[] = [];
    public studentFileDetailsList: IStudentFileDetails[];

    private readonly _ngUnsubscribe: Subject<void> = new Subject();

    constructor(private readonly _studentFileService: StudentFileService) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.initStudentFiles();
    }

    public stringsInit(): void {
        this.strings.year = 'Година';
        this.strings.other = 'Други';
    }

    private initStudentFiles(): void {
        this._studentFileService
            .getStudentFileDetails(this.studentId)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((studentFileDetailsList: IStudentFileDetails[]) => {
                this.studentFileDetailsList = studentFileDetailsList;
            });
    }
}
