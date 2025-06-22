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

const OwnerDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalVisits: 0,
    totalProducts: 0,
    totalOrganizations: 0,
    completedVisits: 0,
    pendingVisits: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [employees, visits, products, organizations] = await Promise.all([
        dataService.getEmployees(),
        dataService.getVisits(),
        dataService.getProducts(),
        dataService.getOrganizations()
      ]);

      const completedVisits = visits.filter(v => v.status === 'completed').length;
      const pendingVisits = visits.filter(v => v.status === 'scheduled').length;

      setStats({
        totalEmployees: employees.length,
        totalVisits: visits.length,
        totalProducts: products.length,
        totalOrganizations: organizations.length,
        completedVisits,
        pendingVisits
      });

      // Get recent activities (latest visits)
      setRecentActivities(visits.slice(0, 8));

      // Calculate top employees by visits
      const employeeVisitCounts = {};
      visits.forEach(visit => {
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
          <Text style={styles.greeting}>Company Overview</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Icon name="logout" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="people" size={30} color="#3B82F6" />
          <Text style={styles.statNumber}>{stats.totalEmployees}</Text>
          <Text style={styles.statLabel}>Employees</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="event" size={30} color="#10B981" />
          <Text style={styles.statNumber}>{stats.totalVisits}</Text>
          <Text style={styles.statLabel}>Total Visits</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="inventory" size={30} color="#8B5CF6" />
          <Text style={styles.statNumber}>{stats.totalProducts}</Text>
          <Text style={styles.statLabel}>Products</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="business" size={30} color="#F59E0B" />
          <Text style={styles.statNumber}>{stats.totalOrganizations}</Text>
          <Text style={styles.statLabel}>Organizations</Text>
        </View>
      </View>

      {/* Performance Cards */}
      <View style={styles.performanceContainer}>
        <View style={styles.performanceCard}>
          <Text style={styles.performanceTitle}>Visit Performance</Text>
          <View style={styles.performanceStats}>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Completed Visits</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${(stats.completedVisits / stats.totalVisits) * 100}%`,
                        backgroundColor: '#10B981'
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{stats.completedVisits}</Text>
              </View>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Pending Visits</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${(stats.pendingVisits / stats.totalVisits) * 100}%`,
                        backgroundColor: '#F59E0B'
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{stats.pendingVisits}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.performanceCard}>
          <Text style={styles.performanceTitle}>Top Performers</Text>
          <View style={styles.topEmployeesList}>
            {topEmployees.map((employee, index) => (
              <View key={employee.name} style={styles.topEmployeeItem}>
                <View style={styles.employeeRank}>
                  <Text style={styles.rankNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.employeeName}>{employee.name}</Text>
                <Text style={styles.employeeVisits}>{employee.visitCount} visits</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Recent Activities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        {recentActivities.length > 0 ? (
          recentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityIndicator} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>
                  <Text style={styles.activityEmployee}>{activity.employee_name}</Text> visited{' '}
                  <Text style={styles.activityDoctor}>{activity.doctor_name}</Text> at{' '}
                  <Text style={styles.activityOrg}>{activity.organization_name}</Text>
                </Text>
                <Text style={styles.activityDate}>
                  {formatDate(activity.visit_date)} at {activity.visit_time}
                </Text>
              </View>
              <View 
                style={[
                  styles.statusBadge, 
                  { backgroundColor: getStatusColor(activity.status) }
                ]}
              >
                <Text style={styles.statusText}>{activity.status}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No recent activities</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
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
  performanceContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  performanceCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  performanceStats: {
    gap: 16,
  },
  performanceItem: {
    gap: 8,
  },
  performanceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    minWidth: 30,
  },
  topEmployeesList: {
    gap: 12,
  },
  topEmployeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  employeeRank: {
    width: 24,
    height: 24,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumber: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  employeeName: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  employeeVisits: {
    fontSize: 12,
    color: '#6B7280',
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
  activityCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
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
  activityIndicator: {
    width: 8,
    height: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 4,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#1F2937',
  },
  activityEmployee: {
    fontWeight: 'bold',
  },
  activityDoctor: {
    fontWeight: 'bold',
  },
  activityOrg: {
    fontWeight: 'bold',
  },
  activityDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
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
});

export default OwnerDashboard;