import { Role } from '../../../common/auth/roles.enum';
export declare class UserResponseDto {
    id: string;
    name: string;
    email: string;
    role: Role;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
