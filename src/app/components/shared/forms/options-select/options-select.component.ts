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
    public set value(value: any) {
        this._value = value;
        this.valueChange.emit(this._value);
    }

    public get value(): any {
        return this._value;
    }

    private _value: string;

    public obj: any = 'dasda';

    public getLabel(option): any {
        return this.propertyLabel ? option[this.propertyLabel] : option;
    }

    public getValue(option): any {
        return this.propertyValue ? option[this.propertyValue] : option;
    }
}
