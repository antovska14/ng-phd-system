import { Input, Output, EventEmitter, Component } from '@angular/core';
import { formatDate } from '@angular/common';

import { DateFormat } from 'src/app/enums';
import { BaseFormComponent } from '../base-form.class';

@Component({
    templateUrl: './date-picker.component.html',
    selector: 'date-picker',
})
export class DatePickerComponent extends BaseFormComponent {
    @Output()
    public dateChange: EventEmitter<Date> = new EventEmitter<Date>();
    @Input()
    public set date(value: Date) {
        this._date = value;
        this.dateChange.emit(this._date);
    }

    public get date(): Date {
        return this._date;
    }

    private _date: Date;

    public set dateString(value: string) {
        this._dateString = value;
        this.date = new Date(value);
    }

    public get dateString(): string {
        this._dateString = this.formatDate(this.date);
        return this._dateString;
    }

    private _dateString: string;

    private formatDate(date: Date): string {
        return formatDate(date, DateFormat.standardDateFormat, 'en');
    }
}
