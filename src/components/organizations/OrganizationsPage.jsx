// // import React, { useState, useEffect } from 'react';
// // import { useAuth } from '../../contexts/AuthContext';
// // import { dataService } from '../../services/dataService';
// // import { Building2, Plus, Search, MapPin, Phone, Mail, Filter } from 'lucide-react';
// // import OrganizationModal from './OrganizationModal';

// // const OrganizationsPage = () => {
// //   const { user } = useAuth();
// //   const [organizations, setOrganizations] = useState([]);
// //   const [filteredOrganizations, setFilteredOrganizations] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [typeFilter, setTypeFilter] = useState('all');
// //   const [showModal, setShowModal] = useState(false);
// //   const [selectedOrganization, setSelectedOrganization] = useState(null);

// //   useEffect(() => {
// //     loadOrganizations();
// //   }, []);

// //   useEffect(() => {
// //     filterOrganizations();
// //   }, [organizations, searchQuery, typeFilter]);

// //   const loadOrganizations = async () => {
// //     try {
// //       const data = await dataService.getOrganizations();
// //       setOrganizations(data);
// //     } catch (error) {
// //       console.error('Error loading organizations:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filterOrganizations = () => {
// //     let filtered = organizations;

// //     if (searchQuery) {
// //       filtered = filtered.filter(org =>
// //         org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         org.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         org.email.toLowerCase().includes(searchQuery.toLowerCase())
// //       );
// //     }

// //     if (typeFilter !== 'all') {
// //       filtered = filtered.filter(org => org.type === typeFilter);
// //     }

// //     setFilteredOrganizations(filtered);
// //   };

// //   const handleCreateOrganization = () => {
// //     setSelectedOrganization(null);
// //     setShowModal(true);
// //   };

// //   const handleEditOrganization = (organization) => {
// //     setSelectedOrganization(organization);
// //     setShowModal(true);
// //   };

// //   const handleOrganizationSaved = () => {
// //     loadOrganizations();
// //     setShowModal(false);
// //   };

// //   const getTypeColor = (type) => {
// //     switch (type) {
// //       case 'hospital': return 'bg-red-100 text-red-800';
// //       case 'clinic': return 'bg-blue-100 text-blue-800';
// //       case 'pharmacy': return 'bg-green-100 text-green-800';
// //       case 'laboratory': return 'bg-purple-100 text-purple-800';
// //       case 'other': return 'bg-gray-100 text-gray-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   const getTypeStats = () => {
// //     const stats = {};
// //     organizations.forEach(org => {
// //       stats[org.type] = (stats[org.type] || 0) + 1;
// //     });
// //     return stats;
// //   };

// //   const stats = getTypeStats();

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
// //           <h1 className="text-2xl font-bold text-gray-900">Organizations Management</h1>
// //           <p className="text-gray-600">Manage healthcare organizations and facilities</p>
// //         </div>
// //         {user?.role === 'owner' && (
// //           <button
// //             onClick={handleCreateOrganization}
// //             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
// //           >
// //             <Plus className="h-5 w-5" />
// //             <span>Add Organization</span>
// //           </button>
// //         )}
// //       </div>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center">
// //             <div className="p-2 bg-blue-100 rounded-lg">
// //               <Building2 className="h-6 w-6 text-blue-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Total</p>
// //               <p className="text-2xl font-bold text-gray-900">{organizations.length}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center">
// //             <div className="p-2 bg-red-100 rounded-lg">
// //               <Building2 className="h-6 w-6 text-red-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Hospitals</p>
// //               <p className="text-2xl font-bold text-gray-900">{stats.hospital || 0}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center">
// //             <div className="p-2 bg-blue-100 rounded-lg">
// //               <Building2 className="h-6 w-6 text-blue-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Clinics</p>
// //               <p className="text-2xl font-bold text-gray-900">{stats.clinic || 0}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center">
// //             <div className="p-2 bg-green-100 rounded-lg">
// //               <Building2 className="h-6 w-6 text-green-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Pharmacies</p>
// //               <p className="text-2xl font-bold text-gray-900">{stats.pharmacy || 0}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //           <div className="flex items-center">
// //             <div className="p-2 bg-purple-100 rounded-lg">
// //               <Building2 className="h-6 w-6 text-purple-600" />
// //             </div>
// //             <div className="ml-4">
// //               <p className="text-sm font-medium text-gray-600">Labs</p>
// //               <p className="text-2xl font-bold text-gray-900">{stats.laboratory || 0}</p>
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
// //               placeholder="Search organizations by name, address, or email..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //             />
// //           </div>
// //           <div className="relative">
// //             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// //             <select
// //               value={typeFilter}
// //               onChange={(e) => setTypeFilter(e.target.value)}
// //               className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //             >
// //               <option value="all">All Types</option>
// //               <option value="hospital">Hospital</option>
// //               <option value="clinic">Clinic</option>
// //               <option value="pharmacy">Pharmacy</option>
// //               <option value="laboratory">Laboratory</option>
// //               <option value="other">Other</option>
// //             </select>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Organizations Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {filteredOrganizations.length > 0 ? (
// //           filteredOrganizations.map((organization) => (
// //             <div key={organization.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
// //               <div className="flex items-start justify-between mb-4">
// //                 <div className="flex items-center space-x-3">
// //                   <div className="p-2 bg-blue-100 rounded-lg">
// //                     <Building2 className="h-6 w-6 text-blue-600" />
// //                   </div>
// //                   <div>
// //                     <h3 className="text-lg font-semibold text-gray-900">{organization.name}</h3>
// //                     <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(organization.type)}`}>
// //                       {organization.type.charAt(0).toUpperCase() + organization.type.slice(1)}
// //                     </span>
// //                   </div>
// //                 </div>
// //                 {user?.role === 'owner' && (
// //                   <button
// //                     onClick={() => handleEditOrganization(organization)}
// //                     className="text-blue-600 hover:text-blue-800 font-medium text-sm"
// //                   >
// //                     Edit
// //                   </button>
// //                 )}
// //               </div>

// //               <div className="space-y-3">
// //                 <div className="flex items-start space-x-2">
// //                   <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
// //                   <p className="text-sm text-gray-600">{organization.address}</p>
// //                 </div>

// //                 <div className="flex items-center space-x-2">
// //                   <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
// //                   <p className="text-sm text-gray-600">{organization.phone}</p>
// //                 </div>

// //                 {organization.email && (
// //                   <div className="flex items-center space-x-2">
// //                     <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
// //                     <p className="text-sm text-gray-600">{organization.email}</p>
// //                   </div>
// //                 )}
// //               </div>

// //               <div className="mt-4 pt-4 border-t border-gray-200">
// //                 <p className="text-xs text-gray-500">
// //                   Added on {new Date(organization.created_at).toLocaleDateString()}
// //                 </p>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <div className="col-span-full">
// //             <div className="text-center py-12">
// //               <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
// //               <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
// //               <p className="text-gray-600">
// //                 {searchQuery || typeFilter !== 'all' 
// //                   ? 'Try adjusting your search or filter criteria'
// //                   : 'Start by adding your first organization'
// //                 }
// //               </p>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Organization Modal */}
// //       {showModal && (
// //         <OrganizationModal
// //           organization={selectedOrganization}
// //           onClose={() => setShowModal(false)}
// //           onSave={handleOrganizationSaved}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default OrganizationsPage;

// // src/pages/OrganizationsPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { dataService } from '../../services/dataService';
// import { Building2, Plus, Search, MapPin, Phone, Mail, Filter, RefreshCw } from 'lucide-react';
// import OrganizationModal from '../../components/organizations/OrganizationModal';
// import toast from 'react-hot-toast';

// const OrganizationsPage = () => {
//   const { user } = useAuth();
//   const [organizations, setOrganizations] = useState([]);
//   const [filteredOrganizations, setFilteredOrganizations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [typeFilter, setTypeFilter] = useState('all');
//   const [showModal, setShowModal] = useState(false);
//   const [selectedOrganization, setSelectedOrganization] = useState(null);

//   useEffect(() => {
//     console.log('User data:', user);
//     if (!user) {
//       setError('Please log in to view organizations.');
//       setLoading(false);
//       return;
//     }
//     if (!user.company) {
//       setError('No company associated with your account. Contact an administrator.');
//       setLoading(false);
//       return;
//     }
//     loadOrganizations();
//   }, [user]);

//   useEffect(() => {
//     console.log('Organizations state:', organizations);
//     filterOrganizations();
//   }, [organizations, searchQuery, typeFilter]);

//   const loadOrganizations = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await dataService.getOrganizations();
//       console.log('Processed organizations:', data);
//       setOrganizations(data);
//     } catch (error) {
//       const errorMessage = error.response?.data?.detail || 'Failed to load organizations. Please try again.';
//       console.error('Error in loadOrganizations:', errorMessage);
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterOrganizations = () => {
//     let filtered = [...organizations];
//     if (searchQuery) {
//       filtered = filtered.filter((org) =>
//         (org.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false) ||
//         (org.address?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false) ||
//         (org.email?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false)
//       );
//     }
//     if (typeFilter !== 'all') {
//       filtered = filtered.filter((org) => org.type === typeFilter);
//     }
//     console.log('Filtered organizations:', filtered);
//     setFilteredOrganizations(filtered);
//   };

//   const handleCreateOrganization = () => {
//     if (!user.company) {
//       toast.error('Cannot create organization: No company associated with your account.');
//       return;
//     }
//     setSelectedOrganization(null);
//     setShowModal(true);
//   };

//   const handleEditOrganization = (organization) => {
//     setSelectedOrganization(organization);
//     setShowModal(true);
//   };

//   const handleOrganizationSaved = () => {
//     loadOrganizations();
//     setShowModal(false);
//     toast.success('Organization saved successfully');
//   };

//   const handleRetry = () => {
//     loadOrganizations();
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'hospital':
//         return 'bg-red-100 text-red-800';
//       case 'clinic':
//         return 'bg-blue-100 text-blue-800';
//       case 'pharmacy':
//         return 'bg-green-100 text-green-800';
//       case 'laboratory':
//         return 'bg-purple-100 text-purple-800';
//       case 'other':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getTypeStats = () => {
//     const stats = {};
//     organizations.forEach((org) => {
//       stats[org.type] = (stats[org.type] || 0) + 1;
//     });
//     return stats;
//   };

//   const stats = getTypeStats();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-lg font-medium text-red-600 mb-2">Error</h3>
//         <p className="text-gray-600 mb-4">{error}</p>
//         <button
//           onClick={handleRetry}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto"
//         >
//           <RefreshCw className="h-5 w-5" />
//           <span>Retry</span>
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Organizations Management</h1>
//           <p className="text-gray-600">Manage healthcare organizations and facilities</p>
//         </div>
//         {user?.role === 'owner' && (
//           <button
//             onClick={handleCreateOrganization}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//             disabled={!user.company}
//           >
//             <Plus className="h-5 w-5" />
//             <span>Add Organization</span>
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <Building2 className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total</p>
//               <p className="text-2xl font-bold text-gray-900">{organizations.length}</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-red-100 rounded-lg">
//               <Building2 className="h-6 w-6 text-red-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Hospitals</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.hospital || 0}</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <Building2 className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Clinics</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.clinic || 0}</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <Building2 className="h-6 w-6 text-green-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Pharmacies</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.pharmacy || 0}</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <div className="flex items-center">
//             <div className="p-2 bg-purple-100 rounded-lg">
//               <Building2 className="h-6 w-6 text-purple-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Labs</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.laboratory || 0}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search organizations by name, address, or email..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <select
//               value={typeFilter}
//               onChange={(e) => setTypeFilter(e.target.value)}
//               className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="all">All Types</option>
//               <option value="hospital">Hospital</option>
//               <option value="clinic">Clinic</option>
//               <option value="pharmacy">Pharmacy</option>
//               <option value="laboratory">Laboratory</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredOrganizations.length > 0 ? (
//           filteredOrganizations.map((organization) => (
//             <div
//               key={organization.id}
//               className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <Building2 className="h-6 w-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900">{organization.name || 'N/A'}</h3>
//                     <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(organization.type)}`}>
//                       {organization.type ? organization.type.charAt(0).toUpperCase() + organization.type.slice(1) : 'N/A'}
//                     </span>
//                   </div>
//                 </div>
//                 {user?.role === 'owner' && (
//                   <button
//                     onClick={() => handleEditOrganization(organization)}
//                     className="text-blue-600 hover:text-blue-800 font-medium text-sm"
//                   >
//                     Edit
//                   </button>
//                 )}
//               </div>

//               <div className="space-y-3">
//                 <div className="flex items-start space-x-2">
//                   <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
//                   <p className="text-sm text-gray-600">{organization.address || 'N/A'}</p>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
//                   <p className="text-sm text-gray-600">{organization.phone || 'N/A'}</p>
//                 </div>

//                 {organization.email && (
//                   <div className="flex items-center space-x-2">
//                     <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
//                     <p className="text-sm text-gray-600">{organization.email}</p>
//                   </div>
//                 )}
//               </div>

//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <p className="text-xs text-gray-500">
//                   Added on {organization.created_at ? new Date(organization.created_at).toLocaleDateString() : 'N/A'}
//                 </p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full">
//             <div className="text-center py-12">
//               <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
//               <p className="text-gray-600">
//                 {searchQuery || typeFilter !== 'all'
//                   ? 'Try adjusting your search or filter criteria'
//                   : 'Start by adding your first organization'}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <OrganizationModal
//           organization={selectedOrganization}
//           onClose={() => setShowModal(false)}
//           onSave={handleOrganizationSaved}
//         />
//       )}
//     </div>
//   );
// };

// export default OrganizationsPage;



import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Building2, Plus, Search, MapPin, Phone, Mail, Filter, RefreshCw, User } from 'lucide-react';
import OrganizationModal from '../../components/organizations/OrganizationModal';
import toast from 'react-hot-toast';

const OrganizationsPage = () => {
  const { user } = useAuth();
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(() => {
    console.log('User data:', user);
    if (!user) {
      setError('Please log in to view organizations.');
      setLoading(false);
      return;
    }
    if (!user.company) {
      setError('No company associated with your account. Contact an administrator.');
      setLoading(false);
      return;
    }
    loadOrganizations();
  }, [user]);

  useEffect(() => {
    console.log('Organizations state:', organizations);
    filterOrganizations();
  }, [organizations, searchQuery, typeFilter]);

  const loadOrganizations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getOrganizations();
      console.log('Processed organizations:', data);
      setOrganizations(data);
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Failed to load organizations. Please try again.';
      console.error('Error in loadOrganizations:', errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filterOrganizations = () => {
    let filtered = [...organizations];
    if (searchQuery) {
      filtered = filtered.filter((org) =>
        (org.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false) ||
        (org.address?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false) ||
        (org.email?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false) ||
        (org.phone?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false) ||
        org.doctors?.some(doctor =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    if (typeFilter !== 'all') {
      filtered = filtered.filter((org) => org.type === typeFilter);
    }
    console.log('Filtered organizations:', filtered);
    setFilteredOrganizations(filtered);
  };

  const handleCreateOrganization = () => {
    if (!user.company) {
      toast.error('Cannot create organization: No company associated with your account.');
      return;
    }
    setSelectedOrganization(null);
    setShowModal(true);
  };

  const handleEditOrganization = (organization) => {
    setSelectedOrganization(organization);
    setShowModal(true);
  };

  const handleOrganizationSaved = () => {
    loadOrganizations();
    setShowModal(false);
    toast.success('Organization saved successfully');
  };

  const handleRetry = () => {
    loadOrganizations();
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'hospital':
        return 'bg-red-100 text-red-800';
      case 'clinic':
        return 'bg-blue-100 text-blue-800';
      case 'pharmacy':
        return 'bg-green-100 text-green-800';
      case 'laboratory':
        return 'bg-purple-100 text-purple-800';
      case 'other':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeStats = () => {
    const stats = {};
    organizations.forEach((org) => {
      stats[org.type] = (stats[org.type] || 0) + 1;
    });
    return stats;
  };

  const stats = getTypeStats();

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
          onClick={handleRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto"
        >
          <RefreshCw className="h-5 w-5" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organizations Management</h1>
          <p className="text-gray-600">Manage healthcare organizations and facilities</p>
        </div>
        {user?.role === 'owner' && (
          <button
            onClick={handleCreateOrganization}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            disabled={!user.company}
          >
            <Plus className="h-5 w-5" />
            <span>Add Organization</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{organizations.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Building2 className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hospitals</p>
              <p className="text-2xl font-bold text-gray-900">{stats.hospital || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Clinics</p>
              <p className="text-2xl font-bold text-gray-900">{stats.clinic || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building2 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pharmacies</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pharmacy || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Labs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.laboratory || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, address, email, phone, or doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="hospital">Hospital</option>
              <option value="clinic">Clinic</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="laboratory">Laboratory</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrganizations.length > 0 ? (
          filteredOrganizations.map((organization) => (
            <div
              key={organization.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{organization.name || 'N/A'}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(organization.type)}`}>
                      {organization.type ? organization.type.charAt(0).toUpperCase() + organization.type.slice(1) : 'N/A'}
                    </span>
                  </div>
                </div>
                {user?.role === 'owner' && (
                  <button
                    onClick={() => handleEditOrganization(organization)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Edit
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{organization.address || 'N/A'}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{organization.phone || 'N/A'}</p>
                </div>

                {organization.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{organization.email}</p>
                  </div>
                )}

                <div className="flex items-start space-x-2">
                  <User className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Doctors:</p>
                    {organization.doctors?.length > 0 ? (
                      <ul className="text-sm text-gray-600 list-disc pl-4">
                        {organization.doctors.map(doctor => (
                          <li key={doctor.id}>
                            Dr. {doctor.name} ({doctor.specialization})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600">No doctors assigned</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Added on {organization.created_at ? new Date(organization.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
              <p className="text-gray-600">
                {searchQuery || typeFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start by adding your first organization'}
              </p>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <OrganizationModal
          organization={selectedOrganization}
          onClose={() => setShowModal(false)}
          onSave={handleOrganizationSaved}
        />
      )}
    </div>
  );
};

export default OrganizationsPage;