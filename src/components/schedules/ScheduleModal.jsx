// import React, { useState, useEffect } from 'react';
// import { X, Calendar, Clock, FileText, Tag, CheckCircle } from 'lucide-react';
// import { dataService } from '../../services/dataService';
// import toast from 'react-hot-toast';

// const ScheduleModal = ({ schedule, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     date: '',
//     time: '',
//     type: 'visit',
//     status: 'pending'
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (schedule) {
//       setFormData({
//         title: schedule.title || '',
//         description: schedule.description || '',
//         date: schedule.date || '',
//         time: schedule.time || '',
//         type: schedule.type || 'visit',
//         status: schedule.status || 'pending'
//       });
//     }
//   }, [schedule]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (schedule) {
//         await dataService.updateSchedule(schedule.id, formData);
//         toast.success('Schedule updated successfully');
//       } else {
//         await dataService.createSchedule(formData);
//         toast.success('Schedule created successfully');
//       }
//       onSave();
//     } catch (error) {
//       console.error('Error saving schedule:', error);
//       toast.error('Failed to save schedule');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-semibold text-gray-900">
//               {schedule ? 'Edit Schedule' : 'Create New Schedule'}
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
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <FileText className="h-4 w-4 inline mr-1" />
//               Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter schedule title..."
//               required
//             />
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
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="visit">Visit</option>
//               <option value="meeting">Meeting</option>
//               <option value="training">Training</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* Date and Time */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Calendar className="h-4 w-4 inline mr-1" />
//                 Date
//               </label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Clock className="h-4 w-4 inline mr-1" />
//                 Time
//               </label>
//               <input
//                 type="time"
//                 name="time"
//                 value={formData.time}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
//           </div>

//           {/* Status */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <CheckCircle className="h-4 w-4 inline mr-1" />
//               Status
//             </label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="pending">Pending</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               rows="3"
//               placeholder="Add schedule description..."
//             />
//           </div>

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
//               disabled={loading}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
//             >
//               {loading ? 'Saving...' : schedule ? 'Update Schedule' : 'Create Schedule'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ScheduleModal;

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, FileText, Tag, CheckCircle, User } from 'lucide-react';
import { dataService } from '../../services/dataService';
import toast from 'react-hot-toast';

const ScheduleModal = ({ schedule, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'visit',
    status: 'pending',
    employee: '', // Added employee field
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch employees for dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await dataService.getEmployees();
        console.log('Fetched employees for ScheduleModal:', data);
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError('Failed to load employees');
        toast.error('Failed to load employees');
      }
    };
    fetchEmployees();
  }, []);

  // Populate form with existing schedule data
  useEffect(() => {
    if (schedule) {
      setFormData({
        title: schedule.title || '',
        description: schedule.description || '',
        date: schedule.date || '',
        time: schedule.time || '',
        type: schedule.type || 'visit',
        status: schedule.status || 'pending',
        employee: schedule.employee?.id || '', // Use employee ID if available
      });
    }
  }, [schedule]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate employee selection
    if (!formData.employee) {
      setError('Please select an employee');
      setLoading(false);
      toast.error('Please select an employee');
      return;
    }

    try {
      const payload = {
        ...formData,
        employee: parseInt(formData.employee), // Ensure employee is sent as an integer
      };
      if (schedule) {
        await dataService.updateSchedule(schedule.id, payload);
        toast.success('Schedule updated successfully');
      } else {
        await dataService.createSchedule(payload);
        toast.success('Schedule created successfully');
      }
      onSave();
    } catch (error) {
      const errorMessage =
        error.response?.data?.employee?.[0] ||
        error.response?.data?.detail ||
        'Failed to save schedule';
      console.error('Error saving schedule:', error);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {schedule ? 'Edit Schedule' : 'Create New Schedule'}
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
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Employee Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-1" />
              Employee
            </label>
            <select
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select an employee</option>
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.user?.first_name || ''} {employee.user?.last_name || ''} (
                  {employee.employee_id || 'N/A'})
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4 inline mr-1" />
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter schedule title..."
              required
            />
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="visit">Visit</option>
              <option value="meeting">Meeting</option>
              <option value="training">Training</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CheckCircle className="h-4 w-4 inline mr-1" />
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Add schedule description..."
            />
          </div>

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
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : schedule ? 'Update Schedule' : 'Create Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;