import { Injectable } from '@angular/core';

import { RestService } from './rest.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ROLES } from '../shared/const';
import { IUserRoleConfig } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class RoleConfigService extends RestService {
    public getStudentIdByUserId(userId: number): Observable<IUserRoleConfig> {
        return this.get(`students/id/${userId}`, {}).pipe(
            map((res: HttpResponse<{ id: number }>) => {
                const result: IUserRoleConfig = { id: res.body.id, role: ROLES.STUDENT, dashboard: `students/${res.body.id}` };
                return result;
            })
        );
    }

    public getTeacherIdByUserId(userId: number): Observable<IUserRoleConfig> {
        return this.get(`teachers/id/${userId}`, {}).pipe(
            map((res: HttpResponse<{ id: number }>) => {
                const result: IUserRoleConfig = { id: res.body.id, role: ROLES.TEACHER, dashboard: 'students' };

                return result;
            })
        );
    }

    public getRoleConfigFn(role: string, userId: number): Observable<IUserRoleConfig> {
        switch (role) {
            case ROLES.STUDENT:
                return this.getStudentIdByUserId(userId);
            case ROLES.TEACHER:
                return this.getTeacherIdByUserId(userId);
            default:
                const result: IUserRoleConfig = {
                    role: ROLES.ADMIN,
                    dashboard: 'students',
                };
                return of(result);
        }
    }
}
