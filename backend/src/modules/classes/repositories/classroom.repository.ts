import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service';
import { Classroom, ClassStudent, ClassTeacher } from '@prisma/client';

@Injectable()
export class ClassroomRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: {
    schoolId: string;
    name: string;
    gradeYear?: string;
  }): Promise<Classroom> {
    return this.prisma.classroom.create({ data });
  }

  list(schoolId?: string): Promise<Classroom[]> {
    return this.prisma.classroom.findMany({
      where: schoolId ? { schoolId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string): Promise<Classroom | null> {
    return this.prisma.classroom.findUnique({ where: { id } });
  }

  assignTeacher(classroomId: string, teacherUserId: string, isResponsible: boolean): Promise<ClassTeacher> {
    return this.prisma.classTeacher.upsert({
      where: {
        classroomId_teacherUserId: {
          classroomId,
          teacherUserId,
        },
      },
      create: { classroomId, teacherUserId, isResponsible },
      update: { isResponsible },
    });
  }

  addStudent(classroomId: string, studentUserId: string): Promise<ClassStudent> {
    return this.prisma.classStudent.upsert({
      where: {
        classroomId_studentUserId: {
          classroomId,
          studentUserId,
        },
      },
      create: { classroomId, studentUserId },
      update: {},
    });
  }
}
