import type { User } from "./auth";

export interface Subject {
    id :number;
    name:string;
    final_grade:number;
    success_grade:number;
}

export interface Exam {
    id: number;
    name:string;
    year:string;
}

export interface Result {
    id: number;
    student: string;
    subject: string;
    exam: string;
    points: number;
    final_grade: number;
    success_grade: number;
    is_success: boolean;
}
export interface StudentEnrollment {
    id: number;
    student: number;
    student_name: string;
    family: number;
    family_name: string;
    stage_name: string;
    academic_year: string;
    status: "ناجح" | "راسب" | null;
}


export interface FamilyStudent {
    id: number;
    full_name: string;
    image: string | null;
}


export interface FamilyInfo {
    id: number;
    name: string;
    year: string;
    stage: string | null;
}


export interface FamilyStudentsResponse {
    family: FamilyInfo;
    next_family: FamilyInfo | null;
    students: FamilyStudent[];
}


export interface ResultWrite {
    subject: number;
    exam: number;
    points: number;
}


export interface PromoteStudentsPayload {
    passed_student_ids: number[];
    failed_student_ids: number[];
}


export interface PromoteStudentsResponse {
    detail: string;
    passed_count: number;
    failed_count: number;
}
