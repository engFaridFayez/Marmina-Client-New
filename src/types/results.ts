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

export interface Result{
    id:number;
    student :User;
    subject:Subject;
    exam:Exam;
    points:number;
    final_grade:number;
    success_grade:number;
    is_success:boolean;
}