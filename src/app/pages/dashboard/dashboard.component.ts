import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

import { BaseComponent } from '../../components/base/base.component';
import { ExportService } from '../../services/export.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends BaseComponent {
    public exportButtonLabel = 'Export';

    constructor(private readonly _exportService: ExportService) {
        super();
    }

    public onExportClick(): void {
        this._exportService.exportFile().subscribe((file: any) => {
            saveAs(file, 'IndividualPlan.docx');
        });
    }
}
