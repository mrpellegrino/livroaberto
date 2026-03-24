import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from '../dtos/create-school.dto';
import { SchoolResponseDto } from '../dtos/school-response.dto';
import { SchoolRepository } from '../repositories/school.repository';

@Injectable()
export class CreateSchoolUseCase {
  constructor(private readonly schoolRepository: SchoolRepository) {}

  execute(input: CreateSchoolDto): Promise<SchoolResponseDto> {
    return this.schoolRepository.create(input.name);
  }
}
