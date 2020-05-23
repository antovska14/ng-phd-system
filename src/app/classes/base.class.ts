import { Injector } from '@angular/core';

import { LanguageService } from 'src/app/services/language.service';
import { ITranslationLabel } from 'src/app/interfaces';

export abstract class Base {
    private _strings: any = {};

    private _languageService: LanguageService;

    public get strings(): any {
        return this._strings;
    }

    constructor(private _injector: Injector) {
        this._languageService = this._injector.get(LanguageService);
    }

    public getStr(label: ITranslationLabel): string {
        return this._languageService.getString(label);
    }

    public stringsInit(): void {}
}
