export class UserAuth {
    id: number;
    email: string = '';
    bearerToken: string = '';
    isAuthenticated: boolean = false;
    role: string = '';
    passwordSet: boolean = false;
    exp: number;
}
