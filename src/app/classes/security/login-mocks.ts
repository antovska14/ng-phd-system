import { AppUserAuth } from './app-user-auth';

export const LOGIN_MOCKS: AppUserAuth[] = [
    {
        userName: 'antovska14',
        bearerToken: 'dsadasda',
        isAuthenticated: true,
        canAccessStudents: true,
        canAccessSupervisors: true,
        canAddStudent: true,
        canAddSupervisor: true,
        canDeleteStudent: true,
        canDeleteSupervisor: true,
    },
    {
        userName: 'melita1993',
        bearerToken: '3424dsfds42',
        isAuthenticated: true,
        canAccessStudents: true,
        canAccessSupervisors: true,
        canAddStudent: true,
        canAddSupervisor: true,
        canDeleteStudent: true,
        canDeleteSupervisor: true,
    },
];