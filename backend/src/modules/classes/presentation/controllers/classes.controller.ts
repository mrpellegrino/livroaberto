import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Permissions } from '../../../../common/authorization/permissions.decorator';
import { AddStudentToClassroomDto } from '../../dtos/add-student-to-classroom.dto';
import { AssignResponsibleTeacherDto } from '../../dtos/assign-responsible-teacher.dto';
import { CreateClassroomDto } from '../../dtos/create-classroom.dto';
import {
  AddStudentToClassroomUseCase,
  AssignResponsibleTeacherUseCase,
  CreateClassroomUseCase,
  ListClassroomsUseCase,
} from '../../use-cases/classrooms.usecases';

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly createClassroomUseCase: CreateClassroomUseCase,
    private readonly listClassroomsUseCase: ListClassroomsUseCase,
    private readonly assignResponsibleTeacherUseCase: AssignResponsibleTeacherUseCase,
    private readonly addStudentToClassroomUseCase: AddStudentToClassroomUseCase,
  ) {}

  @Post()
  @Permissions({ resource: 'classes', action: 'create' })
  create(@Body() body: CreateClassroomDto) {
    return this.createClassroomUseCase.execute(body);
  }

  @Get()
  @Permissions({ resource: 'classes', action: 'read' })
  list(@Query('schoolId') schoolId?: string) {
    return this.listClassroomsUseCase.execute(schoolId);
  }

  @Post(':id/responsible-teacher')
  @Permissions({ resource: 'classes', action: 'update' })
  assignResponsibleTeacher(
    @Param('id') classId: string,
    @Body() body: AssignResponsibleTeacherDto,
  ) {
    return this.assignResponsibleTeacherUseCase.execute(
      classId,
      body.teacherUserId,
      body.isResponsible ?? true,
    );
  }

  @Post(':id/students')
  @Permissions({ resource: 'classes', action: 'update' })
  addStudent(@Param('id') classId: string, @Body() body: AddStudentToClassroomDto) {
    return this.addStudentToClassroomUseCase.execute(classId, body.studentUserId);
  }
}
