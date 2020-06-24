import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BaseFormComponent } from '../base-form.class';

@Component({ templateUrl: './text-input.component.html', selector: 'text-input' })
export class TextInputComponent extends BaseFormComponent {
    @Output()
    public textChange: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    public set text(value: string) {
        this._text = value;
        this.textChange.emit(this._text);
    }

    public get text(): string {
        return this._text;
    }

    private _text: string;
}
