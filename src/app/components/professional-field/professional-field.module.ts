import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfessionalFieldMainPageComponent } from './professional-field-main-page/professional-field-main-page.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfessionalFieldTableComponent } from './professional-field-table/professional-field-table.component';
import { AddProfessionalFieldComponent } from './add-professional-field/add-professional-field.component';

const COMPONENTS = [ProfessionalFieldTableComponent, AddProfessionalFieldComponent];
const IMPORTS = [CommonModule, FormsModule, SharedModule];
const PAGES = [ProfessionalFieldMainPageComponent];

@NgModule({
    imports: [...IMPORTS],
    exports: [...PAGES, ...COMPONENTS],
    declarations: [...PAGES, ...COMPONENTS],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfessionalFieldModule {}
