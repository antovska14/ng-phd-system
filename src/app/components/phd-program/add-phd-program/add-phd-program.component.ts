import { Component, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

import { ProfessionalFieldService } from '../../../services/professional-field.service';
import { PhdProgramService } from '../../../services/phd-program.service';
import { IPhdProgram, IProfessionalField } from '../../../interfaces';
import { PhdProgram } from '../../../classes/student-details';
import { BaseComponent } from '../../base/base.component';
import { langStr } from '../../../../assets/translations';
import { NotificationService } from '../../../services/notification.service';

@Component({
    templateUrl: './add-phd-program.component.html',
    selector: 'add-phd-program',
})
export class AddPhdProgramComponent extends BaseComponent {
    public phdProgram: IPhdProgram = new PhdProgram();
    public professionalFieldOptions: IProfessionalField[] = [];

    private _phdProgramForm: NgForm;
    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    @Output()
    public phdProgramAdded: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private readonly _phdProgramService: PhdProgramService,
        private readonly _professionalFieldService: ProfessionalFieldService,
        private readonly _notificationService: NotificationService
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
        this.strings.chooseProfessionalField = 'Изберете професионално направление';
        this.strings.requiredField = 'Полето е задължително';
    }

    public onSubmit(form: NgForm): void {
        this._phdProgramForm = form;
        this._phdProgramService
            .addPhdProgram(this.phdProgram)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(
                () => {
                    this.phdProgramAdded.emit();
                    this._notificationService.success(`Докторантската програма с име "${this.phdProgram.name}" е добавена!`);
                    this.phdProgram = new PhdProgram();
                    this._phdProgramForm.reset();
                },
                (error: HttpErrorResponse) => {
                    if (error.status === 409) {
                        this._notificationService.error(
                            `Професионално докторантска програма с избраното професионално направление и име на програма "${this.phdProgram.name}" вече съществува`
                        );
                    }
                }
            );
    }

    private getProfessionalFields(): void {
        this._professionalFieldService.getProfessionalFields().subscribe((fields: IProfessionalField[]) => {
            this.professionalFieldOptions = fields;
        });
    }
}
