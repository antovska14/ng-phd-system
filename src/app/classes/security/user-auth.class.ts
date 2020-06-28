export class UserAuth {
    id: number;
    email: string = '';
    bearerToken: string = '';
    isAuthenticated: boolean = false;
    role: string = '';
    exp: number;
}
