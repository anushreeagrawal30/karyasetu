import React, { createContext, useContext, useState, useEffect } from 'react';
import { Issue, Analytics } from '../types';

interface DataContextType {
  issues: Issue[];
  analytics: Analytics;
  addIssue: (issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt' | 'upvotes' | 'upvotedBy' | 'timeline'>) => void;
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  upvoteIssue: (id: string, userId: string) => void;
  addTimelineEvent: (issueId: string, event: Omit<import('../types').TimelineEvent, 'id' | 'updatedAt'>) => void;
  getIssuesByRegion: (region?: string) => Issue[];
  getIssuesByCategory: (category?: string) => Issue[];
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

const generateMockIssues = (): Issue[] => {
  const categories = ['sanitation', 'roads', 'electrical'] as const;
  const statuses = ['reported', 'acknowledged', 'assigned', 'in_progress', 'resolved'] as const;
  const regions = ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar'];

  // Different images for different categories
  const getImagesForCategory = (category: string) => {
    switch (category) {
    case 'roads':
      return ['/src/assets/images/roaddd.jpg'];
    case 'sanitation':
      return ['/src/assets/images/sanii.jpg'];
      case 'electrical':
        return [
          'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ];
      default:
        return ['https://images.pexels.com/photos/247763/pexels-photo-247763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'];
    }
  };

  return Array.from({ length: 25 }, (_, i) => {
    const category = categories[i % categories.length];
    const categoryImages = getImagesForCategory(category);
    const randomImage = categoryImages[Math.floor(Math.random() * categoryImages.length)];

    return {
      id: `issue_${i + 1}`,
      title: `Issue ${i + 1}: ${category} problem`,
      description: `Detailed description of the ${category} issue reported by citizen.`,
      category: category,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)] as any,
      location: {
        lat: 23.3441 + (Math.random() - 0.5) * 0.1,
        lng: 85.3096 + (Math.random() - 0.5) * 0.1,
        address: `Area ${i + 1}, ${regions[i % regions.length]}`,
        region: regions[i % regions.length],
      },
      images: [randomImage],
      reportedBy: `citizen_${i + 1}`,
      assignedTo: Math.random() > 0.5 ? `officer_${(i % 3) + 1}` : undefined,
      upvotes: Math.floor(Math.random() * 15),
      upvotedBy: [],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      timeline: [
        {
          id: `timeline_${i}_1`,
          status: 'reported',
          message: 'Issue reported by citizen',
          updatedBy: `citizen_${i + 1}`,
          updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          isPublic: true,
        }
      ],
      lastFieldUpdate: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000) : undefined,
      updatePending: Math.random() > 0.7,
      rating: Math.floor(Math.random() * 5) + 1, // Random rating from 1 to 5
    };
  });
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize with mock data
    const mockIssues = generateMockIssues();
    setIssues(mockIssues);
    setIsLoading(false);
  }, []);

  const addIssue = (newIssue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt' | 'upvotes' | 'upvotedBy' | 'timeline'>) => {
    const issue: Issue = {
      ...newIssue,
      id: `issue_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      upvotes: 0,
      upvotedBy: [],
      timeline: [
        {
          id: `timeline_${Date.now()}`,
          status: 'reported',
          message: 'Issue reported by citizen',
          updatedBy: newIssue.reportedBy,
          updatedAt: new Date(),
          isPublic: true,
        }
      ],
    };
    setIssues(prev => [issue, ...prev]);
  };

  const updateIssue = (id: string, updates: Partial<Issue>) => {
    setIssues(prev => prev.map(issue => 
      issue.id === id 
        ? { ...issue, ...updates, updatedAt: new Date() }
        : issue
    ));
  };

  const upvoteIssue = (id: string, userId: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        const hasUpvoted = issue.upvotedBy.includes(userId);
        return {
          ...issue,
          upvotes: hasUpvoted ? issue.upvotes - 1 : issue.upvotes + 1,
          upvotedBy: hasUpvoted 
            ? issue.upvotedBy.filter(u => u !== userId)
            : [...issue.upvotedBy, userId],
        };
      }
      return issue;
    }));
  };

  const addTimelineEvent = (issueId: string, event: Omit<import('../types').TimelineEvent, 'id' | 'updatedAt'>) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        const newEvent = {
          ...event,
          id: `timeline_${Date.now()}`,
          updatedAt: new Date(),
        };
        return {
          ...issue,
          timeline: [...issue.timeline, newEvent],
          status: event.status,
          updatedAt: new Date(),
        };
      }
      return issue;
    }));
  };

  const getIssuesByRegion = (region?: string) => {
    if (!region) return issues;
    return issues.filter(issue => issue.location.region === region);
  };

  const getIssuesByCategory = (category?: string) => {
    if (!category) return issues;
    return issues.filter(issue => issue.category === category);
  };

  const analytics: Analytics = {
    totalIssues: issues.length,
    resolvedIssues: issues.filter(i => i.status === 'resolved').length,
    pendingIssues: issues.filter(i => i.status !== 'resolved').length,
    categoryBreakdown: issues.reduce((acc, issue) => {
      acc[issue.category] = (acc[issue.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    regionBreakdown: issues.reduce((acc, issue) => {
      acc[issue.location.region] = (acc[issue.location.region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    averageRating: issues.length > 0 ? issues.reduce((sum, issue) => sum + issue.rating, 0) / issues.length : 0,
  };

  return (
    <DataContext.Provider value={{
      issues,
      analytics,
      addIssue,
      updateIssue,
      upvoteIssue,
      addTimelineEvent,
      getIssuesByRegion,
      getIssuesByCategory,
      isLoading,
    }}>
      {children}
    </DataContext.Provider>
  );
};