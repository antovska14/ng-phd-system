import { Component, OnInit, OnDestroy } from '@angular/core';

import { Base, ServiceInjector } from '../../classes';

@Component({ template: `` })
export class BaseComponent extends Base implements OnInit, OnDestroy {
    constructor() {
        super(ServiceInjector.injector);
    }

    public ngOnInit(): void {
        this.stringsInit();
    }

    public ngOnDestroy(): void {}
}
