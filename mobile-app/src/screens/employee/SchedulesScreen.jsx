import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SchedulesScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      const data = await dataService.getSchedules();
      setSchedules(data.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      }));
    } catch (error) {
      console.error('Error loading schedules:', error);
      Alert.alert('Error', 'Failed to load schedules');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSchedules();
    setRefreshing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'visit': return '#3B82F6';
      case 'meeting': return '#8B5CF6';
      case 'training': return '#10B981';
      case 'other': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getTodaySchedules = () => {
    const today = new Date().toISOString().split('T')[0];
    return schedules.filter(schedule => schedule.date === today);
  };

  const getUpcomingSchedules = () => {
    const today = new Date().toISOString().split('T')[0];
    return schedules.filter(schedule => schedule.date > today && schedule.status === 'pending');
  };

  const getPendingSchedules = () => {
    return schedules.filter(schedule => schedule.status === 'pending');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading schedules...</Text>
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
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="today" size={24} color="#3B82F6" />
          <Text style={styles.statNumber}>{getTodaySchedules().length}</Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="schedule" size={24} color="#F59E0B" />
          <Text style={styles.statNumber}>{getUpcomingSchedules().length}</Text>
          <Text style={styles.statLabel}>Upcoming</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="pending" size={24} color="#8B5CF6" />
          <Text style={styles.statNumber}>{getPendingSchedules().length}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="event" size={24} color="#10B981" />
          <Text style={styles.statNumber}>{schedules.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* Schedules List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Schedules</Text>
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <View key={schedule.id} style={styles.scheduleCard}>
              <View style={styles.scheduleHeader}>
                <View style={styles.scheduleInfo}>
                  <Text style={styles.scheduleTitle}>{schedule.title}</Text>
                  <View style={styles.badgeContainer}>
                    <View 
                      style={[
                        styles.typeBadge, 
                        { backgroundColor: getTypeColor(schedule.type) }
                      ]}
                    >
                      <Text style={styles.badgeText}>{schedule.type}</Text>
                    </View>
                    <View 
                      style={[
                        styles.statusBadge, 
                        { backgroundColor: getStatusColor(schedule.status) }
                      ]}
                    >
                      <Text style={styles.badgeText}>{schedule.status}</Text>
                    </View>
                  </View>
                </View>
              </View>
              
              <View style={styles.scheduleDetails}>
                <View style={styles.detailRow}>
                  <Icon name="date-range" size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{formatDate(schedule.date)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="access-time" size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{formatTime(schedule.time)}</Text>
                </View>
              </View>
              
              {schedule.description && (
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionText}>{schedule.description}</Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="schedule" size={64} color="#E5E7EB" />
            <Text style={styles.emptyTitle}>No schedules found</Text>
            <Text style={styles.emptyText}>Start by creating your first schedule</Text>
          </View>
        )}
      </View>
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
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
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
  scheduleCard: {
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
  scheduleHeader: {
    marginBottom: 12,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  scheduleDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  descriptionContainer: {
    backgroundColor: '#F9FAFB',
    padding: 8,
    borderRadius: 6,
  },
  descriptionText: {
    fontSize: 12,
    color: '#6B7280',
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

export default SchedulesScreen;