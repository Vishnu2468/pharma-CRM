import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Modal,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import LeaveRequestModal from './LeaveRequestModal';

const AttendanceScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
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
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load attendance data'
      });
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAttendanceData();
    setRefreshing(false);
  };

  const handleMarkAttendance = async () => {
    setMarkingAttendance(true);
    try {
      await dataService.markAttendance({});
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Attendance marked successfully'
      });
      loadAttendanceData();
    } catch (error) {
      console.error('Error marking attendance:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to mark attendance'
      });
    } finally {
      setMarkingAttendance(false);
    }
  };

  const handleLeaveRequestSaved = () => {
    loadAttendanceData();
    setShowLeaveModal(false);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return '#10B981';
      case 'absent': return '#EF4444';
      case 'partial': return '#F59E0B';
      case 'leave': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getLeaveStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#10B981';
      case 'rejected': return '#EF4444';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return 'check-circle';
      case 'absent': return 'cancel';
      case 'partial': return 'warning';
      case 'leave': return 'event';
      default: return 'schedule';
    }
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
      <View style={styles.loadingContainer}>
        <Text>Loading attendance...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Attendance Management</Text>
        <TouchableOpacity 
          style={styles.leaveButton}
          onPress={() => setShowLeaveModal(true)}
        >
          <Icon name="add" size={20} color="#FFFFFF" />
          <Text style={styles.leaveButtonText}>Request Leave</Text>
        </TouchableOpacity>
      </View>

      {/* Today's Attendance Card */}
      <View style={styles.todayCard}>
        <Text style={styles.todayTitle}>Today's Attendance</Text>
        <Text style={styles.todayDate}>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
        
        {todayAttendance ? (
          <View style={styles.attendanceInfo}>
            <View style={styles.statusContainer}>
              <Icon 
                name={getStatusIcon(todayAttendance.status)} 
                size={24} 
                color={getStatusColor(todayAttendance.status)} 
              />
              <Text style={[
                styles.statusText, 
                { color: getStatusColor(todayAttendance.status) }
              ]}>
                {todayAttendance.status.charAt(0).toUpperCase() + todayAttendance.status.slice(1)}
              </Text>
            </View>
            
            <View style={styles.timeContainer}>
              <View style={styles.timeCard}>
                <Icon name="login" size={20} color="#10B981" />
                <Text style={styles.timeLabel}>Check In</Text>
                <Text style={styles.timeValue}>{formatTime(todayAttendance.check_in)}</Text>
              </View>
              <View style={styles.timeCard}>
                <Icon name="logout" size={20} color="#EF4444" />
                <Text style={styles.timeLabel}>Check Out</Text>
                <Text style={styles.timeValue}>{formatTime(todayAttendance.check_out)}</Text>
              </View>
            </View>
            
            {todayAttendance.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.notesLabel}>Notes:</Text>
                <Text style={styles.notesText}>{todayAttendance.notes}</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.noAttendanceContainer}>
            <Icon name="schedule" size={48} color="#E5E7EB" />
            <Text style={styles.noAttendanceTitle}>No attendance marked yet</Text>
            <Text style={styles.noAttendanceText}>Mark your attendance to start tracking</Text>
            <TouchableOpacity 
              style={styles.markButton}
              onPress={handleMarkAttendance}
              disabled={markingAttendance}
            >
              <Text style={styles.markButtonText}>
                {markingAttendance ? 'Marking...' : 'Mark Attendance'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="event" size={24} color="#3B82F6" />
          <Text style={styles.statNumber}>{stats.totalDays}</Text>
          <Text style={styles.statLabel}>Total Days</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="check-circle" size={24} color="#10B981" />
          <Text style={styles.statNumber}>{stats.presentDays}</Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="warning" size={24} color="#F59E0B" />
          <Text style={styles.statNumber}>{stats.partialDays}</Text>
          <Text style={styles.statLabel}>Partial</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="event" size={24} color="#3B82F6" />
          <Text style={styles.statNumber}>{stats.leaveDays}</Text>
          <Text style={styles.statLabel}>Leave</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="person" size={24} color="#8B5CF6" />
          <Text style={styles.statNumber}>{stats.attendanceRate}%</Text>
          <Text style={styles.statLabel}>Rate</Text>
        </View>
      </View>

      {/* Leave Requests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leave Requests</Text>
        {leaveRequests.length > 0 ? (
          leaveRequests.map((leave) => (
            <View key={leave.id} style={styles.leaveCard}>
              <View style={styles.leaveHeader}>
                <View style={styles.leaveInfo}>
                  <Text style={styles.leaveType}>
                    {leave.leave_type.charAt(0).toUpperCase() + leave.leave_type.slice(1)} Leave
                  </Text>
                  <Text style={styles.leaveDate}>
                    {formatDate(leave.start_date)} - {formatDate(leave.end_date)}
                  </Text>
                  <Text style={styles.leaveReason}>{leave.reason}</Text>
                  {leave.comments && (
                    <Text style={styles.leaveComments}>
                      Comments: {leave.comments}
                    </Text>
                  )}
                </View>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: getLeaveStatusColor(leave.status) }
                ]}>
                  <Text style={styles.statusBadgeText}>
                    {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="event-note" size={64} color="#E5E7EB" />
            <Text style={styles.emptyTitle}>No leave requests</Text>
            <Text style={styles.emptyText}>You haven't submitted any leave requests yet</Text>
          </View>
        )}
      </View>

      {/* Attendance History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendance History</Text>
        {attendance.length > 0 ? (
          attendance.map((record) => (
            <View key={record.id} style={styles.attendanceCard}>
              <View style={styles.attendanceHeader}>
                <View style={styles.attendanceInfo}>
                  <Text style={styles.attendanceDate}>
                    {formatDate(record.date)}
                  </Text>
                  <View style={styles.attendanceDetails}>
                    <Text style={styles.attendanceTime}>
                      In: {formatTime(record.check_in)}
                    </Text>
                    <Text style={styles.attendanceTime}>
                      Out: {formatTime(record.check_out)}
                    </Text>
                  </View>
                  {record.notes && (
                    <Text style={styles.attendanceNotes}>{record.notes}</Text>
                  )}
                </View>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: getStatusColor(record.status) }
                ]}>
                  <Text style={styles.statusBadgeText}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="schedule" size={64} color="#E5E7EB" />
            <Text style={styles.emptyTitle}>No attendance records</Text>
            <Text style={styles.emptyText}>Start marking your attendance to see history</Text>
          </View>
        )}
      </View>

      {/* Leave Request Modal */}
      <Modal
        visible={showLeaveModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLeaveModal(false)}
      >
        <LeaveRequestModal
          onClose={() => setShowLeaveModal(false)}
          onSave={handleLeaveRequestSaved}
        />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  leaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  leaveButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  todayCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  todayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  todayDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  attendanceInfo: {
    gap: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  timeCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 2,
  },
  notesContainer: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 12,
    color: '#6B7280',
  },
  noAttendanceContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  noAttendanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 4,
  },
  noAttendanceText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  markButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  markButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  leaveCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leaveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leaveInfo: {
    flex: 1,
  },
  leaveType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  leaveDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  leaveReason: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  leaveComments: {
    fontSize: 12,
    color: '#3B82F6',
  },
  attendanceCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  attendanceInfo: {
    flex: 1,
  },
  attendanceDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  attendanceDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 4,
  },
  attendanceTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  attendanceNotes: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default AttendanceScreen;