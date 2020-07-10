import { Component, Input, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

import { BaseComponent } from '../../../components/base/base.component';
import {
    IStudent,
    IProfessionalField,
    IPhdProgram,
    IUniversity,
    IFaculty,
    IDepartment,
    IFormOfEducation,
    IStudentDetailsFormConfig,
} from '../../../interfaces';
import { langStr } from '../../../../assets/translations';
import { FormOfEducationService } from '../../../services/form-of-education.service';
import { ProfessionalFieldService } from 'src/app/services/professional-field.service';
import { PhdProgramService } from 'src/app/services/phd-program.service';
import { UniversityService } from 'src/app/services/university.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
    selector: 'student-details',
    templateUrl: './student-details.component.html',
})
export class StudentDetailsComponent extends BaseComponent {
    @Input()
    public config: IStudentDetailsFormConfig;

    @Output()
    public configChange: EventEmitter<IStudentDetailsFormConfig> = new EventEmitter<IStudentDetailsFormConfig>();

    public formsOfEducationYearMap: Map<number, number[]> = new Map<number, number[]>();

    public formsOfEducationOptions: IFormOfEducation[];
    public professionalFieldOptions: IProfessionalField[];
    public phdProgramOptions: IPhdProgram[];
    public universityOptions: IUniversity[];
    public facultyOptions: IFaculty[];
    public departmentOptions: IDepartment[];

    public initial: IStudent;

    public get showForms(): boolean {
        return this._showForms;
    }
    public set showForms(value: boolean) {
        if (this._showForms === true) {
            this.getFormsOfEducation();
            this.getProfessionalFields();
            this.getUniversities();
            this.initPhdProgramOptions();
            this.initFacultyOptions();
            this.initDepartmentOptions();
        }

        this._showForms = value;
    }
    private _showForms: boolean = false;

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private readonly _formOfEducationService: FormOfEducationService,
        private readonly _professionalFieldService: ProfessionalFieldService,
        private readonly _phdProgramService: PhdProgramService,
        private readonly _universityService: UniversityService,
        private readonly _facultyService: FacultyService,
        private readonly _departmentService: DepartmentService,
        private readonly _location: Location
    ) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        if (this.config.addMode) {
            this.showForms = true;
        }
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public stringsInit(): void {
        this.strings.add = this.getStr(langStr.common.add);
        this.strings.chooseCurrentYear = this.getStr(langStr.students.chooseCurrentYear);
        this.strings.currentYear = this.getStr(langStr.students.currentYear);
        this.strings.chooseCurrentYear = this.getStr(langStr.students.chooseCurrentYear);
        this.strings.distance = this.getStr(langStr.students.distance);
        this.strings.email = this.getStr(langStr.login.email);
        this.strings.enterEmail = this.getStr(langStr.login.enterEmail);
        this.strings.enterFirstName = this.getStr(langStr.common.enterFirstName);
        this.strings.enterMiddleName = this.getStr(langStr.common.enterMiddleName);
        this.strings.enterLastName = this.getStr(langStr.common.enterLastName);
        this.strings.enterSpecialty = this.getStr(langStr.students.enterSpecialty);
        this.strings.enterFacultyCouncilDate = this.getStr(langStr.students.enterFacultyCouncilDate);
        this.strings.chooseFormOfEducation = this.getStr(langStr.students.chooseFormOfEducation);
        this.strings.facultyCouncilDate = this.getStr(langStr.students.facultyCouncilDate);
        this.strings.formOfEducation = this.getStr(langStr.students.formOfEducation);
        this.strings.firstName = this.getStr(langStr.common.firstName);
        this.strings.free = this.getStr(langStr.students.free);
        this.strings.fullTime = this.getStr(langStr.students.fullTime);
        this.strings.middleName = this.getStr(langStr.common.middleName);
        this.strings.lastName = this.getStr(langStr.common.lastName);
        this.strings.specialty = this.getStr(langStr.students.specialty);
        this.strings.back = this.getStr(langStr.common.back);
        this.strings.save = this.getStr(langStr.common.save);
        this.strings.edit = this.getStr(langStr.common.edit);
        this.strings.cancel = this.getStr(langStr.common.cancel);
        this.strings.professionalField = this.getStr(langStr.students.professionalField);
        this.strings.phdProgram = this.getStr(langStr.students.phdProgram);
        this.strings.startDate = 'Начална дата на докторантурата';
        this.strings.endDate = 'Крайна дата на докторантурата';
        this.strings.university = 'Университет';
        this.strings.faculty = 'Факултет';
        this.strings.department = 'Катедра';
        this.strings.enterDissertationTheme = 'Въведете тема на дисертация';
        this.strings.dissertationTheme = 'Тема на дисертация';
        this.strings.chooseUniversity = 'Изберете университет';
        this.strings.chooseFaculty = 'Изберете факултет';
        this.strings.chooseDepartment = 'Изберете катедра';
        this.strings.chooseProfessionalField = 'Изберете професионално направление';
        this.strings.choosePhdProgram = 'Изберете докторантска програма';
        this.strings.chooseCurrentYear = 'Изберете курс';
    }

    public onUniversityChange(): void {
        this.initFacultyOptions();
    }

    public onFacultyChange(): void {
        this.initDepartmentOptions();
    }

    public onProfessionalFieldChange(): void {
        this.initPhdProgramOptions();
    }

    public onCancelClick(): void {
        this.showForms = false;
        this.config.student = this.initial;
    }

    public onBackClick(): void {
        this._location.back();
    }

    public onEditClick(): void {
        this.initial = JSON.parse(JSON.stringify(this.config.student)) as IStudent;
        this.showForms = true;
    }

    public onSubmit(): void {
        if (this.config.editMode) {
            this.showForms = false;
        }

        this.configChange.emit(this.config);
        this.config.submitFunction();
    }

    private getFormsOfEducation(): void {
        this._formOfEducationService
            .getFormsOfEducation()
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((forms) => {
                this.formsOfEducationOptions = forms;
                this.initFormsOfEducationYearMap(forms);
            });
    }

    private initFormsOfEducationYearMap(formsOfEducation: IFormOfEducation[]): void {
        formsOfEducation.forEach((f) => {
            let yearsArray: number[] = [];
            for (let i = 1; i <= f.yearsCount; i++) {
                yearsArray.push(i);
            }

            this.formsOfEducationYearMap.set(f.id, yearsArray);
        });
    }

    private getProfessionalFields(): void {
        this._professionalFieldService.getProfessionalFields().subscribe((fields: IProfessionalField[]) => {
            this.professionalFieldOptions = fields;
        });
    }

    private getUniversities(): void {
        this._universityService.getUniversities().subscribe((universities) => {
            this.universityOptions = universities;
        });
    }

    private initPhdProgramOptions(): void {
        if (!this.config.student.professionalField || !this.config.student.professionalField.id) {
            this.phdProgramOptions = [];
            return;
        }

        this._phdProgramService.getPhdPrograms(this.config.student.professionalField.id).subscribe((programs: IPhdProgram[]) => {
            this.phdProgramOptions = programs;
        });
    }

    private initFacultyOptions(): void {
        if (!this.config.student.university || !this.config.student.university.id) {
            this.facultyOptions = [];
            return;
        }

        this._facultyService.getFaculties(this.config.student.university.id).subscribe((faculties: IFaculty[]) => {
            this.facultyOptions = faculties;
        });
    }

    private initDepartmentOptions(): void {
        if (!this.config.student.faculty || !this.config.student.faculty.id) {
            this.facultyOptions = [];
            return;
        }

        this._departmentService.getDepartments(this.config.student.faculty.id).subscribe((departments: IDepartment[]) => {
            this.departmentOptions = departments;
        });
    }
}
