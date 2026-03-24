import { PrismaService } from '../../../common/database/prisma.service';
import { CreateClassroomDto } from '../dtos/create-classroom.dto';
import { ClassroomRepository } from '../repositories/classroom.repository';
export declare class CreateClassroomUseCase {
    private readonly classroomRepository;
    private readonly prisma;
    constructor(classroomRepository: ClassroomRepository, prisma: PrismaService);
    execute(input: CreateClassroomDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolId: string;
        gradeYear: string | null;
    }>;
}
export declare class ListClassroomsUseCase {
    private readonly classroomRepository;
    constructor(classroomRepository: ClassroomRepository);
    execute(schoolId?: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolId: string;
        gradeYear: string | null;
    }[]>;
}
export declare class AssignResponsibleTeacherUseCase {
    private readonly classroomRepository;
    private readonly prisma;
    constructor(classroomRepository: ClassroomRepository, prisma: PrismaService);
    execute(classroomId: string, teacherUserId: string, isResponsible?: boolean): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isResponsible: boolean;
        classroomId: string;
        teacherUserId: string;
    }>;
}
export declare class AddStudentToClassroomUseCase {
    private readonly classroomRepository;
    private readonly prisma;
    constructor(classroomRepository: ClassroomRepository, prisma: PrismaService);
    execute(classroomId: string, studentUserId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        classroomId: string;
        studentUserId: string;
    }>;
}
