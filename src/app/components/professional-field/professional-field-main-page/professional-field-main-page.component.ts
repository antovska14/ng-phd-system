import { finalize, takeUntil } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { BaseComponent } from '../../base/base.component';
import { IProfessionalField } from 'src/app/interfaces';
import { ProfessionalFieldService } from 'src/app/services/professional-field.service';
import { langStr } from 'src/assets/translations';

@Component({
    templateUrl: './professional-field-main-page.component.html',
})
export class ProfessionalFieldMainPageComponent extends BaseComponent {
    public isLoading: boolean = false;
    public professionalFields: IProfessionalField[];

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private readonly _professionalFieldService: ProfessionalFieldService) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.getProfessionalFields();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public stringsInit(): void {
        this.strings.thereAreNoProfessionalFields = 'Не съществуват професионални направления';
    }

    public onAdd(): void {
        this.getProfessionalFields();
    }

    private getProfessionalFields(): void {
        this.isLoading = true;
        this._professionalFieldService
            .getProfessionalFields()
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                }),
                takeUntil(this._ngUnsubscribe)
            )
            .subscribe((professionalFields: IProfessionalField[]) => {
                this.professionalFields = professionalFields;
            });
    }
}
