import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseComponent } from '../../../components/base/base.component';
import { RoutePath } from 'src/app/enums';
import { langStr } from 'src/assets/translations';

@Component({
    selector: 'student-page',
    templateUrl: './student-page.component.html',
})
export class StudentPageComponent extends BaseComponent {
    constructor(private readonly _router: Router, private readonly _route: ActivatedRoute) {
        super();
    }

    public stringsInit(): void {
        this.strings.addPhdStudent = this.getStr(langStr.students.addPhdStudent);
    }

    public onAddStudentClick(): void {
        this._router.navigate([RoutePath.create], { relativeTo: this._route });
    }
}
