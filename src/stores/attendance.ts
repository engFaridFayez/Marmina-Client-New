import { AttendanceService } from "@/services/attendance.service";
import type { Attendance } from "@/types/attendance";
import type { Exam } from "@/types/results";
import { defineStore } from "pinia";


export const useAttendanceStore = defineStore("attendance", {
  state: () => ({
    attendances: [] as Attendance[],
    terms: [] as Exam[],
    error: null as string | null,
    loading: false
  }),

  actions: {
    async getMyAttendance() {
      try {
        this.loading = true
        const response = await AttendanceService.getMyAttendance()
        console.log(response.data);

        this.attendances = response.data
      } catch (error) {
        this.error = "Faild to load your attendance"
      } finally {
        this.loading = false
      }
    },
    async getExamsList() {
      try {
        this.loading = true;

        const response = await AttendanceService.getAllExams()
        this.terms = response.data
      } catch (error) {
        this.error = "error fetching exams";
      } finally {
        this.loading = false;
      }
    },
    async GetAttendanceByTerm(TermId: number) {
      try {
        this.loading = true
        const response = await AttendanceService.getAttendenceByTerm(TermId)
        this.attendances = response.data;
      } catch (error) {
        this.error = "error fetching results"
      } finally {
        this.loading = false
      }
    }
  }
})
