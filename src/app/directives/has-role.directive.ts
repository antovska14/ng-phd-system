import { Directive, Input, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';
import { ServiceInjector } from '../classes';

@Directive({
    selector: '[hasRole]',
})
export class HasRoleDirective implements OnInit {
    shared: SharedDataService = null;

    // the role the user must have
    @Input() hasRole: string;

    isVisible = false;

    /**
     * @param {ViewContainerRef} viewContainerRef
     * 	-- the location where we need to render the templateRef
     * @param {TemplateRef<any>} templateRef
     *   -- the templateRef to be potentially rendered
     */
    constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>) {
        this.shared = ServiceInjector.injector.get(SharedDataService);
    }

    public ngOnInit(): void {
        const role = this.shared.currentUser.role;

        const allowedRoles = this.hasRole.split(',');

        if (allowedRoles.find((x) => x === role)) {
            if (!this.isVisible) {
                this.isVisible = true;
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        } else {
            this.isVisible = false;
            this.viewContainerRef.clear();
        }
    }
}
