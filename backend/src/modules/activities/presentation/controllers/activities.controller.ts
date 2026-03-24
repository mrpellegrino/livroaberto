import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Permissions } from '../../../../common/authorization/permissions.decorator';
import { AssignBookToStudentDto, CreateActivityDto } from '../../dtos/create-activity.dto';
import {
  AssignBookToStudentUseCase,
  CreateActivityUseCase,
  GetActivityUseCase,
  ListActivitiesUseCase,
} from '../../use-cases/activities.usecases';

@Controller('activities')
export class ActivitiesController {
  constructor(
    private readonly createActivityUseCase: CreateActivityUseCase,
    private readonly listActivitiesUseCase: ListActivitiesUseCase,
    private readonly getActivityUseCase: GetActivityUseCase,
    private readonly assignBookToStudentUseCase: AssignBookToStudentUseCase,
  ) {}

  @Post()
  @Permissions({ resource: 'activities', action: 'create' })
  create(@Body() body: CreateActivityDto) {
    return this.createActivityUseCase.execute(body);
  }

  @Get()
  @Permissions({ resource: 'activities', action: 'read' })
  list(@Query('classroomId') classroomId?: string) {
    return this.listActivitiesUseCase.execute(classroomId);
  }

  @Get(':id')
  @Permissions({ resource: 'activities', action: 'read' })
  getById(@Param('id') activityId: string) {
    return this.getActivityUseCase.execute(activityId);
  }

  @Post(':id/assign-book')
  @Permissions({ resource: 'activities', action: 'update' })
  assignBook(@Param('id') activityId: string, @Body() body: AssignBookToStudentDto) {
    return this.assignBookToStudentUseCase.execute(activityId, body);
  }
}
