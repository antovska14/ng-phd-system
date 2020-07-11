import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { DatePickerComponent } from '../components/shared/forms/date-picker/date-picker.component';
import { BaseFormComponent } from '../components/shared/forms/base-form.class';
import { TextInputComponent } from '../components/shared/forms/text-input/text-input.component';
import { DirectivesModule } from '../directives/directives.module';

const IMPORTS = [CommonModule, FormsModule, DirectivesModule, BrowserAnimationsModule, ToastrModule.forRoot()];

const PAGES = [];

const COMPONENTS = [BaseFormComponent, DatePickerComponent, TextInputComponent];

const DIRECTIVES = [DirectivesModule];

@NgModule({
    imports: [IMPORTS],
    exports: [...PAGES, ...COMPONENTS, ...DIRECTIVES],
    declarations: [...PAGES, ...COMPONENTS],
})
export class SharedModule {}
