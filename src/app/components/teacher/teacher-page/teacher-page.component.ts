import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseComponent } from '../../base/base.component';
import { RoutePath } from 'src/app/enums';
import { langStr } from 'src/assets/translations';

@Component({
    templateUrl: './teacher-page.component.html',
})
export class TeacherPageComponent extends BaseComponent {
    constructor(private readonly _router: Router, private readonly _route: ActivatedRoute) {
        super();
    }

    public stringsInit(): void {
        this.strings.addSupervisor = this.getStr(langStr.teachers.addSupervisor);
    }

    public onAddTeacherClick(): void {
        this._router.navigate([RoutePath.add], { relativeTo: this._route });
    }
}
