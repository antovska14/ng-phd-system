import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

import { BaseComponent } from 'src/app/components/base/base/base.component';
import { ExportService } from 'src/app/services/export.service';
import { IFile } from 'src/app/interfaces';

@Component({
    templateUrl: './dashboard.component.html',
})
export class Dashboardcomponent extends BaseComponent {
    public exportButtonLabel = 'Export';

    constructor(private _exportService: ExportService) {
        super();
    }

    public onExportClick(): void {
        this._exportService.exportFile().subscribe((file: any) => {
            saveAs(file, 'IndividualPlan.docx');
        });
    }
}
