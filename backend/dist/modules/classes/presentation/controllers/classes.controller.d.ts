import { AddStudentToClassroomDto } from '../../dtos/add-student-to-classroom.dto';
import { AssignResponsibleTeacherDto } from '../../dtos/assign-responsible-teacher.dto';
import { CreateClassroomDto } from '../../dtos/create-classroom.dto';
import { AddStudentToClassroomUseCase, AssignResponsibleTeacherUseCase, CreateClassroomUseCase, ListClassroomsUseCase } from '../../use-cases/classrooms.usecases';
export declare class ClassesController {
    private readonly createClassroomUseCase;
    private readonly listClassroomsUseCase;
    private readonly assignResponsibleTeacherUseCase;
    private readonly addStudentToClassroomUseCase;
    constructor(createClassroomUseCase: CreateClassroomUseCase, listClassroomsUseCase: ListClassroomsUseCase, assignResponsibleTeacherUseCase: AssignResponsibleTeacherUseCase, addStudentToClassroomUseCase: AddStudentToClassroomUseCase);
    create(body: CreateClassroomDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolId: string;
        gradeYear: string | null;
    }>;
    list(schoolId?: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolId: string;
        gradeYear: string | null;
    }[]>;
    assignResponsibleTeacher(classId: string, body: AssignResponsibleTeacherDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isResponsible: boolean;
        classroomId: string;
        teacherUserId: string;
    }>;
    addStudent(classId: string, body: AddStudentToClassroomDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        classroomId: string;
        studentUserId: string;
    }>;
}
