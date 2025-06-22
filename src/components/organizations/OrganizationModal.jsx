// // // // import React, { useState, useEffect } from 'react';
// // // // import { X, Building2, MapPin, Phone, Mail, Tag } from 'lucide-react';
// // // // import { dataService } from '../../services/dataService';
// // // // import toast from 'react-hot-toast';

// // // // const OrganizationModal = ({ organization, onClose, onSave }) => {
// // // //   const [formData, setFormData] = useState({
// // // //     name: '',
// // // //     address: '',
// // // //     phone: '',
// // // //     email: '',
// // // //     type: 'hospital'
// // // //   });
// // // //   const [loading, setLoading] = useState(false);

// // // //   useEffect(() => {
// // // //     if (organization) {
// // // //       setFormData({
// // // //         name: organization.name || '',
// // // //         address: organization.address || '',
// // // //         phone: organization.phone || '',
// // // //         email: organization.email || '',
// // // //         type: organization.type || 'hospital'
// // // //       });
// // // //     }
// // // //   }, [organization]);

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);

// // // //     try {
// // // //       if (organization) {
// // // //         await dataService.updateOrganization(organization.id, formData);
// // // //         toast.success('Organization updated successfully');
// // // //       } else {
// // // //         await dataService.createOrganization(formData);
// // // //         toast.success('Organization created successfully');
// // // //       }
// // // //       onSave();
// // // //     } catch (error) {
// // // //       console.error('Error saving organization:', error);
// // // //       toast.error('Failed to save organization');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData(prev => ({ ...prev, [name]: value }));
// // // //   };

// // // //   return (
// // // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// // // //       <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
// // // //         <div className="p-6 border-b border-gray-200">
// // // //           <div className="flex items-center justify-between">
// // // //             <h2 className="text-xl font-semibold text-gray-900">
// // // //               {organization ? 'Edit Organization' : 'Add New Organization'}
// // // //             </h2>
// // // //             <button
// // // //               onClick={onClose}
// // // //               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// // // //             >
// // // //               <X className="h-5 w-5 text-gray-500" />
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         <form onSubmit={handleSubmit} className="p-6 space-y-4">
// // // //           {/* Name */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               <Building2 className="h-4 w-4 inline mr-1" />
// // // //               Organization Name
// // // //             </label>
// // // //             <input
// // // //               type="text"
// // // //               name="name"
// // // //               value={formData.name}
// // // //               onChange={handleChange}
// // // //               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //               placeholder="Enter organization name..."
// // // //               required
// // // //             />
// // // //           </div>

// // // //           {/* Type */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               <Tag className="h-4 w-4 inline mr-1" />
// // // //               Type
// // // //             </label>
// // // //             <select
// // // //               name="type"
// // // //               value={formData.type}
// // // //               onChange={handleChange}
// // // //               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //             >
// // // //               <option value="hospital">Hospital</option>
// // // //               <option value="clinic">Clinic</option>
// // // //               <option value="pharmacy">Pharmacy</option>
// // // //               <option value="laboratory">Laboratory</option>
// // // //               <option value="other">Other</option>
// // // //             </select>
// // // //           </div>

// // // //           {/* Address */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               <MapPin className="h-4 w-4 inline mr-1" />
// // // //               Address
// // // //             </label>
// // // //             <textarea
// // // //               name="address"
// // // //               value={formData.address}
// // // //               onChange={handleChange}
// // // //               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //               rows="3"
// // // //               placeholder="Enter complete address..."
// // // //               required
// // // //             />
// // // //           </div>

// // // //           {/* Phone */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               <Phone className="h-4 w-4 inline mr-1" />
// // // //               Phone Number
// // // //             </label>
// // // //             <input
// // // //               type="tel"
// // // //               name="phone"
// // // //               value={formData.phone}
// // // //               onChange={handleChange}
// // // //               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //               placeholder="Enter phone number..."
// // // //               required
// // // //             />
// // // //           </div>

// // // //           {/* Email */}
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //               <Mail className="h-4 w-4 inline mr-1" />
// // // //               Email (Optional)
// // // //             </label>
// // // //             <input
// // // //               type="email"
// // // //               name="email"
// // // //               value={formData.email}
// // // //               onChange={handleChange}
// // // //               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //               placeholder="Enter email address..."
// // // //             />
// // // //           </div>

// // // //           {/* Submit Buttons */}
// // // //           <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
// // // //             <button
// // // //               type="button"
// // // //               onClick={onClose}
// // // //               className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
// // // //             >
// // // //               Cancel
// // // //             </button>
// // // //             <button
// // // //               type="submit"
// // // //               disabled={loading}
// // // //               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
// // // //             >
// // // //               {loading ? 'Saving...' : organization ? 'Update Organization' : 'Add Organization'}
// // // //             </button>
// // // //           </div>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default OrganizationModal;

// // // import React, { useState, useEffect } from 'react';
// // // import { useAuth } from '../../contexts/AuthContext';
// // // import { X, Building2, MapPin, Phone, Mail, Tag } from 'lucide-react';
// // // import { dataService } from '../../services/dataService';
// // // import toast from 'react-hot-toast';

// // // const OrganizationModal = ({ organization, onClose, onSave }) => {
// // //   const { user } = useAuth();
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     address: '',
// // //     phone: '',
// // //     email: '',
// // //     type: 'hospital',
// // //     company: '',
// // //   });
// // //   const [loading, setLoading] = useState(false);
// // //   const [errors, setErrors] = useState({});

// // //   useEffect(() => {
// // //     if (user && user.company) {
// // //       // Set company ID from user data
// // //       setFormData((prev) => ({ ...prev, company: user.company?.id || user.company }));
// // //     }
// // //   }, [user]);

// // //   useEffect(() => {
// // //     if (organization) {
// // //       setFormData({
// // //         name: organization.name || '',
// // //         address: organization.address || '',
// // //         phone: organization.phone || '',
// // //         email: organization.email || '',
// // //         type: organization.type || 'hospital',
// // //         company: organization.company?.id || organization.company || user.company?.id || user.company,
// // //       });
// // //     }
// // //   }, [organization, user]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setErrors({});

// // //     // Validate company field
// // //     if (!formData.company) {
// // //       setErrors({ company: 'Company is required. Please ensure your account is linked to a company.' });
// // //       setLoading(false);
// // //       toast.error('Company is required');
// // //       return;
// // //     }

// // //     try {
// // //       if (organization) {
// // //         await dataService.updateOrganization(organization.id, formData);
// // //         toast.success('Organization updated successfully');
// // //       } else {
// // //         await dataService.createOrganization(formData);
// // //         toast.success('Organization created successfully');
// // //       }
// // //       onSave();
// // //     } catch (error) {
// // //       console.error('Error saving organization:', error.response?.data || error.message);
// // //       if (error.response?.data) {
// // //         const backendErrors = error.response.data;
// // //         setErrors(backendErrors);
// // //         toast.error(
// // //           backendErrors.detail ||
// // //             Object.values(backendErrors).flat().join(', ') ||
// // //             'Failed to save organization'
// // //         );
// // //       } else {
// // //         toast.error('Failed to save organization');
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // //     setErrors((prev) => ({ ...prev, [name]: null }));
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// // //       <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
// // //         <div className="p-6 border-b border-gray-200">
// // //           <div className="flex items-center justify-between">
// // //             <h2 className="text-xl font-semibold text-gray-900">
// // //               {organization ? 'Edit Organization' : 'Add New Organization'}
// // //             </h2>
// // //             <button
// // //               onClick={onClose}
// // //               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// // //             >
// // //               <X className="h-5 w-5 text-gray-500" />
// // //             </button>
// // //           </div>
// // //         </div>

// // //         <form onSubmit={handleSubmit} className="p-6 space-y-4">
// // //           {/* Name */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               <Building2 className="h-4 w-4 inline mr-1" />
// // //               Organization Name
// // //             </label>
// // //             <input
// // //               type="text"
// // //               name="name"
// // //               value={formData.name}
// // //               onChange={handleChange}
// // //               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// // //                 errors.name ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="Enter organization name..."
// // //               required
// // //             />
// // //             {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
// // //           </div>

// // //           {/* Type */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               <Tag className="h-4 w-4 inline mr-1" />
// // //               Type
// // //             </label>
// // //             <select
// // //               name="type"
// // //               value={formData.type}
// // //               onChange={handleChange}
// // //               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// // //                 errors.type ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //             >
// // //               <option value="hospital">Hospital</option>
// // //               <option value="clinic">Clinic</option>
// // //               <option value="pharmacy">Pharmacy</option>
// // //               <option value="laboratory">Laboratory</option>
// // //               <option value="other">Other</option>
// // //             </select>
// // //             {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
// // //           </div>

// // //           {/* Address */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               <MapPin className="h-4 w-4 inline mr-1" />
// // //               Address
// // //             </label>
// // //             <textarea
// // //               name="address"
// // //               value={formData.address}
// // //               onChange={handleChange}
// // //               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// // //                 errors.address ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               rows="3"
// // //               placeholder="Enter complete address..."
// // //               required
// // //             />
// // //             {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
// // //           </div>

// // //           {/* Phone */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               <Phone className="h-4 w-4 inline mr-1" />
// // //               Phone Number
// // //             </label>
// // //             <input
// // //               type="tel"
// // //               name="phone"
// // //               value={formData.phone}
// // //               onChange={handleChange}
// // //               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// // //                 errors.phone ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="Enter phone number..."
// // //               required
// // //             />
// // //             {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
// // //           </div>

// // //           {/* Email */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               <Mail className="h-4 w-4 inline mr-1" />
// // //               Email (Optional)
// // //             </label>
// // //             <input
// // //               type="email"
// // //               name="email"
// // //               value={formData.email}
// // //               onChange={handleChange}
// // //               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// // //                 errors.email ? 'border-red-500' : 'border-gray-300'
// // //               }`}
// // //               placeholder="Enter email address..."
// // //             />
// // //             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
// // //           </div>

// // //           {/* Company Error */}
// // //           {errors.company && <p className="text-red-500 text-sm mt-2">{errors.company}</p>}

// // //           {/* Submit Buttons */}
// // //           <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
// // //             <button
// // //               type="button"
// // //               onClick={onClose}
// // //               className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
// // //             >
// // //               Cancel
// // //             </button>
// // //             <button
// // //               type="submit"
// // //               disabled={loading || !formData.company}
// // //               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
// // //             >
// // //               {loading ? 'Saving...' : organization ? 'Update Organization' : 'Add Organization'}
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default OrganizationModal;



// // import React, { useState, useEffect } from 'react';
// // import { useAuth } from '../../contexts/AuthContext';
// // import { X, Building2, MapPin, Phone, Mail, Tag, User } from 'lucide-react';
// // import { dataService } from '../../services/dataService';
// // import toast from 'react-hot-toast';

// // const OrganizationModal = ({ organization, onClose, onSave }) => {
// //   const { user } = useAuth();
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     address: '',
// //     phone: '',
// //     email: '',
// //     type: 'hospital',
// //     company: '',
// //     doctor_ids: [],
// //   });
// //   const [doctors, setDoctors] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState({});

// //   useEffect(() => {
// //     const fetchDoctors = async () => {
// //       try {
// //         const data = await dataService.getDoctors();
// //         console.log('Fetched doctors for OrganizationModal:', data);
// //         setDoctors(data);
// //       } catch (error) {
// //         console.error('Error fetching doctors:', error);
// //         setErrors(prev => ({ ...prev, doctors: 'Failed to load doctors' }));
// //         toast.error('Failed to load doctors');
// //       }
// //     };
// //     fetchDoctors();
// //   }, []);

// //   useEffect(() => {
// //     if (user && user.company) {
// //       setFormData(prev => ({ ...prev, company: user.company?.id || user.company }));
// //     }
// //   }, [user]);

// //   useEffect(() => {
// //     if (organization) {
// //       setFormData({
// //         name: organization.name || '',
// //         address: organization.address || '',
// //         phone: organization.phone || '',
// //         email: organization.email || '',
// //         type: organization.type || 'hospital',
// //         company: organization.company?.id || organization.company || user.company?.id || user.company,
// //         doctor_ids: organization.doctors?.map(doctor => doctor.id) || [],
// //       });
// //     }
// //   }, [organization, user]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setErrors({});

// //     if (!formData.company) {
// //       setErrors({ company: 'Company is required. Please ensure your account is linked to a company.' });
// //       setLoading(false);
// //       toast.error('Company is required');
// //       return;
// //     }

// //     try {
// //       const payload = { ...formData };
// //       if (organization) {
// //         await dataService.updateOrganization(organization.id, payload);
// //         toast.success('Organization updated successfully');
// //       } else {
// //         await dataService.createOrganization(payload);
// //         toast.success('Organization created successfully');
// //       }
// //       onSave();
// //     } catch (error) {
// //       console.error('Error saving organization:', error.response?.data || error.message);
// //       if (error.response?.data) {
// //         const backendErrors = error.response.data;
// //         setErrors(backendErrors);
// //         toast.error(
// //           backendErrors.detail ||
// //             Object.values(backendErrors).flat().join(', ') ||
// //             'Failed to save organization'
// //         );
// //       } else {
// //         toast.error('Failed to save organization');
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //     setErrors(prev => ({ ...prev, [name]: null }));
// //   };

// //   const handleDoctorChange = (e) => {
// //     const selected = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
// //     setFormData(prev => ({ ...prev, doctor_ids: selected }));
// //     setErrors(prev => ({ ...prev, doctor_ids: null }));
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //       <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
// //         <div className="p-6 border-b border-gray-200">
// //           <div className="flex items-center justify-between">
// //             <h2 className="text-xl font-semibold text-gray-900">
// //               {organization ? 'Edit Organization' : 'Add New Organization'}
// //             </h2>
// //             <button
// //               onClick={onClose}
// //               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //             >
// //               <X className="h-5 w-5 text-gray-500" />
// //             </button>
// //           </div>
// //         </div>

// //         <form onSubmit={handleSubmit} className="p-6 space-y-4">
// //           {/* Name */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               <Building2 className="h-4 w-4 inline mr-1" />
// //               Organization Name
// //             </label>
// //             <input
// //               type="text"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// //                 errors.name ? 'border-red-500' : 'border-gray-300'
// //               }`}
// //               placeholder="Enter organization name..."
// //               required
// //             />
// //             {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
// //           </div>

// //           {/* Type */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               <Tag className="h-4 w-4 inline mr-1" />
// //               Type
// //             </label>
// //             <select
// //               name="type"
// //               value={formData.type}
// //               onChange={handleChange}
// //               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// //                 errors.type ? 'border-red-500' : 'border-gray-300'
// //               }`}
// //             >
// //               <option value="hospital">Hospital</option>
// //               <option value="clinic">Clinic</option>
// //               <option value="pharmacy">Pharmacy</option>
// //               <option value="laboratory">Laboratory</option>
// //               <option value="other">Other</option>
// //             </select>
// //             {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
// //           </div>

// //           {/* Address */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               <MapPin className="h-4 w-4 inline mr-1" />
// //               Address
// //             </label>
// //             <textarea
// //               name="address"
// //               value={formData.address}
// //               onChange={handleChange}
// //               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// //                 errors.address ? 'border-red-500' : 'border-gray-300'
// //               }`}
// //               rows="3"
// //               placeholder="Enter complete address..."
// //               required
// //             />
// //             {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
// //           </div>

// //           {/* Phone */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               <Phone className="h-4 w-4 inline mr-1" />
// //               Phone Number
// //             </label>
// //             <input
// //               type="tel"
// //               name="phone"
// //               value={formData.phone}
// //               onChange={handleChange}
// //               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// //                 errors.phone ? 'border-red-500' : 'border-gray-300'
// //               }`}
// //               placeholder="Enter phone number..."
// //               required
// //             />
// //             {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
// //           </div>

// //           {/* Email */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               <Mail className="h-4 w-4 inline mr-1" />
// //               Email (Optional)
// //             </label>
// //             <input
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// //                 errors.email ? 'border-red-500' : 'border-gray-300'
// //               }`}
// //               placeholder="Enter email address..."
// //             />
// //             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
// //           </div>

// //           {/* Doctors */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               <User className="h-4 w-4 inline mr-1" />
// //               Doctors (Optional)
// //             </label>
// //             <select
// //               name="doctor_ids"
// //               multiple
// //               value={formData.doctor_ids}
// //               onChange={handleDoctorChange}
// //               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// //                 errors.doctor_ids ? 'border-red-500' : 'border-gray-300'
// //               }`}
// //             >
// //               {doctors.map(doctor => (
// //                 <option key={doctor.id} value={doctor.id}>
// //                   Dr. {doctor.name} ({doctor.specialization})
// //                 </option>
// //               ))}
// //             </select>
// //             <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple doctors</p>
// //             {errors.doctor_ids && <p className="text-red-500 text-xs mt-1">{errors.doctor_ids}</p>}
// //           </div>

// //           {/* Company Error */}
// //           {errors.company && <p className="text-red-500 text-sm mt-2">{errors.company}</p>}

// //           {/* Submit Buttons */}
// //           <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={loading || !formData.company}
// //               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
// //             >
// //               {loading ? 'Saving...' : organization ? 'Update Organization' : 'Add Organization'}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrganizationModal;


// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { X, Building2, MapPin, Phone, Mail, Tag, User } from 'lucide-react';
// import { dataService } from '../../services/dataService';
// import toast from 'react-hot-toast';

// const OrganizationModal = ({ organization, onClose, onSave }) => {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     phone: '',
//     email: '',
//     type: 'hospital',
//     company: '',
//     doctor_ids: [],
//   });
//   const [doctors, setDoctors] = useState([]);
//   const [newDoctorName, setNewDoctorName] = useState('');
//   const [newDoctorSpecialization, setNewDoctorSpecialization] = useState('');
//   const [newDoctorPhone, setNewDoctorPhone] = useState('');
//   const [newDoctorEmail, setNewDoctorEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const data = await dataService.getDoctors();
//         console.log('Fetched doctors for OrganizationModal:', data);
//         setDoctors(data);
//       } catch (error) {
//         console.error('Error fetching doctors:', error);
//         setErrors(prev => ({ ...prev, doctors: 'Failed to load doctors' }));
//         toast.error('Failed to load doctors');
//       }
//     };
//     fetchDoctors();
//   }, []);

//   useEffect(() => {
//     if (user && user.company) {
//       setFormData(prev => ({ ...prev, company: user.company?.id || user.company }));
//     }
//   }, [user]);

//   useEffect(() => {
//     if (organization) {
//       setFormData({
//         name: organization.name || '',
//         address: organization.address || '',
//         phone: organization.phone || '',
//         email: organization.email || '',
//         type: organization.type || 'hospital',
//         company: organization.company?.id || organization.company || user.company?.id || user.company,
//         doctor_ids: organization.doctors?.map(doctor => doctor.id) || [],
//       });
//     }
//   }, [organization, user]);

//   const handleAddDoctor = async () => {
//     if (!newDoctorName.trim()) {
//       setErrors(prev => ({ ...prev, newDoctor: 'Doctor name is required' }));
//       toast.error('Doctor name is required');
//       return;
//     }
//     if (!newDoctorSpecialization.trim()) {
//       setErrors(prev => ({ ...prev, newDoctor: 'Doctor specialization is required' }));
//       toast.error('Doctor specialization is required');
//       return;
//     }
//     if (!newDoctorPhone.trim()) {
//       setErrors(prev => ({ ...prev, newDoctor: 'Doctor phone is required' }));
//       toast.error('Doctor phone is required');
//       return;
//     }

//     try {
//       setLoading(true);
//       const newDoctor = {
//         name: newDoctorName,
//         specialization: newDoctorSpecialization,
//         phone: newDoctorPhone,
//         email: newDoctorEmail || '',
//       };
//       const savedDoctor = await dataService.createDoctor(newDoctor);
//       setDoctors(prev => [...prev, savedDoctor]);
//       setFormData(prev => ({
//         ...prev,
//         doctor_ids: [...prev.doctor_ids, savedDoctor.id],
//       }));
//       setNewDoctorName('');
//       setNewDoctorSpecialization('');
//       setNewDoctorPhone('');
//       setNewDoctorEmail('');
//       setErrors(prev => ({ ...prev, newDoctor: null }));
//       toast.success('Doctor added successfully');
//     } catch (error) {
//       console.error('Error adding doctor:', error.response?.data || error.message);
//       setErrors(prev => ({ ...prev, newDoctor: error.response?.data?.detail || 'Failed to add doctor' }));
//       toast.error(error.response?.data?.detail || 'Failed to add doctor');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrors({});

//     const newErrors = {};
//     if (!formData.company) {
//       newErrors.company = 'Company is required. Please ensure your account is linked to a company.';
//     }
//     if (formData.doctor_ids.length === 0) {
//       newErrors.doctor_ids = 'At least one doctor must be selected.';
//     }
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       setLoading(false);
//       Object.values(newErrors).forEach(error => toast.error(error));
//       return;
//     }

//     try {
//       const payload = { ...formData };
//       let savedOrganization;
//       if (organization) {
//         savedOrganization = await dataService.updateOrganization(organization.id, payload);
//         toast.success('Organization updated successfully');
//       } else {
//         savedOrganization = await dataService.createOrganization(payload);
//         toast.success('Organization created successfully');
//       }
//       const selectedDoctors = doctors.filter(doctor => formData.doctor_ids.includes(doctor.id));
//       onSave({ organization: savedOrganization, selectedDoctors });
//     } catch (error) {
//       console.error('Error saving organization:', error.response?.data || error.message);
//       if (error.response?.data) {
//         const backendErrors = error.response.data;
//         setErrors(backendErrors);
//         toast.error(
//           backendErrors.detail ||
//             Object.values(backendErrors).flat().join(', ') ||
//             'Failed to save organization'
//         );
//       } else {
//         toast.error('Failed to save organization');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const handleDoctorChange = (e) => {
//     const selected = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
//     setFormData(prev => ({ ...prev, doctor_ids: selected }));
//     setErrors(prev => ({ ...prev, doctor_ids: null }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-semibold text-gray-900">
//               {organization ? 'Edit Organization' : 'Add New Organization'}
//             </h2>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Building2 className="h-4 w-4 inline mr-1" />
//               Organization Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.name ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="Enter organization name..."
//               required
//             />
//             {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//           </div>

//           {/* Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Tag className="h-4 w-4 inline mr-1" />
//               Type
//             </label>
//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.type ? 'border-red-500' : 'border-gray-300'
//               }`}
//             >
//               <option value="hospital">Hospital</option>
//               <option value="clinic">Clinic</option>
//               <option value="pharmacy">Pharmacy</option>
//               <option value="laboratory">Laboratory</option>
//               <option value="other">Other</option>
//             </select>
//             {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <MapPin className="h-4 w-4 inline mr-1" />
//               Address
//             </label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.address ? 'border-red-500' : 'border-gray-300'
//               }`}
//               rows="3"
//               placeholder="Enter complete address..."
//               required
//             />
//             {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Phone className="h-4 w-4 inline mr-1" />
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.phone ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="Enter phone number..."
//               required
//             />
//             {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Mail className="h-4 w-4 inline mr-1" />
//               Email (Optional)
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.email ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="Enter email address..."
//             />
//             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//           </div>

//           {/* Add New Doctor */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <User className="h-4 w-4 inline mr-1" />
//               Add New Doctor
//             </label>
//             <div className="space-y-2">
//               <input
//                 type="text"
//                 value={newDoctorName}
//                 onChange={(e) => {
//                   setNewDoctorName(e.target.value);
//                   setErrors(prev => ({ ...prev, newDoctor: null }));
//                 }}
//                 className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.newDoctor ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter doctor name..."
//               />
//               <input
//                 type="text"
//                 value={newDoctorSpecialization}
//                 onChange={(e) => {
//                   setNewDoctorSpecialization(e.target.value);
//                   setErrors(prev => ({ ...prev, newDoctor: null }));
//                 }}
//                 className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.newDoctor ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter specialization..."
//               />
//               <input
//                 type="tel"
//                 value={newDoctorPhone}
//                 onChange={(e) => {
//                   setNewDoctorPhone(e.target.value);
//                   setErrors(prev => ({ ...prev, newDoctor: null }));
//                 }}
//                 className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.newDoctor ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter phone number..."
//               />
//               <input
//                 type="email"
//                 value={newDoctorEmail}
//                 onChange={(e) => {
//                   setNewDoctorEmail(e.target.value);
//                   setErrors(prev => ({ ...prev, newDoctor: null }));
//                 }}
//                 className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.newDoctor ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter email (optional)..."
//               />
//               <button
//                 type="button"
//                 onClick={handleAddDoctor}
//                 disabled={loading}
//                 className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
//               >
//                 Add Doctor
//               </button>
//             </div>
//             {errors.newDoctor && <p className="text-red-500 text-xs mt-1">{errors.newDoctor}</p>}
//           </div>

//           {/* Doctors */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <User className="h-4 w-4 inline mr-1" />
//               Doctors (Required)
//             </label>
//             <select
//               name="doctor_ids"
//               multiple
//               value={formData.doctor_ids}
//               onChange={handleDoctorChange}
//               className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.doctor_ids ? 'border-red-500' : 'border-gray-300'
//               }`}
//               required
//             >
//               {doctors.map(doctor => (
//                 <option key={doctor.id} value={doctor.id}>
//                   Dr. {doctor.name} ({doctor.specialization})
//                 </option>
//               ))}
//             </select>
//             <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple doctors</p>
//             {errors.doctor_ids && <p className="text-red-500 text-xs mt-1">{errors.doctor_ids}</p>}
//           </div>

//           {/* Company Error */}
//           {errors.company && <p className="text-red-500 text-sm mt-2">{errors.company}</p>}

//           {/* Submit Buttons */}
//           <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading || !formData.company}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
//             >
//               {loading ? 'Saving...' : organization ? 'Update Organization' : 'Add Organization'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OrganizationModal;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { X, Building2, MapPin, Phone, Mail, Tag, User } from 'lucide-react';
import { dataService } from '../../services/dataService';
import toast from 'react-hot-toast';

const OrganizationModal = ({ organization, onClose, onSave }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    type: 'hospital',
    company: '',
    doctor_ids: [],
  });
  const [doctors, setDoctors] = useState([]);
  const [newDoctorName, setNewDoctorName] = useState('');
  const [newDoctorSpecialization, setNewDoctorSpecialization] = useState('');
  const [newDoctorPhone, setNewDoctorPhone] = useState('');
  const [newDoctorEmail, setNewDoctorEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await dataService.getDoctors();
        console.log('Fetched doctors for OrganizationModal:', data);
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setErrors(prev => ({ ...prev, doctors: 'Failed to load doctors' }));
        toast.error('Failed to load doctors');
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (user && user.company) {
      setFormData(prev => ({ ...prev, company: user.company?.id || user.company }));
    }
  }, [user]);

  useEffect(() => {
    if (organization) {
      setFormData({
        name: organization.name || '',
        address: organization.address || '',
        phone: organization.phone || '',
        email: organization.email || '',
        type: organization.type || 'hospital',
        company: organization.company?.id || organization.company || user.company?.id || user.company,
        doctor_ids: organization.doctors?.map(doctor => doctor.id) || [],
      });
    }
  }, [organization, user]);

  const handleAddDoctor = async () => {
    if (!newDoctorName.trim()) {
      setErrors(prev => ({ ...prev, newDoctor: 'Doctor name is required' }));
      toast.error('Doctor name is required');
      return;
    }
    if (!newDoctorSpecialization.trim()) {
      setErrors(prev => ({ ...prev, newDoctor: 'Doctor specialization is required' }));
      toast.error('Doctor specialization is required');
      return;
    }
    if (!newDoctorPhone.trim()) {
      setErrors(prev => ({ ...prev, newDoctor: 'Doctor phone is required' }));
      toast.error('Doctor phone is required');
      return;
    }

    try {
      setLoading(true);
      const newDoctor = {
        name: newDoctorName,
        specialization: newDoctorSpecialization,
        phone: newDoctorPhone,
        email: newDoctorEmail || '',
      };
      const savedDoctor = await dataService.createDoctor(newDoctor);
      setDoctors(prev => [...prev, savedDoctor]);
      setFormData(prev => ({
        ...prev,
        doctor_ids: [...prev.doctor_ids, savedDoctor.id],
      }));
      setNewDoctorName('');
      setNewDoctorSpecialization('');
      setNewDoctorPhone('');
      setNewDoctorEmail('');
      setErrors(prev => ({ ...prev, newDoctor: null }));
      toast.success('Doctor added successfully');
    } catch (error) {
      console.error('Error adding doctor:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.detail || 
                          Object.values(error.response?.data || {}).flat().join(', ') || 
                          'Failed to add doctor';
      setErrors(prev => ({ ...prev, newDoctor: errorMessage }));
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const newErrors = {};
    if (!formData.company) {
      newErrors.company = 'Company is required. Please ensure your account is linked to a company.';
    }
    if (formData.doctor_ids.length === 0) {
      newErrors.doctor_ids = 'At least one doctor must be selected.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      Object.values(newErrors).forEach(error => toast.error(error));
      return;
    }

    try {
      const payload = { ...formData };
      let savedOrganization;
      if (organization) {
        savedOrganization = await dataService.updateOrganization(organization.id, payload);
        toast.success('Organization updated successfully');
      } else {
        savedOrganization = await dataService.createOrganization(payload);
        toast.success('Organization created successfully');
      }
      const selectedDoctors = doctors.filter(doctor => formData.doctor_ids.includes(doctor.id));
      onSave({ organization: savedOrganization, selectedDoctors });
      onClose();
    } catch (error) {
      console.error('Error saving organization:', error.response?.data || error.message);
      if (error.response?.data) {
        const backendErrors = error.response.data;
        setErrors(backendErrors);
        toast.error(
          backendErrors.detail ||
            Object.values(backendErrors).flat().join(', ') ||
            'Failed to save organization'
        );
      } else {
        toast.error('Failed to save organization');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleDoctorChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
    setFormData(prev => ({ ...prev, doctor_ids: selected }));
    setErrors(prev => ({ ...prev, doctor_ids: null }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {organization ? 'Edit Organization' : 'Add New Organization'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building2 className="h-4 w-4 inline mr-1" />
              Organization Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter organization name..."
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="h-4 w-4 inline mr-1" />
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.type ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="hospital">Hospital</option>
              <option value="clinic">Clinic</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="laboratory">Laboratory</option>
              <option value="other">Other</option>
            </select>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              rows="3"
              placeholder="Enter complete address..."
              required
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4 inline mr-1" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter phone number..."
              required
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4 inline mr-1" />
              Email (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter email address..."
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Add New Doctor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-1" />
              Add New Doctor
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={newDoctorName}
                onChange={(e) => {
                  setNewDoctorName(e.target.value);
                  setErrors(prev => ({ ...prev, newDoctor: null }));
                }}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.newDoctor ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter doctor name..."
              />
              <input
                type="text"
                value={newDoctorSpecialization}
                onChange={(e) => {
                  setNewDoctorSpecialization(e.target.value);
                  setErrors(prev => ({ ...prev, newDoctor: null }));
                }}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.newDoctor ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter specialization..."
              />
              <input
                type="tel"
                value={newDoctorPhone}
                onChange={(e) => {
                  setNewDoctorPhone(e.target.value);
                  setErrors(prev => ({ ...prev, newDoctor: null }));
                }}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.newDoctor ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter phone number..."
              />
              <input
                type="email"
                value={newDoctorEmail}
                onChange={(e) => {
                  setNewDoctorEmail(e.target.value);
                  setErrors(prev => ({ ...prev, newDoctor: null }));
                }}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.newDoctor ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter email (optional)..."
              />
              <button
                type="button"
                onClick={handleAddDoctor}
                disabled={loading}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Add Doctor
              </button>
            </div>
            {errors.newDoctor && <p className="text-red-500 text-xs mt-1">{errors.newDoctor}</p>}
          </div>

          {/* Doctors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-1" />
              Doctors (Required)
            </label>
            <select
              name="doctor_ids"
              multiple
              value={formData.doctor_ids}
              onChange={handleDoctorChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.doctor_ids ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  Dr. {doctor.name} ({doctor.specialization})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple doctors</p>
            {errors.doctor_ids && <p className="text-red-500 text-xs mt-1">{errors.doctor_ids}</p>}
          </div>

          {/* Company Error */}
          {errors.company && <p className="text-red-500 text-sm mt-2">{errors.company}</p>}

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.company}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : organization ? 'Update Organization' : 'Add Organization'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizationModal;