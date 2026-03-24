import { Module } from '@nestjs/common';
import { SchoolsController } from './presentation/controllers/schools.controller';
import { SchoolRepository } from './repositories/school.repository';
import { CreateSchoolUseCase } from './use-cases/create-school.usecase';
import { ListSchoolsUseCase } from './use-cases/list-schools.usecase';

@Module({
  controllers: [SchoolsController],
  providers: [SchoolRepository, CreateSchoolUseCase, ListSchoolsUseCase],
})
export class SchoolsModule {}
