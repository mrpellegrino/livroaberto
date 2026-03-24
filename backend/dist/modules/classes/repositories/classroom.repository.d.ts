import { PrismaService } from '../../../common/database/prisma.service';
import { Classroom, ClassStudent, ClassTeacher } from '@prisma/client';
export declare class ClassroomRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        schoolId: string;
        name: string;
        gradeYear?: string;
    }): Promise<Classroom>;
    list(schoolId?: string): Promise<Classroom[]>;
    findById(id: string): Promise<Classroom | null>;
    assignTeacher(classroomId: string, teacherUserId: string, isResponsible: boolean): Promise<ClassTeacher>;
    addStudent(classroomId: string, studentUserId: string): Promise<ClassStudent>;
}
