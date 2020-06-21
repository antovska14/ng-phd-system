import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ITeacher } from 'src/app/interfaces';
import { TeacherService } from 'src/app/services/teacher.service';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'select-teachers',
    templateUrl: './select-teachers.component.html',
})
export class SelectTeachersComponent extends BaseComponent {
    @Input()
    public selectedTeachers: ITeacher[] = [];

    @Output()
    public selectedTeachersChange: EventEmitter<ITeacher[]> = new EventEmitter();

    @Input()
    public isInEditMode: boolean;

    public allTeachers: ITeacher[];

    public set selectedTeacher(value) {
        const selected = this.allTeachers.find((t) => (t.id = value));
        selected.id = +selected.id;
        this.selectedTeachers.push(selected);
        this.selectedTeachers.forEach((st) => {
            this.allTeachers = this.allTeachers.filter((t) => t != st);
        });
    }

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();
    constructor(private readonly _teacherService: TeacherService) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.getTeachers();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public getTeachers(): void {
        this._teacherService
            .getTeachers()
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((teachers: ITeacher[]) => {
                this.allTeachers = teachers;
                this.selectedTeachers.forEach((st) => {
                    this.allTeachers = this.allTeachers.filter((t) => t.id !== st.id);
                });
            });
    }

    public removeSelection(teacher: ITeacher): void {
        this.allTeachers.push(teacher);
        this.selectedTeachers = this.selectedTeachers.filter((st) => st.id != teacher.id);
        this.selectedTeachersChange.emit(this.selectedTeachers);
    }
}