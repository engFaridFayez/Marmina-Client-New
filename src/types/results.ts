export interface Subject {
  id: number;
  name: string;
  final_grade: number;
  success_grade: number;
}

export interface Exam {
  id: number;
  name: string;
  year: string;
}

export interface Result {
  id: number;

  student: string;

  subject: string;

  // موجود فقط في نتائج المكونات زي مزامير الأجبية
  component: string | null;

  exam: string;

  // درجة الطالب في الامتحان
  points: number;

  // الدرجة القصوى للامتحان/الترم
  max_grade: number;

  // الدرجة النهائية للمادة على مدار السنة
  final_grade: number;

  // درجة النجاح الخاصة بهذا الامتحان
  success_grade: number | null;

  // null = Component مثل المزمور
  is_success: boolean | null;
}

export interface StudentEnrollment {
  id: number;
  student: number;
  student_name: string;
  student_username:string;
  family: number;
  family_name: string;
  stage_name: string;
  academic_year: string;
  status: "ناجح" | "راسب" | null;
}

export interface FamilyStudent {
  id: number;
  full_name: string;
  username: string;
  status: "ناجح" | "راسب" | null;
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
  subject_exam?: number;
  component_exam?: number;
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


export interface ResultFamily {
  id: number;
  name: string;
  year: string;
  stage: string | null;
  students_count: number;
}


export interface SubjectWrite {
  name: string;
  final_grade: number;
  success_grade: number;
}

export interface ExamWrite {
  name: string;
  year: string;
}

export interface SubjectExam {
  id: number;
  subject: number;
  subject_name: string;
  exam: number;
  exam_name: string;
  max_grade: number;
  success_grade: number | null;
}

export interface SubjectExamWrite {
  subject: number;
  exam: number;
  max_grade: number;
  success_grade?: number | null;
}

export interface SubjectComponent {
  id: number;
  subject: number;
  subject_name: string;
  name: string;
}

export interface SubjectComponentWrite {
  subject: number;
  name: string;
}

export interface ComponentExam {
  id: number;
  component: number;
  component_name: string;
  subject_name: string;
  exam: number;
  exam_name: string;
  max_grade: number;
  success_grade: number | null;
}

export interface ComponentExamWrite {
  component: number;
  exam: number;
  max_grade: number;
  success_grade?: number | null;
}
