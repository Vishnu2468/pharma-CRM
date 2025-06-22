import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Calendar, Clock, Plus, Filter, Search, MapPin, User, Package } from 'lucide-react';
// import VisitModal from '../../components/visits/VisitModal';
// import VisitModal from './components/visits/VisitModal';
import VisitModal from './VisitModal';

const VisitsPage = () => {
  const { user } = useAuth();
  const [visits, setVisits] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);

  useEffect(() => {
    loadVisits();
  }, []);

  useEffect(() => {
    filterVisits();
  }, [visits, searchQuery, statusFilter]);

  const loadVisits = async () => {
    try {
      const data = await dataService.getVisits();
      setVisits(data);
    } catch (error) {
      console.error('Error loading visits:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterVisits = () => {
    let filtered = visits;

    if (searchQuery) {
      filtered = filtered.filter(visit =>
        visit.doctor_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visit.organization_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visit.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(visit => visit.status === statusFilter);
    }

    setFilteredVisits(filtered);
  };

  const handleCreateVisit = () => {
    setSelectedVisit(null);
    setShowModal(true);
  };

  const handleEditVisit = (visit) => {
    setSelectedVisit(visit);
    setShowModal(true);
  };

  const handleVisitSaved = () => {
    loadVisits();
    setShowModal(false);
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visits Management</h1>
          <p className="text-gray-600">Manage your doctor visits and track progress</p>
        </div>
        {user?.role === 'employee' && (
          <button
            onClick={handleCreateVisit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Schedule Visit</span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Visits</p>
              <p className="text-2xl font-bold text-gray-900">{getTodayVisits().length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{getUpcomingVisits().length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {visits.filter(v => v.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Visits</p>
              <p className="text-2xl font-bold text-gray-900">{visits.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search visits by doctor, organization, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Visits List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            All Visits ({filteredVisits.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredVisits.length > 0 ? (
            filteredVisits.map((visit) => (
              <div key={visit.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Dr. {visit.doctor_name}
                      </h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(visit.status)}`}>
                        {visit.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {visit.organization_name}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(visit.visit_date)} at {visit.visit_time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        Duration: {visit.duration} minutes
                      </div>
                      {visit.product_names && visit.product_names.length > 0 && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Package className="h-4 w-4 mr-2" />
                          Products: {visit.product_names.join(', ')}
                        </div>
                      )}
                    </div>
                    
                    {visit.notes && (
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <strong>Notes:</strong> {visit.notes}
                      </p>
                    )}
                  </div>
                  
                  {user?.role === 'employee' && (
                    <button
                      onClick={() => handleEditVisit(visit)}
                      className="ml-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No visits found</h3>
              <p className="text-gray-600">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start by scheduling your first visit'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Visit Modal */}
      {showModal && (
        <VisitModal
          visit={selectedVisit}
          onClose={() => setShowModal(false)}
          onSave={handleVisitSaved}
        />
      )}
    </div>
  );
};

export default VisitsPage;