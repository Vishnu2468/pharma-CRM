// // import React, { useState, useEffect } from 'react';
// // import { useAuth } from '../../contexts/AuthContext';
// // import { dataService } from '../../services/dataService';
// // import { Users, Calendar, Package, Building2, TrendingUp, Activity } from 'lucide-react';

// // const OwnerDashboard = () => {
// //   const { user } = useAuth();
// //   const [stats, setStats] = useState({
// //     totalEmployees: 0,
// //     totalVisits: 0,
// //     totalProducts: 0,
// //     totalOrganizations: 0,
// //     completedVisits: 0,
// //     pendingVisits: 0
// //   });
// //   const [recentActivities, setRecentActivities] = useState([]);
// //   const [topEmployees, setTopEmployees] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadDashboardData();
// //   }, []);

// //   const loadDashboardData = async () => {
// //     try {
// //       const [employees, visits, products, organizations] = await Promise.all([
// //         dataService.getEmployees(),
// //         dataService.getVisits(),
// //         dataService.getProducts(),
// //         dataService.getOrganizations()
// //       ]);

// //       const completedVisits = visits.filter(v => v.status === 'completed').length;
// //       const pendingVisits = visits.filter(v => v.status === 'scheduled').length;

// //       setStats({
// //         totalEmployees: employees.length,
// //         totalVisits: visits.length,
// //         totalProducts: products.length,
// //         totalOrganizations: organizations.length,
// //         completedVisits,
// //         pendingVisits
// //       });

// //       // Get recent activities (latest visits)
// //       setRecentActivities(visits.slice(0, 8));

// //       // Calculate top employees by visits
// //       const employeeVisitCounts = {};
// //       visits.forEach(visit => {
// //         const employeeName = visit.employee_name || `Employee ${visit.employee}`;
// //         employeeVisitCounts[employeeName] = (employeeVisitCounts[employeeName] || 0) + 1;
// //       });

// //       const topEmployeesList = Object.entries(employeeVisitCounts)
// //         .map(([name, count]) => ({ name, visitCount: count }))
// //         .sort((a, b) => b.visitCount - a.visitCount)
// //         .slice(0, 5);

// //       setTopEmployees(topEmployeesList);
// //     } catch (error) {
// //       console.error('Error loading dashboard data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return <div className="flex justify-center items-center h-64">Loading dashboard...</div>;
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <h1 className="text-2xl font-bold text-gray-900">
// //           Company Overview
// //         </h1>
// //         <div className="text-sm text-gray-500">
// //           {new Date().toLocaleDateString('en-US', { 
// //             weekday: 'long', 
// //             year: 'numeric', 
// //             month: 'long', 
// //             day: 'numeric' 
// //           })}
// //         </div>
// //       </div>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
// //               <Calendar className="h-6 w-6 text-green-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Total Visits</p>
// //               <p className="text-2xl font-bold text-gray-900">{stats.totalVisits}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center">
// //             <div className="p-2 bg-purple-100 rounded-lg">
// //               <Package className="h-6 w-6 text-purple-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Products</p>
// //               <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center">
// //             <div className="p-2 bg-orange-100 rounded-lg">
// //               <Building2 className="h-6 w-6 text-orange-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Organizations</p>
// //               <p className="text-2xl font-bold text-gray-900">{stats.totalOrganizations}</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Performance Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center justify-between mb-4">
// //             <h3 className="text-lg font-medium text-gray-900">Visit Performance</h3>
// //             <TrendingUp className="h-5 w-5 text-gray-400" />
// //           </div>
// //           <div className="space-y-4">
// //             <div className="flex justify-between items-center">
// //               <span className="text-sm text-gray-600">Completed Visits</span>
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-24 bg-gray-200 rounded-full h-2">
// //                   <div 
// //                     className="bg-green-600 h-2 rounded-full" 
// //                     style={{ width: `${(stats.completedVisits / stats.totalVisits) * 100}%` }}
// //                   ></div>
// //                 </div>
// //                 <span className="text-sm font-medium text-gray-900">{stats.completedVisits}</span>
// //               </div>
// //             </div>
// //             <div className="flex justify-between items-center">
// //               <span className="text-sm text-gray-600">Pending Visits</span>
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-24 bg-gray-200 rounded-full h-2">
// //                   <div 
// //                     className="bg-yellow-600 h-2 rounded-full" 
// //                     style={{ width: `${(stats.pendingVisits / stats.totalVisits) * 100}%` }}
// //                   ></div>
// //                 </div>
// //                 <span className="text-sm font-medium text-gray-900">{stats.pendingVisits}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center justify-between mb-4">
// //             <h3 className="text-lg font-medium text-gray-900">Top Performers</h3>
// //             <Activity className="h-5 w-5 text-gray-400" />
// //           </div>
// //           <div className="space-y-3">
// //             {topEmployees.map((employee, index) => (
// //               <div key={employee.name} className="flex items-center justify-between">
// //                 <div className="flex items-center space-x-3">
// //                   <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
// //                     <span className="text-sm font-medium text-blue-600">{index + 1}</span>
// //                   </div>
// //                   <span className="text-sm text-gray-900">{employee.name}</span>
// //                 </div>
// //                 <span className="text-sm font-medium text-gray-600">{employee.visitCount} visits</span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Recent Activities */}
// //       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// //         <div className="p-6 border-b border-gray-200">
// //           <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
// //         </div>
// //         <div className="p-6">
// //           {recentActivities.length > 0 ? (
// //             <div className="space-y-4">
// //               {recentActivities.map((activity) => (
// //                 <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
// //                   <div className="flex items-center space-x-4">
// //                     <div className="flex-shrink-0">
// //                       <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-gray-900">
// //                         <span className="font-medium">{activity.employee_name}</span> visited{' '}
// //                         <span className="font-medium">{activity.doctor_name}</span> at{' '}
// //                         <span className="font-medium">{activity.organization_name}</span>
// //                       </p>
// //                       <p className="text-xs text-gray-500">{activity.visit_date} at {activity.visit_time}</p>
// //                     </div>
// //                   </div>
// //                   <span className={`px-2 py-1 text-xs rounded-full ${
// //                     activity.status === 'completed' ? 'bg-green-100 text-green-800' :
// //                     activity.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
// //                     activity.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
// //                     'bg-red-100 text-red-800'
// //                   }`}>
// //                     {activity.status}
// //                   </span>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <p className="text-gray-500 text-center py-4">No recent activities</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OwnerDashboard;

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { dataService } from '../../services/dataService';
// import { Users, Calendar, Package, Building2, TrendingUp, Activity } from 'lucide-react';

// const OwnerDashboard = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     totalEmployees: 0,
//     totalVisits: 0,
//     totalProducts: 0,
//     totalOrganizations: 0,
//     completedVisits: 0,
//     pendingVisits: 0,
//   });
//   const [recentActivities, setRecentActivities] = useState([]);
//   const [topEmployees, setTopEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     try {
//       const [employees, visits, products, organizations] = await Promise.all([
//         dataService.getEmployees(),
//         dataService.getVisits(),
//         dataService.getProducts(),
//         dataService.getOrganizations(),
//       ]);

//       // Ensure all responses are arrays
//       const employeesArray = Array.isArray(employees) ? employees : employees?.data || [];
//       const visitsArray = Array.isArray(visits) ? visits : visits?.data || [];
//       const productsArray = Array.isArray(products) ? products : products?.data || [];
//       const organizationsArray = Array.isArray(organizations) ? organizations : organizations?.data || [];

//       // Log for debugging
//       console.log('Visits data:', visits);

//       const completedVisits = visitsArray.filter(v => v.status === 'completed').length;
//       const pendingVisits = visitsArray.filter(v => v.status === 'scheduled').length;

//       setStats({
//         totalEmployees: employeesArray.length,
//         totalVisits: visitsArray.length,
//         totalProducts: productsArray.length,
//         totalOrganizations: organizationsArray.length,
//         completedVisits,
//         pendingVisits,
//       });

//       // Set recent activities
//       setRecentActivities(visitsArray.slice(0, 8));

//       // Calculate top employees by visits
//       const employeeVisitCounts = {};
//       visitsArray.forEach(visit => {
//         const employeeName = visit.employee_name || `Employee ${visit.employee}`;
//         employeeVisitCounts[employeeName] = (employeeVisitCounts[employeeName] || 0) + 1;
//       });

//       const topEmployeesList = Object.entries(employeeVisitCounts)
//         .map(([name, count]) => ({ name, visitCount: count }))
//         .sort((a, b) => b.visitCount - a.visitCount)
//         .slice(0, 5);

//       setTopEmployees(topEmployeesList);
//     } catch (error) {
//       console.error('Error loading dashboard data:', error);
//       setError('Failed to load dashboard data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-64">Loading dashboard...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500 text-center py-4">{error}</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Company Overview</h1>
//         <div className="text-sm text-gray-500">
//           {new Date().toLocaleDateString('en-US', {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//           })}
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
//               <Calendar className="h-6 w-6 text-green-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Visits</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.totalVisits}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-purple-100 rounded-lg">
//               <Package className="h-6 w-6 text-purple-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Products</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-orange-100 rounded-lg">
//               <Building2 className="h-6 w-6 text-orange-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Organizations</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.totalOrganizations}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Performance Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-medium text-gray-900">Visit Performance</h3>
//             <TrendingUp className="h-5 w-5 text-gray-400" />
//           </div>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-600">Completed Visits</span>
//               <div className="flex items-center space-x-2">
//                 <div className="w-24 bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-green-600 h-2 rounded-full"
//                     style={{ width: `${stats.totalVisits ? (stats.completedVisits / stats.totalVisits) * 100 : 0}%` }}
//                   ></div>
//                 </div>
//                 <span className="text-sm font-medium text-gray-900">{stats.completedVisits}</span>
//               </div>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-600">Pending Visits</span>
//               <div className="flex items-center space-x-2">
//                 <div className="w-24 bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-yellow-600 h-2 rounded-full"
//                     style={{ width: `${stats.totalVisits ? (stats.pendingVisits / stats.totalVisits) * 100 : 0}%` }}
//                   ></div>
//                 </div>
//                 <span className="text-sm font-medium text-gray-900">{stats.pendingVisits}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-medium text-gray-900">Top Performers</h3>
//             <Activity className="h-5 w-5 text-gray-400" />
//           </div>
//           <div className="space-y-3">
//             {topEmployees.length > 0 ? (
//               topEmployees.map((employee, index) => (
//                 <div key={employee.name} className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                       <span className="text-sm font-medium text-blue-600">{index + 1}</span>
//                     </div>
//                     <span className="text-sm text-gray-900">{employee.name}</span>
//                   </div>
//                   <span className="text-sm font-medium text-gray-600">{employee.visitCount} visits</span>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-sm">No top performers data available</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Recent Activities */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
//         </div>
//         <div className="p-6">
//           {recentActivities.length > 0 ? (
//             <div className="space-y-4">
//               {recentActivities.map((activity) => (
//                 <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex-shrink-0">
//                       <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-900">
//                         <span className="font-medium">{activity.employee_name || 'Unknown Employee'}</span> visited{' '}
//                         <span className="font-medium">{activity.doctor_name || 'Unknown Doctor'}</span> at{' '}
//                         <span className="font-medium">{activity.organization_name || 'Unknown Organization'}</span>
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {activity.visit_date || 'N/A'} at {activity.visit_time || 'N/A'}
//                       </p>
//                     </div>
//                   </div>
//                   <span
//                     className={`px-2 py-1 text-xs rounded-full ${
//                       activity.status === 'completed'
//                         ? 'bg-green-100 text-green-800'
//                         : activity.status === 'ongoing'
//                         ? 'bg-blue-100 text-blue-800'
//                         : activity.status === 'scheduled'
//                         ? 'bg-yellow-100 text-yellow-800'
//                         : 'bg-red-100 text-red-800'
//                     }`}
//                   >
//                     {activity.status || 'Unknown'}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500 text-center py-4">No recent activities</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OwnerDashboard;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Users, Calendar, Package, Building2, TrendingUp, Activity } from 'lucide-react';

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalVisits: 0,
    totalProducts: 0,
    totalOrganizations: 0,
    completedVisits: 0,
    pendingVisits: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.role === 'owner') {
      loadDashboardData();
    } else {
      setLoading(false);
      setError('Access restricted to company owners.');
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const [statsData, visits] = await Promise.all([
        dataService.getDashboardStats(),
        dataService.getVisits(),
      ]);

      // Ensure visits is an array
      const visitsArray = Array.isArray(visits) ? visits : visits?.data || [];

      // Set stats from dashboard stats endpoint
      setStats({
        totalEmployees: statsData.total_employees || 0,
        totalVisits: statsData.total_visits || 0,
        totalProducts: statsData.total_products || 0,
        totalOrganizations: statsData.total_organizations || 0,
        completedVisits: statsData.completed_visits || 0,
        pendingVisits: statsData.pending_visits || 0,
      });

      // Set recent activities
      setRecentActivities(visitsArray.slice(0, 8));

      // Calculate top employees by visits
      const employeeVisitCounts = {};
      visitsArray.forEach(visit => {
        const employeeName = visit.employee_name || `Employee ${visit.employee}`;
        employeeVisitCounts[employeeName] = (employeeVisitCounts[employeeName] || 0) + 1;
      });

      const topEmployeesList = Object.entries(employeeVisitCounts)
        .map(([name, count]) => ({ name, visitCount: count }))
        .sort((a, b) => b.visitCount - a.visitCount)
        .slice(0, 5);

      setTopEmployees(topEmployeesList);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (user?.role !== 'owner') {
    return <div className="text-center py-4">Access restricted to company owners.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Company Overview</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Visits</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalVisits}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Building2 className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Organizations</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrganizations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Visit Performance</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completed Visits</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${stats.totalVisits ? (stats.completedVisits / stats.totalVisits) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{stats.completedVisits}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Visits</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: `${stats.totalVisits ? (stats.pendingVisits / stats.totalVisits) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{stats.pendingVisits}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Top Performers</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {topEmployees.length > 0 ? (
              topEmployees.map((employee, index) => (
                <div key={employee.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <span className="text-sm text-gray-900">{employee.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{employee.visitCount} visits</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No top performers data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
        </div>
        <div className="p-6">
          {recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.employee_name || 'Unknown Employee'}</span> visited{' '}
                        <span className="font-medium">{activity.doctor_name || 'Unknown Doctor'}</span> at{' '}
                        <span className="font-medium">{activity.organization_name || 'Unknown Organization'}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.visit_date || 'N/A'} at {activity.visit_time || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      activity.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : activity.status === 'ongoing'
                        ? 'bg-blue-100 text-blue-800'
                        : activity.status === 'scheduled'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {activity.status || 'Unknown'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent activities</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;