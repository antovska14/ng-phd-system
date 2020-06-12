export class UserAuth {
    userName: string = '';
    bearerToken: string = '';

    isAuthenticated: boolean = false;

    canAccessStudents: boolean = false;
    canAccessSupervisors: boolean = false;

    canAddStudent: boolean = false;
    canAddSupervisor: boolean = false;

    canDeleteStudent: boolean = false;
    canDeleteSupervisor: boolean = false;
}
