// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { dataService } from '../../services/dataService';
// import { Calendar, Clock, Users, Package, CheckCircle, AlertCircle } from 'lucide-react';

// const EmployeeDashboard = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     totalVisits: 0,
//     completedVisits: 0,
//     pendingVisits: 0,
//     scheduledToday: 0
//   });
//   const [recentVisits, setRecentVisits] = useState([]);
//   const [upcomingSchedules, setUpcomingSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     try {
//       const [visits, schedules] = await Promise.all([
//         dataService.getVisits(),
//         dataService.getSchedules()
//       ]);

//       // Calculate stats
//       const totalVisits = visits.length;
//       const completedVisits = visits.filter(v => v.status === 'completed').length;
//       const pendingVisits = visits.filter(v => v.status === 'scheduled').length;
//       const today = new Date().toISOString().split('T')[0];
//       const scheduledToday = schedules.filter(s => s.date === today).length;

//       setStats({
//         totalVisits,
//         completedVisits,
//         pendingVisits,
//         scheduledToday
//       });

//       setRecentVisits(visits.slice(0, 5));
//       setUpcomingSchedules(schedules.filter(s => s.status === 'pending').slice(0, 5));
//     } catch (error) {
//       console.error('Error loading dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-64">Loading dashboard...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">
//           Welcome back, {user.first_name}!
//         </h1>
//         <div className="text-sm text-gray-500">
//           {new Date().toLocaleDateString('en-US', { 
//             weekday: 'long', 
//             year: 'numeric', 
//             month: 'long', 
//             day: 'numeric' 
//           })}
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <Calendar className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Visits</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.totalVisits}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <CheckCircle className="h-6 w-6 text-green-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Completed</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.completedVisits}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-yellow-100 rounded-lg">
//               <AlertCircle className="h-6 w-6 text-yellow-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Pending</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.pendingVisits}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-purple-100 rounded-lg">
//               <Clock className="h-6 w-6 text-purple-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Today's Schedule</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.scheduledToday}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-lg font-medium text-gray-900">Recent Visits</h3>
//           </div>
//           <div className="p-6">
//             {recentVisits.length > 0 ? (
//               <div className="space-y-4">
//                 {recentVisits.map((visit) => (
//                   <div key={visit.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-900">{visit.doctor_name}</p>
//                       <p className="text-sm text-gray-600">{visit.organization_name}</p>
//                       <p className="text-xs text-gray-500">{visit.visit_date} at {visit.visit_time}</p>
//                     </div>
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       visit.status === 'completed' ? 'bg-green-100 text-green-800' :
//                       visit.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
//                       visit.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-red-100 text-red-800'
//                     }`}>
//                       {visit.status}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center py-4">No recent visits</p>
//             )}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-lg font-medium text-gray-900">Upcoming Schedules</h3>
//           </div>
//           <div className="p-6">
//             {upcomingSchedules.length > 0 ? (
//               <div className="space-y-4">
//                 {upcomingSchedules.map((schedule) => (
//                   <div key={schedule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-900">{schedule.title}</p>
//                       <p className="text-sm text-gray-600">{schedule.description}</p>
//                       <p className="text-xs text-gray-500">{schedule.date} at {schedule.time}</p>
//                     </div>
//                     <span className={`px-2 py-1 text-xs rounded-full capitalize ${
//                       schedule.type === 'visit' ? 'bg-blue-100 text-blue-800' :
//                       schedule.type === 'meeting' ? 'bg-green-100 text-green-800' :
//                       schedule.type === 'training' ? 'bg-purple-100 text-purple-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {schedule.type}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center py-4">No upcoming schedules</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalVisits: 0,
    completedVisits: 0,
    pendingVisits: 0,
    scheduledToday: 0,
  });
  const [recentVisits, setRecentVisits] = useState([]);
  const [upcomingSchedules, setUpcomingSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.role === 'employee') {
      loadDashboardData();
    } else {
      setLoading(false);
      setError('Access restricted to employees.');
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const [statsData, visits, schedules] = await Promise.all([
        dataService.getDashboardStats(),
        dataService.getVisits(),
        dataService.getSchedules(),
      ]);

      // Ensure arrays
      const visitsArray = Array.isArray(visits) ? visits : visits?.data || [];
      const schedulesArray = Array.isArray(schedules) ? schedules : schedules?.data || [];

      // Use stats from dashboard stats endpoint
      const today = new Date().toISOString().split('T')[0];
      const scheduledToday = schedulesArray.filter(s => s.date === today && s.status === 'pending').length;

      setStats({
        totalVisits: statsData.total_visits || 0,
        completedVisits: statsData.completed_visits || 0,
        pendingVisits: statsData.pending_visits || 0,
        scheduledToday,
      });

      // Set recent visits and upcoming schedules
      setRecentVisits(visitsArray.slice(0, 5));
      setUpcomingSchedules(schedulesArray.filter(s => s.status === 'pending').slice(0, 5));
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

  if (user?.role !== 'employee') {
    return <div className="text-center py-4">Access restricted to employees.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.first_name || 'Employee'}!</h1>
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
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Visits</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalVisits}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedVisits}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingVisits}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Schedule</p>
              <p className="text-2xl font-bold text-gray-900">{stats.scheduledToday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Visits</h3>
          </div>
          <div className="p-6">
            {recentVisits.length > 0 ? (
              <div className="space-y-4">
                {recentVisits.map((visit) => (
                  <div key={visit.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{visit.doctor_name || 'Unknown Doctor'}</p>
                      <p className="text-sm text-gray-600">{visit.organization_name || 'Unknown Organization'}</p>
                      <p className="text-xs text-gray-500">
                        {visit.visit_date || 'N/A'} at {visit.visit_time || 'N/A'}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        visit.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : visit.status === 'ongoing'
                          ? 'bg-blue-100 text-blue-800'
                          : visit.status === 'scheduled'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {visit.status || 'Unknown'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent visits</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Schedules</h3>
          </div>
          <div className="p-6">
            {upcomingSchedules.length > 0 ? (
              <div className="space-y-4">
                {upcomingSchedules.map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{schedule.title || 'Untitled'}</p>
                      <p className="text-sm text-gray-600">{schedule.description || 'No description'}</p>
                      <p className="text-xs text-gray-500">
                        {schedule.date || 'N/A'} at {schedule.time || 'N/A'}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full capitalize ${
                        schedule.type === 'visit'
                          ? 'bg-blue-100 text-blue-800'
                          : schedule.type === 'meeting'
                          ? 'bg-green-100 text-green-800'
                          : schedule.type === 'training'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {schedule.type || 'Other'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming schedules</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;