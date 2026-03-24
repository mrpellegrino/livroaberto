import { Body, Controller, Get, Post } from '@nestjs/common';
import { Permissions } from '../../../../common/authorization/permissions.decorator';
import { CreateSchoolDto } from '../../dtos/create-school.dto';
import { SchoolResponseDto } from '../../dtos/school-response.dto';
import { CreateSchoolUseCase } from '../../use-cases/create-school.usecase';
import { ListSchoolsUseCase } from '../../use-cases/list-schools.usecase';

@Controller('schools')
export class SchoolsController {
  constructor(
    private readonly createSchoolUseCase: CreateSchoolUseCase,
    private readonly listSchoolsUseCase: ListSchoolsUseCase,
  ) {}

  @Post()
  @Permissions({ resource: 'schools', action: 'create' })
  create(@Body() body: CreateSchoolDto): Promise<SchoolResponseDto> {
    return this.createSchoolUseCase.execute(body);
  }

  @Get()
  @Permissions({ resource: 'schools', action: 'read' })
  list(): Promise<SchoolResponseDto[]> {
    return this.listSchoolsUseCase.execute();
  }
}
