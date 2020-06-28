import { HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IStudentFileGroupDetails, IStudentFileRequest, IFile, IUploadStudentFileRequest } from '../../../interfaces';
import { StudentFileService } from '../../../services/student-file.service';
import { BaseComponent } from '../../base/base.component';
import { StudentFileType } from 'src/app/enums';

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
    public studentFileDetailsList: IStudentFileGroupDetails[];

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
        this.strings.currentYear = 'Курс';
        this.strings.other = 'Други';
        this.strings.downloadIndividualPlan = 'Изтегли индивидуален план';
        this.strings.downloadAttestation = 'Изтегли атестация';
        this.strings.downloadAnnotation = 'Изтегли анотация';
        this.strings.upload = 'Качи';
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

    public generateAttestation(yearGroup) {
        this._studentFileService
            .exportStudentFile({ studentId: this.studentId, year: yearGroup, studentFileType: StudentFileType.attestation })
            .subscribe((file: IFile) => {
                saveAs(file.fileContent, file.fileName);
            });
    }

    public generateIndividualPlan() {
        this._studentFileService
            .exportStudentFile({ studentId: this.studentId, studentFileType: StudentFileType.individualPlan })
            .subscribe((file: IFile) => {
                saveAs(file.fileContent, file.fileName);
            });
    }

    public generateAnnotation() {
        this._studentFileService
            .exportStudentFile({ studentId: this.studentId, studentFileType: StudentFileType.annotation })
            .subscribe((file: IFile) => {
                saveAs(file.fileContent, file.fileName);
            });
    }

    private getStudentFiles(): void {
        console.log('id - ' + this.studentId);
        this._studentFileService
            .getStudentFileDetails(this.studentId)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((studentFileDetailsList: IStudentFileGroupDetails[]) => {
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
