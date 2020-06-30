import { Component, Input } from '@angular/core';

import { IProfessionalField } from '../../../interfaces';
import { BaseComponent } from '../../base/base.component';
import { langStr } from 'src/assets/translations';

@Component({
    templateUrl: './professional-field-table.component.html',
    selector: 'professional-field-table',
})
export class ProfessionalFieldTableComponent extends BaseComponent {
    @Input()
    public professionalFields: IProfessionalField[];

    public stringsInit(): void {
        this.strings.professionalField = this.getStr(langStr.students.professionalField);
    }
}
