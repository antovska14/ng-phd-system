import { HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IStudentFileDetails, IStudentFileRequest, IFile, IUploadStudentFileRequest } from '../../../interfaces';
import { StudentFileService } from '../../../services/student-file.service';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'student-files',
    templateUrl: './student-files.component.html',
})
export class StudentFilesComponent extends BaseComponent {
    @Input()
    public studentId: number;

    @Input()
    public set currentYear(value) {
        this._currentYear = value;
        this.initYearGroupFiles();
    }

    public get currentYear(): number {
        return this._currentYear;
    }

    public fileGroups: string[] = [];
    public studentFileDetailsList: IStudentFileDetails[];

    public yearGroupFiles: number[];
    public generalGroupFiles: string = 'General';

    private _currentYear: number;
    private readonly _ngUnsubscribe: Subject<void> = new Subject();

    constructor(private readonly _studentFileService: StudentFileService) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.getStudentFiles();
    }

    public stringsInit(): void {
        this.strings.year = 'Година';
        this.strings.other = 'Други';
    }

    public getYearGroupFiles(group: any): string[] {
        if (!this.studentFileDetailsList) {
            return;
        }

        return this.studentFileDetailsList.filter((x) => x.fileGroup == group).map((x) => x.fileNames)[0];
    }

    public deleteFile(fileName: string, year: number = 0): void {
        let fileRequest: IStudentFileRequest = {
            studentId: this.studentId,
            fileName: fileName,
        };

        if (year > 0) {
            fileRequest.year = year;
        }

        this._studentFileService
            .deleteStudentFile(fileRequest)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(() => {
                this.getStudentFiles();
            });
    }

    public downloadFile(fileName: string, year: number = 0): void {
        let fileRequest: IStudentFileRequest = {
            studentId: this.studentId,
            fileName: fileName,
        };

        if (year > 0) {
            fileRequest.year = year;
        }

        this._studentFileService
            .downloadStudentFile(fileRequest)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((file: IFile) => {
                saveAs(file.fileContent, file.fileName);
            });
    }

    public fileUpload(fileList: FileList, year: number = 0): void {
        const file = fileList.item(0);
        let fileRequst: IUploadStudentFileRequest = {
            studentId: this.studentId,
            file: file,
        };

        if (year > 0) {
            fileRequst.year = year;
        }

        this._studentFileService
            .uploadStudentFile(fileRequst)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((event) => {
                if (event.type === HttpEventType.Response) {
                    this.getStudentFiles();
                }
            });
    }

    private getStudentFiles(): void {
        this._studentFileService
            .getStudentFileDetails(this.studentId)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((studentFileDetailsList: IStudentFileDetails[]) => {
                this.studentFileDetailsList = studentFileDetailsList;
            });
    }

    private initYearGroupFiles(): void {
        this.yearGroupFiles = [];
        for (let i = 1; i <= this.currentYear; i += 1) {
            this.yearGroupFiles.push(i);
        }
    }
}
