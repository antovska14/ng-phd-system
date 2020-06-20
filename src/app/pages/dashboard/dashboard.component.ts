import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

import { BaseComponent } from '../../components/base/base.component';
import { ExportService } from '../../services/export.service';
import { HttpEventType } from '@angular/common/http';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends BaseComponent {
    public exportButtonLabel = 'Export';
    public uploadButtonLabel = 'Upload';

    public progress: number;
    public message: string;

    private fileToUpload: File;

    constructor(private readonly _exportService: ExportService) {
        super();
    }

    public onExportClick(): void {
        this._exportService.exportFile().subscribe((file: any) => {
            saveAs(file, 'IndividualPlan.docx');
        });
    }

    public handleFileInput(fileList: FileList): void {
        this.fileToUpload = fileList.item(0);
        this._exportService.uploadFile(this.fileToUpload).subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event.type === HttpEventType.Response) {
                this.message = 'Upload success';
            }
        });

        this._exportService.studentFileUpload(6, this.fileToUpload).subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event.type === HttpEventType.Response) {
                this.message = 'Upload success';
            }
        });
    }

    public deleteStudentFile(): void {
        this._exportService.deleteStudentFile(6, 'file-to-delete-1.txt').subscribe();
    }
}
