import { Injector } from '@angular/core';

import { ITranslationLabel } from '../interfaces';
import { LanguageService } from '../services/language.service';
import { SharedDataService } from '../services/shared-data.service';

export abstract class Base {
    private _strings: any = {};
    private _languageService: LanguageService;

    public shared: SharedDataService;

    public get strings(): any {
        return this._strings;
    }

    constructor(private _injector: Injector) {
        this._languageService = this._injector.get(LanguageService);
        this.shared = this._injector.get(SharedDataService);
    }

    public getStr(label: ITranslationLabel): string {
        return this._languageService.getString(label);
    }

    public stringsInit(): void {}
}
