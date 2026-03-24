import { Module } from '@nestjs/common';
import { ClassesController } from './presentation/controllers/classes.controller';
import { ClassroomRepository } from './repositories/classroom.repository';
import {
  AddStudentToClassroomUseCase,
  AssignResponsibleTeacherUseCase,
  CreateClassroomUseCase,
  ListClassroomsUseCase,
} from './use-cases/classrooms.usecases';

@Module({
  controllers: [ClassesController],
  providers: [
    ClassroomRepository,
    CreateClassroomUseCase,
    ListClassroomsUseCase,
    AssignResponsibleTeacherUseCase,
    AddStudentToClassroomUseCase,
  ],
})
export class ClassesModule {}
