// // // import React, { useState, useEffect } from 'react';
// // // import { useAuth } from '../../contexts/AuthContext';
// // // import { dataService } from '../../services/dataService';
// // // import { Package, Plus, Search, Filter, DollarSign, Tag, Edit, Trash2 } from 'lucide-react';
// // // import ProductModal from './ProductModal';
// // // import toast from 'react-hot-toast';

// // // const ProductsPage = () => {
// // //   const { user } = useAuth();
// // //   const [products, setProducts] = useState([]);
// // //   const [filteredProducts, setFilteredProducts] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchQuery, setSearchQuery] = useState('');
// // //   const [categoryFilter, setCategoryFilter] = useState('all');
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [selectedProduct, setSelectedProduct] = useState(null);

// // //   useEffect(() => {
// // //     loadProducts();
// // //   }, []);

// // //   useEffect(() => {
// // //     filterProducts();
// // //   }, [products, searchQuery, categoryFilter]);

// // //   const loadProducts = async () => {
// // //     try {
// // //       const data = await dataService.getProducts();
// // //       setProducts(data);
// // //     } catch (error) {
// // //       console.error('Error loading products:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const filterProducts = () => {
// // //     let filtered = products;

// // //     if (searchQuery) {
// // //       filtered = filtered.filter(product =>
// // //         product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //         product.category.toLowerCase().includes(searchQuery.toLowerCase())
// // //       );
// // //     }

// // //     if (categoryFilter !== 'all') {
// // //       filtered = filtered.filter(product => product.category === categoryFilter);
// // //     }

// // //     setFilteredProducts(filtered);
// // //   };

// // //   const handleCreateProduct = () => {
// // //     setSelectedProduct(null);
// // //     setShowModal(true);
// // //   };

// // //   const handleEditProduct = (product) => {
// // //     setSelectedProduct(product);
// // //     setShowModal(true);
// // //   };

// // //   const handleDeleteProduct = async (productId) => {
// // //     if (window.confirm('Are you sure you want to delete this product?')) {
// // //       try {
// // //         await dataService.deleteProduct(productId);
// // //         toast.success('Product deleted successfully');
// // //         loadProducts();
// // //       } catch (error) {
// // //         console.error('Error deleting product:', error);
// // //         toast.error('Failed to delete product');
// // //       }
// // //     }
// // //   };

// // //   const handleProductSaved = () => {
// // //     loadProducts();
// // //     setShowModal(false);
// // //   };

// // //   const getUniqueCategories = () => {
// // //     const categories = [...new Set(products.map(product => product.category))];
// // //     return categories.sort();
// // //   };

// // //   const getCategoryStats = () => {
// // //     const stats = {};
// // //     products.forEach(product => {
// // //       stats[product.category] = (stats[product.category] || 0) + 1;
// // //     });
// // //     return stats;
// // //   };

// // //   const formatPrice = (price) => {
// // //     return new Intl.NumberFormat('en-US', {
// // //       style: 'currency',
// // //       currency: 'USD'
// // //     }).format(price);
// // //   };

// // //   const stats = getCategoryStats();
// // //   const categories = getUniqueCategories();

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-64">
// // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="flex items-center justify-between">
// // //         <div>
// // //           <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
// // //           <p className="text-gray-600">Manage pharmaceutical products and medications</p>
// // //         </div>
// // //         {user?.role === 'owner' && (
// // //           <button
// // //             onClick={handleCreateProduct}
// // //             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
// // //           >
// // //             <Plus className="h-5 w-5" />
// // //             <span>Add Product</span>
// // //           </button>
// // //         )}
// // //       </div>

// // //       {/* Stats Cards */}
// // //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// // //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // //           <div className="flex items-center">
// // //             <div className="p-2 bg-blue-100 rounded-lg">
// // //               <Package className="h-6 w-6 text-blue-600" />
// // //             </div>
// // //             <div className="ml-4">
// // //               <p className="text-sm font-medium text-gray-600">Total Products</p>
// // //               <p className="text-2xl font-bold text-gray-900">{products.length}</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // //           <div className="flex items-center">
// // //             <div className="p-2 bg-green-100 rounded-lg">
// // //               <DollarSign className="h-6 w-6 text-green-600" />
// // //             </div>
// // //             <div className="ml-4">
// // //               <p className="text-sm font-medium text-gray-600">Avg. Price</p>
// // //               <p className="text-2xl font-bold text-gray-900">
// // //                 {products.length > 0 
// // //                   ? formatPrice(products.reduce((sum, p) => sum + parseFloat(p.price), 0) / products.length)
// // //                   : '$0.00'
// // //                 }
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // //           <div className="flex items-center">
// // //             <div className="p-2 bg-purple-100 rounded-lg">
// // //               <Tag className="h-6 w-6 text-purple-600" />
// // //             </div>
// // //             <div className="ml-4">
// // //               <p className="text-sm font-medium text-gray-600">Categories</p>
// // //               <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // //           <div className="flex items-center">
// // //             <div className="p-2 bg-orange-100 rounded-lg">
// // //               <Package className="h-6 w-6 text-orange-600" />
// // //             </div>
// // //             <div className="ml-4">
// // //               <p className="text-sm font-medium text-gray-600">Active Products</p>
// // //               <p className="text-2xl font-bold text-gray-900">
// // //                 {products.filter(p => p.is_active).length}
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Search and Filter */}
// // //       <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // //         <div className="flex flex-col md:flex-row gap-4">
// // //           <div className="flex-1 relative">
// // //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// // //             <input
// // //               type="text"
// // //               placeholder="Search products by name, description, or category..."
// // //               value={searchQuery}
// // //               onChange={(e) => setSearchQuery(e.target.value)}
// // //               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //             />
// // //           </div>
// // //           <div className="relative">
// // //             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// // //             <select
// // //               value={categoryFilter}
// // //               onChange={(e) => setCategoryFilter(e.target.value)}
// // //               className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //             >
// // //               <option value="all">All Categories</option>
// // //               {categories.map(category => (
// // //                 <option key={category} value={category}>{category}</option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Products Grid */}
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //         {filteredProducts.length > 0 ? (
// // //           filteredProducts.map((product) => (
// // //             <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
// // //               <div className="flex items-start justify-between mb-4">
                
// // //                 <div className="flex items-center space-x-3">
// // //                   <div className="p-2 bg-blue-100 rounded-lg">
// // //                     <Package className="h-6 w-6 text-blue-600" />
// // //                   </div>
// // //                   <div>
// // //                     <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
// // //                     <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
// // //                       {product.category}
// // //                     </span>
// // //                   </div>
// // //                 </div>
// // //                 {user?.role === 'owner' && (
// // //                   <div className="flex items-center space-x-2">
// // //                     <button
// // //                       onClick={() => handleEditProduct(product)}
// // //                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// // //                     >
// // //                       <Edit className="h-4 w-4" />
// // //                     </button>
// // //                     <button
// // //                       onClick={() => handleDeleteProduct(product.id)}
// // //                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// // //                     >
// // //                       <Trash2 className="h-4 w-4" />
// // //                     </button>
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               <div className="space-y-3">
// // //                 <p className="text-sm text-gray-600">{product.description}</p>

// // //                 <div className="flex items-center justify-between">
// // //                   <div className="flex items-center space-x-2">
// // //                     <DollarSign className="h-4 w-4 text-green-600" />
// // //                     <span className="text-lg font-bold text-green-600">
// // //                       {formatPrice(product.price)}
// // //                     </span>
// // //                   </div>
// // //                   <span className={`px-2 py-1 text-xs rounded-full ${
// // //                     product.is_active 
// // //                       ? 'bg-green-100 text-green-800' 
// // //                       : 'bg-red-100 text-red-800'
// // //                   }`}>
// // //                     {product.is_active ? 'Active' : 'Inactive'}
// // //                   </span>
// // //                 </div>
// // //               </div>

// // //               <div className="mt-4 pt-4 border-t border-gray-200">
// // //                 <p className="text-xs text-gray-500">
// // //                   Added on {new Date(product.created_at).toLocaleDateString()}
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           ))
// // //         ) : (
// // //           <div className="col-span-full">
// // //             <div className="text-center py-12">
// // //               <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
// // //               <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
// // //               <p className="text-gray-600">
// // //                 {searchQuery || categoryFilter !== 'all' 
// // //                   ? 'Try adjusting your search or filter criteria'
// // //                   : 'Start by adding your first product'
// // //                 }
// // //               </p>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Product Modal */}
// // //       {showModal && (
// // //         <ProductModal
// // //           product={selectedProduct}
// // //           onClose={() => setShowModal(false)}
// // //           onSave={handleProductSaved}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default ProductsPage;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { useAuth } from '../../contexts/AuthContext';
// // // // import { dataService } from '../../services/dataService';
// // // // import { Package, Plus, Search, Filter, DollarSign, Tag, Edit, Trash2 } from 'lucide-react';
// // // // import ProductModal from './ProductModal';
// // // // import toast from 'react-hot-toast';

// // // // const ProductsPage = () => {
// // // //   const { user } = useAuth();
// // // //   const [products, setProducts] = useState([]);
// // // //   const [filteredProducts, setFilteredProducts] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [searchQuery, setSearchQuery] = useState('');
// // // //   const [categoryFilter, setCategoryFilter] = useState('all');
// // // //   const [showModal, setShowModal] = useState(false);
// // // //   const [selectedProduct, setSelectedProduct] = useState(null);

// // // //   useEffect(() => {
// // // //     loadProducts();
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     filterProducts();
// // // //   }, [products, searchQuery, categoryFilter]);

// // // //   const loadProducts = async () => {
// // // //     try {
// // // //       const data = await dataService.getProducts();
// // // //       setProducts(Array.isArray(data) ? data : []);
// // // //     } catch (error) {
// // // //       console.error('Error loading products:', error);
// // // //       toast.error('Failed to load products');
// // // //       setProducts([]);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const filterProducts = () => {
// // // //     let filtered = Array.isArray(products) ? products : [];

// // // //     if (searchQuery) {
// // // //       filtered = filtered.filter((product) =>
// // // //         product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // //         product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // //         product.category?.toLowerCase().includes(searchQuery.toLowerCase())
// // // //       );
// // // //     }

// // // //     if (categoryFilter !== 'all') {
// // // //       filtered = filtered.filter((product) => product.category === categoryFilter);
// // // //     }

// // // //     setFilteredProducts(filtered);
// // // //   };

// // // //   const handleCreateProduct = () => {
// // // //     setSelectedProduct(null);
// // // //     setShowModal(true);
// // // //   };

// // // //   const handleEditProduct = (product) => {
// // // //     setSelectedProduct(product);
// // // //     setShowModal(true);
// // // //   };

// // // //   const handleDeleteProduct = async (productId) => {
// // // //     if (window.confirm('Are you sure you want to delete this product?')) {
// // // //       try {
// // // //         await dataService.deleteProduct(productId);
// // // //         toast.success('Product deleted successfully');
// // // //         await loadProducts();
// // // //       } catch (error) {
// // // //         console.error('Error deleting product:', error);
// // // //         toast.error('Failed to delete product');
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleProductSaved = async () => {
// // // //     await loadProducts();
// // // //     setShowModal(false);
// // // //   };

// // // //   const getUniqueCategories = () => {
// // // //     const categories = [
// // // //       ...new Set((Array.isArray(products) ? products : []).map((product) => product.category)),
// // // //     ];
// // // //     return categories.sort();
// // // //   };

// // // //   const getCategoryStats = () => {
// // // //     const stats = {};
// // // //     (Array.isArray(products) ? products : []).forEach((product) => {
// // // //       stats[product.category] = (stats[product.category] || 0) + 1;
// // // //     });
// // // //     return stats;
// // // //   };

// // // //   const formatPrice = (price) => {
// // // //     return new Intl.NumberFormat('en-US', {
// // // //       style: 'currency',
// // // //       currency: 'USD',
// // // //     }).format(price || 0);
// // // //   };

// // // //   const stats = getCategoryStats();
// // // //   const categories = getUniqueCategories();

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-64">
// // // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="space-y-6">
// // // //       <div className="flex items-center justify-between">
// // // //         <div>
// // // //           <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
// // // //           <p className="text-gray-600">Manage pharmaceutical products and medications</p>
// // // //         </div>
// // // //         {user?.role === 'owner' && (
// // // //           <button
// // // //             onClick={handleCreateProduct}
// // // //             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
// // // //           >
// // // //             <Plus className="h-5 w-5" />
// // // //             <span>Add Product</span>
// // // //           </button>
// // // //         )}
// // // //       </div>

// // // //       {/* Stats Cards */}
// // // //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// // // //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // // //           <div className="flex items-center">
// // // //             <div className="p-2 bg-blue-100 rounded-lg">
// // // //               <Package className="h-6 w-6 text-blue-600" />
// // // //             </div>
// // // //             <div className="ml-4">
// // // //               <p className="text-sm font-medium text-gray-600">Total Products</p>
// // // //               <p className="text-2xl font-bold text-gray-900">{products.length}</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // // //           <div className="flex items-center">
// // // //             <div className="p-2 bg-green-100 rounded-lg">
// // // //               <DollarSign className="h-6 w-6 text-green-600" />
// // // //             </div>
// // // //             <div className="ml-4">
// // // //               <p className="text-sm font-medium text-gray-600">Avg. Price</p>
// // // //               <p className="text-2xl font-bold text-gray-900">
// // // //                 {products.length > 0
// // // //                   ? formatPrice(
// // // //                       products.reduce((sum, p) => sum + parseFloat(p.price || 0), 0) / products.length
// // // //                     )
// // // //                   : '$0.00'}
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // // //           <div className="flex items-center">
// // // //             <div className="p-2 bg-purple-100 rounded-lg">
// // // //               <Tag className="h-6 w-6 text-purple-600" />
// // // //             </div>
// // // //             <div className="ml-4">
// // // //               <p className="text-sm font-medium text-gray-600">Categories</p>
// // // //               <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // // //           <div className="flex items-center">
// // // //             <div className="p-2 bg-orange-100 rounded-lg">
// // // //               <Package className="h-6 w-6 text-orange-600" />
// // // //             </div>
// // // //             <div className="ml-4">
// // // //               <p className="text-sm font-medium text-gray-600">Active Products</p>
// // // //               <p className="text-2xl font-bold text-gray-900">
// // // //                 {(Array.isArray(products) ? products : []).filter((p) => p.is_active).length}
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Search and Filter */}
// // // //       <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // // //         <div className="flex flex-col md:flex-row gap-4">
// // // //           <div className="flex-1 relative">
// // // //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Search products by name, description, or category..."
// // // //               value={searchQuery}
// // // //               onChange={(e) => setSearchQuery(e.target.value)}
// // // //               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //             />
// // // //           </div>
// // // //           <div className="relative">
// // // //             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// // // //             <select
// // // //               value={categoryFilter}
// // // //               onChange={(e) => setCategoryFilter(e.target.value)}
// // // //               className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //             >
// // // //               <option value="all">All Categories</option>
// // // //               {categories.map((category) => (
// // // //                 <option key={category || 'unknown'} value={category}>
// // // //                   {category || 'Unknown'}
// // // //                 </option>
// // // //               ))}
// // // //             </select>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Products Grid */}
// // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //         {filteredProducts.length > 0 ? (
// // // //           filteredProducts.map((product) => (
// // // //             <div
// // // //               key={product.id}
// // // //               className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
// // // //             >
// // // //               <div className="flex items-start justify-between mb-4">
// // // //                 <div className="flex items-center space-x-3">
// // // //                   <div className="p-2 bg-blue-100 rounded-lg">
// // // //                     <Package className="h-6 w-6 text-blue-600" />
// // // //                   </div>
// // // //                   <div>
// // // //                     <h3 className="text-lg font-semibold text-gray-900">{product.name || 'Unnamed Product'}</h3>
// // // //                     <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
// // // //                       {product.category || 'Uncategorized'}
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>
// // // //                 {user?.role === 'owner' && (
// // // //                   <div className="flex items-center space-x-2">
// // // //                     <button
// // // //                       onClick={() => handleEditProduct(product)}
// // // //                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// // // //                     >
// // // //                       <Edit className="h-4 w-4" />
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={() => handleDeleteProduct(product.id)}
// // // //                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// // // //                     >
// // // //                       <Trash2 className="h-4 w-4" />
// // // //                     </button>
// // // //                   </div>
// // // //                 )}
// // // //               </div>

// // // //               <div className="space-y-3">
// // // //                 <p className="text-sm text-gray-600">{product.description || 'No description available'}</p>

// // // //                 <div className="flex items-center justify-between">
// // // //                   <div className="flex items-center space-x-2">
// // // //                     <DollarSign className="h-4 w-4 text-green-600" />
// // // //                     <span className="text-lg font-bold text-green-600">{formatPrice(product.price)}</span>
// // // //                   </div>
// // // //                   <span
// // // //                     className={`px-2 py-1 text-xs rounded-full ${
// // // //                       product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
// // // //                     }`}
// // // //                   >
// // // //                     {product.is_active ? 'Active' : 'Inactive'}
// // // //                   </span>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="mt-4 pt-4 border-t border-gray-200">
// // // //                 <p className="text-xs text-gray-500">
// // // //                   Added on {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'N/A'}
// // // //                 </p>
// // // //               </div>
// // // //             </div>
// // // //           ))
// // // //         ) : (
// // // //           <div className="col-span-full">
// // // //             <div className="text-center py-12">
// // // //               <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
// // // //               <h3 className="text-lg font-medium text-gray-900 mb-2">
// // // //                 {products.length === 0 ? 'No products available' : 'No products found'}
// // // //               </h3>
// // // //               <p className="text-gray-600">
// // // //                 {products.length === 0
// // // //                   ? 'Start by adding your first product'
// // // //                   : searchQuery || categoryFilter !== 'all'
// // // //                   ? 'Try adjusting your search or filter criteria'
// // // //                   : 'No products match the current criteria'}
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* Product Modal */}
// // // //       {showModal && (
// // // //         <ProductModal
// // // //           product={selectedProduct}
// // // //           onClose={() => setShowModal(false)}
// // // //           onSave={handleProductSaved}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProductsPage;

// // import React, { useState, useEffect } from 'react';
// // import { useAuth } from '../../contexts/AuthContext';
// // import { dataService } from '../../services/dataService';
// // import { Package, Plus, Search, Filter, DollarSign, Tag, Edit, Trash2 } from 'lucide-react';
// // import ProductModal from './ProductModal';
// // import toast from 'react-hot-toast';

// // const ProductsPage = () => {
// //   const { user } = useAuth();
// //   const [products, setProducts] = useState([]);
// //   const [filteredProducts, setFilteredProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [categoryFilter, setCategoryFilter] = useState('all');
// //   const [showModal, setShowModal] = useState(false);
// //   const [selectedProduct, setSelectedProduct] = useState(null);

// //   useEffect(() => {
// //     loadProducts();
// //   }, []);

// //   useEffect(() => {
// //     filterProducts();
// //   }, [products, searchQuery, categoryFilter]);

// //   const loadProducts = async () => {
// //     setLoading(true);
// //     try {
// //       const data = await dataService.getProducts();
// //       console.log('Fetched products:', data); // Debug log
// //       if (!Array.isArray(data)) {
// //         throw new Error('Expected an array of products');
// //       }
// //       setProducts(data);
// //     } catch (error) {
// //       console.error('Error loading products:', error.response?.data || error.message);
// //       toast.error('Failed to load products');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filterProducts = () => {
// //     let filtered = products;

// //     if (searchQuery) {
// //       filtered = filtered.filter(product =>
// //         product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
// //         product.category.toLowerCase().includes(searchQuery.toLowerCase())
// //       );
// //     }

// //     if (categoryFilter !== 'all') {
// //       filtered = filtered.filter(product => product.category === categoryFilter);
// //     }

// //     setFilteredProducts(filtered);
// //   };

// //   const handleCreateProduct = () => {
// //     setSelectedProduct(null);
// //     setShowModal(true);
// //   };

// //   const handleEditProduct = (product) => {
// //     setSelectedProduct(product);
// //     setShowModal(true);
// //   };

// //   const handleDeleteProduct = async (productId) => {
// //     if (window.confirm('Are you sure you want to delete this product?')) {
// //       try {
// //         await dataService.deleteProduct(productId);
// //         toast.success('Product deleted successfully');
// //         loadProducts();
// //       } catch (error) {
// //         console.error('Error deleting product:', error.response?.data || error.message);
// //         toast.error('Failed to delete product');
// //       }
// //     }
// //   };

// //   const handleProductSaved = () => {
// //     loadProducts();
// //     setShowModal(false);
// //   };

// //   const getUniqueCategories = () => {
// //     const categories = [...new Set(products.map(product => product.category))];
// //     return categories.sort();
// //   };

// //   const getCategoryStats = () => {
// //     const stats = {};
// //     products.forEach(product => {
// //       stats[product.category] = (stats[product.category] || 0) + 1;
// //     });
// //     return stats;
// //   };

// //   const formatPrice = (price) => {
// //     return new Intl.NumberFormat('en-US', {
// //       style: 'currency',
// //       currency: 'USD'
// //     }).format(price);
// //   };

// //   const stats = getCategoryStats();
// //   const categories = getUniqueCategories();

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
// //           <p className="text-gray-600">Manage pharmaceutical products and medications</p>
// //         </div>
// //         {user?.role === 'owner' && (
// //           <button
// //             onClick={handleCreateProduct}
// //             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
// //           >
// //             <Plus className="h-5 w-5" />
// //             <span>Add Product</span>
// //           </button>
// //         )}
// //       </div>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center">
// //             <div className="p-2 bg-blue-100 rounded-lg">
// //               <Package className="h-6 w-6 text-blue-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Total Products</p>
// //               <p className="text-2xl font-bold text-gray-900">{products.length}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center">
// //             <div className="p-2 bg-green-100 rounded-lg">
// //               <DollarSign className="h-6 w-6 text-green-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Avg. Price</p>
// //               <p className="text-2xl font-bold text-gray-900">
// //                 {products.length > 0 
// //                   ? formatPrice(products.reduce((sum, p) => sum + parseFloat(p.price), 0) / products.length)
// //                   : '$0.00'
// //                 }
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center">
// //             <div className="p-2 bg-purple-100 rounded-lg">
// //               <Tag className="h-6 w-6 text-purple-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Categories</p>
// //               <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center">
// //             <div className="p-2 bg-orange-100 rounded-lg">
// //               <Package className="h-6 w-6 text-orange-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Active Products</p>
// //               <p className="text-2xl font-bold text-gray-900">
// //                 {products.filter(p => p.is_active).length}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Search and Filter */}
// //       <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //         <div className="flex flex-col md:flex-row gap-4">
// //           <div className="flex-1 relative">
// //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// //             <input
// //               type="text"
// //               placeholder="Search products by name, description, or category..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //             />
// //           </div>
// //           <div className="relative">
// //             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// //             <select
// //               value={categoryFilter}
// //               onChange={(e) => setCategoryFilter(e.target.value)}
// //               className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //             >
// //               <option value="all">All Categories</option>
// //               {categories.map(category => (
// //                 <option key={category} value={category}>{category}</option>
// //               ))}
// //             </select>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Products Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {filteredProducts.length > 0 ? (
// //           filteredProducts.map((product) => (
// //             <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
// //               <div className="flex items-start justify-between mb-4">
// //                 <div className="flex items-center space-x-3">
// //                   <div className="p-2 bg-blue-100 rounded-lg">
// //                     <Package className="h-6 w-6 text-blue-600" />
// //                   </div>
// //                   <div>
// //                     <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
// //                     <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
// //                       {product.category}
// //                     </span>
// //                   </div>
// //                 </div>
// //                 {user?.role === 'owner' && (
// //                   <div className="flex items-center space-x-2">
// //                     <button
// //                       onClick={() => handleEditProduct(product)}
// //                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// //                     >
// //                       <Edit className="h-4 w-4" />
// //                     </button>
// //                     <button
// //                       onClick={() => handleDeleteProduct(product.id)}
// //                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// //                     >
// //                       <Trash2 className="h-4 w-4" />
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>

// //               <div className="space-y-3">
// //                 <p className="text-sm text-gray-600">{product.description || 'No description available'}</p>

// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center space-x-2">
// //                     <DollarSign className="h-4 w-4 text-green-600" />
// //                     <span className="text-lg font-bold text-green-600">
// //                       {formatPrice(product.price)}
// //                     </span>
// //                   </div>
// //                   <span className={`px-2 py-1 text-xs rounded-full ${
// //                     product.is_active 
// //                       ? 'bg-green-100 text-green-800' 
// //                       : 'bg-red-100 text-red-800'
// //                   }`}>
// //                     {product.is_active ? 'Active' : 'Inactive'}
// //                   </span>
// //                 </div>
// //               </div>

// //               <div className="mt-4 pt-4 border-t border-gray-200">
// //                 <p className="text-xs text-gray-500">
// //                   Added on {new Date(product.created_at).toLocaleDateString()}
// //                 </p>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <div className="col-span-full">
// //             <div className="text-center py-12">
// //               <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
// //               <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
// //               <p className="text-gray-600">
// //                 {searchQuery || categoryFilter !== 'all' 
// //                   ? 'Try adjusting your search or filter criteria'
// //                   : 'Start by adding your first product'
// //                 }
// //               </p>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Product Modal */}
// //       {showModal && (
// //         <ProductModal
// //           product={selectedProduct}
// //           onClose={() => setShowModal(false)}
// //           onSave={handleProductSaved}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default ProductsPage;

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { dataService } from '../../services/dataService';
// import { Package, Plus, Search, Filter, DollarSign, Tag, Edit, Trash2 } from 'lucide-react';
// import ProductModal from './ProductModal';
// import toast from 'react-hot-toast';

// const ProductsPage = () => {
//   const { user } = useAuth();
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   useEffect(() => {
//     filterProducts();
//   }, [products, searchQuery, categoryFilter]);

//   const loadProducts = async () => {
//     setLoading(true);
//     try {
//       const data = await dataService.getProducts();
//       console.log('Fetched products:', data, typeof data, Array.isArray(data));

//       // Handle nested results (e.g., { results: [] }) or direct array
//       const productsArray = Array.isArray(data.results)
//         ? data.results
//         : Array.isArray(data)
//         ? data
//         : [];

//       setProducts(productsArray);
//       if (productsArray.length === 0) {
//         console.warn('No products returned from API. Check backend data or authentication.');
//       }
//     } catch (error) {
//       console.error('Error loading products:', {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       toast.error(error.message || 'Failed to load products');
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterProducts = () => {
//     let filtered = Array.isArray(products) ? [...products] : [];

//     if (searchQuery) {
//       filtered = filtered.filter(product =>
//         product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         product.category?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (categoryFilter !== 'all') {
//       filtered = filtered.filter(product => product.category === categoryFilter);
//     }

//     setFilteredProducts(filtered);
//   };

//   const handleCreateProduct = () => {
//     setSelectedProduct(null);
//     setShowModal(true);
//   };

//   const handleEditProduct = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   const handleDeleteProduct = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await dataService.deleteProduct(productId);
//         toast.success('Product deleted successfully');
//         loadProducts();
//       } catch (error) {
//         console.error('Error deleting product:', {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data,
//         });
//         toast.error(error.message || 'Failed to delete product');
//       }
//     }
//   };

//   const handleProductSaved = () => {
//     loadProducts();
//     setShowModal(false);
//   };

//   const getUniqueCategories = () => {
//     if (!Array.isArray(products)) {
//       console.warn('products is not an array in getUniqueCategories:', products);
//       return [];
//     }
//     const categories = [
//       ...new Set(products.map(product => product.category).filter(category => category)),
//     ];
//     return categories.sort();
//   };

//   const getCategoryStats = () => {
//     const stats = {};
//     if (!Array.isArray(products)) {
//       console.warn('products is not an array in getCategoryStats:', products);
//       return stats;
//     }
//     products.forEach(product => {
//       if (product.category) {
//         stats[product.category] = (stats[product.category] || 0) + 1;
//       }
//     });
//     return stats;
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(parseFloat(price) || 0);
//   };

//   const stats = getCategoryStats();
//   const categories = getUniqueCategories();

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
//           <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
//           <p className="text-gray-600">Manage pharmaceutical products and medications</p>
//         </div>
//         {user?.role === 'owner' && (
//           <button
//             onClick={handleCreateProduct}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//           >
//             <Plus className="h-5 w-5" />
//             <span>Add Product</span>
//           </button>
//         )}
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <Package className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Products</p>
//               <p className="text-2xl font-bold text-gray-900">{products.length}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <div className="flex items-center">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <DollarSign className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Avg. Price</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {products.length > 0
//                   ? formatPrice(
//                       products.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0) /
//                         products.length
//                     )
//                   : '$0.00'}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-purple-100 rounded-lg">
//               <Tag className="h-6 w-6 text-purple-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Categories</p>
//               <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-orange-100 rounded-lg">
//               <Package className="h-6 w-6 text-orange-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Active Products</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {products.filter(p => p.is_active === true).length}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filter */}
//       <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search products by name, description, or category..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <select
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//               className="pl-10 pr-8 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="all">All Categories</option>
//               {categories.map(category => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <Package className="h-6 w-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900">{product.name || 'Unnamed Product'}</h3>
//                     <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
//                       {product.category || 'No Category'}
//                     </span>
//                   </div>
//                 </div>
//                 {user?.role === 'owner' && (
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => handleEditProduct(product)}
//                       className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
//                     >
//                       <Edit className="h-4 w-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteProduct(product.id)}
//                       className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <p className="text-sm text-gray-600">{product.description || 'No description available'}</p>
//               </div>

//               <div className="flex items-center justify-between items-center mt-4">
//                 <div className="flex space-x-2">
//                   <DollarSign className="h-4 w-4 text-green-600" />
//                   <span className="text-lg font-bold text-green-600">{formatPrice(product.price)}</span>
//                 </div>
//                 <span
//                   className={`px-2 py-1 text-xs rounded-full ${
//                     product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                   }`}
//                 >
//                   {product.is_active ? 'Active' : 'Inactive'}
//                 </span>
//               </div>

//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <p className="text-xs text-gray-500">
//                   Added on {new Date(product.created_at || Date.now()).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full">
//             <div className="text-center py-12">
//               <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
//               <p className="text-gray-600">
//                 {searchQuery || categoryFilter !== 'all'
//                   ? 'Try adjusting your search or filter criteria'
//                   : 'Start by adding your first product'}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Product Modal */}
//       {showModal && (
//         <ProductModal
//           product={selectedProduct}
//           onClose={() => setShowModal(false)}
//           onSave={handleProductSaved}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductsPage;


import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Package, Plus, Search, Filter, DollarSign, Tag, Edit, Trash2 } from 'lucide-react';
import ProductModal from './ProductModal';
import toast from 'react-hot-toast';

const ProductsPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (user?.role === 'owner') {
      loadProducts();
    } else {
      setLoading(false);
      setError('Only company owners can access product management');
    }
  }, [user]);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, categoryFilter]);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getProducts();
      console.log('Fetched products:', data);

      // Handle paginated response
      const productsArray = Array.isArray(data.results) ? data.results : Array.isArray(data) ? data : [];
      console.log('Processed products:', productsArray);

      setProducts(productsArray);
      if (productsArray.length === 0) {
        console.warn('No products returned. Check backend data or authentication.');
        setError('No products found. Add a product or check your permissions.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Failed to load products. Please try again.';
      console.error('Error loading products:', {
        message: errorMessage,
        status: error.response?.status,
        data: error.response?.data,
      });
      setError(errorMessage);
      toast.error(errorMessage);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = Array.isArray(products) ? [...products] : [];

    if (searchQuery) {
      filtered = filtered.filter(product =>
        (product?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false) ||
        (product?.description?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false) ||
        (product?.category?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false)
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product?.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  };

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dataService.deleteProduct(productId);
        toast.success('Product deleted successfully');
        loadProducts();
      } catch (error) {
        const errorMessage = error.response?.data?.detail || 'Failed to delete product';
        console.error('Error deleting product:', {
          message: errorMessage,
          status: error.response?.status,
          data: error.response?.data,
        });
        toast.error(errorMessage);
      }
    }
  };

  const handleProductSaved = () => {
    loadProducts();
    setShowModal(false);
    toast.success('Product saved successfully');
  };

  const getUniqueCategories = () => {
    if (!Array.isArray(products)) {
      console.warn('products is not an array in getUniqueCategories:', products);
      return [];
    }
    const categories = [
      ...new Set(products.map(product => product?.category).filter(category => category)),
    ];
    return categories.sort();
  };

  const getCategoryStats = () => {
    const stats = {};
    if (!Array.isArray(products)) {
      console.warn('products is not an array in getCategoryStats:', products);
      return stats;
    }
    products.forEach(product => {
      if (product?.category) {
        stats[product.category] = (stats[product.category] || 0) + 1;
      }
    });
    return stats;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price) || 0);
  };

  const stats = getCategoryStats();
  const categories = getUniqueCategories();

  if (user?.role !== 'owner') {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-600">{error}</p>
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
          onClick={loadProducts}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto"
        >
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <p className="text-gray-600">Manage pharmaceutical products and medications</p>
        </div>
        {user?.role === 'owner' && (
          <button
            onClick={handleCreateProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Price</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.length > 0
                  ? formatPrice(
                      products.reduce((sum, p) => sum + (parseFloat(p?.price) || 0), 0) /
                        products.length
                    )
                  : '$0.00'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Tag className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Products</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p?.is_active === true).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{product?.name || 'Unnamed Product'}</h3>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                      {product?.category || 'No Category'}
                    </span>
                  </div>
                </div>
                {user?.role === 'owner' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-600">{product?.description || 'No description available'}</p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-bold text-green-600">{formatPrice(product?.price)}</span>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    product?.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product?.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Added on {new Date(product?.created_at || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">
                {searchQuery || categoryFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start by adding your first product'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          onSave={handleProductSaved}
        />
      )}
    </div>
  );
};

export default ProductsPage;
