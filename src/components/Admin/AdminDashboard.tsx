import React, { useState } from 'react';
import { BarChart3, Users, AlertCircle, CheckCircle, Clock, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { IssueCard } from '../Citizen/IssueCard';
import { AdminAnalytics } from './AdminAnalytics';
import { IssueMapView } from '../Shared/IssueMapView';
import { CATEGORIES, JHARKHAND_REGIONS } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { issues, analytics, getIssuesByRegion, getIssuesByCategory } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'map' | 'analytics'>('overview');
  const [filters, setFilters] = useState({
    region: user?.role === 'field_officer' ? user.region || '' : '',
    category: user?.role === 'field_officer' ? user.department || '' : '',
    status: '',
  });

  const isSuperAdmin = user?.role === 'admin';
  const isFieldOfficer = user?.role === 'field_officer';

  // Filter issues based on role and filters
  let filteredIssues = issues;
  
  if (isFieldOfficer && user?.region) {
    filteredIssues = getIssuesByRegion(user.region);
    if (user.department) {
      filteredIssues = filteredIssues.filter(issue => issue.category === user.department);
    }
  } else if (filters.region) {
    filteredIssues = getIssuesByRegion(filters.region);
  }
  
  if (filters.category) {
    filteredIssues = filteredIssues.filter(issue => issue.category === filters.category);
  }
  
  if (filters.status) {
    filteredIssues = filteredIssues.filter(issue => issue.status === filters.status);
  }

  const updatePendingIssues = filteredIssues.filter(issue => issue.updatePending);
  
  const stats = [
    {
      icon: AlertCircle,
      label: 'Total Issues',
      value: filteredIssues.length,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Clock,
      label: 'Pending Issues',
      value: filteredIssues.filter(i => i.status !== 'resolved').length,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      icon: CheckCircle,
      label: 'Resolved Issues',
      value: filteredIssues.filter(i => i.status === 'resolved').length,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: Users,
      label: 'Update Pending',
      value: updatePendingIssues.length,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isSuperAdmin ? 'Admin Dashboard' : 'Field Officer Dashboard'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isSuperAdmin 
                  ? 'Monitor and manage civic issues across all regions'
                  : `Managing issues in ${user?.region} - ${user?.department || 'All Departments'}`
                }
              </p>
            </div>
            {user?.region && (
              <div className="mt-4 sm:mt-0 text-sm text-gray-500">
                Region: <span className="font-semibold">{user.region}</span>
                {user.department && (
                  <span className="ml-4">
                    Department: <span className="font-semibold capitalize">{user.department}</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters - Only show for Super Admin */}
        {isSuperAdmin && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 text-gray-500 mr-2" />
              <h3 className="font-medium text-gray-900">Filters</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region
                </label>
                <select
                  value={filters.region}
                  onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef]"
                >
                  <option value="">All Regions</option>
                  {JHARKHAND_REGIONS.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef]"
                >
                  <option value="">All Categories</option>
                  {Object.entries(CATEGORIES).map(([key, category]) => (
                    <option key={key} value={key}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef]"
                >
                  <option value="">All Status</option>
                  <option value="reported">Reported</option>
                  <option value="acknowledged">Acknowledged</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'issues', label: 'Manage Issues', icon: AlertCircle },
                { id: 'map', label: 'Heatmap View', icon: Users },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#4b39ef] text-[#4b39ef]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Issues</h3>
                <div className="grid gap-6">
                  {filteredIssues.slice(0, 5).map((issue) => (
                    <IssueCard
                      key={issue.id}
                      issue={issue}
                      showTimeline
                      showUpdateButton={isFieldOfficer}
                      showUpdateCheckButton={isSuperAdmin}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'issues' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Manage Issues</h3>
                  <p className="text-sm text-gray-500">{filteredIssues.length} issues total</p>
                </div>
                
                {updatePendingIssues.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-red-900 mb-2">
                      {updatePendingIssues.length} Issues Require Updates
                    </h4>
                    <p className="text-sm text-red-700">
                      These issues haven't received bi-weekly updates from field officers.
                    </p>
                  </div>
                )}
                
                <div className="grid gap-6">
                  {filteredIssues.map((issue) => (
                    <IssueCard
                      key={issue.id}
                      issue={issue}
                      showTimeline
                      showUpdateButton={isFieldOfficer}
                      showUpdateCheckButton={isSuperAdmin}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'map' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Issues Heatmap</h3>
                <IssueMapView issues={filteredIssues} showHeatmap />
              </div>
            )}

            {activeTab === 'analytics' && (
              <AdminAnalytics 
                analytics={analytics} 
                issues={filteredIssues}
                userRole={user?.role || 'admin'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};