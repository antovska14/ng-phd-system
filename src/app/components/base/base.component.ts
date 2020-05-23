import { Component, OnInit } from '@angular/core';

import { Base, ServiceInjector } from 'src/app/classes';

@Component({ template: `` })
export class BaseComponent extends Base implements OnInit {
    constructor() {
        super(ServiceInjector.injector);
    }

    public ngOnInit(): void {
        this.stringsInit();
    }
}
