import type {
  Exam,
  Result,
  Subject,
  StudentEnrollment,
  FamilyStudentsResponse,
  ResultWrite,
  PromoteStudentsPayload,
  PromoteStudentsResponse,
  ResultFamily,
  SubjectWrite,
  ExamWrite,
  SubjectExam,
  SubjectExamWrite,
  SubjectComponent,
  SubjectComponentWrite,
  ComponentExam,
  ComponentExamWrite,
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
  // Subjects (write)
  // =========================

  createSubject(data: SubjectWrite) {
    return api.post<Subject>("subjects/", data);
  },

  updateSubject(subjectId: number, data: Partial<SubjectWrite>) {
    return api.patch<Subject>(`subjects/${subjectId}/`, data);
  },

  deleteSubject(subjectId: number) {
    return api.delete(`subjects/${subjectId}/`);
  },


  // =========================
  // Exams (write)
  // =========================

  createExam(data: ExamWrite) {
    return api.post<Exam>("exams/", data);
  },

  updateExam(examId: number, data: Partial<ExamWrite>) {
    return api.patch<Exam>(`exams/${examId}/`, data);
  },

  deleteExam(examId: number) {
    return api.delete(`exams/${examId}/`);
  },


  // =========================
  // Subject Exams
  // =========================

  getSubjectExams(params?: { exam?: number; subject?: number }) {
    const query = new URLSearchParams();
    if (params?.exam) query.set("exam", String(params.exam));
    if (params?.subject) query.set("subject", String(params.subject));
    const qs = query.toString();
    return api.get<SubjectExam[]>(`subject-exams/${qs ? `?${qs}` : ""}`);
  },

  createSubjectExam(data: SubjectExamWrite) {
    return api.post<SubjectExam>("subject-exams/", data);
  },

  updateSubjectExam(subjectExamId: number, data: Partial<SubjectExamWrite>) {
    return api.patch<SubjectExam>(`subject-exams/${subjectExamId}/`, data);
  },

  deleteSubjectExam(subjectExamId: number) {
    return api.delete(`subject-exams/${subjectExamId}/`);
  },


  // =========================
  // Subject Components
  // =========================

  getSubjectComponents(subjectId?: number) {
    const qs = subjectId ? `?subject=${subjectId}` : "";
    return api.get<SubjectComponent[]>(`subject-components/${qs}`);
  },

  createSubjectComponent(data: SubjectComponentWrite) {
    return api.post<SubjectComponent>("subject-components/", data);
  },

  updateSubjectComponent(componentId: number, data: Partial<SubjectComponentWrite>) {
    return api.patch<SubjectComponent>(`subject-components/${componentId}/`, data);
  },

  deleteSubjectComponent(componentId: number) {
    return api.delete(`subject-components/${componentId}/`);
  },


  // =========================
  // Component Exams
  // =========================

  getComponentExams(params?: { exam?: number; component?: number }) {
    const query = new URLSearchParams();
    if (params?.exam) query.set("exam", String(params.exam));
    if (params?.component) query.set("component", String(params.component));
    const qs = query.toString();
    return api.get<ComponentExam[]>(`component-exams/${qs ? `?${qs}` : ""}`);
  },

  createComponentExam(data: ComponentExamWrite) {
    return api.post<ComponentExam>("component-exams/", data);
  },

  updateComponentExam(componentExamId: number, data: Partial<ComponentExamWrite>) {
    return api.patch<ComponentExam>(`component-exams/${componentExamId}/`, data);
  },

  deleteComponentExam(componentExamId: number) {
    return api.delete(`component-exams/${componentExamId}/`);
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

  getResultFamilies() {
    return api.get<ResultFamily[]>("families/");
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
