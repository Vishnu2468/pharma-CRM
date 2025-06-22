// // import React, { useState, useEffect } from 'react';
// // import { useAuth } from '../../contexts/AuthContext';
// // import { dataService } from '../../services/dataService';
// // import { Users, Plus, Search, Filter, User, Calendar, Phone, Mail, Eye } from 'lucide-react';
// // import EmployeeModal from './EmployeeModal';
// // import EmployeeVisitsModal from './EmployeeVisitsModal';

// // const EmployeesPage = () => {
// //   const { user } = useAuth();
// //   const [employees, setEmployees] = useState([]);
// //   const [filteredEmployees, setFilteredEmployees] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('all');
// //   const [showModal, setShowModal] = useState(false);
// //   const [showVisitsModal, setShowVisitsModal] = useState(false);
// //   const [selectedEmployee, setSelectedEmployee] = useState(null);

// //   useEffect(() => {
// //     if (user?.role === 'owner') {
// //       loadEmployees();
// //     }
// //   }, [user]);

// //   useEffect(() => {
// //     filterEmployees();
// //   }, [employees, searchQuery, statusFilter]);

// //   const loadEmployees = async () => {
// //     try {
// //       const data = await dataService.getEmployees();
// //       setEmployees(data);
// //     } catch (error) {
// //       console.error('Error loading employees:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filterEmployees = () => {
// //     let filtered = employees;

// //     if (searchQuery) {
// //       filtered = filtered.filter(employee =>
// //         employee.user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         employee.user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         employee.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         employee.employee_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         employee.designation.toLowerCase().includes(searchQuery.toLowerCase())
// //       );
// //     }

// //     if (statusFilter !== 'all') {
// //       const isActive = statusFilter === 'active';
// //       filtered = filtered.filter(employee => employee.is_active === isActive);
// //     }

// //     setFilteredEmployees(filtered);
// //   };

// //   const handleCreateEmployee = () => {
// //     setSelectedEmployee(null);
// //     setShowModal(true);
// //   };

// //   const handleEditEmployee = (employee) => {
// //     setSelectedEmployee(employee);
// //     setShowModal(true);
// //   };

// //   const handleViewVisits = (employee) => {
// //     setSelectedEmployee(employee);
// //     setShowVisitsModal(true);
// //   };

// //   const handleEmployeeSaved = () => {
// //     loadEmployees();
// //     setShowModal(false);
// //   };

// //   const formatDate = (dateString) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'short',
// //       day: 'numeric'
// //     });
// //   };

// //   const getEmployeeStats = () => {
// //     const totalEmployees = employees.length;
// //     const activeEmployees = employees.filter(emp => emp.is_active).length;
// //     const inactiveEmployees = totalEmployees - activeEmployees;
    
// //     return { totalEmployees, activeEmployees, inactiveEmployees };
// //   };

// //   const stats = getEmployeeStats();

// //   if (user?.role !== 'owner') {
// //     return (
// //       <div className="text-center py-12">
// //         <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
// //         <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
// //         <p className="text-gray-600">Only company owners can access employee management</p>
// //       </div>
// //     );
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
// //           <p className="text-gray-600">Manage your team members and track their performance</p>
// //         </div>
// //         <button
// //           onClick={handleCreateEmployee}
// //           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
// //         >
// //           <Plus className="h-5 w-5" />
// //           <span>Add Employee</span>
// //         </button>
// //       </div>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center">
// //             <div className="p-2 bg-blue-100 rounded-lg">
// //               <Users className="h-6 w-6 text-blue-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Total Employees</p>
// //               <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center">
// //             <div className="p-2 bg-green-100 rounded-lg">
// //               <User className="h-6 w-6 text-green-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Active</p>
// //               <p className="text-2xl font-bold text-gray-900">{stats.activeEmployees}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center">
// //             <div className="p-2 bg-red-100 rounded-lg">
// //               <User className="h-6 w-6 text-red-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Inactive</p>
// //               <p className="text-2xl font-bold text-gray-900">{stats.inactiveEmployees}</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Search and Filter */}
// //       <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //         <div className="flex flex-col md:flex-row gap-4">
// //           <div className="flex-1 relative">
// //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// //             <input
// //               type="text"
// //               placeholder="Search employees by name, email, ID, or designation..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //             />
// //           </div>
// //           <div className="relative">
// //             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// //             <select
// //               value={statusFilter}
// //               onChange={(e) => setStatusFilter(e.target.value)}
// //               className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //             >
// //               <option value="all">All Status</option>
// //               <option value="active">Active</option>
// //               <option value="inactive">Inactive</option>
// //             </select>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Employees List */}
// //       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// //         <div className="px-6 py-4 border-b border-gray-200">
// //           <h3 className="text-lg font-medium text-gray-900">
// //             All Employees ({filteredEmployees.length})
// //           </h3>
// //         </div>
// //         <div className="divide-y divide-gray-200">
// //           {filteredEmployees.length > 0 ? (
// //             filteredEmployees.map((employee) => (
// //               <div key={employee.id} className="p-6 hover:bg-gray-50 transition-colors">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center space-x-4">
// //                     <div className="flex-shrink-0">
// //                       <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
// //                         <User className="h-6 w-6 text-blue-600" />
// //                       </div>
// //                     </div>
// //                     <div className="flex-1">
// //                       <div className="flex items-center space-x-3 mb-1">
// //                         <h4 className="text-lg font-semibold text-gray-900">
// //                           {employee.user.first_name} {employee.user.last_name}
// //                         </h4>
// //                         <span className={`px-2 py-1 text-xs rounded-full ${
// //                           employee.is_active 
// //                             ? 'bg-green-100 text-green-800' 
// //                             : 'bg-red-100 text-red-800'
// //                         }`}>
// //                           {employee.is_active ? 'Active' : 'Inactive'}
// //                         </span>
// //                       </div>
                      
// //                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
// //                         <div className="flex items-center">
// //                           <User className="h-4 w-4 mr-2" />
// //                           ID: {employee.employee_id}
// //                         </div>
// //                         <div className="flex items-center">
// //                           <Mail className="h-4 w-4 mr-2" />
// //                           {employee.user.email}
// //                         </div>
// //                         <div className="flex items-center">
// //                           <Phone className="h-4 w-4 mr-2" />
// //                           {employee.phone}
// //                         </div>
// //                         <div className="flex items-center">
// //                           <Calendar className="h-4 w-4 mr-2" />
// //                           Joined: {formatDate(employee.joining_date)}
// //                         </div>
// //                       </div>
                      
// //                       <div className="mt-2">
// //                         <span className="text-sm font-medium text-gray-900">
// //                           {employee.designation}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>
                  
// //                   <div className="flex items-center space-x-2">
// //                     <button
// //                       onClick={() => handleViewVisits(employee)}
// //                       className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
// //                     >
// //                       <Eye className="h-4 w-4" />
// //                       <span>View Visits</span>
// //                     </button>
// //                     <button
// //                       onClick={() => handleEditEmployee(employee)}
// //                       className="text-gray-600 hover:text-gray-800 font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
// //                     >
// //                       Edit
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <div className="p-12 text-center">
// //               <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
// //               <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
// //               <p className="text-gray-600">
// //                 {searchQuery || statusFilter !== 'all' 
// //                   ? 'Try adjusting your search or filter criteria'
// //                   : 'Start by adding your first employee'
// //                 }
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Employee Modal */}
// //       {showModal && (
// //         <EmployeeModal
// //           employee={selectedEmployee}
// //           onClose={() => setShowModal(false)}
// //           onSave={handleEmployeeSaved}
// //         />
// //       )}

// //       {/* Employee Visits Modal */}
// //       {showVisitsModal && selectedEmployee && (
// //         <EmployeeVisitsModal
// //           employee={selectedEmployee}
// //           onClose={() => setShowVisitsModal(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default EmployeesPage;

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { dataService } from '../../services/dataService';
// import { Users, Plus, Search, Filter, User, Calendar, Phone, Mail, Eye } from 'lucide-react';
// import EmployeeModal from './EmployeeModal';
// import EmployeeVisitsModal from './EmployeeVisitsModal';

// const EmployeesPage = () => {
//   const { user } = useAuth();
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [showModal, setShowModal] = useState(false);
//   const [showVisitsModal, setShowVisitsModal] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   useEffect(() => {
//     if (user?.role === 'owner') {
//       loadEmployees();
//     } else {
//       setLoading(false);
//     }
//   }, [user]);

//   useEffect(() => {
//     filterEmployees();
//   }, [employees, searchQuery, statusFilter]);

//   const loadEmployees = async () => {
//     try {
//       const data = await dataService.getEmployees();
//       // Ensure data is an array
//       const employeesArray = Array.isArray(data) ? data : data?.data || [];
//       console.log('Employees data:', data); // Debug log
//       setEmployees(employeesArray);
//     } catch (error) {
//       console.error('Error loading employees:', error);
//       setError('Failed to load employees. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterEmployees = () => {
//     let filtered = [...employees]; // Create a copy to avoid mutating state

//     if (searchQuery) {
//       filtered = filtered.filter(employee =>
//         (employee.user?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
//         (employee.user?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
//         (employee.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
//         (employee.employee_id?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
//         (employee.designation?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
//       );
//     }

//     if (statusFilter !== 'all') {
//       const isActive = statusFilter === 'active';
//       filtered = filtered.filter(employee => employee.is_active === isActive);
//     }

//     setFilteredEmployees(filtered);
//   };

//   const handleCreateEmployee = () => {
//     setSelectedEmployee(null);
//     setShowModal(true);
//   };

//   const handleEditEmployee = (employee) => {
//     setSelectedEmployee(employee);
//     setShowModal(true);
//   };

//   const handleViewVisits = (employee) => {
//     setSelectedEmployee(employee);
//     setShowVisitsModal(true);
//   };

//   const handleEmployeeSaved = () => {
//     loadEmployees();
//     setShowModal(false);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   const getEmployeeStats = () => {
//     const totalEmployees = employees.length;
//     const activeEmployees = employees.filter(emp => emp.is_active).length;
//     const inactiveEmployees = totalEmployees - activeEmployees;

//     return { totalEmployees, activeEmployees, inactiveEmployees };
//   };

//   const stats = getEmployeeStats();

//   if (user?.role !== 'owner') {
//     return (
//       <div className="text-center py-12">
//         <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//         <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
//         <p className="text-gray-600">Only company owners can access employee management</p>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-lg font-medium text-red-600 mb-2">Error</h3>
//         <p className="text-gray-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
//           <p className="text-gray-600">Manage your team members and track their performance</p>
//         </div>
//         <button
//           onClick={handleCreateEmployee}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//         >
//           <Plus className="h-5 w-5" />
//           <span>Add Employee</span>
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <Users className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Employees</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <User className="h-6 w-6 text-green-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Active</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.activeEmployees}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-red-100 rounded-lg">
//               <User className="h-6 w-6 text-red-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Inactive</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.inactiveEmployees}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filter */}
//       <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search employees by name, email, ID, or designation..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="all">All Status</option>
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Employees List */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h3 className="text-lg font-medium text-gray-900">
//             All Employees ({filteredEmployees.length})
//           </h3>
//         </div>
//         <div className="divide-y divide-gray-200">
//           {filteredEmployees.length > 0 ? (
//             filteredEmployees.map((employee) => (
//               <div key={employee.id} className="p-6 hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex-shrink-0">
//                       <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                         <User className="h-6 w-6 text-blue-600" />
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center space-x-3 mb-1">
//                         <h4 className="text-lg font-semibold text-gray-900">
//                           {employee.user?.first_name || 'N/A'} {employee.user?.last_name || ''}
//                         </h4>
//                         <span
//                           className={`px-2 py-1 text-xs rounded-full ${
//                             employee.is_active
//                               ? 'bg-green-100 text-green-800'
//                               : 'bg-red-100 text-red-800'
//                           }`}
//                         >
//                           {employee.is_active ? 'Active' : 'Inactive'}
//                         </span>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
//                         <div className="flex items-center">
//                           <User className="h-4 w-4 mr-2" />
//                           ID: {employee.employee_id || 'N/A'}
//                         </div>
//                         <div className="flex items-center">
//                           <Mail className="h-4 w-4 mr-2" />
//                           {employee.user?.email || 'N/A'}
//                         </div>
//                         <div className="flex items-center">
//                           <Phone className="h-4 w-4 mr-2" />
//                           {employee.phone || 'N/A'}
//                         </div>
//                         <div className="flex items-center">
//                           <Calendar className="h-4 w-4 mr-2" />
//                           Joined: {formatDate(employee.joining_date)}
//                         </div>
//                       </div>

//                       <div className="mt-2">
//                         <span className="text-sm font-medium text-gray-900">
//                           {employee.designation || 'N/A'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => handleViewVisits(employee)}
//                       className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
//                     >
//                       <Eye className="h-4 w-4" />
//                       <span>View Visits</span>
//                     </button>
//                     <button
//                       onClick={() => handleEditEmployee(employee)}
//                       className="text-gray-600 hover:text-gray-800 font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="p-12 text-center">
//               <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
//               <p className="text-gray-600">
//                 {searchQuery || statusFilter !== 'all'
//                   ? 'Try adjusting your search or filter criteria'
//                   : 'Start by adding your first employee'}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Employee Modal */}
//       {showModal && (
//         <EmployeeModal
//           employee={selectedEmployee}
//           onClose={() => setShowModal(false)}
//           onSave={handleEmployeeSaved}
//         />
//       )}

//       {/* Employee Visits Modal */}
//       {showVisitsModal && selectedEmployee && (
//         <EmployeeVisitsModal
//           employee={selectedEmployee}
//           onClose={() => setShowVisitsModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default EmployeesPage;


import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Users, Plus, Search, Filter, User, Calendar, Phone, Mail, Eye, RefreshCw } from 'lucide-react';
import EmployeeModal from './EmployeeModal';
import EmployeeVisitsModal from './EmployeeVisitsModal';
import toast from 'react-hot-toast';

const EmployeesPage = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showVisitsModal, setShowVisitsModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (user?.role === 'owner') {
      loadEmployees();
    } else {
      setLoading(false);
      setError('Only company owners can access employee management');
    }
  }, [user]);

  useEffect(() => {
    filterEmployees();
  }, [employees, searchQuery, statusFilter]);

  const loadEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getEmployees();
      console.log('Employees data:', data); // Debug log
      setEmployees(data);
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Failed to load employees. Please try again.';
      console.error('Error loading employees:', errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filterEmployees = () => {
    let filtered = [...employees];

    if (searchQuery) {
      filtered = filtered.filter(employee =>
        (employee?.user?.first_name?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false) ||
        (employee?.user?.last_name?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false) ||
        (employee?.user?.email?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false) ||
        (employee?.employee_id?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false) ||
        (employee?.designation?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false)
      );
    }

    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      filtered = filtered.filter(employee => employee?.is_active === isActive);
    }

    setFilteredEmployees(filtered);
  };

  const handleCreateEmployee = () => {
    setSelectedEmployee(null);
    setShowModal(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleViewVisits = (employee) => {
    setSelectedEmployee(employee);
    setShowVisitsModal(true);
  };

  const handleEmployeeSaved = () => {
    loadEmployees();
    setShowModal(false);
    toast.success('Employee saved successfully');
  };

  const handleRetry = () => {
    loadEmployees();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getEmployeeStats = () => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp?.is_active).length;
    const inactiveEmployees = totalEmployees - activeEmployees;
    return { totalEmployees, activeEmployees, inactiveEmployees };
  };

  const stats = getEmployeeStats();

  if (user?.role !== 'owner') {
    return (
      <div className="text-center py-12">
        <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-red-600 mb-2">Error</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={handleRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto"
        >
          <RefreshCw className="h-5 w-5" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600">Manage your team members and track their performance</p>
        </div>
        <button
          onClick={handleCreateEmployee}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <User className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <User className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inactiveEmployees}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees by name, email, ID, or designation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employees List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            All Employees ({filteredEmployees.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <div key={employee.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {employee.user?.first_name || 'N/A'} {employee.user?.last_name || ''}
                        </h4>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            employee.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {employee.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          ID: {employee.employee_id || 'N/A'}
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {employee.user?.email || 'N/A'}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {employee.phone || 'N/A'}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Joined: {formatDate(employee.joining_date)}
                        </div>
                      </div>

                      <div className="mt-2">
                        <span className="text-sm font-medium text-gray-900">
                          {employee.designation || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewVisits(employee)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Visits</span>
                    </button>
                    <button
                      onClick={() => handleEditEmployee(employee)}
                      className="text-gray-600 hover:text-gray-800 font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
              <p className="text-gray-600">
                {searchQuery || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start by adding your first employee'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Employee Modal */}
      {showModal && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setShowModal(false)}
          onSave={handleEmployeeSaved}
        />
      )}

      {/* Employee Visits Modal */}
      {showVisitsModal && selectedEmployee && (
        <EmployeeVisitsModal
          employee={selectedEmployee}
          onClose={() => setShowVisitsModal(false)}
        />
      )}
    </div>
  );
};

export default EmployeesPage;