import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DatePickerComponent } from '../components/shared/forms/date-picker/date-picker.component';
import { BaseFormComponent } from '../components/shared/forms/base-form.class';
import { TextInputComponent } from '../components/shared/forms/text-input/text-input.component';

const IMPORTS = [CommonModule, FormsModule];

const PAGES = [];

const COMPONENTS = [BaseFormComponent, DatePickerComponent, TextInputComponent];

@NgModule({
    imports: [IMPORTS],
    exports: [...PAGES, ...COMPONENTS],
    declarations: [...PAGES, ...COMPONENTS],
})
export class SharedModule {}
