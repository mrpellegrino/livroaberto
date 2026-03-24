import { Injectable } from '@nestjs/common';
import { SchoolResponseDto } from '../dtos/school-response.dto';
import { SchoolRepository } from '../repositories/school.repository';

@Injectable()
export class ListSchoolsUseCase {
  constructor(private readonly schoolRepository: SchoolRepository) {}

  execute(): Promise<SchoolResponseDto[]> {
    return this.schoolRepository.list();
  }
}
