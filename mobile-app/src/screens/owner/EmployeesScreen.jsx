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

const EmployeesScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'owner') {
      loadEmployees();
    }
  }, [user]);

  const loadEmployees = async () => {
    try {
      const data = await dataService.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error loading employees:', error);
      Alert.alert('Error', 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEmployees();
    setRefreshing(false);
  };

  const handleViewVisits = async (employee) => {
    try {
      const visits = await dataService.getEmployeeVisits(employee.id);
      Alert.alert(
        `${employee.user.first_name}'s Visits`,
        `Total visits: ${visits.length}\nCompleted: ${visits.filter(v => v.status === 'completed').length}\nScheduled: ${visits.filter(v => v.status === 'scheduled').length}`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error loading employee visits:', error);
      Alert.alert('Error', 'Failed to load employee visits');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEmployeeStats = () => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp.is_active).length;
    const inactiveEmployees = totalEmployees - activeEmployees;
    
    return { totalEmployees, activeEmployees, inactiveEmployees };
  };

  const stats = getEmployeeStats();

  if (user?.role !== 'owner') {
    return (
      <View style={styles.accessDeniedContainer}>
        <Icon name="people" size={64} color="#E5E7EB" />
        <Text style={styles.accessDeniedTitle}>Access Denied</Text>
        <Text style={styles.accessDeniedText}>Only company owners can access employee management</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading employees...</Text>
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
          <Icon name="people" size={24} color="#3B82F6" />
          <Text style={styles.statNumber}>{stats.totalEmployees}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="person" size={24} color="#10B981" />
          <Text style={styles.statNumber}>{stats.activeEmployees}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="person-off" size={24} color="#EF4444" />
          <Text style={styles.statNumber}>{stats.inactiveEmployees}</Text>
          <Text style={styles.statLabel}>Inactive</Text>
        </View>
      </View>

      {/* Employees List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Employees ({employees.length})</Text>
        {employees.length > 0 ? (
          employees.map((employee) => (
            <View key={employee.id} style={styles.employeeCard}>
              <View style={styles.employeeHeader}>
                <View style={styles.employeeAvatar}>
                  <Icon name="person" size={24} color="#3B82F6" />
                </View>
                <View style={styles.employeeInfo}>
                  <View style={styles.employeeNameContainer}>
                    <Text style={styles.employeeName}>
                      {employee.user.first_name} {employee.user.last_name}
                    </Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: employee.is_active ? '#10B981' : '#EF4444' }
                    ]}>
                      <Text style={styles.statusText}>
                        {employee.is_active ? 'Active' : 'Inactive'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.employeeDesignation}>{employee.designation}</Text>
                  <View style={styles.employeeDetails}>
                    <Text style={styles.employeeDetail}>ID: {employee.employee_id}</Text>
                    <Text style={styles.employeeDetail}>
                      Joined: {formatDate(employee.joining_date)}
                    </Text>
                  </View>
                  <View style={styles.employeeContact}>
                    <View style={styles.contactItem}>
                      <Icon name="email" size={16} color="#6B7280" />
                      <Text style={styles.contactText}>{employee.user.email}</Text>
                    </View>
                    <View style={styles.contactItem}>
                      <Icon name="phone" size={16} color="#6B7280" />
                      <Text style={styles.contactText}>{employee.phone}</Text>
                    </View>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.viewVisitsButton}
                onPress={() => handleViewVisits(employee)}
              >
                <Icon name="visibility" size={16} color="#3B82F6" />
                <Text style={styles.viewVisitsText}>View Visits</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="people" size={64} color="#E5E7EB" />
            <Text style={styles.emptyTitle}>No employees found</Text>
            <Text style={styles.emptyText}>Start by adding your first employee</Text>
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
  accessDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  accessDeniedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  accessDeniedText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-around',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
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
  employeeCard: {
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
  employeeHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  employeeAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#EBF4FF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  employeeDesignation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  employeeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  employeeDetail: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  employeeContact: {
    gap: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactText: {
    fontSize: 12,
    color: '#6B7280',
  },
  viewVisitsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF4FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 4,
  },
  viewVisitsText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: 'bold',
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

export default EmployeesScreen;