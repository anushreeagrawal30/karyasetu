import React, { useState } from 'react';
import { MapPin, Clock, User, ArrowUp, MessageSquare, Calendar, CheckCircle } from 'lucide-react';
import { Issue, CATEGORIES } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import lighttImage from '../../assets/images/lightt.jpeg';

interface IssueCardProps {
  issue: Issue;
  showUpvote?: boolean;
  showTimeline?: boolean;
  showUpdateButton?: boolean;
  showUpdateCheckButton?: boolean;
}

export const IssueCard: React.FC<IssueCardProps> = ({
  issue,
  showUpvote = false,
  showTimeline = false,
  showUpdateButton = false,
  showUpdateCheckButton = false
}) => {
  const { user } = useAuth();
  const { upvoteIssue, updateIssue, addTimelineEvent } = useData();
  const [showFullTimeline, setShowFullTimeline] = useState(false);
  
  const category = CATEGORIES[issue.category];
  const hasUpvoted = user ? issue.upvotedBy.includes(user.id) : false;

  const handleUpvote = () => {
    if (user) {
      upvoteIssue(issue.id, user.id);
    }
  };

  const handleUpdate = () => {
    if (user) {
      addTimelineEvent(issue.id, {
        status: issue.status,
        message: `Updated by ${user.role === 'field_officer' ? 'Field Officer' : 'Admin'}`,
        updatedBy: user.id,
        isPublic: true,
      });
    }
  };

  const handleUpdateCheck = () => {
    if (user) {
      updateIssue(issue.id, {
        updatePending: false,
        lastFieldUpdate: new Date(),
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'bg-yellow-100 text-yellow-800';
      case 'acknowledged': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-purple-100 text-purple-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 border border-gray-200/50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br from-${category.color}-100 to-${category.color}-200 shadow-lg transform hover:scale-110 transition-transform duration-200`}>
              <span className="text-2xl animate-pulse">{category.icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors">{issue.title}</h3>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">{category.name}</span>
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                  <span className="truncate max-w-xs">{issue.location.address}</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-md transform hover:scale-105 transition-transform ${getStatusColor(issue.status)}`}>
              {issue.status.replace('_', ' ').toUpperCase()}
            </span>
            <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-md transform hover:scale-105 transition-transform ${getPriorityColor(issue.priority)}`}>
              {issue.priority.toUpperCase()}
            </span>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{issue.description}</p>

        {issue.images.length > 0 && (
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl z-10"></div>
            <img
              src={issue.category === 'electrical' ? lighttImage : issue.images[0]}
              alt="Issue"
              className="w-80 h-48 object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md z-20">
              <span className="text-sm font-bold text-gray-700">📷</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm bg-gray-50/50 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-gray-600">
              <User className="w-4 h-4 mr-2 text-blue-500" />
              <span className="font-medium">Citizen Report</span>
            </span>
            <span className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-green-500" />
              <span className="font-medium">{new Date(issue.createdAt).toLocaleDateString()}</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {showUpvote && (
              <button
                onClick={handleUpvote}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md transform hover:scale-105 transition-all duration-200 ${
                  hasUpvoted
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <ArrowUp className="w-4 h-4" />
                <span className="font-bold">{issue.upvotes}</span>
              </button>
            )}
            {showUpdateButton && (
              <button
                onClick={handleUpdate}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Clock className="w-4 h-4" />
                <span className="font-bold">Update</span>
              </button>
            )}
            {showUpdateCheckButton && (
              <button
                onClick={handleUpdateCheck}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <CheckCircle className="w-4 h-4" />
                <span className="font-bold">Check</span>
              </button>
            )}
            {(!showUpdateButton && !showUpdateCheckButton) && (
              <button className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-600 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 border border-gray-200">
                <MessageSquare className="w-4 h-4" />
                <span className="font-bold">Comment</span>
              </button>
            )}
          </div>
        </div>

        {showTimeline && issue.timeline.length > 0 && (
          <div className="mt-8 pt-6 border-t-2 border-gradient-to-r from-blue-200 to-purple-200">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-gray-900 text-lg flex items-center">
                <span className="mr-2">📅</span>
                Status Timeline
              </h4>
              {issue.timeline.length > 2 && (
                <button
                  onClick={() => setShowFullTimeline(!showFullTimeline)}
                  className="text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-bold"
                >
                  {showFullTimeline ? 'Show Less' : 'Show All'}
                </button>
              )}
            </div>

            <div className="space-y-4">
              {(showFullTimeline ? issue.timeline : issue.timeline.slice(-2))
                .map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-4 p-3 bg-white/50 rounded-lg backdrop-blur-sm hover:bg-white/70 transition-colors">
                    <div className={`w-4 h-4 rounded-full mt-1 shadow-md ${getStatusColor(event.status).replace('text-', 'bg-').replace('100', '500')} transform hover:scale-110 transition-transform`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1">{event.message}</p>
                      <div className="flex items-center space-x-3 text-xs text-gray-600">
                        <Calendar className="w-3 h-3 text-blue-500" />
                        <span className="font-medium">{new Date(event.updatedAt).toLocaleString()}</span>
                        {event.isPublic && (
                          <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-xs font-bold">Public Update</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};