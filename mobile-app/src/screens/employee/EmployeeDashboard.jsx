import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmployeeDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalVisits: 0,
    completedVisits: 0,
    pendingVisits: 0,
    scheduledToday: 0
  });
  const [recentVisits, setRecentVisits] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [visits, schedules] = await Promise.all([
        dataService.getVisits(),
        dataService.getSchedules()
      ]);

      const totalVisits = visits.length;
      const completedVisits = visits.filter(v => v.status === 'completed').length;
      const pendingVisits = visits.filter(v => v.status === 'scheduled').length;
      const today = new Date().toISOString().split('T')[0];
      const scheduledToday = schedules.filter(s => s.date === today).length;

      setStats({
        totalVisits,
        completedVisits,
        pendingVisits,
        scheduledToday
      });

      setRecentVisits(visits.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'ongoing': return '#3B82F6';
      case 'scheduled': return '#F59E0B';
      default: return '#EF4444';
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{user?.first_name}!</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Icon name="logout" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="event" size={30} color="#3B82F6" />
          <Text style={styles.statNumber}>{stats.totalVisits}</Text>
          <Text style={styles.statLabel}>Total Visits</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="check-circle" size={30} color="#10B981" />
          <Text style={styles.statNumber}>{stats.completedVisits}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="schedule" size={30} color="#F59E0B" />
          <Text style={styles.statNumber}>{stats.pendingVisits}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="today" size={30} color="#8B5CF6" />
          <Text style={styles.statNumber}>{stats.scheduledToday}</Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Visits</Text>
        {recentVisits.length > 0 ? (
          recentVisits.map((visit) => (
            <View key={visit.id} style={styles.visitCard}>
              <View style={styles.visitInfo}>
                <Text style={styles.visitDoctor}>{visit.doctor_name}</Text>
                <Text style={styles.visitOrg}>{visit.organization_name}</Text>
                <Text style={styles.visitDate}>
                  {formatDate(visit.visit_date)} at {visit.visit_time}
                </Text>
              </View>
              <View 
                style={[
                  styles.statusBadge, 
                  { backgroundColor: getStatusColor(visit.status) }
                ]}
              >
                <Text style={styles.statusText}>{visit.status}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No recent visits</Text>
        )}
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('Visits')}
          >
            <Icon name="event" size={40} color="#3B82F6" />
            <Text style={styles.actionText}>View Visits</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('Schedules')}
          >
            <Icon name="schedule" size={40} color="#10B981" />
            <Text style={styles.actionText}>Schedules</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('Attendance')}
          >
            <Icon name="access-time" size={40} color="#F59E0B" />
            <Text style={styles.actionText}>Attendance</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  logoutButton: {
    padding: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
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
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  visitCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  visitInfo: {
    flex: 1,
  },
  visitDoctor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  visitOrg: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  visitDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 20,
  },
  quickActions: {
    padding: 20,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: 12,
    color: '#1F2937',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default EmployeeDashboard;