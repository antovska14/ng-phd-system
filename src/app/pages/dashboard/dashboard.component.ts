import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

import { BaseComponent } from '../../components/base/base.component';
import { StudentFileService } from '../../services/student-file.service';
import { HttpEventType } from '@angular/common/http';
import { StudentFileType } from 'src/app/enums';
import { IFile, IUploadStudentFileRequest } from 'src/app/interfaces';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends BaseComponent {
    public exportButtonLabel = 'Export';
    public uploadButtonLabel = 'Upload';

    public progress: number;
    public message: string;

    constructor(private readonly _studentFileService: StudentFileService) {
        super();
    }

    public onExportClick(): void {
        this._studentFileService.exportStudentFile({ studentId: 6, studentFileType: StudentFileType.individualPlan }).subscribe((file: IFile) => {
            saveAs(file.fileContent, file.fileName);
        });
    }

    public handleFileInput(fileList: FileList): void {
        let studentFileRequest: IUploadStudentFileRequest = {
            studentId: 6,
            file: fileList.item(0),
        };

        this._studentFileService.uploadStudentFile(studentFileRequest).subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event.type === HttpEventType.Response) {
                this.message = 'Upload success';
            }
        });
    }
}
