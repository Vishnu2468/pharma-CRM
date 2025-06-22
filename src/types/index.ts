export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'employee' | 'owner';
  company: number;
}

export interface Company {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  created_at: string;
}

export interface Employee {
  id: number;
  user: User;
  employee_id: string;
  phone: string;
  designation: string;
  joining_date: string;
  is_active: boolean;
}

export interface Organization {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  type: string;
  created_at: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  organization: number;
  organization_name?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  is_active: boolean;
  created_at: string;
}

export interface Visit {
  id: number;
  employee: number;
  employee_name?: string;
  doctor: number;
  doctor_name?: string;
  organization: number;
  organization_name?: string;
  products: number[];
  product_names?: string[];
  visit_date: string;
  visit_time: string;
  duration: number;
  notes: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Attendance {
  id: number;
  employee: number;
  date: string;
  check_in: string;
  check_out: string;
  status: 'present' | 'absent' | 'partial';
  notes: string;
}

export interface Schedule {
  id: number;
  employee: number;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'visit' | 'meeting' | 'training' | 'other';
  status: 'pending' | 'completed' | 'cancelled';
}