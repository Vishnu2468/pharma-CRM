// import React, { useState, useEffect } from 'react';
// import { X, Calendar, Clock, MapPin, User, Package, FileText } from 'lucide-react';
// import { dataService } from '../../services/dataService';
// import toast from 'react-hot-toast';

// const VisitModal = ({ visit, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     doctor: '',
//     organization: '',
//     products: [],
//     visit_date: '',
//     visit_time: '',
//     duration: 30,
//     notes: '',
//     status: 'scheduled'
//   });
//   const [doctors, setDoctors] = useState([]);
//   const [organizations, setOrganizations] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadData();
//     if (visit) {
//       setFormData({
//         doctor: visit.doctor || '',
//         organization: visit.organization || '',
//         products: visit.products || [],
//         visit_date: visit.visit_date || '',
//         visit_time: visit.visit_time || '',
//         duration: visit.duration || 30,
//         notes: visit.notes || '',
//         status: visit.status || 'scheduled'
//       });
//     }
//   }, [visit]);

//   const loadData = async () => {
//     try {
//       const [doctorsData, organizationsData, productsData] = await Promise.all([
//         dataService.getDoctors(),
//         dataService.getOrganizations(),
//         dataService.getProducts()
//       ]);
//       setDoctors(doctorsData);
//       setOrganizations(organizationsData);
//       setProducts(productsData);
//     } catch (error) {
//       console.error('Error loading data:', error);
//       toast.error('Failed to load data');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (visit) {
//         await dataService.updateVisit(visit.id, formData);
//         toast.success('Visit updated successfully');
//       } else {
//         await dataService.createVisit(formData);
//         toast.success('Visit scheduled successfully');
//       }
//       onSave();
//     } catch (error) {
//       console.error('Error saving visit:', error);
//       toast.error('Failed to save visit');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProductToggle = (productId) => {
//     setFormData(prev => ({
//       ...prev,
//       products: prev.products.includes(productId)
//         ? prev.products.filter(id => id !== productId)
//         : [...prev.products, productId]
//     }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-semibold text-gray-900">
//               {visit ? 'Edit Visit' : 'Schedule New Visit'}
//             </h2>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Organization Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <MapPin className="h-4 w-4 inline mr-1" />
//               Organization
//             </label>
//             <select
//               value={formData.organization}
//               onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="">Select Organization</option>
//               {organizations.map(org => (
//                 <option key={org.id} value={org.id}>
//                   {org.name} - {org.type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Doctor Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <User className="h-4 w-4 inline mr-1" />
//               Doctor
//             </label>
//             <select
//               value={formData.doctor}
//               onChange={(e) => setFormData(prev => ({ ...prev, doctor: e.target.value }))}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="">Select Doctor</option>
//               {doctors
//                 .filter(doctor => !formData.organization || doctor.organization == formData.organization)
//                 .map(doctor => (
//                   <option key={doctor.id} value={doctor.id}>
//                     Dr. {doctor.name} - {doctor.specialization}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* Date and Time */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Calendar className="h-4 w-4 inline mr-1" />
//                 Visit Date
//               </label>
//               <input
//                 type="date"
//                 value={formData.visit_date}
//                 onChange={(e) => setFormData(prev => ({ ...prev, visit_date: e.target.value }))}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Clock className="h-4 w-4 inline mr-1" />
//                 Visit Time
//               </label>
//               <input
//                 type="time"
//                 value={formData.visit_time}
//                 onChange={(e) => setFormData(prev => ({ ...prev, visit_time: e.target.value }))}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
//           </div>

//           {/* Duration */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Duration (minutes)
//             </label>
//             <input
//               type="number"
//               value={formData.duration}
//               onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               min="15"
//               max="240"
//               step="15"
//               required
//             />
//           </div>

//           {/* Products */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Package className="h-4 w-4 inline mr-1" />
//               Products to Present
//             </label>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
//               {products.map(product => (
//                 <label key={product.id} className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={formData.products.includes(product.id)}
//                     onChange={() => handleProductToggle(product.id)}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   <span className="text-sm text-gray-700">{product.name}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Status */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Status
//             </label>
//             <select
//               value={formData.status}
//               onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="scheduled">Scheduled</option>
//               <option value="ongoing">Ongoing</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//           </div>

//           {/* Notes */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <FileText className="h-4 w-4 inline mr-1" />
//               Notes
//             </label>
//             <textarea
//               value={formData.notes}
//               onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               rows="4"
//               placeholder="Add any additional notes about the visit..."
//             />
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
//             >
//               {loading ? 'Saving...' : visit ? 'Update Visit' : 'Schedule Visit'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VisitModal;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { X, Calendar, Clock, MapPin, User, Package, FileText } from 'lucide-react';
import { dataService } from '../../services/dataService';
import toast from 'react-hot-toast';

const VisitModal = ({ visit, onClose, onSave }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    employee: '',
    doctor: '',
    organization: '',
    products: [],
    visit_date: '',
    visit_time: '',
    duration: 30,
    notes: '',
    status: 'scheduled',
  });
  const [doctors, setDoctors] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [products, setProducts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log('User data in VisitModal:', user);
    loadData();

    if (!user) {
      console.error('No user data available');
      setErrors(prev => ({ ...prev, user: 'No user logged in. Please log in again.' }));
      toast.error('No user logged in. Please log in again.');
      return;
    }

    const validateEmployee = async () => {
      try {
        const employeeData = await dataService.getEmployees();
        console.log('Employees data:', employeeData);
        setEmployees(employeeData);

        if (user.role === 'owner') {
          const matchedEmployee = employeeData.find(
            emp => emp.user?.email === user.email || emp.user?.username === user.username
          );
          if (matchedEmployee?.id) {
            setFormData(prev => ({ ...prev, employee: String(matchedEmployee.id) }));
            console.log('Matched employee ID for owner:', matchedEmployee.id);
          } else {
            console.warn('No matching employee found for owner:', user.email);
            setErrors(prev => ({ ...prev, employee: 'No valid employee account found for owner. Please select an employee.' }));
          }
        } else {
          const matchedEmployee = employeeData.find(
            emp => emp.user?.id === user.id || emp.user?.email === user.email
          );
          if (matchedEmployee?.id) {
            setFormData(prev => ({ ...prev, employee: String(matchedEmployee.id) }));
            console.log('Matched employee ID for user:', matchedEmployee.id);
          } else {
            console.error('No matching employee found for user:', user.email);
            setErrors(prev => ({ ...prev, employee: 'No valid employee account found. Please contact support.' }));
            toast.error('No valid employee account found. Please contact support.');
          }
        }
      } catch (error) {
        console.error('Error validating employee:', error.response?.data || error.message);
        setErrors(prev => ({ ...prev, employee: 'Failed to validate employee data. Please try again.' }));
        toast.error('Failed to validate employee data.');
      }
    };

    validateEmployee();

    if (visit) {
      console.log('Visit data:', visit);
      setFormData(prev => ({
        ...prev,
        employee: String(visit.employee?.id || (typeof visit.employee === 'number' ? visit.employee : '')),
        doctor: String(visit.doctor?.id || (typeof visit.doctor === 'number' ? visit.doctor : '')),
        organization: String(visit.organization?.id || (typeof visit.organization === 'number' ? visit.organization : '')),
        products: visit.products?.map(p => p.id) || (Array.isArray(visit.products) ? visit.products : []),
        visit_date: visit.visit_date || '',
        visit_time: visit.visit_time || '',
        duration: visit.duration || 30,
        notes: visit.notes || '',
        status: visit.status || 'scheduled',
      }));
    }
  }, [visit, user]);

  const loadData = async () => {
    try {
      const [doctorsData, organizationsData, productsData] = await Promise.all([
        dataService.getDoctors(),
        dataService.getOrganizations(),
        dataService.getProducts(),
      ]);
      console.log('Loaded doctors:', doctorsData);
      console.log('Loaded organizations:', organizationsData);
      console.log('Loaded products:', productsData);
      setDoctors(doctorsData);
      setOrganizations(organizationsData);
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading data:', error.response?.data || error.message);
      setErrors(prev => ({ ...prev, data: 'Failed to load data. Please try again.' }));
      toast.error('Failed to load data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validation
    const newErrors = {};
    const employeeId = parseInt(formData.employee);
    const doctorId = parseInt(formData.doctor);
    const organizationId = parseInt(formData.organization);

    if (!formData.employee || isNaN(employeeId)) {
      newErrors.employee = 'Valid employee ID is required';
    } else if (!employees.find(emp => emp.id === employeeId)) {
      newErrors.employee = 'Selected employee does not exist';
    }
    if (!formData.doctor || isNaN(doctorId)) {
      newErrors.doctor = 'Valid doctor ID is required';
    } else if (!doctors.find(doc => doc.id === doctorId)) {
      newErrors.doctor = 'Selected doctor does not exist';
    }
    if (!formData.organization || isNaN(organizationId)) {
      newErrors.organization = 'Valid organization ID is required';
    } else if (!organizations.find(org => org.id === organizationId)) {
      newErrors.organization = 'Selected organization does not exist';
    }
    if (!formData.visit_date) newErrors.visit_date = 'Visit date is required';
    if (!formData.visit_time) newErrors.visit_time = 'Visit time is required';
    if (isNaN(formData.duration) || formData.duration < 15 || formData.duration > 240) {
      newErrors.duration = 'Duration must be between 15 and 240 minutes';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      Object.values(newErrors).forEach(error => toast.error(error));
      return;
    }

    try {
      const payload = {
        employee: employeeId,
        doctor: doctorId,
        organization: organizationId,
        product_ids: formData.products.map(id => parseInt(id)),
        visit_date: formData.visit_date,
        visit_time: formData.visit_time,
        duration: parseInt(formData.duration),
        notes: formData.notes || '',
        status: formData.status,
      };
      console.log('Sending payload to backend:', JSON.stringify(payload, null, 2));

      let savedVisit;
      if (visit) {
        savedVisit = await dataService.updateVisit(visit.id, payload);
        toast.success('Visit updated successfully');
      } else {
        savedVisit = await dataService.createVisit(payload);
        toast.success('Visit scheduled successfully');
      }

      const selectedDoctor = getFilteredDoctors().find(d => d.id === doctorId);
      const selectedOrg = organizations.find(o => o.id === organizationId);
      onSave({
        visit: savedVisit,
        doctor: selectedDoctor,
        organization: selectedOrg,
      });
      onClose();
    } catch (error) {
      console.error('Error saving visit:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        stack: error.stack,
      });
      let errorMessage = 'Failed to save visit. Please try again.';
      if (error.response?.status === 400) {
        errorMessage = Object.entries(error.response.data || {})
          .map(([field, errors]) => {
            const errorText = Array.isArray(errors) ? errors.join(', ') : errors;
            return `${field}: ${errorText}`;
          })
          .join('; ');
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error occurred. Please check the backend logs for details.';
      }
      toast.error(errorMessage);
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleProductToggle = (productId) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter(id => id !== productId)
        : [...prev.products, productId],
    }));
  };

  const getFilteredDoctors = () => {
    if (!formData.organization) {
      console.log('No organization selected, returning empty doctors list');
      return [];
    }
    const organizationId = parseInt(formData.organization);
    const selectedOrg = organizations.find(org => org.id === organizationId);
    if (!selectedOrg) {
      console.log('Selected organization not found:', formData.organization);
      return [];
    }
    console.log('Doctors for organization', selectedOrg.id, ':', selectedOrg.doctors);
    return selectedOrg.doctors || [];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {visit ? 'Edit Visit' : 'Schedule New Visit'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {user.role === 'owner' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-1" />
                Employee
              </label>
              <select
                value={formData.employee}
                onChange={(e) => setFormData(prev => ({ ...prev, employee: e.target.value }))}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.employee ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.user?.first_name || ''} {emp.user?.last_name || ''} ({emp.employee_id || 'N/A'})
                  </option>
                ))}
              </select>
              {errors.employee && <p className="text-red-500 text-xs mt-1">{errors.employee}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              Organization
            </label>
            <select
              value={formData.organization}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                organization: e.target.value,
                doctor: '',
              }))}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.organization ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Select Organization</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>
                  {org.name} - {org.type}
                </option>
              ))}
            </select>
            {errors.organization && <p className="text-red-500 text-xs mt-1">{errors.organization}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-1" />
              Doctor
            </label>
            <select
              value={formData.doctor}
              onChange={(e) => setFormData(prev => ({ ...prev, doctor: e.target.value }))}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.doctor ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              disabled={!formData.organization}
            >
              <option value="">Select Doctor</option>
              {getFilteredDoctors().length > 0 ? (
                getFilteredDoctors().map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.name} - {doctor.specialization || 'No specialization'}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  {formData.organization ? 'No doctors available for this organization' : 'Select an organization first'}
                </option>
              )}
            </select>
            {errors.doctor && <p className="text-red-500 text-xs mt-1">{errors.doctor}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Visit Date
              </label>
              <input
                type="date"
                value={formData.visit_date}
                onChange={(e) => setFormData(prev => ({ ...prev, visit_date: e.target.value }))}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.visit_date ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.visit_date && <p className="text-red-500 text-xs mt-1">{errors.visit_date}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Visit Time
              </label>
              <input
                type="time"
                value={formData.visit_time}
                onChange={(e) => setFormData(prev => ({ ...prev, visit_time: e.target.value }))}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.visit_time ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.visit_time && <p className="text-red-500 text-xs mt-1">{errors.visit_time}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.duration ? 'border-red-500' : 'border-gray-300'
              }`}
              min="15"
              max="240"
              step="15"
              required
            />
            {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Package className="h-4 w-4 inline mr-1" />
              Products to Present
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
              {products.map(product => (
                <label key={product.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.products.includes(product.id)}
                    onChange={() => handleProductToggle(product.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{product.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="scheduled">Scheduled</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4 inline mr-1" />
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Add any additional notes about the visit..."
            />
          </div>

          {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
          {errors.employee && <p className="text-red-500 text-sm">{errors.employee}</p>}
          {errors.data && <p className="text-red-500 text-sm">{errors.data}</p>}
          {errors.user && <p className="text-red-500 text-sm">{errors.user}</p>}

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.employee || !formData.doctor || !formData.organization}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : visit ? 'Update Visit' : 'Schedule Visit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitModal;