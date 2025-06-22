// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { dataService } from '../../services/dataService';
// import { Calendar, Clock, Plus, Filter, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
// import ScheduleModal from './ScheduleModal';

// const SchedulesPage = () => {
//   const { user } = useAuth();
//   const [schedules, setSchedules] = useState([]);
//   const [filteredSchedules, setFilteredSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [typeFilter, setTypeFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [showModal, setShowModal] = useState(false);
//   const [selectedSchedule, setSelectedSchedule] = useState(null);

//   useEffect(() => {
//     loadSchedules();
//   }, []);

//   useEffect(() => {
//     filterSchedules();
//   }, [schedules, typeFilter, statusFilter]);

//   const loadSchedules = async () => {
//     try {
//       const data = await dataService.getSchedules();
//       setSchedules(data);
//     } catch (error) {
//       console.error('Error loading schedules:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterSchedules = () => {
//     let filtered = schedules;

//     if (typeFilter !== 'all') {
//       filtered = filtered.filter(schedule => schedule.type === typeFilter);
//     }

//     if (statusFilter !== 'all') {
//       filtered = filtered.filter(schedule => schedule.status === statusFilter);
//     }

//     // Sort by date and time
//     filtered.sort((a, b) => {
//       const dateA = new Date(`${a.date}T${a.time}`);
//       const dateB = new Date(`${b.date}T${b.time}`);
//       return dateA - dateB;
//     });

//     setFilteredSchedules(filtered);
//   };

//   const handleCreateSchedule = () => {
//     setSelectedSchedule(null);
//     setShowModal(true);
//   };

//   const handleEditSchedule = (schedule) => {
//     setSelectedSchedule(schedule);
//     setShowModal(true);
//   };

//   const handleScheduleSaved = () => {
//     loadSchedules();
//     setShowModal(false);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'completed': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
//       case 'pending': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
//       case 'cancelled': return <XCircle className="h-5 w-5 text-red-600" />;
//       default: return <Clock className="h-5 w-5 text-gray-600" />;
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'visit': return 'bg-blue-100 text-blue-800';
//       case 'meeting': return 'bg-purple-100 text-purple-800';
//       case 'training': return 'bg-green-100 text-green-800';
//       case 'other': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       weekday: 'short'
//     });
//   };

//   const formatTime = (timeString) => {
//     return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const getTodaySchedules = () => {
//     const today = new Date().toISOString().split('T')[0];
//     return schedules.filter(schedule => schedule.date === today);
//   };

//   const getUpcomingSchedules = () => {
//     const today = new Date().toISOString().split('T')[0];
//     return schedules.filter(schedule => schedule.date > today && schedule.status === 'pending');
//   };

//   const getPastSchedules = () => {
//     const today = new Date().toISOString().split('T')[0];
//     return schedules.filter(schedule => schedule.date < today);
//   };

//   const getOngoingSchedules = () => {
//     const now = new Date();
//     const today = now.toISOString().split('T')[0];
//     const currentTime = now.toTimeString().slice(0, 5);
    
//     return schedules.filter(schedule => {
//       if (schedule.date !== today || schedule.status !== 'pending') return false;
//       return schedule.time <= currentTime;
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
//           <p className="text-gray-600">Manage your daily schedules and appointments</p>
//         </div>
//         {user?.role === 'employee' && (
//           <button
//             onClick={handleCreateSchedule}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//           >
//             <Plus className="h-5 w-5" />
//             <span>Add Schedule</span>
//           </button>
//         )}
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <Calendar className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Today's Schedules</p>
//               <p className="text-2xl font-bold text-gray-900">{getTodaySchedules().length}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <Clock className="h-6 w-6 text-green-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Upcoming</p>
//               <p className="text-2xl font-bold text-gray-900">{getUpcomingSchedules().length}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-yellow-100 rounded-lg">
//               <AlertCircle className="h-6 w-6 text-yellow-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Ongoing</p>
//               <p className="text-2xl font-bold text-gray-900">{getOngoingSchedules().length}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-purple-100 rounded-lg">
//               <CheckCircle className="h-6 w-6 text-purple-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Schedules</p>
//               <p className="text-2xl font-bold text-gray-900">{schedules.length}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex items-center space-x-2">
//             <Filter className="h-5 w-5 text-gray-400" />
//             <span className="text-sm font-medium text-gray-700">Filters:</span>
//           </div>
//           <div className="flex flex-wrap gap-4">
//             <select
//               value={typeFilter}
//               onChange={(e) => setTypeFilter(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="all">All Types</option>
//               <option value="visit">Visit</option>
//               <option value="meeting">Meeting</option>
//               <option value="training">Training</option>
//               <option value="other">Other</option>
//             </select>
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="all">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Schedules List */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h3 className="text-lg font-medium text-gray-900">
//             All Schedules ({filteredSchedules.length})
//           </h3>
//         </div>
//         <div className="divide-y divide-gray-200">
//           {filteredSchedules.length > 0 ? (
//             filteredSchedules.map((schedule) => (
//               <div key={schedule.id} className="p-6 hover:bg-gray-50 transition-colors">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-3 mb-2">
//                       {getStatusIcon(schedule.status)}
//                       <h4 className="text-lg font-semibold text-gray-900">
//                         {schedule.title}
//                       </h4>
//                       <div className="flex items-center space-x-2">
//                         <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(schedule.type)}`}>
//                           {schedule.type}
//                         </span>
//                         <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(schedule.status)}`}>
//                           {schedule.status}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                       <div className="flex items-center text-sm text-gray-600">
//                         <Calendar className="h-4 w-4 mr-2" />
//                         {formatDate(schedule.date)}
//                       </div>
//                       <div className="flex items-center text-sm text-gray-600">
//                         <Clock className="h-4 w-4 mr-2" />
//                         {formatTime(schedule.time)}
//                       </div>
//                     </div>
                    
//                     {schedule.description && (
//                       <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
//                         {schedule.description}
//                       </p>
//                     )}
//                   </div>
                  
//                   {user?.role === 'employee' && (
//                     <button
//                       onClick={() => handleEditSchedule(schedule)}
//                       className="ml-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
//                     >
//                       Edit
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="p-12 text-center">
//               <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No schedules found</h3>
//               <p className="text-gray-600">
//                 {typeFilter !== 'all' || statusFilter !== 'all' 
//                   ? 'Try adjusting your filter criteria'
//                   : 'Start by creating your first schedule'
//                 }
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Schedule Modal */}
//       {showModal && (
//         <ScheduleModal
//           schedule={selectedSchedule}
//           onClose={() => setShowModal(false)}
//           onSave={handleScheduleSaved}
//         />
//       )}
//     </div>
//   );
// };

// export default SchedulesPage;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Calendar, Clock, Plus, Filter, CheckCircle, AlertCircle, XCircle, RefreshCw } from 'lucide-react';
import ScheduleModal from './ScheduleModal';
import toast from 'react-hot-toast';

const SchedulesPage = () => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    if (user?.role === 'employee') {
      loadSchedules();
    } else {
      setLoading(false);
      setError('Only employees can access schedule management');
    }
  }, [user]);

  useEffect(() => {
    filterSchedules();
  }, [schedules, typeFilter, statusFilter]);

  const loadSchedules = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getSchedules();
      console.log('Fetched schedules:', data);
      const schedulesArray = Array.isArray(data.results) ? data.results : Array.isArray(data) ? data : [];
      console.log('Processed schedules:', schedulesArray);
      setSchedules(schedulesArray);
      if (schedulesArray.length === 0) {
        console.warn('No schedules returned. Check backend data or authentication.');
        setError('No schedules found. Create a schedule or check your permissions.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Failed to load schedules. Please try again.';
      console.error('Error loading schedules:', {
        message: errorMessage,
        status: error.response?.status,
        data: error.response?.data,
      });
      setError(errorMessage);
      toast.error(errorMessage);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  const filterSchedules = () => {
    let filtered = Array.isArray(schedules) ? [...schedules] : [];

    if (typeFilter !== 'all') {
      filtered = filtered.filter(schedule => schedule?.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(schedule => schedule?.status === statusFilter);
    }

    // Sort by date and time
    filtered.sort((a, b) => {
      const dateA = new Date(`${a?.date}T${a?.time}`);
      const dateB = new Date(`${b?.date}T${b?.time}`);
      return dateA - dateB;
    });

    setFilteredSchedules(filtered);
  };

  const handleCreateSchedule = () => {
    setSelectedSchedule(null);
    setShowModal(true);
  };

  const handleEditSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setShowModal(true);
  };

  const handleScheduleSaved = () => {
    loadSchedules();
    setShowModal(false);
    toast.success('Schedule saved successfully');
  };

  const handleRetry = () => {
    loadSchedules();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'visit': return 'bg-blue-100 text-blue-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      case 'training': return 'bg-green-100 text-green-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getTodaySchedules = () => {
    const today = new Date().toISOString().split('T')[0];
    return schedules.filter(schedule => schedule?.date === today);
  };

  const getUpcomingSchedules = () => {
    const today = new Date().toISOString().split('T')[0];
    return schedules.filter(schedule => schedule?.date > today && schedule?.status === 'pending');
  };

  const getPastSchedules = () => {
    const today = new Date().toISOString().split('T')[0];
    return schedules.filter(schedule => schedule?.date < today);
  };

  const getOngoingSchedules = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);
    return schedules.filter(schedule => {
      if (schedule?.date !== today || schedule?.status !== 'pending') return false;
      return schedule?.time <= currentTime;
    });
  };

  if (user?.role !== 'employee') {
    return (
      <div className="text-center py-12">
        <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-600">Only employees can access schedule management</p>
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
          <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
          <p className="text-gray-600">Manage your daily schedules and appointments</p>
        </div>
        {user?.role === 'employee' && (
          <button
            onClick={handleCreateSchedule}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Schedule</span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Schedules</p>
              <p className="text-2xl font-bold text-gray-900">{getTodaySchedules().length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{getUpcomingSchedules().length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ongoing</p>
              <p className="text-2xl font-bold text-gray-900">{getOngoingSchedules().length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Schedules</p>
              <p className="text-2xl font-bold text-gray-900">{schedules.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="visit">Visit</option>
              <option value="meeting">Meeting</option>
              <option value="training">Training</option>
              <option value="other">Other</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schedules List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            All Schedules ({filteredSchedules.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((schedule) => (
              <div key={schedule.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(schedule.status)}
                      <h4 className="text-lg font-semibold text-gray-900">
                        {schedule.title || 'Untitled Schedule'}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(schedule.type)}`}>
                          {schedule.type || 'N/A'}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(schedule.status)}`}>
                          {schedule.status || 'N/A'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(schedule.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {formatTime(schedule.time)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">Employee:</span>
                        {schedule.employee?.user?.first_name || ''} {schedule.employee?.user?.last_name || ''} ({schedule.employee?.employee_id || 'N/A'})
                      </div>
                    </div>
                    
                    {schedule.description && (
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {schedule.description}
                      </p>
                    )}
                  </div>
                  
                  {user?.role === 'employee' && (
                    <button
                      onClick={() => handleEditSchedule(schedule)}
                      className="ml-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No schedules found</h3>
              <p className="text-gray-600">
                {typeFilter !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your filter criteria'
                  : 'Start by creating your first schedule'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Modal */}
      {showModal && (
        <ScheduleModal
          schedule={selectedSchedule}
          onClose={() => setShowModal(false)}
          onSave={handleScheduleSaved}
        />
      )}
    </div>
  );
};

export default SchedulesPage;