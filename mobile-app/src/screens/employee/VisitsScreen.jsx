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

const VisitsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [visits, setVisits] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    try {
      const data = await dataService.getVisits();
      setVisits(data);
    } catch (error) {
      console.error('Error loading visits:', error);
      Alert.alert('Error', 'Failed to load visits');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVisits();
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

  const getTodayVisits = () => {
    const today = new Date().toISOString().split('T')[0];
    return visits.filter(visit => visit.visit_date === today);
  };

  const getUpcomingVisits = () => {
    const today = new Date().toISOString().split('T')[0];
    return visits.filter(visit => visit.visit_date > today && visit.status === 'scheduled');
  };

  const getPastVisits = () => {
    const today = new Date().toISOString().split('T')[0];
    return visits.filter(visit => visit.visit_date < today);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading visits...</Text>
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
          <Text style={styles.statNumber}>{getTodayVisits().length}</Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="schedule" size={24} color="#F59E0B" />
          <Text style={styles.statNumber}>{getUpcomingVisits().length}</Text>
          <Text style={styles.statLabel}>Upcoming</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="check-circle" size={24} color="#10B981" />
          <Text style={styles.statNumber}>
            {visits.filter(v => v.status === 'completed').length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="event" size={24} color="#8B5CF6" />
          <Text style={styles.statNumber}>{visits.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* Visits List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Visits</Text>
        {visits.length > 0 ? (
          visits.map((visit) => (
            <View key={visit.id} style={styles.visitCard}>
              <View style={styles.visitHeader}>
                <View style={styles.visitInfo}>
                  <Text style={styles.visitDoctor}>Dr. {visit.doctor_name}</Text>
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
              
              {visit.product_names && visit.product_names.length > 0 && (
                <View style={styles.productsContainer}>
                  <Text style={styles.productsLabel}>Products:</Text>
                  <Text style={styles.productsText}>
                    {visit.product_names.join(', ')}
                  </Text>
                </View>
              )}
              
              {visit.notes && (
                <View style={styles.notesContainer}>
                  <Text style={styles.notesLabel}>Notes:</Text>
                  <Text style={styles.notesText}>{visit.notes}</Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="event" size={64} color="#E5E7EB" />
            <Text style={styles.emptyTitle}>No visits found</Text>
            <Text style={styles.emptyText}>Start by scheduling your first visit</Text>
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
  visitCard: {
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
  visitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
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
  productsContainer: {
    marginBottom: 8,
  },
  productsLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 2,
  },
  productsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  notesContainer: {
    backgroundColor: '#F9FAFB',
    padding: 8,
    borderRadius: 6,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 2,
  },
  notesText: {
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

export default VisitsScreen;