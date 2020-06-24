import { Input, Component } from '@angular/core';

@Component({
    template: ``,
})
export class BaseFormComponent {
    @Input()
    public id: string;
    @Input()
    public name: string;
    @Input()
    public placeholder: string;
    @Input()
    public isRequired: boolean;
    @Input()
    public label: string;
    @Input()
    public editMode: boolean;
}
