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
    public placeholder: string = '';
    @Input()
    public isRequired: boolean = false;
    @Input()
    public label: string;
    @Input('showForms')
    public showForm: boolean = true;
    @Input()
    public disabled: boolean = false;
}
