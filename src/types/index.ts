export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'citizen' | 'admin' | 'field_officer';
  region?: string;
  department?: string;
  createdAt: Date;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'sanitation' | 'roads' | 'electrical';
  status: 'reported' | 'acknowledged' | 'assigned' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location: {
    lat: number;
    lng: number;
    address: string;
    region: string;
  };
  images: string[];
  reportedBy: string;
  assignedTo?: string;
  upvotes: number;
  upvotedBy: string[];
  createdAt: Date;
  updatedAt: Date;
  timeline: TimelineEvent[];
  lastFieldUpdate?: Date;
  updatePending?: boolean;
  rating: number;
}

export interface TimelineEvent {
  id: string;
  status: Issue['status'];
  message: string;
  updatedBy: string;
  updatedAt: Date;
  isPublic: boolean;
}

export interface Analytics {
  totalIssues: number;
  resolvedIssues: number;
  pendingIssues: number;
  categoryBreakdown: Record<string, number>;
  regionBreakdown: Record<string, number>;
  averageRating: number;
}

export const CATEGORIES = {
  sanitation: { name: 'Sanitation', color: 'green', icon: '🗑️' },
  roads: { name: 'Roads', color: 'gray', icon: '🛣️' },
  electrical: { name: 'Electrical', color: 'yellow', icon: '⚡' },
} as const;

export const JHARKHAND_REGIONS = [
  'Ranchi',
  'Jamshedpur',
  'Dhanbad',
  'Bokaro',
  'Deoghar',
  'Phusro',
  'Hazaribagh',
  'Giridih',
  'Ramgarh',
  'Medininagar',
] as const;