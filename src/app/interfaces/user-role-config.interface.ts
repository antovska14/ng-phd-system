export interface IUserRoleConfig {
    id?: number; // studentId or teacherId, empty for admin
    role: string;
    dashboard: string;
}
