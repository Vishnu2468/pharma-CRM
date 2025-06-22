import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Clock, Calendar, CheckCircle, XCircle, AlertCircle, User, Plus, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import LeaveRequestModal from './LeaveRequestModal';

const AttendancePage = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markingAttendance, setMarkingAttendance] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    loadAttendanceData();
  }, []);

  const loadAttendanceData = async () => {
    try {
      const [attendanceData, leaveData] = await Promise.all([
        dataService.getAttendance(),
        dataService.getLeaveRequests()
      ]);
      
      setAttendance(attendanceData);
      setLeaveRequests(leaveData);
      
      // Find today's attendance
      const today = new Date().toISOString().split('T')[0];
      const todayRecord = attendanceData.find(record => record.date === today);
      setTodayAttendance(todayRecord);
    } catch (error) {
      console.error('Error loading attendance data:', error);
      toast.error('Failed to load attendance data');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = async () => {
    setMarkingAttendance(true);
    try {
      await dataService.markAttendance({});
      toast.success('Attendance marked successfully');
      loadAttendanceData();
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast.error('Failed to mark attendance');
    } finally {
      setMarkingAttendance(false);
    }
  };

  const handleLeaveRequestSaved = () => {
    loadAttendanceData();
    setShowLeaveModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'leave': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeaveStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'absent': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'partial': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'leave': return <Calendar className="h-5 w-5 text-blue-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not recorded';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const getAttendanceStats = () => {
    const totalDays = attendance.length;
    const presentDays = attendance.filter(record => record.status === 'present').length;
    const absentDays = attendance.filter(record => record.status === 'absent').length;
    const partialDays = attendance.filter(record => record.status === 'partial').length;
    const leaveDays = attendance.filter(record => record.status === 'leave').length;
    
    const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
    
    return { totalDays, presentDays, absentDays, partialDays, leaveDays, attendanceRate };
  };

  const stats = getAttendanceStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600">Track your daily attendance, working hours, and leave requests</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowLeaveModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Request Leave</span>
          </button>
        </div>
      </div>

      {/* Today's Attendance Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Today's Attendance</h2>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </span>
          </div>
        </div>

        {todayAttendance ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(todayAttendance.status)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(todayAttendance.status)}`}>
                  {todayAttendance.status.charAt(0).toUpperCase() + todayAttendance.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Check In</p>
                  <p className="text-sm text-gray-600">{formatTime(todayAttendance.check_in)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Check Out</p>
                  <p className="text-sm text-gray-600">{formatTime(todayAttendance.check_out)}</p>
                </div>
              </div>
            </div>

            {todayAttendance.notes && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Notes:</strong> {todayAttendance.notes}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No attendance marked yet</h3>
            <p className="text-gray-600 mb-4">Mark your attendance to start tracking your work hours</p>
            <button
              onClick={handleMarkAttendance}
              disabled={markingAttendance}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-colors"
            >
              {markingAttendance ? 'Marking...' : 'Mark Attendance'}
            </button>
          </div>
        )}
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Days</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDays}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Present</p>
              <p className="text-2xl font-bold text-gray-900">{stats.presentDays}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Partial</p>
              <p className="text-2xl font-bold text-gray-900">{stats.partialDays}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Leave Days</p>
              <p className="text-2xl font-bold text-gray-900">{stats.leaveDays}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.attendanceRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Leave Requests</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {leaveRequests.length > 0 ? (
            leaveRequests.map((leave) => (
              <div key={leave.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {leave.leave_type.charAt(0).toUpperCase() + leave.leave_type.slice(1)} Leave
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formatDate(leave.start_date)} - {formatDate(leave.end_date)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{leave.reason}</p>
                      {leave.comments && (
                        <p className="text-sm text-blue-600 mt-1">
                          <strong>Comments:</strong> {leave.comments}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLeaveStatusColor(leave.status)}`}>
                    {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests</h3>
              <p className="text-gray-600">You haven't submitted any leave requests yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Attendance History</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {attendance.length > 0 ? (
            attendance.map((record) => (
              <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(record.status)}
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {formatDate(record.date)}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">
                          In: {formatTime(record.check_in)}
                        </span>
                        <span className="text-sm text-gray-600">
                          Out: {formatTime(record.check_out)}
                        </span>
                      </div>
                      {record.notes && (
                        <p className="text-sm text-gray-500 mt-1">{record.notes}</p>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No attendance records</h3>
              <p className="text-gray-600">Start marking your attendance to see history here</p>
            </div>
          )}
        </div>
      </div>

      {/* Leave Request Modal */}
      {showLeaveModal && (
        <LeaveRequestModal
          onClose={() => setShowLeaveModal(false)}
          onSave={handleLeaveRequestSaved}
        />
      )}
    </div>
  );
};

export default AttendancePage;