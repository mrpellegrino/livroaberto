import { Module } from '@nestjs/common';
import { ActivitiesController } from './presentation/controllers/activities.controller';
import { ActivityRepository } from './repositories/activity.repository';
import {
  AssignBookToStudentUseCase,
  CreateActivityUseCase,
  GetActivityUseCase,
  ListActivitiesUseCase,
} from './use-cases/activities.usecases';

@Module({
  controllers: [ActivitiesController],
  providers: [
    ActivityRepository,
    CreateActivityUseCase,
    ListActivitiesUseCase,
    GetActivityUseCase,
    AssignBookToStudentUseCase,
  ],
})
export class ActivitiesModule {}
