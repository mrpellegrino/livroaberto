import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class AssignResponsibleTeacherDto {
  @IsString()
  teacherUserId!: string;

  @IsOptional()
  @IsBoolean()
  isResponsible?: boolean;
}
