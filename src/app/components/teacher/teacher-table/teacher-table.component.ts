import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BaseComponent } from '../../base/base.component';
import { ITeacher } from 'src/app/interfaces';
import { langStr } from 'src/assets/translations';

@Component({
    selector: 'teacher-table',
    templateUrl: './teacher-table.component.html',
})
export class TeacherTableComponent extends BaseComponent {
    @Input()
    public teachers: ITeacher[];

    @Output()
    public teacherDeleted: EventEmitter<number> = new EventEmitter<number>();

    public stringsInit(): void {
        this.strings.delete = this.getStr(langStr.common.delete);
        this.strings.firstName = this.getStr(langStr.common.firstName);
        this.strings.lastName = this.getStr(langStr.common.lastName);
        this.strings.viewEdit = this.getStr(langStr.common.viewEdit);
        this.strings.degree = this.getStr(langStr.common.degree);
        this.strings.title = this.getStr(langStr.common.title);
    }

    public onDeleteClick(teacherId: number): void {
        this.teacherDeleted.emit(teacherId);
    }
}
