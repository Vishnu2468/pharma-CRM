// // // // import api from './api';

// // // // export const dataService = {
// // // //   // Organizations
// // // //   getOrganizations: async () => {
// // // //     const response = await api.get('/organizations/');
// // // //     return response.data;
// // // //   },

// // // //   createOrganization: async (data) => {
// // // //     const response = await api.post('/organizations/', data);
// // // //     return response.data;
// // // //   },

// // // //   updateOrganization: async (id, data) => {
// // // //     const response = await api.patch(`/organizations/${id}/`, data);
// // // //     return response.data;
// // // //   },

// // // //   // Doctors
// // // //   getDoctors: async () => {
// // // //     const response = await api.get('/doctors/');
// // // //     return response.data;
// // // //   },

// // // //   createDoctor: async (data) => {
// // // //     const response = await api.post('/doctors/', data);
// // // //     return response.data;
// // // //   },

// // // //   // Products
// // // //   getProducts: async () => {
// // // //     const response = await api.get('/products/');
// // // //     return response.data;
// // // //   },

// // // //   createProduct: async (data) => {
// // // //     const response = await api.post('/products/', data);
// // // //     return response.data;
// // // //   },

// // // //   updateProduct: async (id, data) => {
// // // //     const response = await api.patch(`/products/${id}/`, data);
// // // //     return response.data;
// // // //   },

// // // //   deleteProduct: async (id) => {
// // // //     const response = await api.delete(`/products/${id}/`);
// // // //     return response.data;
// // // //   },

// // // //   // Visits
// // // //   getVisits: async () => {
// // // //     const response = await api.get('/visits/');
// // // //     return response.data;
// // // //   },

// // // //   createVisit: async (data) => {
// // // //     const response = await api.post('/visits/', data);
// // // //     return response.data;
// // // //   },

// // // //   updateVisit: async (id, data) => {
// // // //     const response = await api.patch(`/visits/${id}/`, data);
// // // //     return response.data;
// // // //   },

// // // //   deleteVisit: async (id) => {
// // // //     const response = await api.delete(`/visits/${id}/`);
// // // //     return response.data;
// // // //   },

// // // //   // Attendance
// // // //   getAttendance: async () => {
// // // //     const response = await api.get('/attendance/');
// // // //     return response.data;
// // // //   },

// // // //   markAttendance: async (data) => {
// // // //     const response = await api.post('/attendance/mark/', data);
// // // //     return response.data;
// // // //   },

// // // //   // Leave Requests
// // // //   getLeaveRequests: async () => {
// // // //     const response = await api.get('/leaves/');
// // // //     return response.data;
// // // //   },

// // // //   createLeaveRequest: async (data) => {
// // // //     const response = await api.post('/leaves/', data);
// // // //     return response.data;
// // // //   },

// // // //   approveLeave: async (leaveId, action, comments) => {
// // // //     const response = await api.post(`/leaves/${leaveId}/approve/`, {
// // // //       action,
// // // //       comments
// // // //     });
// // // //     return response.data;
// // // //   },

// // // //   // Schedules
// // // //   getSchedules: async () => {
// // // //     const response = await api.get('/schedules/');
// // // //     return response.data;
// // // //   },

// // // //   createSchedule: async (data) => {
// // // //     const response = await api.post('/schedules/', data);
// // // //     return response.data;
// // // //   },

// // // //   updateSchedule: async (id, data) => {
// // // //     const response = await api.patch(`/schedules/${id}/`, data);
// // // //     return response.data;
// // // //   },

// // // //   // Employees (Owner only)
// // // //   getEmployees: async () => {
// // // //     const response = await api.get('/employees/');
// // // //     return response.data;
// // // //   },

// // // //   createEmployee: async (data) => {
// // // //     const response = await api.post('/employees/create/', data);
// // // //     return response.data;
// // // //   },

// // // //   updateEmployee: async (id, data) => {
// // // //     const response = await api.patch(`/employees/${id}/`, data);
// // // //     return response.data;
// // // //   },

// // // //   getEmployeeVisits: async (employeeId) => {
// // // //     const response = await api.get(`/employees/${employeeId}/visits/`);
// // // //     return response.data;
// // // //   },

// // // //   // Dashboard stats
// // // //   getDashboardStats: async () => {
// // // //     const response = await api.get('/dashboard/stats/');
// // // //     return response.data;
// // // //   },
// // // // };

// // // import api from './api';

// // // export const dataService = {
// // //   // Organizations
// // //   getOrganizations: async () => {
// // //     const response = await api.get('/organizations/');
// // //     return response.data;
// // //   },

// // //   createOrganization: async (data) => {
// // //     const response = await api.post('/organizations/', data);
// // //     return response.data;
// // //   },

// // //   updateOrganization: async (id, data) => {
// // //     const response = await api.patch(`/organizations/${id}/`, data);
// // //     return response.data;
// // //   },

// // //   // Doctors
// // //   getDoctors: async () => {
// // //     const response = await api.get('/doctors/');
// // //     return response.data;
// // //   },

// // //   createDoctor: async (data) => {
// // //     const response = await api.post('/doctors/', data);
// // //     return response.data;
// // //   },

// // //   // Products
// // //   getProducts: async () => {
// // //     const response = await api.get('/products/');
// // //     return response.data; // Ensure backend returns an array or handle object in ProductsPage
// // //   },

// // //   createProduct: async (data) => {
// // //     const response = await api.post('/products/', data);
// // //     return response.data;
// // //   },

// // //   updateProduct: async (id, data) => {
// // //     const response = await api.patch(`/products/${id}/`, data);
// // //     return response.data;
// // //   },

// // //   deleteProduct: async (id) => {
// // //     const response = await api.delete(`/products/${id}/`);
// // //     return response.data;
// // //   },

// // //   // Visits
// // //   getVisits: async () => {
// // //     const response = await api.get('/visits/');
// // //     return response.data;
// // //   },

// // //   createVisit: async (data) => {
// // //     const response = await api.post('/visits/', data);
// // //     return response.data;
// // //   },

// // //   updateVisit: async (id, data) => {
// // //     const response = await api.patch(`/visits/${id}/`, data);
// // //     return response.data;
// // //   },

// // //   deleteVisit: async (id) => {
// // //     const response = await api.delete(`/visits/${id}/`);
// // //     return response.data;
// // //   },

// // //   // Attendance
// // //   getAttendance: async () => {
// // //     const response = await api.get('/attendance/');
// // //     return response.data;
// // //   },

// // //   markAttendance: async (data) => {
// // //     const response = await api.post('/attendance/mark/', data);
// // //     return response.data;
// // //   },

// // //   // Leave Requests
// // //   getLeaveRequests: async () => {
// // //     const response = await api.get('/leaves/');
// // //     return response.data;
// // //   },

// // //   createLeaveRequest: async (data) => {
// // //     const response = await api.post('/leaves/', data);
// // //     return response.data;
// // //   },

// // //   approveLeave: async (leaveId, action, comments) => {
// // //     const response = await api.post(`/leaves/${leaveId}/approve/`, {
// // //       action,
// // //       comments
// // //     });
// // //     return response.data;
// // //   },

// // //   // Schedules
// // //   getSchedules: async () => {
// // //     const response = await api.get('/schedules/');
// // //     return response.data;
// // //   },

// // //   createSchedule: async (data) => {
// // //     const response = await api.post('/schedules/', data);
// // //     return response.data;
// // //   },

// // //   updateSchedule: async (id, data) => {
// // //     const response = await api.patch(`/schedules/${id}/`, data);
// // //     return response.data;
// // //   },

// // //   // Employees (Owner only)
// // //   getEmployees: async () => {
// // //     const response = await api.get('/employees/');
// // //     return response.data;
// // //   },

// // //   createEmployee: async (data) => {
// // //     const response = await api.post('/employees/create/', data);
// // //     return response.data;
// // //   },

// // //   updateEmployee: async (id, data) => {
// // //     const response = await api.patch(`/employees/${id}/`, data);
// // //     return response.data;
// // //   },

// // //   getEmployeeVisits: async (employeeId) => {
// // //     const response = await api.get(`/employees/${employeeId}/visits/`);
// // //     return response.data;
// // //   },

// // //   // Dashboard stats
// // //   getDashboardStats: async () => {
// // //     const response = await api.get('/dashboard/stats/');
// // //     return response.data;
// // //   },
// // // };

// // // src/services/dataService.js
// // import api from './api';

// // export const dataService = {
// //   // Organizations
// //   getOrganizations: async () => {
// //     try {
// //       const response = await api.get('/organizations/');
// //       console.log('Get organizations response:', response.data);
// //       const data = response.data.results || response.data;
// //       return Array.isArray(data) ? data : [];
// //     } catch (error) {
// //       console.error('Error fetching organizations:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   createOrganization: async (data) => {
// //     try {
// //       const response = await api.post('/organizations/', data);
// //       console.log('Create organization response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error creating organization:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   updateOrganization: async (id, data) => {
// //     try {
// //       const response = await api.patch(`/organizations/${id}/`, data);
// //       console.log('Update organization response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error updating organization:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   // Doctors
// //   getDoctors: async () => {
// //     try {
// //       const response = await api.get('/doctors/');
// //       console.log('Get doctors response:', response.data);
// //       const data = response.data.results || response.data;
// //       return Array.isArray(data) ? data : [];
// //     } catch (error) {
// //       console.error('Error fetching doctors:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   createDoctor: async (data) => {
// //     try {
// //       const response = await api.post('/doctors/', data);
// //       console.log('Create doctor response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error creating doctor:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   // Products
// //   getProducts: async () => {
// //     try {
// //       const response = await api.get('/products/');
// //       console.log('Get products response:', response.data);
// //       // Handle paginated response
// //       const data = response.data.results || response.data;
// //       return Array.isArray(data) ? data : [];
// //     } catch (error) {
// //       console.error('Error fetching products:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   createProduct: async (data) => {
// //     try {
// //       const response = await api.post('/products/', data);
// //       console.log('Create product response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error creating product:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   updateProduct: async (id, data) => {
// //     try {
// //       const response = await api.patch(`/products/${id}/`, data);
// //       console.log('Update product response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error updating product:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   deleteProduct: async (id) => {
// //     try {
// //       const response = await api.delete(`/products/${id}/`);
// //       console.log('Delete product response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error deleting product:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   // Visits
// //   getVisits: async () => {
// //     try {
// //       const response = await api.get('/visits/');
// //       console.log('Get visits response:', response.data);
// //       return Array.isArray(response.data) ? response.data : response.data?.data || [];
// //     } catch (error) {
// //       console.error('Error fetching visits:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   createVisit: async (data) => {
// //     try {
// //       const response = await api.post('/visits/', data);
// //       console.log('Create visit response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error creating visit:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   updateVisit: async (id, data) => {
// //     try {
// //       const response = await api.patch(`/visits/${id}/`, data);
// //       console.log('Update visit response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error updating visit:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   deleteVisit: async (id) => {
// //     try {
// //       const response = await api.delete(`/visits/${id}/`);
// //       console.log('Delete visit response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error deleting visit:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   // Attendance
// //   getAttendance: async () => {
// //     try {
// //       const response = await api.get('/attendance/');
// //       console.log('Get attendance response:', response.data);
// //       return Array.isArray(response.data) ? response.data : response.data?.data || [];
// //     } catch (error) {
// //       console.error('Error fetching attendance:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   markAttendance: async (data) => {
// //     try {
// //       const response = await api.post('/attendance/mark/', data);
// //       console.log('Mark attendance response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error marking attendance:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   // Leave Requests
// //   getLeaveRequests: async () => {
// //     try {
// //       const response = await api.get('/leaves/');
// //       console.log('Get leave requests response:', response.data);
// //       return Array.isArray(response.data) ? response.data : response.data?.data || [];
// //     } catch (error) {
// //       console.error('Error fetching leave requests:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   createLeaveRequest: async (data) => {
// //     try {
// //       const response = await api.post('/leaves/', data);
// //       console.log('Create leave request response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error creating leave request:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   approveLeave: async (leaveId, action, comments) => {
// //     try {
// //       const response = await api.post(`/leaves/${leaveId}/approve/`, { action, comments });
// //       console.log('Approve leave response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error approving leave:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   // Schedules
// //   getSchedules: async () => {
// //     try {
// //       const response = await api.get('/schedules/');
// //       console.log('Get schedules response:', response.data);
// //       const data = response.data.results || response.data;
// //       return Array.isArray(data) ? data : [];
// //     } catch (error) {
// //       console.error('Error fetching schedules:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   createSchedule: async (data) => {
// //     try {
// //       const response = await api.post('/schedules/', data);
// //       console.log('Create schedule response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error creating schedule:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },


// //   updateSchedule: async (id, data) => {
// //     try {
// //       const response = await api.patch(`/schedules/${id}/`, data);
// //       console.log('Update schedule response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error updating schedule:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   // Employees (Owner only)
// //   getEmployees: async () => {
// //     try {
// //       const response = await api.get('/employees/');
// //       console.log('Get employees response:', response.data);
// //       const data = response.data.results || response.data;
// //       return Array.isArray(data) ? data : [];
// //     } catch (error) {
// //       console.error('Error fetching employees:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   createEmployee: async (data) => {
// //     try {
// //       const response = await api.post('/employees/create/', data);
// //       console.log('Create employee response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error creating employee:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   updateEmployee: async (id, data) => {
// //     try {
// //       const response = await api.patch(`/employees/${id}/`, data);
// //       console.log('Update employee response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error updating employee:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   getEmployeeVisits: async (employeeId) => {
// //     try {
// //       const response = await api.get(`/employees/${employeeId}/visits/`);
// //       console.log('Get employee visits response:', response.data);
// //       return Array.isArray(response.data) ? response.data : response.data?.data || [];
// //     } catch (error) {
// //       console.error('Error fetching employee visits:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },

// //   // Dashboard stats
// //   getDashboardStats: async () => {
// //     try {
// //       const response = await api.get('/dashboard/stats/');
// //       console.log('Get dashboard stats response:', response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error fetching dashboard stats:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //       });
// //       throw error;
// //     }
// //   },
// // };

// import api from './api';

// export const dataService = {
//   // Organizations
//   getOrganizations: async () => {
//     try {
//       const response = await api.get('/organizations/');
//       console.log('Get organizations response:', response.data);
//       const data = response.data.results || response.data;
//       return Array.isArray(data) ? data : [];
//     } catch (error) {
//       console.error('Error fetching organizations:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   createOrganization: async (data) => {
//     try {
//       const response = await api.post('/organizations/', data);
//       console.log('Create organization response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating organization:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   updateOrganization: async (id, data) => {
//     try {
//       const response = await api.put(`/organizations/${id}/`, data);
//       console.log('Update organization response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating organization:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   // Doctors
//   getDoctors: async () => {
//     try {
//       const response = await api.get('/doctors/');
//       console.log('Get doctors response:', response.data);
//       const data = response.data.results || response.data;
//       return Array.isArray(data) ? data : [];
//     } catch (error) {
//       console.error('Error fetching doctors:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   createDoctor: async (data) => {
//     try {
//       const response = await api.post('/doctors/', data);
//       console.log('Create doctor response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating doctor:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   // Products
//   getProducts: async () => {
//     try {
//       const response = await api.get('/products/');
//       console.log('Get products response:', response.data);
//       const data = response.data.results || response.data;
//       return Array.isArray(data) ? data : [];
//     } catch (error) {
//       console.error('Error fetching products:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   createProduct: async (data) => {
//     try {
//       const response = await api.post('/products/', data);
//       console.log('Create product response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating product:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   updateProduct: async (id, data) => {
//     try {
//       const response = await api.patch(`/products/${id}/`, data);
//       console.log('Update product response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating product:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   deleteProduct: async (id) => {
//     try {
//       const response = await api.delete(`/products/${id}/`);
//       console.log('Delete product response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error deleting product:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   // Visits
//   getVisits: async () => {
//     try {
//       const response = await api.get('/visits/');
//       console.log('Get visits response:', response.data);
//       const data = response.data.results || response.data;
//       return Array.isArray(data) ? data : [];
//     } catch (error) {
//       console.error('Error fetching visits:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   createVisit: async (data) => {
//     try {
//       const response = await api.post('/visits/', data);
//       console.log('Create visit response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating visit:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   updateVisit: async (id, data) => {
//     try {
//       const response = await api.patch(`/visits/${id}/`, data);
//       console.log('Update visit response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating visit:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   deleteVisit: async (id) => {
//     try {
//       const response = await api.delete(`/visits/${id}/`);
//       console.log('Delete visit response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error deleting visit:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   // Attendance
//   getAttendance: async () => {
//     try {
//       const response = await api.get('/attendance/');
//       console.log('Get attendance response:', response.data);
//       const data = response.data.results || response.data;
//       return Array.isArray(data) ? data : [];
//     } catch (error) {
//       console.error('Error fetching attendance:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   markAttendance: async (data) => {
//     try {
//       const response = await api.post('/attendance/mark/', data);
//       console.log('Mark attendance response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error marking attendance:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   // Leave Requests
//   getLeaveRequests: async () => {
//     try {
//       const response = await api.get('/leaves/');
//       console.log('Get leave requests response:', response.data);
//       const data = response.data.results || response.data;
//       return Array.isArray(data) ? data : [];
//     } catch (error) {
//       console.error('Error fetching leave requests:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   createLeaveRequest: async (data) => {
//     try {
//       const response = await api.post('/leaves/', data);
//       console.log('Create leave request response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating leave request:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   approveLeave: async (leaveId, action, comments) => {
//     try {
//       const response = await api.post(`/leaves/${leaveId}/approve/`, { action, comments });
//       console.log('Approve leave response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error approving leave:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   // Schedules
//   getSchedules: async () => {
//     try {
//       const response = await api.get('/schedules/');
//       console.log('Get schedules response:', response.data);
//       const data = response.data.results || response.data;
//       return Array.isArray(data) ? data : [];
//     } catch (error) {
//       console.error('Error fetching schedules:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   createSchedule: async (data) => {
//     try {
//       const response = await api.post('/schedules/', data);
//       console.log('Create schedule response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating schedule:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   updateSchedule: async (id, data) => {
//     try {
//       const response = await api.patch(`/schedules/${id}/`, data);
//       console.log('Update schedule response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating schedule:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   // Employees (Owner only)
//   getEmployees: async () => {
//     try {
//       const response = await api.get('/employees/');
//       console.log('Get employees response:', response.data);
//       const data = response.data.results || response.data;
//       return Array.isArray(data) ? data : [];
//     } catch (error) {
//       console.error('Error fetching employees:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   createEmployee: async (data) => {
//     try {
//       const response = await api.post('/employees/create/', data);
//       console.log('Create employee response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating employee:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   updateEmployee: async (id, data) => {
//     try {
//       const response = await api.patch(`/employees/${id}/`, data);
//       console.log('Update employee response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating employee:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   getEmployeeVisits: async (employeeId) => {
//     try {
//       const response = await api.get(`/employees/${employeeId}/visits/`);
//       console.log('Get employee visits response:', response.data);
//       const data = response.data.results || response.data;
//       return Array.isArray(data) ? data : [];
//     } catch (error) {
//       console.error('Error fetching employee visits:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },

//   // Dashboard stats
//   getDashboardStats: async () => {
//     try {
//       const response = await api.get('/dashboard/stats/');
//       console.log('Get dashboard stats response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching dashboard stats:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   },
  
//   // In dataService.js, add:
// getCurrentEmployee: async () => {
//   try {
//     const response = await api.get('/employees/me/'); // Adjust endpoint as needed
//     console.log('Get current employee response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching current employee:', {
//       status: error.response?.status,
//       data: error.response?.data,
//       message: error.message,
//     });
//     throw error;
//   }
// },

// getCurrentUser: async () => {
//   try {
//     const response = await api.get('/users/me/');
//     console.log('Get current user response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching current user:', {
//       status: error.response?.status,
//       data: error.response?.data,
//       message: error.message,
//     });
//     throw error;
//   }
// },

// // In dataService.js, add:
// getUserProfile: async () => {
//   try {
//     const response = await api.get('/auth/profile/');
//     console.log('Get user profile response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user profile:', {
//       status: error.response?.status,
//       data: error.response?.data,
//       message: error.message,
//     });
//     throw error;
//   }
// },


// };

import api from './api';

export const dataService = {
  // Organizations
  getOrganizations: async () => {
    try {
      const response = await api.get('/organizations/');
      console.log('Get organizations response:', response.data);
      const data = response.data.results || response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching organizations:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  createOrganization: async (data) => {
    try {
      const response = await api.post('/organizations/', data);
      console.log('Create organization response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating organization:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  updateOrganization: async (id, data) => {
    try {
      const response = await api.post(`/organizations/${id}/`, data);
      console.log('Update organization response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating organization:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  // Doctors
  getDoctors: async () => {
    try {
      const response = await api.get('/doctors/');
      console.log('Get doctors response:', response.data);
      const data = response.data.results || response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching doctors:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  createDoctor: async (data) => {
    try {
      const response = await api.post('/doctors/', data);
      console.log('Create doctor response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating doctor:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  // Products
  getProducts: async () => {
    try {
      const response = await api.get('/products/');
      console.log('Get products response:', response.data);
      const data = response.data.results || response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching products:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  createProduct: async (data) => {
    try {
      const response = await api.post('/products/', data);
      console.log('Create product response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  updateProduct: async (id, data) => {
    try {
      const response = await api.put(`/products/${id}/`, data);
      console.log('Update product response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}/`);
      console.log('Delete product response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  // Visits
  getVisits: async () => {
    try {
      const response = await api.get('/visits/');
      console.log('Get visits response:', response.data);
      const data = response.data.results || response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching visits:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  createVisit: async (data) => {
    try {
      // Fetch employees, doctors, and organizations to validate IDs
      const [employees, doctors, organizations] = await Promise.all([
        dataService.getEmployees(),
        dataService.getDoctors(),
        dataService.getOrganizations(),
      ]);

      // Validate and transform employee ID
      const employeeId = parseInt(data.employee?.id || data.employee);
      if (!employeeId || isNaN(employeeId) || !employees.find(emp => emp.id === employeeId)) {
        throw new Error(`Invalid employee ID: ${data.employee}`);
      }

      // Validate and transform doctor ID
      const doctorId = parseInt(data.doctor?.id || data.doctor);
      if (!doctorId || isNaN(doctorId) || !doctors.find(doc => doc.id === doctorId)) {
        throw new Error(`Invalid doctor ID: ${data.doctor}`);
      }

      // Validate and transform organization ID
      const organizationId = parseInt(data.organization?.id || data.organization);
      if (!organizationId || isNaN(organizationId) || !organizations.find(org => org.id === organizationId)) {
        throw new Error(`Invalid organization ID: ${data.organization}`);
      }

      // Construct the payload with integer IDs
      const payload = {
        ...data,
        employee: employeeId,
        doctor: doctorId,
        organization: organizationId,
        product_ids: Array.isArray(data.product_ids) ? data.product_ids.map(id => parseInt(id)) : [],
      };

      console.log('Creating visit with payload:', JSON.stringify(payload, null, 2));
      const response = await api.post('/visits/', payload);
      console.log('Create visit response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating visit:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  updateVisit: async (id, data) => {
    try {
      // Fetch employees, doctors, and organizations to validate IDs
      const [employees, doctors, organizations] = await Promise.all([
        dataService.getEmployees(),
        dataService.getDoctors(),
        dataService.getOrganizations(),
      ]);

      // Validate and transform employee ID if provided
      let employeeId;
      if (data.employee) {
        employeeId = parseInt(data.employee?.id || data.employee);
        if (!employeeId || isNaN(employeeId) || !employees.find(emp => emp.id === employeeId)) {
          throw new Error(`Invalid employee ID: ${data.employee}`);
        }
      }

      // Validate and transform doctor ID if provided
      let doctorId;
      if (data.doctor) {
        doctorId = parseInt(data.doctor?.id || data.doctor);
        if (!doctorId || isNaN(doctorId) || !doctors.find(doc => doc.id === doctorId)) {
          throw new Error(`Invalid doctor ID: ${data.doctor}`);
        }
      }

      // Validate and transform organization ID if provided
      let organizationId;
      if (data.organization) {
        organizationId = parseInt(data.organization?.id || data.organization);
        if (!organizationId || isNaN(organizationId) || !organizations.find(org => org.id === organizationId)) {
          throw new Error(`Invalid organization ID: ${data.organization}`);
        }
      }

      // Construct the payload with integer IDs
      const payload = {
        ...data,
        employee: employeeId || data.employee,
        doctor: doctorId || data.doctor,
        organization: organizationId || data.organization,
        product_ids: Array.isArray(data.product_ids) ? data.product_ids.map(id => parseInt(id)) : [],
      };

      console.log(`Updating visit ${id} with payload:`, JSON.stringify(payload, null, 2));
      const response = await api.put(`/visits/${id}/`, payload);
      console.log('Update visit response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating visit:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  deleteVisit: async (id) => {
    try {
      const response = await api.delete(`/visits/${id}/`);
      console.log('Delete visit response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting visit:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  // Attendance
  getAttendance: async () => {
    try {
      const response = await api.get('/attendance/');
      console.log('Get attendance response:', response.data);
      const data = response.data.results || response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching attendance:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  markAttendance: async (data) => {
    try {
      const response = await api.post('/attendance/mark/', data);
      console.log('Mark attendance response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error marking attendance:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  // Leave Requests
  getLeaveRequests: async () => {
    try {
      const response = await api.get('/leaves/');
      console.log('Get leave requests response:', response.data);
      const data = response.data.results || response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching leave requests:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  createLeaveRequest: async (data) => {
    try {
      const response = await api.post('/leaves/', data);
      console.log('Create leave request response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating leave request:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  approveLeave: async (leaveId, action, comments) => {
    try {
      const response = await api.post(`/leaves/${leaveId}/approve/`, { action, comments });
      console.log('Approve leave response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error approving leave:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  // Schedules
  getSchedules: async () => {
    try {
      const response = await api.get('/schedules/');
      console.log('Get schedules response:', response.data);
      const data = response.data.results || response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching schedules:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  createSchedule: async (data) => {
    try {
      const response = await api.post('/schedules/', data);
      console.log('Create schedule response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating schedule:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  updateSchedule: async (id, data) => {
    try {
      const response = await api.put(`/schedules/${id}/`, data);
      console.log('Update schedule response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating schedule:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  // Employees (Owner only)
  getEmployees: async () => {
    try {
      const response = await api.get('/employees/');
      console.log('Get employees response:', response.data);
      const data = response.data.results || response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching employees:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  createEmployee: async (data) => {
    try {
      const response = await api.post('/employees/create/', data);
      console.log('Create employee response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating employee:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  updateEmployee: async (id, data) => {
    try {
      const response = await api.put(`/employees/${id}/`, data);
      console.log('Update employee response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating employee:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  getEmployeeVisits: async (employeeId) => {
    try {
      const response = await api.get(`/employees/${employeeId}/visits/`);
      console.log('Get employee visits response:', response.data);
      const data = response.data.results || response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching employee visits:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  // Dashboard stats
  getDashboardStats: async () => {
    try {
      const response = await api.get('/dashboard/stats/');
      console.log('Get dashboard stats response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  // User Profile
  getUserProfile: async () => {
    try {
      const response = await api.get('/auth/profile/');
      console.log('Get user profile response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },
};