import { Injectable } from '@angular/core';

import { LanguageLocaleEnum } from '../enums';
import { ITranslationLabel } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    private _selectedLanguage = LanguageLocaleEnum.bulgarian;
    private readonly _defaultLanguage = LanguageLocaleEnum.english;

    public getString(label: ITranslationLabel): string {
        let selectedLanguageText: string = '';
        if (label[this._selectedLanguage]) {
            selectedLanguageText = label[this._selectedLanguage];
        } else {
            selectedLanguageText = label[this._defaultLanguage];
        }

        return selectedLanguageText;
    }
}
