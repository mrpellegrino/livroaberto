import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateClassroomDto {
  @IsString()
  schoolId!: string;

  @IsString()
  @MinLength(2)
  name!: string;

  @IsOptional()
  @IsString()
  gradeYear?: string;
}
