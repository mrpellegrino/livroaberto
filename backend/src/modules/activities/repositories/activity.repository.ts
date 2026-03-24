import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service';
import { Activity, ActivityMode, ActivityStudentBook, Prisma } from '@prisma/client';

@Injectable()
export class ActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  createWithBooks(data: {
    classroomId: string;
    title: string;
    mode: ActivityMode;
    examStartAt: Date;
    examEndAt: Date;
    rubricFactualWeight: number;
    rubricCharacterWeight: number;
    rubricInterpretWeight: number;
    rubricConsistencyWeight: number;
    rubricEvidenceWeight: number;
    bookIds: string[];
  }): Promise<Activity> {
    return this.prisma.activity.create({
      data: {
        classroomId: data.classroomId,
        title: data.title,
        mode: data.mode,
        examStartAt: data.examStartAt,
        examEndAt: data.examEndAt,
        rubricFactualWeight: data.rubricFactualWeight,
        rubricCharacterWeight: data.rubricCharacterWeight,
        rubricInterpretWeight: data.rubricInterpretWeight,
        rubricConsistencyWeight: data.rubricConsistencyWeight,
        rubricEvidenceWeight: data.rubricEvidenceWeight,
        books: {
          create: data.bookIds.map((bookId) => ({ bookId })),
        },
      },
      include: { books: true },
    });
  }

  list(classroomId?: string) {
    return this.prisma.activity.findMany({
      where: classroomId ? { classroomId } : undefined,
      include: { books: true, studentBooks: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string) {
    return this.prisma.activity.findUnique({
      where: { id },
      include: { books: true, studentBooks: true },
    });
  }

  assignBookToStudent(data: {
    activityId: string;
    studentId: string;
    bookId: string;
    cycleNo: number;
  }): Promise<ActivityStudentBook> {
    return this.prisma.activityStudentBook.upsert({
      where: {
        activityId_studentId_cycleNo: {
          activityId: data.activityId,
          studentId: data.studentId,
          cycleNo: data.cycleNo,
        },
      },
      create: data,
      update: { bookId: data.bookId },
    });
  }
}
