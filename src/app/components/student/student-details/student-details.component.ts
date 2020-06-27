import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

import { BaseComponent } from '../../../components/base/base.component';
import { StudentService } from '../../../services/student.service';
import { IStudent, IProfessionalField, IPhdProgram, IUniversity, IFaculty, IDepartment } from '../../../interfaces';
import { langStr } from '../../../../assets/translations';
import { FormOfEducationService } from '../../../services/form-of-education.service';
import { IFormOfEducation } from '../../../interfaces/student-details/form-of-education.interface';
import { ProfessionalFieldService } from 'src/app/services/professional-field.service';
import { PhdProgramService } from 'src/app/services/phd-program.service';
import { UniversityService } from 'src/app/services/university.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
    templateUrl: './student-details.component.html',
})
export class StudentDetailPageComponent extends BaseComponent {
    public initialStudent: IStudent;
    public student: IStudent;

    public formsOfEducationYearMap: Map<number, number[]> = new Map<number, number[]>();
    public formsOfEducationOptions: IFormOfEducation[];
    public professionalFieldOptions: IProfessionalField[];
    public phdProgramOptions: IPhdProgram[];
    public universityOptions: IUniversity[];
    public facultyOptions: IFaculty[];
    public departmentOptions: IDepartment[];

    public editMode: boolean = false;

    public showDetails: boolean = true;
    public showFiles: boolean = false;
    public showExams: boolean = false;

    public set professionalField(value) {
        this._professionalField = value;
        this.student.phdProgram.professionalField = value;
        this.initPhdProgramOptions(value);
    }

    public get professionalField(): IProfessionalField {
        this._professionalField = this.student.phdProgram.professionalField;
        return this._professionalField;
    }

    private _professionalField: IProfessionalField;

    public set university(value) {
        this._university = value;
        this.student.department.faculty.university = value;
        this.initFacultyOptions(value);
    }

    public get university(): IUniversity {
        this._university = this.student.department.faculty.university;
        return this._university;
    }

    private _university: IUniversity;

    public set faculty(value) {
        this._faculty = value;
        this.student.department.faculty = value;
        this.initDepartmentOptions(value);
    }

    public get faculty(): IFaculty {
        this._faculty = this.student.department.faculty;
        return this._faculty;
    }

    private _faculty: IFaculty;

    private readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private readonly _studentService: StudentService,
        private readonly _route: ActivatedRoute,
        private readonly _location: Location,
        private readonly _formOfEducationService: FormOfEducationService,
        private readonly _professionalFieldService: ProfessionalFieldService,
        private readonly _phdProgramService: PhdProgramService,
        private readonly _universityService: UniversityService,
        private readonly _facultyService: FacultyService,
        private readonly _departmentService: DepartmentService
    ) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.getStudent();
        this.getFormsOfEducation();
        this.getProfessionalFields();
        this.getUniversities();
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
        this.strings.enterFormOfEducation = this.getStr(langStr.students.enterFormOfEducation);
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
        this.strings.phdStudentDetails = this.getStr(langStr.students.phdStudentDetails);
        this.strings.professionalField = this.getStr(langStr.students.professionalField);
        this.strings.phdProgram = this.getStr(langStr.students.phdProgram);
        this.strings.startDate = 'Начална дата на докторантурата';
        this.strings.endDate = 'Крайна дата на докторантурата';
        this.strings.university = 'Университет';
        this.strings.faculty = 'Факултет';
        this.strings.department = 'Катедра';
        this.strings.files = 'Файлови';
        this.strings.exams = 'Изпити';
    }

    public onSubmit(): void {
        this.student.currentYear = +this.student.currentYear;
        this._studentService
            .updateStudent(this.student)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(() => {
                this.editMode = false;
                this.initialStudent = JSON.parse(JSON.stringify(this.student)) as IStudent;
            });
    }

    public onCancelClick(): void {
        this.editMode = false;
        this.student = this.initialStudent;
    }

    public onBackClick(): void {
        this._location.back();
    }

    public onEditClick(): void {
        this.editMode = true;
    }

    private getStudent(): void {
        this._route.paramMap.subscribe((paramMap) => {
            const studentId = +paramMap.get('id');
            this._studentService
                .getStudent(studentId)
                .pipe(takeUntil(this._ngUnsubscribe))
                .subscribe((student) => {
                    this.student = student;
                    this.initialStudent = JSON.parse(JSON.stringify(student)) as IStudent;
                });
        });
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

    private initPhdProgramOptions(professionalField: IProfessionalField): void {
        if (!professionalField || !professionalField.id) {
            this.phdProgramOptions = [];
            return;
        }

        this._phdProgramService.getPhdPrograms(professionalField.id).subscribe((programs: IPhdProgram[]) => {
            this.phdProgramOptions = programs;
        });
    }

    private initFacultyOptions(university: IUniversity): void {
        if (!university || !university.id) {
            this.facultyOptions = [];
            return;
        }

        this._facultyService.getFaculties(university.id).subscribe((faculties: IFaculty[]) => {
            this.facultyOptions = faculties;
        });
    }

    private initDepartmentOptions(faculty: IFaculty): void {
        if (!faculty || !faculty.id) {
            this.facultyOptions = [];
            return;
        }

        this._departmentService.getDepartments(faculty.id).subscribe((departments: IDepartment[]) => {
            this.departmentOptions = departments;
        });
    }
}
