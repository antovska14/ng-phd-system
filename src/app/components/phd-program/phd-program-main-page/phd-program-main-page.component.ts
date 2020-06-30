import { finalize, takeUntil } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { BaseComponent } from '../../base/base.component';
import { IPhdProgram } from 'src/app/interfaces';
import { PhdProgramService } from 'src/app/services/phd-program.service';

@Component({
    templateUrl: './phd-program-main-page.component.html',
})
export class PhdProgramMainPageComponent extends BaseComponent {
    public isLoading: boolean = false;
    public phdPrograms: IPhdProgram[];

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private readonly _phdProgramService: PhdProgramService) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.getPhdPrograms();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public stringsInit(): void {
        this.strings.thereAreNoPhdPrograms = 'Не съществуват докторантски програми';
    }

    public onAdd(): void {
        this.getPhdPrograms();
    }

    private getPhdPrograms(): void {
        this.isLoading = true;
        this._phdProgramService
            .getPhdPrograms()
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                }),
                takeUntil(this._ngUnsubscribe)
            )
            .subscribe((phdPrograms: IPhdProgram[]) => {
                this.phdPrograms = phdPrograms;
            });
    }
}
