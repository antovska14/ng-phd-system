import { Component, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ProfessionalFieldService } from '../../../services/professional-field.service';
import { PhdProgramService } from '../../../services/phd-program.service';
import { IPhdProgram, IProfessionalField } from '../../../interfaces';
import { PhdProgram } from '../../../classes/student-details';
import { BaseComponent } from '../../base/base.component';
import { langStr } from '../../../../assets/translations';

@Component({
    templateUrl: './add-phd-program.component.html',
    selector: 'add-phd-program',
})
export class AddPhdProgramComponent extends BaseComponent {
    public phdProgram: IPhdProgram = new PhdProgram();
    public professionalFieldOptions: IProfessionalField[] = [];

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    @Output()
    public phdProgramAdded: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private readonly _phdProgramService: PhdProgramService,
        private readonly _professionalFieldService: ProfessionalFieldService
    ) {
        super();
    }

    public ngOnInit() {
        super.ngOnInit();

        this.getProfessionalFields();
    }

    public ngOnDestroy() {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public stringsInit(): void {
        this.strings.add = this.getStr(langStr.common.add);
        this.strings.professionalField = this.getStr(langStr.students.professionalField);
        this.strings.enterPhdProgram = this.getStr(langStr.students.enterPhdProgram);
        this.strings.phdProgram = this.getStr(langStr.students.phdProgram);
    }

    public onSubmit(): void {
        this._phdProgramService
            .addPhdProgram(this.phdProgram)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(() => {
                this.phdProgramAdded.emit();
            });
    }

    private getProfessionalFields(): void {
        this._professionalFieldService.getProfessionalFields().subscribe((fields: IProfessionalField[]) => {
            this.professionalFieldOptions = fields;
        });
    }
}
