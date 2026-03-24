import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { ActivityMode } from '@prisma/client';

export class CreateActivityDto {
  @IsString()
  classroomId!: string;

  @IsString()
  @MinLength(2)
  title!: string;

  @IsEnum(ActivityMode)
  mode!: ActivityMode;

  @IsDateString()
  examStartAt!: string;

  @IsDateString()
  examEndAt!: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  bookIds!: string[];

  @IsInt()
  @Min(0)
  @Max(100)
  rubricFactualWeight!: number;

  @IsInt()
  @Min(0)
  @Max(100)
  rubricCharacterWeight!: number;

  @IsInt()
  @Min(0)
  @Max(100)
  rubricInterpretWeight!: number;

  @IsInt()
  @Min(0)
  @Max(100)
  rubricConsistencyWeight!: number;

  @IsInt()
  @Min(0)
  @Max(100)
  rubricEvidenceWeight!: number;
}

export class AssignBookToStudentDto {
  @IsString()
  studentId!: string;

  @IsString()
  bookId!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  cycleNo?: number;
}
