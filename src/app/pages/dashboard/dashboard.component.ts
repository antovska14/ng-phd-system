import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

import { BaseComponent } from '../../components/base/base.component';
import { ExportService } from '../../services/export.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends BaseComponent {
    public exportButtonLabel = 'Export';
    public uploadButtonLabel = 'Upload';

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
        this._exportService.uploadFile(this.fileToUpload).subscribe();
    }
}
