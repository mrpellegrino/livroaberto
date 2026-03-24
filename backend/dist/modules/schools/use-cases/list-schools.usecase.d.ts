import { SchoolResponseDto } from '../dtos/school-response.dto';
import { SchoolRepository } from '../repositories/school.repository';
export declare class ListSchoolsUseCase {
    private readonly schoolRepository;
    constructor(schoolRepository: SchoolRepository);
    execute(): Promise<SchoolResponseDto[]>;
}
