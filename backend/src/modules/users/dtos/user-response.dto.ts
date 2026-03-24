import { Role } from '../../../common/auth/roles.enum';

export class UserResponseDto {
  id!: string;
  name!: string;
  email!: string;
  role!: Role;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
