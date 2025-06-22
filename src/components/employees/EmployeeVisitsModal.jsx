import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, User, Package, FileText } from 'lucide-react';
import { dataService } from '../../services/dataService';

const EmployeeVisitsModal = ({ employee, onClose }) => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployeeVisits();
  }, [employee]);

  const loadEmployeeVisits = async () => {
    try {
      const data = await dataService.getEmployeeVisits(employee.id);
      setVisits(data);
    } catch (error) {
      console.error('Error loading employee visits:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getVisitStats = () => {
    const total = visits.length;
    const completed = visits.filter(v => v.status === 'completed').length;
    const scheduled = visits.filter(v => v.status === 'scheduled').length;
    const ongoing = visits.filter(v => v.status === 'ongoing').length;
    
    return { total, completed, scheduled, ongoing };
  };

  const stats = getVisitStats();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Visits by {employee.user.first_name} {employee.user.last_name}
              </h2>
              <p className="text-sm text-gray-600">
                Employee ID: {employee.employee_id} | {employee.designation}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm text-blue-600">Total Visits</p>
                      <p className="text-xl font-bold text-blue-900">{stats.total}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm text-green-600">Completed</p>
                      <p className="text-xl font-bold text-green-900">{stats.completed}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-yellow-600 mr-2" />
                    <div>
                      <p className="text-sm text-yellow-600">Scheduled</p>
                      <p className="text-xl font-bold text-yellow-900">{stats.scheduled}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm text-blue-600">Ongoing</p>
                      <p className="text-xl font-bold text-blue-900">{stats.ongoing}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visits List */}
              <div className="space-y-4">
                {visits.length > 0 ? (
                  visits.map((visit) => (
                    <div key={visit.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            Dr. {visit.doctor_name}
                          </h4>
                          <p className="text-sm text-gray-600">{visit.organization_name}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(visit.status)}`}>
                          {visit.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDate(visit.visit_date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {visit.visit_time} ({visit.duration} min)
                        </div>
                        {visit.product_names && visit.product_names.length > 0 && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Package className="h-4 w-4 mr-2" />
                            {visit.product_names.length} product(s)
                          </div>
                        )}
                      </div>
                      
                      {visit.product_names && visit.product_names.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Products Presented:</p>
                          <div className="flex flex-wrap gap-1">
                            {visit.product_names.map((product, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                {product}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {visit.notes && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-start">
                            <FileText className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                            <p className="text-sm text-gray-600">{visit.notes}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No visits found</h3>
                    <p className="text-gray-600">This employee hasn't made any visits yet</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeVisitsModal;