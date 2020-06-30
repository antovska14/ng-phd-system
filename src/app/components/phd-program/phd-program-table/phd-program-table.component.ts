import { Component, Input } from '@angular/core';

import { IPhdProgram } from '../../../interfaces';
import { BaseComponent } from '../../base/base.component';
import { langStr } from 'src/assets/translations';

@Component({
    templateUrl: './phd-program-table.component.html',
    selector: 'phd-program-table',
})
export class PhdProgramTableComponent extends BaseComponent {
    @Input()
    public phdPrograms: IPhdProgram[];

    public stringsInit(): void {
        this.strings.professionalField = this.getStr(langStr.students.professionalField);
        this.strings.phdProgram = this.getStr(langStr.students.phdProgram);
    }
}
