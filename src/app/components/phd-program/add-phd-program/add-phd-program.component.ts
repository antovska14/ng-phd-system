import { Component, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { BaseComponent } from '../../base/base.component';
import { langStr } from 'src/assets/translations';
import { IPhdProgram, IProfessionalField } from 'src/app/interfaces';
import { PhdProgram } from 'src/app/classes/student-details';
import { PhdProgramService } from 'src/app/services/phd-program.service';
import { ProfessionalFieldService } from 'src/app/services/professional-field.service';

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
        this.strings.enterPhdProgram = 'Въведете докторантска програма';
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
