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

const ProductsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await dataService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      Alert.alert('Error', 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getUniqueCategories = () => {
    const categories = [...new Set(products.map(product => product.category))];
    return categories.sort();
  };

  const getCategoryStats = () => {
    const stats = {};
    products.forEach(product => {
      stats[product.category] = (stats[product.category] || 0) + 1;
    });
    return stats;
  };

  const getProductStats = () => {
    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.is_active).length;
    const categories = getUniqueCategories().length;
    const avgPrice = products.length > 0 
      ? products.reduce((sum, p) => sum + parseFloat(p.price), 0) / products.length
      : 0;
    
    return { totalProducts, activeProducts, categories, avgPrice };
  };

  const stats = getProductStats();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading products...</Text>
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
          <Icon name="inventory" size={24} color="#3B82F6" />
          <Text style={styles.statNumber}>{stats.totalProducts}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="check-circle" size={24} color="#10B981" />
          <Text style={styles.statNumber}>{stats.activeProducts}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="category" size={24} color="#8B5CF6" />
          <Text style={styles.statNumber}>{stats.categories}</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="attach-money" size={24} color="#F59E0B" />
          <Text style={styles.statNumber}>{formatPrice(stats.avgPrice)}</Text>
          <Text style={styles.statLabel}>Avg Price</Text>
        </View>
      </View>

      {/* Products List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Products ({products.length})</Text>
        {products.length > 0 ? (
          products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productHeader}>
                <View style={styles.productIcon}>
                  <Icon name="inventory" size={24} color="#3B82F6" />
                </View>
                <View style={styles.productInfo}>
                  <View style={styles.productNameContainer}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.badgeContainer}>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{product.category}</Text>
                      </View>
                      <View style={[
                        styles.statusBadge,
                        { backgroundColor: product.is_active ? '#10B981' : '#EF4444' }
                      ]}>
                        <Text style={styles.statusText}>
                          {product.is_active ? 'Active' : 'Inactive'}
                        </Text>
                      </View>
                    </div>
                  </View>
                  
                  <Text style={styles.productDescription} numberOfLines={2}>
                    {product.description}
                  </Text>
                  
                  <View style={styles.productDetails}>
                    <View style={styles.priceContainer}>
                      <Icon name="attach-money" size={16} color="#10B981" />
                      <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
                    </View>
                    <Text style={styles.productDate}>
                      Added: {new Date(product.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="inventory" size={64} color="#E5E7EB" />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptyText}>Start by adding your first product</Text>
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
    fontSize: 18,
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
  productCard: {
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
  productHeader: {
    flexDirection: 'row',
  },
  productIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#EBF4FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productNameContainer: {
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: 'bold',
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
  productDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  productDate: {
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

export default ProductsScreen;