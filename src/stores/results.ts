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
} from "@/types/results";


export const useResultStore = defineStore("result", {

  state: () => ({

    // =========================
    // Student Results
    // =========================

    results: [] as Result[],
    exams: [] as Exam[],
    selectedExam: null as number | null,


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

      } catch (error) {

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

      } catch (error) {

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

      } catch (error) {

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

      } catch (error) {

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

      } catch (error) {

        this.error =
          "Error fetching enrollments";

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

      } catch (error) {

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

      } catch (error) {

        this.error =
          "Error fetching subjects";

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
