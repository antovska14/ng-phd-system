import { Component, Output, EventEmitter } from '@angular/core';
import { finalize, takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../../base/base.component';
import { langStr } from 'src/assets/translations';
import { ProfessionalFieldService } from 'src/app/services/professional-field.service';
import { Subject } from 'rxjs';
import { IProfessionalField } from 'src/app/interfaces';
import { ProfessionalField } from 'src/app/classes/student-details';
import { NgForm } from '@angular/forms';

@Component({
    templateUrl: './add-professional-field.component.html',
    selector: 'add-professional-field',
})
export class AddProfessionalFieldComponent extends BaseComponent {
    public professionalField: IProfessionalField = new ProfessionalField();

    private _professionalFieldForm: NgForm;
    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    @Output()
    public professionalFieldAdded: EventEmitter<void> = new EventEmitter<void>();

    constructor(private readonly _professionalFieldService: ProfessionalFieldService) {
        super();
    }

    public ngOnDestroy() {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public stringsInit(): void {
        this.strings.add = this.getStr(langStr.common.add);
        this.strings.enterProfessionalField = 'Въведете професионално направление';
        this.strings.professionalField = this.getStr(langStr.students.professionalField);
    }

    public onSubmit(form: NgForm): void {
        this._professionalFieldForm = form;
        this._professionalFieldService
            .addProfessionalField(this.professionalField)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(() => {
                this.professionalFieldAdded.emit();
                this.professionalField = new ProfessionalField();
                this._professionalFieldForm.reset();
            });
    }
}
