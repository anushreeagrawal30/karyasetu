import React from 'react';
import { BarChart3, TrendingUp, Users, Star, Download } from 'lucide-react';
import { Analytics, Issue } from '../../types';

interface AdminAnalyticsProps {
  analytics: Analytics;
  issues: Issue[];
  userRole: string;
}

export const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ analytics, issues, userRole }) => {
  const handleExport = (format: 'csv' | 'pdf') => {
    // Mock export functionality
    const data = issues.map(issue => ({
      id: issue.id,
      title: issue.title,
      category: issue.category,
      status: issue.status,
      region: issue.location.region,
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt,
    }));
    
    console.log(`Exporting ${data.length} issues as ${format.toUpperCase()}`);
    alert(`Export functionality would download ${format.toUpperCase()} with ${data.length} records`);
  };

  const chartData = [
    { category: 'Sanitation', count: analytics.categoryBreakdown.sanitation || 0, color: 'bg-green-500' },
    { category: 'Roads', count: analytics.categoryBreakdown.roads || 0, color: 'bg-gray-500' },
    { category: 'Electrical', count: analytics.categoryBreakdown.electrical || 0, color: 'bg-yellow-500' },
  ];

  const maxCount = Math.max(...chartData.map(item => item.count));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Analytics & Reports</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => handleExport('csv')}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-blue-600">Total Issues</p>
              <p className="text-2xl font-bold text-blue-900">{analytics.totalIssues}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-green-600">Resolution Rate</p>
              <p className="text-2xl font-bold text-green-900">
                {analytics.totalIssues > 0 ? Math.round((analytics.resolvedIssues / analytics.totalIssues) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-xl">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm text-orange-600">Average Rating</p>
              <p className="text-2xl font-bold text-orange-900">{analytics.averageRating.toFixed(1)} / 5</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm text-purple-600">Pending Issues</p>
              <p className="text-2xl font-bold text-purple-900">{analytics.pendingIssues}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Chart */}
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">Issues by Category</h4>
        <div className="space-y-4">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center">
              <div className="w-24 text-sm text-gray-600">{item.category}</div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
                  <div
                    className={`${item.color} h-full transition-all duration-1000 ease-out`}
                    style={{ width: `${maxCount > 0 ? (item.count / maxCount) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-12 text-sm font-semibold text-gray-900 text-right">
                {item.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Breakdown */}
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">Issues by Region</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(analytics.regionBreakdown).map(([region, count]) => (
            <div key={region} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{region}</span>
                <span className="text-lg font-bold text-[#4b39ef]">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-white p-6 border border-gray-200 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">Status Distribution</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['reported', 'acknowledged', 'assigned', 'in_progress', 'resolved'].map((status) => {
            const count = issues.filter(issue => issue.status === status).length;
            const percentage = analytics.totalIssues > 0 ? (count / analytics.totalIssues) * 100 : 0;
            
            return (
              <div key={status} className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-[#4b39ef]">{count}</span>
                </div>
                <p className="text-sm font-medium text-gray-900 capitalize">
                  {status.replace('_', ' ')}
                </p>
                <p className="text-xs text-gray-500">{percentage.toFixed(1)}%</p>
              </div>
            );
          })}
        </div>
      </div>

      {userRole === 'admin' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-yellow-900 mb-4">
            Field Officer Performance
          </h4>
          <p className="text-yellow-700 mb-4">
            Monitor field officers who haven't provided mandatory bi-weekly updates.
          </p>
          <div className="text-sm text-yellow-600">
            {issues.filter(issue => issue.updatePending).length} issues require attention from field officers.
          </div>
        </div>
      )}
    </div>
  );
};