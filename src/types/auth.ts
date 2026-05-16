export interface User {
  id: number;
  username: string;
  full_name: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  joined_date:Date;
  email: string;
  image: string;
  address: string;
  phone: string;
  father: string;
  role: string;
  family: Family | null;
  is_staff: boolean;
  is_active:boolean;
  is_superuser: boolean;
  slogan:string;
  parent_phone:string;
  whatsapp:string;
}

export interface Stage {
  id: number;
  name: string;
  families?: Family[];
}

export interface Family {
  id: number;
  name: string;
  year?: string;
  stage?: Stage;
  user_count?: number;
  users?: User[];
}
export interface AuthState {
  user: User | null;
  selectedUser: User | null;
  access: string | null;
  refresh: string | null;

  users: User[];
  stages: Stage[];
  families: Family[];
  selectedFamily: Family | null;

  loading: boolean;
  error: string | null;
}
