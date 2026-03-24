import { IsOptional, IsString, MinLength } from 'class-validator';

export class StartEvaluationSessionDto {
  @IsString()
  activityId!: string;

  @IsOptional()
  @IsString()
  studentId?: string;

  @IsOptional()
  @IsString()
  bookId?: string;
}

export class SendEvaluationMessageDto {
  @IsString()
  @MinLength(1)
  content!: string;
}
