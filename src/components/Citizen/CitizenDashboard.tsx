import React, { useState } from 'react';
import { Plus, MapPin, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { IssueCard } from './IssueCard';
import { ReportIssueModal } from './ReportIssueModal';
import { IssueMapView } from '../Shared/IssueMapView';

export const CitizenDashboard: React.FC = () => {
  const { user } = useAuth();
  const { issues, analytics } = useData();
  const [showReportModal, setShowReportModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'feed' | 'map' | 'my-issues'>('feed');

  const myIssues = issues.filter(issue => issue.reportedBy === user?.id);
  const nearbyIssues = issues.slice(0, 10); // Mock nearby issues

  const stats = [
    {
      icon: TrendingUp,
      label: 'Issues Reported',
      value: myIssues.length,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Clock,
      label: 'Pending Issues',
      value: myIssues.filter(i => i.status !== 'resolved').length,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      icon: CheckCircle,
      label: 'Resolved Issues',
      value: myIssues.filter(i => i.status === 'resolved').length,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
              <p className="text-gray-600 mt-1">Report and track civic issues in your area</p>
            </div>
            <button
              onClick={() => setShowReportModal(true)}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-[#4b39ef] text-white font-semibold rounded-lg hover:bg-[#4b39ef]/90 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Report Issue
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {[
                { id: 'feed', label: 'Community Feed', icon: TrendingUp },
                { id: 'map', label: 'Map View', icon: MapPin },
                { id: 'my-issues', label: 'My Issues', icon: Clock },
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
            {activeTab === 'feed' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Issues in Your Area</h3>
                  <p className="text-sm text-gray-500">{nearbyIssues.length} issues found</p>
                </div>
                <div className="grid gap-6">
                  {nearbyIssues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} showUpvote />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'map' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Issues Map</h3>
                <IssueMapView issues={nearbyIssues} />
              </div>
            )}

            {activeTab === 'my-issues' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">My Reported Issues</h3>
                  <p className="text-sm text-gray-500">{myIssues.length} issues reported</p>
                </div>
                {myIssues.length > 0 ? (
                  <div className="grid gap-6">
                    {myIssues.map((issue) => (
                      <IssueCard key={issue.id} issue={issue} showTimeline />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Issues Reported Yet</h3>
                    <p className="text-gray-500 mb-6">Start by reporting your first civic issue</p>
                    <button
                      onClick={() => setShowReportModal(true)}
                      className="inline-flex items-center px-4 py-2 bg-[#4b39ef] text-white font-semibold rounded-lg hover:bg-[#4b39ef]/90 transition-colors"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Report Your First Issue
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showReportModal && (
        <ReportIssueModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
};