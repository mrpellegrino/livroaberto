-- CreateEnum
CREATE TYPE "public"."ExtractionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "public"."ActivityMode" AS ENUM ('INDIVIDUAL', 'PROJETO_LITERARIO');

-- CreateEnum
CREATE TYPE "public"."EvaluationSessionStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'EXPIRED');

-- CreateTable
CREATE TABLE "public"."Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BookSource" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "textPath" TEXT,
    "extractionStatus" "public"."ExtractionStatus" NOT NULL DEFAULT 'PENDING',
    "extractedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BookChunk" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookChunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Classroom" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gradeYear" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ClassTeacher" (
    "id" TEXT NOT NULL,
    "classroomId" TEXT NOT NULL,
    "teacherUserId" TEXT NOT NULL,
    "isResponsible" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ClassStudent" (
    "id" TEXT NOT NULL,
    "classroomId" TEXT NOT NULL,
    "studentUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Activity" (
    "id" TEXT NOT NULL,
    "classroomId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mode" "public"."ActivityMode" NOT NULL,
    "examStartAt" TIMESTAMP(3) NOT NULL,
    "examEndAt" TIMESTAMP(3) NOT NULL,
    "rubricFactualWeight" INTEGER NOT NULL,
    "rubricCharacterWeight" INTEGER NOT NULL,
    "rubricInterpretWeight" INTEGER NOT NULL,
    "rubricConsistencyWeight" INTEGER NOT NULL,
    "rubricEvidenceWeight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ActivityBook" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ActivityStudentBook" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "cycleNo" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityStudentBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EvaluationSession" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "status" "public"."EvaluationSessionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "EvaluationSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EvaluationMessage" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvaluationMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EvaluationResult" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "reviewerUserId" TEXT,
    "factualScore" INTEGER NOT NULL,
    "characterScore" INTEGER NOT NULL,
    "interpretScore" INTEGER NOT NULL,
    "consistencyScore" INTEGER NOT NULL,
    "evidenceScore" INTEGER NOT NULL,
    "finalScore" INTEGER NOT NULL,
    "confidence" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EvaluationResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BookSource_bookId_idx" ON "public"."BookSource"("bookId");

-- CreateIndex
CREATE INDEX "BookChunk_bookId_chunkIndex_idx" ON "public"."BookChunk"("bookId", "chunkIndex");

-- CreateIndex
CREATE INDEX "BookChunk_sourceId_idx" ON "public"."BookChunk"("sourceId");

-- CreateIndex
CREATE INDEX "Classroom_schoolId_idx" ON "public"."Classroom"("schoolId");

-- CreateIndex
CREATE INDEX "ClassTeacher_teacherUserId_idx" ON "public"."ClassTeacher"("teacherUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ClassTeacher_classroomId_teacherUserId_key" ON "public"."ClassTeacher"("classroomId", "teacherUserId");

-- CreateIndex
CREATE INDEX "ClassStudent_studentUserId_idx" ON "public"."ClassStudent"("studentUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ClassStudent_classroomId_studentUserId_key" ON "public"."ClassStudent"("classroomId", "studentUserId");

-- CreateIndex
CREATE INDEX "Activity_classroomId_idx" ON "public"."Activity"("classroomId");

-- CreateIndex
CREATE INDEX "ActivityBook_bookId_idx" ON "public"."ActivityBook"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityBook_activityId_bookId_key" ON "public"."ActivityBook"("activityId", "bookId");

-- CreateIndex
CREATE INDEX "ActivityStudentBook_studentId_idx" ON "public"."ActivityStudentBook"("studentId");

-- CreateIndex
CREATE INDEX "ActivityStudentBook_bookId_idx" ON "public"."ActivityStudentBook"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityStudentBook_activityId_studentId_cycleNo_key" ON "public"."ActivityStudentBook"("activityId", "studentId", "cycleNo");

-- CreateIndex
CREATE INDEX "EvaluationSession_activityId_studentId_idx" ON "public"."EvaluationSession"("activityId", "studentId");

-- CreateIndex
CREATE INDEX "EvaluationMessage_sessionId_createdAt_idx" ON "public"."EvaluationMessage"("sessionId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "EvaluationResult_sessionId_key" ON "public"."EvaluationResult"("sessionId");

-- AddForeignKey
ALTER TABLE "public"."BookSource" ADD CONSTRAINT "BookSource_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookChunk" ADD CONSTRAINT "BookChunk_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookChunk" ADD CONSTRAINT "BookChunk_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "public"."BookSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Classroom" ADD CONSTRAINT "Classroom_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "public"."School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClassTeacher" ADD CONSTRAINT "ClassTeacher_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "public"."Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClassTeacher" ADD CONSTRAINT "ClassTeacher_teacherUserId_fkey" FOREIGN KEY ("teacherUserId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClassStudent" ADD CONSTRAINT "ClassStudent_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "public"."Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClassStudent" ADD CONSTRAINT "ClassStudent_studentUserId_fkey" FOREIGN KEY ("studentUserId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "public"."Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityBook" ADD CONSTRAINT "ActivityBook_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "public"."Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityBook" ADD CONSTRAINT "ActivityBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityStudentBook" ADD CONSTRAINT "ActivityStudentBook_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "public"."Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityStudentBook" ADD CONSTRAINT "ActivityStudentBook_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityStudentBook" ADD CONSTRAINT "ActivityStudentBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationSession" ADD CONSTRAINT "EvaluationSession_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "public"."Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationSession" ADD CONSTRAINT "EvaluationSession_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationSession" ADD CONSTRAINT "EvaluationSession_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationMessage" ADD CONSTRAINT "EvaluationMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."EvaluationSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationResult" ADD CONSTRAINT "EvaluationResult_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."EvaluationSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationResult" ADD CONSTRAINT "EvaluationResult_reviewerUserId_fkey" FOREIGN KEY ("reviewerUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
