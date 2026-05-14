import type { Attendance } from "@/types/attendance";
import api from "./api";
import type { Exam } from "@/types/results";

export const AttendanceService = {
  getMyAttendance() {
    return api.get<Attendance[]>("myattendance/")
  },
  getAttendenceByTerm(TermId: number) {
    return api.get<Attendance[]>(`myattendance/?term=${TermId}`)
  },
  getAllExams() {
    return api.get<Exam[]>("exams/")
  }
}
