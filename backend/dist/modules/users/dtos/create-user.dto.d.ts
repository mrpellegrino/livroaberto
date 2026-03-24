import { Role } from '../../../common/auth/roles.enum';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: Role;
}
