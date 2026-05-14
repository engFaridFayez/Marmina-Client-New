import type { User } from "./auth";
import type { Exam } from "./results";

export interface Attendance {
  id:number;
  student:User;
  term:Exam;
  date:Date;
  is_present_mass:Boolean;
  is_present_family:Boolean;
  created_at:string;
}
