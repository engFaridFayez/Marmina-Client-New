import { ResultService } from "@/services/result.service";
import type { Exam, Result } from "@/types/results";
import { defineStore } from "pinia";

export const useResultStore = defineStore("result", {
    state: () => ({
        results: [] as Result[],
        exams: [] as Exam[],
        selectedExam: null as number | null,
        loading: false,
        error: null as string | null
    }),

    actions: {
        async getMyResult() {
            try {
                this.loading = true
                const response = await ResultService.getMyResult()

                this.results = response.data
            } catch (error) {
                this.error = "Failed to load results";
            } finally {
                this.loading = false
            }
        },

        async getExamsList() {
            try {
                this.loading = true;

                const response = await ResultService.getAllExams()
                this.exams = response.data
            } catch (error) {
                this.error = "error fetching exams";
            } finally {
                this.loading = false;
            }
        },

        async getResultsByExam(examId: number) {
            try {
                this.loading = true
                const response = await ResultService.getResultByExam(examId);
                this.results = response.data;
            } catch (error) {
                this.error = "error fetching results"
            } finally {
                this.loading = false
            }
        }
    }
})
