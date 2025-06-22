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

const Or ganizationsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [organizations, setOrganizations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      const data = await dataService.getOrganizations();
      setOrganizations(data);
    } catch (error) {
      console.error('Error loading organizations:', error);
      Alert.alert('Error', 'Failed to load organizations');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrganizations();
    setRefreshing(false);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'hospital': return '#EF4444';
      case 'clinic': return '#3B82F6';
      case 'pharmacy': return '#10B981';
      case 'laboratory': return '#8B5CF6';
      case 'other': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'hospital': return 'local-hospital';
      case 'clinic': return 'medical-services';
      case 'pharmacy': return 'local-pharmacy';
      case 'laboratory': return 'science';
      case 'other': return 'business';
      default: return 'business';
    }
  };

  const getTypeStats = () => {
    const stats = {};
    organizations.forEach(org => {
      stats[org.type] = (stats[org.type] || 0) + 1;
    });
    return stats;
  };

  const stats = getTypeStats();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading organizations...</Text>
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
          <Icon name="business" size={24} color="#3B82F6" />
          <Text style={styles.statNumber}>{organizations.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="local-hospital" size={24} color="#EF4444" />
          <Text style={styles.statNumber}>{stats.hospital || 0}</Text>
          <Text style={styles.statLabel}>Hospitals</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="medical-services" size={24} color="#3B82F6" />
          <Text style={styles.statNumber}>{stats.clinic || 0}</Text>
          <Text style={styles.statLabel}>Clinics</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="local-pharmacy" size={24} color="#10B981" />
          <Text style={styles.statNumber}>{stats.pharmacy || 0}</Text>
          <Text style={styles.statLabel}>Pharmacies</Text>
        </View>
      </View>

      {/* Organizations List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Organizations ({organizations.length})</Text>
        {organizations.length > 0 ? (
          organizations.map((organization) => (
            <View key={organization.id} style={styles.organizationCard}>
              <View style={styles.organizationHeader}>
                <View style={[
                  styles.organizationIcon,
                  { backgroundColor: `${getTypeColor(organization.type)}20` }
                ]}>
                  <Icon 
                    name={getTypeIcon(organization.type)} 
                    size={24} 
                    color={getTypeColor(organization.type)} 
                  />
                </View>
                <View style={styles.organizationInfo}>
                  <View style={styles.organizationNameContainer}>
                    <Text style={styles.organizationName}>{organization.name}</Text>
                    <View style={[
                      styles.typeBadge,
                      { backgroundColor: getTypeColor(organization.type) }
                    ]}>
                      <Text style={styles.typeText}>
                        {organization.type.charAt(0).toUpperCase() + organization.type.slice(1)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.organizationDetails}>
                    <View style={styles.detailItem}>
                      <Icon name="location-on" size={16} color="#6B7280" />
                      <Text style={styles.detailText} numberOfLines={2}>
                        {organization.address}
                      </Text>
                    </View>
                    
                    <View style={styles.detailItem}>
                      <Icon name="phone" size={16} color="#6B7280" />
                      <Text style={styles.detailText}>{organization.phone}</Text>
                    </View>
                    
                    {organization.email && (
                      <View style={styles.detailItem}>
                        <Icon name="email" size={16} color="#6B7280" />
                        <Text style={styles.detailText}>{organization.email}</Text>
                      </View>
                    )}
                  </View>
                  
                  <Text style={styles.organizationDate}>
                    Added: {new Date(organization.created_at).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="business" size={64} color="#E5E7EB" />
            <Text style={styles.emptyTitle}>No organizations found</Text>
            <Text style={styles.emptyText}>Start by adding your first organization</Text>
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
  organizationCard: {
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
  organizationHeader: {
    flexDirection: 'row',
  },
  organizationIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  organizationInfo: {
    flex: 1,
  },
  organizationNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  organizationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  organizationDetails: {
    gap: 6,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  organizationDate: {
    fontSize: 12,
    color: '#9CA3AF',
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

export default OrganizationsScreen;