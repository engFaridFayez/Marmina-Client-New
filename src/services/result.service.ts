import type {
  Exam,
  Result,
  Subject,
  StudentEnrollment,
  FamilyStudentsResponse,
  ResultWrite,
  PromoteStudentsPayload,
  PromoteStudentsResponse,
} from "@/types/results";

import api from "./api";


export const ResultService = {

  // =========================
  // Student
  // =========================

  getMyResult() {
    return api.get<Result[]>("myresult/");
  },

  getResultByExam(examId: number) {
    return api.get<Result[]>(`myresult/?exam=${examId}`);
  },


  // =========================
  // Subjects & Exams
  // =========================

  getAllSubjects() {
    return api.get<Subject[]>("subjects/");
  },

  getAllExams() {
    return api.get<Exam[]>("exams/");
  },


  // =========================
  // Family Students
  // =========================

  getFamilyStudents(familyId: number) {
    return api.get<FamilyStudentsResponse>(
      `families/${familyId}/students/`
    );
  },


  // =========================
  // Student Enrollments
  // =========================

  getStudentEnrollments(studentId: number) {
    return api.get<StudentEnrollment[]>(
      `students/${studentId}/enrollments/`
    );
  },


  // =========================
  // Enrollment Results
  // =========================

  getEnrollmentResults(enrollmentId: number) {
    return api.get<Result[]>(
      `enrollments/${enrollmentId}/results/`
    );
  },

  addResult(
    enrollmentId: number,
    data: ResultWrite
  ) {
    return api.post<Result>(
      `enrollments/${enrollmentId}/results/`,
      data
    );
  },


  // =========================
  // Result Details
  // =========================

  updateResult(
    resultId: number,
    data: Partial<ResultWrite>
  ) {
    return api.patch<Result>(
      `results/${resultId}/`,
      data
    );
  },

  deleteResult(resultId: number) {
    return api.delete(
      `results/${resultId}/`
    );
  },


  // =========================
  // Promote Students
  // =========================

  promoteStudents(
    familyId: number,
    data: PromoteStudentsPayload
  ) {
    return api.post<PromoteStudentsResponse>(
      `families/${familyId}/promote/`,
      data
    );
  },
};
