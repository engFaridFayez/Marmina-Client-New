
import type { Exam, Result } from "@/types/results";
import api from "./api";

export const ResultService = {
    getMyResult() {
        return api.get<Result[]>("myresult/")
    },
    getResultByExam(examId:number) {
        return api.get<Result[]>(`myresult/?exam=${examId}`)
    },
    getAllExams() {
        return api.get<Exam[]>("exams/")
    }
};


