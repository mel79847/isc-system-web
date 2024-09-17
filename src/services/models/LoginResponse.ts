export interface LoginResponse {
  token: string;
  id: number;
  roles: string[];
}

export interface UserResponse {
  id: number;
  username: string;
  name: string;
  lastname: string;
  mothername: string;
  email: string;
  phone: string;
  role_id: number;
  roles: string[];
  created_at: string; // Puede ser `Date` si necesitas manipular las fechas
  updated_at: string; // Puede ser `Date` si necesitas manipular las fechas
  code: string;
  token: string;
}
