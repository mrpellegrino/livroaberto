import { IsString } from 'class-validator';

export class AddStudentToClassroomDto {
  @IsString()
  studentUserId!: string;
}
