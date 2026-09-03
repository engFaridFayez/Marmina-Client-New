import { defineStore } from "pinia";

import { ResultService } from "@/services/result.service";

import type {
  Exam,
  Result,
  Subject,
  StudentEnrollment,
  FamilyStudentsResponse,
  ResultWrite,
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


export const useResultStore = defineStore("result", {

  state: () => ({

    // =========================
    // Student Results
    // =========================

    results: [] as Result[],
    exams: [] as Exam[],
    selectedExam: null as number | null,
    resultFamilies: [] as ResultFamily[],

    // =========================
    // Family
    // =========================

    familyData: null as FamilyStudentsResponse | null,


    // =========================
    // Student Enrollments
    // =========================

    enrollments: [] as StudentEnrollment[],
    selectedEnrollment: null as StudentEnrollment | null,


    // =========================
    // Enrollment Results
    // =========================

    enrollmentResults: [] as Result[],


    // =========================
    // Subjects
    // =========================

    subjects: [] as Subject[],


    // =========================
    // Subject Exams / Components
    // =========================

    subjectExams: [] as SubjectExam[],
    subjectComponents: [] as SubjectComponent[],
    componentExams: [] as ComponentExam[],


    // =========================
    // Promotion
    // =========================

    selectedStudentIds: [] as number[],

    promotionResult: null as PromoteStudentsResponse | null,


    // =========================
    // UI State
    // =========================

    loading: false,
    error: null as string | null,

  }),


  actions: {

    // =====================================
    // Student
    // =====================================

    async getMyResult() {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.getMyResult();

        this.results = response.data;

      } catch {

        this.error =
          "Failed to load results";

      } finally {

        this.loading = false;

      }
    },


    async getExamsList() {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.getAllExams();

        this.exams = response.data;

      } catch {

        this.error =
          "Error fetching exams";

      } finally {

        this.loading = false;

      }
    },


    async getResultsByExam(
      examId: number
    ) {

      try {

        this.loading = true;
        this.error = null;

        this.selectedExam = examId;

        const response =
          await ResultService.getResultByExam(
            examId
          );

        this.results = response.data;

      } catch {

        this.error =
          "Error fetching results";

      } finally {

        this.loading = false;

      }
    },


    // =====================================
    // Family
    // =====================================

    async getFamilyStudents(
      familyId: number
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.getFamilyStudents(
            familyId
          );

        this.familyData = response.data;

      } catch {

        this.error =
          "Error fetching family students";

      } finally {

        this.loading = false;

      }
    },


    // =====================================
    // Student Enrollments
    // =====================================

    async getStudentEnrollments(
      studentId: number
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.getStudentEnrollments(
            studentId
          );

        this.enrollments = response.data;

      } catch (error: any) {

        console.error("❌ Error fetching enrollments:", error);
        console.error("Status:", error?.response?.status);
        console.error("Data:", error?.response?.data);

        this.error = "Error fetching enrollments";

      } finally {

        this.loading = false;

      }
    },


    // =====================================
    // Enrollment Results
    // =====================================

    async getEnrollmentResults(
      enrollmentId: number
    ) {

      try {

        this.loading = true;
        this.error = null;

        this.selectedEnrollment =
          this.enrollments.find(
            enrollment =>
              enrollment.id === enrollmentId
          ) ?? null;

        const response =
          await ResultService.getEnrollmentResults(
            enrollmentId
          );

        this.enrollmentResults =
          response.data;

      } catch {

        this.error =
          "Error fetching enrollment results";

      } finally {

        this.loading = false;

      }
    },


    async addResult(
      enrollmentId: number,
      data: ResultWrite
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.addResult(
            enrollmentId,
            data
          );

        this.enrollmentResults.push(
          response.data
        );

        return response.data;

      } catch (error) {

        this.error =
          "Error adding result";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    // =====================================
    // Result Details
    // =====================================

    async updateResult(
      resultId: number,
      data: Partial<ResultWrite>
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.updateResult(
            resultId,
            data
          );

        const index =
          this.enrollmentResults.findIndex(
            result =>
              result.id === resultId
          );

        if (index !== -1) {

          this.enrollmentResults[index] =
            response.data;

        }

        return response.data;

      } catch (error) {

        this.error =
          "Error updating result";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    async deleteResult(
      resultId: number
    ) {

      try {

        this.loading = true;
        this.error = null;

        await ResultService.deleteResult(
          resultId
        );

        this.enrollmentResults =
          this.enrollmentResults.filter(
            result =>
              result.id !== resultId
          );

      } catch (error) {

        this.error =
          "Error deleting result";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    // =====================================
    // Subjects
    // =====================================

    async getSubjectsList() {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.getAllSubjects();

        this.subjects = response.data;

      } catch {

        this.error =
          "Error fetching subjects";

      } finally {

        this.loading = false;

      }
    },


    // =====================================
    // Subjects (write)
    // =====================================

    async createSubject(
      data: SubjectWrite
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.createSubject(
            data
          );

        this.subjects.push(
          response.data
        );

        return response.data;

      } catch (error) {

        this.error =
          "Error creating subject";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    async updateSubject(
      subjectId: number,
      data: Partial<SubjectWrite>
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.updateSubject(
            subjectId,
            data
          );

        const index =
          this.subjects.findIndex(
            subject =>
              subject.id === subjectId
          );

        if (index !== -1) {

          this.subjects[index] =
            response.data;

        }

        return response.data;

      } catch (error) {

        this.error =
          "Error updating subject";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    async deleteSubject(
      subjectId: number
    ) {

      try {

        this.loading = true;
        this.error = null;

        await ResultService.deleteSubject(
          subjectId
        );

        this.subjects =
          this.subjects.filter(
            subject =>
              subject.id !== subjectId
          );

      } catch (error) {

        this.error =
          "Error deleting subject";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    // =====================================
    // Exams (write)
    // =====================================

    async createExam(
      data: ExamWrite
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.createExam(
            data
          );

        this.exams.push(
          response.data
        );

        return response.data;

      } catch (error) {

        this.error =
          "Error creating exam";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    async updateExam(
      examId: number,
      data: Partial<ExamWrite>
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.updateExam(
            examId,
            data
          );

        const index =
          this.exams.findIndex(
            exam =>
              exam.id === examId
          );

        if (index !== -1) {

          this.exams[index] =
            response.data;

        }

        return response.data;

      } catch (error) {

        this.error =
          "Error updating exam";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    async deleteExam(
      examId: number
    ) {

      try {

        this.loading = true;
        this.error = null;

        await ResultService.deleteExam(
          examId
        );

        this.exams =
          this.exams.filter(
            exam =>
              exam.id !== examId
          );

      } catch (error) {

        this.error =
          "Error deleting exam";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    // =====================================
    // Subject Exams
    // =====================================

    async getSubjectExams(
      params?: { exam?: number; subject?: number }
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.getSubjectExams(
            params
          );

        this.subjectExams = response.data;

        return response.data;

      } catch (error) {

        this.error =
          "Error fetching subject exams";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    async createSubjectExam(
      data: SubjectExamWrite
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.createSubjectExam(
            data
          );

        this.subjectExams.push(
          response.data
        );

        return response.data;

      } catch (error) {

        this.error =
          "Error creating subject exam";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    async updateSubjectExam(
      subjectExamId: number,
      data: Partial<SubjectExamWrite>
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.updateSubjectExam(
            subjectExamId,
            data
          );

        const index =
          this.subjectExams.findIndex(
            subjectExam =>
              subjectExam.id === subjectExamId
          );

        if (index !== -1) {

          this.subjectExams[index] =
            response.data;

        }

        return response.data;

      } catch (error) {

        this.error =
          "Error updating subject exam";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    async deleteSubjectExam(
      subjectExamId: number
    ) {

      try {

        this.loading = true;
        this.error = null;

        await ResultService.deleteSubjectExam(
          subjectExamId
        );

        this.subjectExams =
          this.subjectExams.filter(
            subjectExam =>
              subjectExam.id !== subjectExamId
          );

      } catch (error) {

        this.error =
          "Error deleting subject exam";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    // =====================================
    // Subject Components
    // =====================================

    async getSubjectComponents(
      subjectId?: number
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.getSubjectComponents(
            subjectId
          );

        this.subjectComponents = response.data;

        return response.data;

      } catch (error) {

        this.error =
          "Error fetching subject components";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    async createSubjectComponent(
      data: SubjectComponentWrite
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.createSubjectComponent(
            data
          );

        this.subjectComponents.push(
          response.data
        );

        return response.data;

      } catch (error) {

        this.error =
          "Error creating subject component";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    async updateSubjectComponent(
      componentId: number,
      data: Partial<SubjectComponentWrite>
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.updateSubjectComponent(
            componentId,
            data
          );

        const index =
          this.subjectComponents.findIndex(
            component =>
              component.id === componentId
          );

        if (index !== -1) {

          this.subjectComponents[index] =
            response.data;

        }

        return response.data;

      } catch (error) {

        this.error =
          "Error updating subject component";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    async deleteSubjectComponent(
      componentId: number
    ) {

      try {

        this.loading = true;
        this.error = null;

        await ResultService.deleteSubjectComponent(
          componentId
        );

        this.subjectComponents =
          this.subjectComponents.filter(
            component =>
              component.id !== componentId
          );

      } catch (error) {

        this.error =
          "Error deleting subject component";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    // =====================================
    // Component Exams
    // =====================================

    async getComponentExams(
      params?: { exam?: number; component?: number }
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.getComponentExams(
            params
          );

        this.componentExams = response.data;

        return response.data;

      } catch (error) {

        this.error =
          "Error fetching component exams";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    async createComponentExam(
      data: ComponentExamWrite
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.createComponentExam(
            data
          );

        this.componentExams.push(
          response.data
        );

        return response.data;

      } catch (error) {

        this.error =
          "Error creating component exam";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    async updateComponentExam(
      componentExamId: number,
      data: Partial<ComponentExamWrite>
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.updateComponentExam(
            componentExamId,
            data
          );

        const index =
          this.componentExams.findIndex(
            componentExam =>
              componentExam.id === componentExamId
          );

        if (index !== -1) {

          this.componentExams[index] =
            response.data;

        }

        return response.data;

      } catch (error) {

        this.error =
          "Error updating component exam";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    async deleteComponentExam(
      componentExamId: number
    ) {

      try {

        this.loading = true;
        this.error = null;

        await ResultService.deleteComponentExam(
          componentExamId
        );

        this.componentExams =
          this.componentExams.filter(
            componentExam =>
              componentExam.id !== componentExamId
          );

      } catch (error) {

        this.error =
          "Error deleting component exam";

        throw error;

      } finally {

        this.loading = false;

      }
    },


    // =====================================
    // Promotion
    // =====================================

    toggleStudentSelection(
      studentId: number
    ) {

      if (
        this.selectedStudentIds.includes(
          studentId
        )
      ) {

        this.selectedStudentIds =
          this.selectedStudentIds.filter(
            id => id !== studentId
          );

      } else {

        this.selectedStudentIds.push(
          studentId
        );

      }
    },

    async getResultFamilies() {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.getResultFamilies();

        this.resultFamilies = response.data;

      } catch {

        this.error =
          "Error fetching result families";

      } finally {

        this.loading = false;

      }
    },


    clearSelectedStudents() {

      this.selectedStudentIds = [];

    },


    async promoteStudents(
      familyId: number,
      passedStudentIds: number[],
      failedStudentIds: number[]
    ) {

      try {

        this.loading = true;
        this.error = null;

        const response =
          await ResultService.promoteStudents(
            familyId,
            {
              passed_student_ids:
                passedStudentIds,

              failed_student_ids:
                failedStudentIds,
            }
          );

        this.promotionResult =
          response.data;

        return response.data;

      } catch (error) {

        this.error =
          "Error promoting students";

        throw error;

      } finally {

        this.loading = false;

      }
    },

  },

});
