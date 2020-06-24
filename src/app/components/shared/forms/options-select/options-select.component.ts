import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BaseFormComponent } from '../base-form.class';

@Component({ templateUrl: './options-select.component.html', selector: 'options-select' })
export class OptionsSelectComponent extends BaseFormComponent {
    @Input()
    public options: any[];
    @Input()
    public propertyValue: any;
    @Input()
    public propertyLabel: any;
    @Output()
    public valueChange: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    public set value(value: string) {
        this._value = value;
        this.valueChange.emit(this._value);
    }

    public get value(): string {
        return this._value;
    }

    private _value: string;

    public getLabel(option): any {
        this.propertyLabel ? option[this.propertyLabel] : option;
    }

    public getValue(option): any {
        this.propertyValue ? option[this.propertyValue] : option;
    }
}
