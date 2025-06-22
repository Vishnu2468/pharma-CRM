import api from './api';

export const dataService = {
  // Organizations
  getOrganizations: async () => {
    const response = await api.get('/organizations/');
    return response.data;
  },

  createOrganization: async (data) => {
    const response = await api.post('/organizations/', data);
    return response.data;
  },

  // Doctors
  getDoctors: async () => {
    const response = await api.get('/doctors/');
    return response.data;
  },

  createDoctor: async (data) => {
    const response = await api.post('/doctors/', data);
    return response.data;
  },

  // Products
  getProducts: async () => {
    const response = await api.get('/products/');
    return response.data;
  },

  createProduct: async (data) => {
    const response = await api.post('/products/', data);
    return response.data;
  },

  updateProduct: async (id, data) => {
    const response = await api.patch(`/products/${id}/`, data);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}/`);
    return response.data;
  },

  // Visits
  getVisits: async () => {
    const response = await api.get('/visits/');
    return response.data;
  },

  createVisit: async (data) => {
    const response = await api.post('/visits/', data);
    return response.data;
  },

  updateVisit: async (id, data) => {
    const response = await api.patch(`/visits/${id}/`, data);
    return response.data;
  },

  deleteVisit: async (id) => {
    const response = await api.delete(`/visits/${id}/`);
    return response.data;
  },

  // Attendance
  getAttendance: async () => {
    const response = await api.get('/attendance/');
    return response.data;
  },

  markAttendance: async (data) => {
    const response = await api.post('/attendance/mark/', data);
    return response.data;
  },

  // Leave Requests
  getLeaveRequests: async () => {
    const response = await api.get('/leaves/');
    return response.data;
  },

  createLeaveRequest: async (data) => {
    const response = await api.post('/leaves/', data);
    return response.data;
  },

  approveLeave: async (leaveId, action, comments) => {
    const response = await api.post(`/leaves/${leaveId}/approve/`, {
      action,
      comments
    });
    return response.data;
  },

  // Schedules
  getSchedules: async () => {
    const response = await api.get('/schedules/');
    return response.data;
  },

  createSchedule: async (data) => {
    const response = await api.post('/schedules/', data);
    return response.data;
  },

  updateSchedule: async (id, data) => {
    const response = await api.patch(`/schedules/${id}/`, data);
    return response.data;
  },

  // Employees (Owner only)
  getEmployees: async () => {
    const response = await api.get('/employees/');
    return response.data;
  },

  createEmployee: async (data) => {
    const response = await api.post('/employees/create/', data);
    return response.data;
  },

  getEmployeeVisits: async (employeeId) => {
    const response = await api.get(`/employees/${employeeId}/visits/`);
    return response.data;
  },

  // Dashboard stats
  getDashboardStats: async () => {
    const response = await api.get('/dashboard/stats/');
    return response.data;
  },
};