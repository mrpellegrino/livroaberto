import { Role } from '../../../common/auth/roles.enum';
export declare class AuthResponseDto {
    accessToken: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: Role;
    };
}
