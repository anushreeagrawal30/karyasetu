import React from 'react';
import { MapPin, Bell, BarChart3, Users, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Interactive Maps',
    description: 'GPS-enabled reporting with clustering and heatmap visualization of issues across your region.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Bell,
    title: 'Real-time Updates',
    description: 'Instant notifications and timeline tracking for complete transparency throughout the resolution process.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Comprehensive reporting and analytics with export capabilities for data-driven decision making.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Users,
    title: 'Multi-role Access',
    description: 'Separate dashboards for citizens, field officers, and admins with role-based permissions.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with data protection and reliable infrastructure for government use.',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: Clock,
    title: 'Efficient Workflows',
    description: 'Streamlined processes with automated reminders and deadline tracking for faster resolution.',
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100/40 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#4b39ef]/10 rounded-full px-6 py-3 mb-6">
            <span className="w-2 h-2 bg-[#4b39ef] rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-[#4b39ef]">Advanced Features</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Powerful Features for Civic Engagement
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            KaryaSetu provides comprehensive tools and features designed to streamline
            civic issue management and improve government-citizen communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl border border-gray-200 hover:border-[#4b39ef]/50 hover:shadow-xl hover:shadow-[#4b39ef]/10 transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                  <Icon className={`w-8 h-8 ${feature.color} transition-all duration-300`} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#4b39ef] transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-1 bg-gradient-to-r from-[#4b39ef] to-[#6366f1] rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Department Color Coding Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-6 py-3 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-green-700">Smart Categorization</span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Department Color Coding System
            </h3>
            <p className="text-gray-600 text-lg">
              Easy visual identification of different civic departments and issue categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 border-2 border-green-200 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 hover:border-green-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <img src="/src/assets/images/sanitation.webp" alt="Sanitation" className="w-8 h-8 filter brightness-0 invert" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-2">Sanitation</h4>
              <p className="text-sm text-gray-600">Green Category</p>
              <div className="mt-3 w-12 h-1 bg-green-400 rounded-full mx-auto"></div>
            </div>

            <div className="group text-center p-8 border-2 border-gray-200 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <img src="/src/assets/images/roadd.htm" alt="Roads" className="w-8 h-8 filter brightness-0 invert" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-2">Roads</h4>
              <p className="text-sm text-gray-600">Grey Category</p>
              <div className="mt-3 w-12 h-1 bg-gray-400 rounded-full mx-auto"></div>
            </div>

            <div className="group text-center p-8 border-2 border-yellow-200 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100/50 hover:border-yellow-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-2">Electrical</h4>
              <p className="text-sm text-gray-600">Yellow Category</p>
              <div className="mt-3 w-12 h-1 bg-yellow-400 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};