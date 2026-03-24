import { CreateSchoolDto } from '../../dtos/create-school.dto';
import { SchoolResponseDto } from '../../dtos/school-response.dto';
import { CreateSchoolUseCase } from '../../use-cases/create-school.usecase';
import { ListSchoolsUseCase } from '../../use-cases/list-schools.usecase';
export declare class SchoolsController {
    private readonly createSchoolUseCase;
    private readonly listSchoolsUseCase;
    constructor(createSchoolUseCase: CreateSchoolUseCase, listSchoolsUseCase: ListSchoolsUseCase);
    create(body: CreateSchoolDto): Promise<SchoolResponseDto>;
    list(): Promise<SchoolResponseDto[]>;
}
