import { CreateSchoolDto } from '../dtos/create-school.dto';
import { SchoolResponseDto } from '../dtos/school-response.dto';
import { SchoolRepository } from '../repositories/school.repository';
export declare class CreateSchoolUseCase {
    private readonly schoolRepository;
    constructor(schoolRepository: SchoolRepository);
    execute(input: CreateSchoolDto): Promise<SchoolResponseDto>;
}
