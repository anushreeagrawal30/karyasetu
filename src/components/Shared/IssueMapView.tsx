import React from 'react';
import { MapPin, Layers, Maximize2 } from 'lucide-react';
import { Issue, CATEGORIES } from '../../types';

interface IssueMapViewProps {
  issues: Issue[];
  showHeatmap?: boolean;
}

export const IssueMapView: React.FC<IssueMapViewProps> = ({ issues, showHeatmap = false }) => {
  const [viewMode, setViewMode] = React.useState<'cluster' | 'heatmap'>('cluster');

  // Group issues by category for legend
  const categoryStats = Object.entries(CATEGORIES).map(([key, category]) => ({
    key,
    name: category.name,
    color: category.color,
    icon: category.icon,
    count: issues.filter(issue => issue.category === key).length,
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Map Controls */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-900">Map View</span>
            </div>
            
            {showHeatmap && (
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('cluster')}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    viewMode === 'cluster'
                      ? 'bg-white text-[#4b39ef] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cluster View
                </button>
                <button
                  onClick={() => setViewMode('heatmap')}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    viewMode === 'heatmap'
                      ? 'bg-white text-[#4b39ef] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Heatmap
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Layers className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Area - Mock Map */}
      <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100 border border-gray-200">
        <div className="absolute inset-0 pointer-events-none">
          {viewMode === 'cluster' ? (
            // Cluster markers
            <>
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                5
              </div>
              <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                3
              </div>
              <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                2
              </div>
              <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                7
              </div>
            </>
          ) : (
            // Heatmap overlay
            <div className="absolute inset-0 opacity-60">
              <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-red-400 rounded-full blur-lg"></div>
              <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-orange-400 rounded-full blur-lg"></div>
              <div className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-yellow-400 rounded-full blur-lg"></div>
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-red-500 rounded-full blur-xl"></div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 mb-3">Category Legend</h4>
          <div className="text-sm text-gray-500">
            Total: {issues.length} issues
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryStats.map((category) => (
            <div key={category.key} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded bg-${category.color}-500`}></div>
              <span className="text-sm text-gray-700">
                {category.icon} {category.name}
              </span>
              <span className="text-sm font-medium text-gray-900">
                ({category.count})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};