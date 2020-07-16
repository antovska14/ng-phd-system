import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { BaseComponent } from '../../base/base.component';
import { ExamService } from 'src/app/services/exam.service';
import { IExamYearDetails, IExam } from 'src/app/interfaces';
import { Exam } from 'src/app/classes/exam.class';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    templateUrl: './exams.component.html',
    selector: 'exams',
})
export class ExamsComponent extends BaseComponent {
    @Input()
    public studentId: number;

    public examGroups: IExamYearDetails[];
    public yearSections: number[];
    public exam: IExam = new Exam();

    @Input()
    public set currentYear(value) {
        this._currentYear = value;
        this.initYearExamParagraphs();
    }

    public get currentYear(): number {
        return this._currentYear;
    }

    private _currentYear: number;
    private _examsForm: NgForm;

    constructor(private readonly _examService: ExamService, private readonly _notificationService: NotificationService) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.getExams();
    }

    public stringsInit(): void {
        this.strings.year = 'Курс';
        this.strings.exams = 'Изпити';
        this.strings.add = 'Добави';
        this.strings.requiredField = 'Полето е задължително';
    }

    public addExam(form: NgForm): void {
        this._examsForm = form;
        this.exam.studentId = this.studentId;
        this._examService.addExam(this.exam).subscribe(() => {
            this._notificationService.success(`Изпитът е добавен!`);
            this.getExams();
            this.exam = new Exam();
            this._examsForm.reset();
        });
    }

    public getExamString(exam: IExam): string {
        return `${exam.name}, ${exam.gradeType} ${exam.grade}`;
    }

    private getExams(): void {
        this._examService.getExams(this.studentId).subscribe((exams: IExamYearDetails[]) => {
            this.examGroups = exams;
        });
    }

    private initYearExamParagraphs(): void {
        this.yearSections = [];
        for (let i = 1; i <= this.currentYear; i += 1) {
            this.yearSections.push(i);
        }
    }

    public getYearExams(year: number): IExam[] {
        if (!this.examGroups) {
            return;
        }

        return this.examGroups.filter((x) => x.year === year).map((x) => x.exams)[0];
    }

    public removeExam(examId: number): void {
        this._examService
            .deleteExam(examId)
            .pipe(
                finalize(() => {
                    this.getExams();
                })
            )
            .subscribe();
    }
}
