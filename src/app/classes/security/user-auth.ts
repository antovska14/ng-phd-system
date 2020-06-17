export class UserAuth {
    email: string = '';
    bearerToken: string = '';
    isAuthenticated: boolean = false;
    role: string = '';
    exp: number;
}
