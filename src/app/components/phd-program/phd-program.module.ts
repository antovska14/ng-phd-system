import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { PhdProgramMainPageComponent } from './phd-program-main-page/phd-program-main-page.component';
import { AddPhdProgramComponent } from './add-phd-program/add-phd-program.component';
import { PhdProgramTableComponent } from './phd-program-table/phd-program-table.component';

const COMPONENTS = [PhdProgramTableComponent, AddPhdProgramComponent];
const IMPORTS = [CommonModule, FormsModule, SharedModule];
const PAGES = [PhdProgramMainPageComponent];

@NgModule({
    imports: [...IMPORTS],
    exports: [...PAGES, ...COMPONENTS],
    declarations: [...PAGES, ...COMPONENTS],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PhdProgramModule {}
