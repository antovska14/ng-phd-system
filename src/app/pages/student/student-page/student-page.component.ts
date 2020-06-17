import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseComponent } from '../../../components/base/base.component';
import { RoutePath } from 'src/app/enums';

@Component({
    selector: 'student-page',
    templateUrl: './student-page.component.html',
})
export class StudentPageComponent extends BaseComponent {
    constructor(private readonly _router: Router, private readonly _route: ActivatedRoute) {
        super();
    }

    public onAddStudentClick(): void {
        this._router.navigate([RoutePath.add], { relativeTo: this._route });
    }
}
