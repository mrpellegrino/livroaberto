import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(2)
  title!: string;

  @IsOptional()
  @IsString()
  author?: string;
}
