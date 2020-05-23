import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestService } from 'src/app/services/rest.service';
import { BaseEndpointsEnum } from 'src/app/enums';
import { ILoginModel } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService extends RestService {
    public login(loginModel: ILoginModel): Observable<any> {
        return this.post('auth/login', loginModel, { baseEndPoint: BaseEndpointsEnum.PhDSystemApi }).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            })
        );
    }
}
