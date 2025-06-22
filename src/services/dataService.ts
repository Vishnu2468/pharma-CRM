import api from './api';
import { Organization, Doctor, Product, Visit, Attendance, Schedule, Employee } from '../types';

export const dataService = {
  // Organizations
  getOrganizations: async (): Promise<Organization[]> => {
    const response = await api.get('/organizations/');
    return response.data;
  },

  createOrganization: async (data: Partial<Organization>): Promise<Organization> => {
    const response = await api.post('/organizations/', data);
    return response.data;
  },

  // Doctors
  getDoctors: async (): Promise<Doctor[]> => {
    const response = await api.get('/doctors/');
    return response.data;
  },

  createDoctor: async (data: Partial<Doctor>): Promise<Doctor> => {
    const response = await api.post('/doctors/', data);
    return response.data;
  },

  // Products
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products/');
    return response.data;
  },

  createProduct: async (data: Partial<Product>): Promise<Product> => {
    const response = await api.post('/products/', data);
    return response.data;
  },

  // Visits
  getVisits: async (): Promise<Visit[]> => {
    const response = await api.get('/visits/');
    return response.data;
  },

  createVisit: async (data: Partial<Visit>): Promise<Visit> => {
    const response = await api.post('/visits/', data);
    return response.data;
  },

  updateVisit: async (id: number, data: Partial<Visit>): Promise<Visit> => {
    const response = await api.patch(`/visits/${id}/`, data);
    return response.data;
  },

  // Attendance
  getAttendance: async (): Promise<Attendance[]> => {
    const response = await api.get('/attendance/');
    return response.data;
  },

  markAttendance: async (data: Partial<Attendance>): Promise<Attendance> => {
    const response = await api.post('/attendance/', data);
    return response.data;
  },

  // Schedules
  getSchedules: async (): Promise<Schedule[]> => {
    const response = await api.get('/schedules/');
    return response.data;
  },

  createSchedule: async (data: Partial<Schedule>): Promise<Schedule> => {
    const response = await api.post('/schedules/', data);
    return response.data;
  },

  // Employees (Owner only)
  getEmployees: async (): Promise<Employee[]> => {
    const response = await api.get('/employees/');
    return response.data;
  },

  createEmployee: async (data: any): Promise<Employee> => {
    const response = await api.post('/employees/', data);
    return response.data;
  },

  getEmployeeVisits: async (employeeId: number): Promise<Visit[]> => {
    const response = await api.get(`/employees/${employeeId}/visits/`);
    return response.data;
  },
};