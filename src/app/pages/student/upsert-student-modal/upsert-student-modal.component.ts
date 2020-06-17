import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
    selector: 'upsert-student-modal',
    templateUrl: './upsert-student-modal.component.html',
})
export class UpsertStudentModalComponent extends BaseComponent {
    public onSubmit(): void {}
}
