import React from 'react';
import { FileText, Eye, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Report',
    description: 'Citizens report civic issues with photos, location, and detailed descriptions through our easy-to-use platform.',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: Eye,
    title: 'Track',
    description: 'Real-time tracking of issue status with transparency. Get notifications and updates throughout the resolution process.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: CheckCircle,
    title: 'Resolve',
    description: 'Government officials efficiently resolve issues with proper workflows, accountability, and citizen feedback.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-indigo-100/30 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 rounded-full px-6 py-3 mb-6">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-indigo-700">Simple Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            How KaryaSetu Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our streamlined process ensures efficient communication between citizens and government
            for faster issue resolution and better civic services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative group">
                {/* Connecting arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-8 z-10">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-indigo-300 to-indigo-400 relative">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                        <div className="w-0 h-0 border-l-4 border-l-indigo-400 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step number indicator */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>

                <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className={`w-28 h-28 mx-auto mb-8 ${step.bgColor} rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative`}>
                    <Icon className={`w-14 h-14 ${step.color}`} />
                    <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-indigo-600 transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300">
                    {step.description}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-6">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 delay-${index * 200} ${
                          index === 0 ? 'bg-gradient-to-r from-red-400 to-red-500' :
                          index === 1 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                          'bg-gradient-to-r from-green-400 to-green-500'
                        }`}
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/20 rounded-3xl shadow-xl border border-indigo-200/50 p-10 max-w-5xl mx-auto backdrop-blur-sm relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/40 to-transparent rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-200/40 to-transparent rounded-full blur-xl"></div>

            <div className="relative">
              <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-6 py-3 mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-green-700">Jharkhand Focused</span>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Built for Jharkhand
              </h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-3xl mx-auto">
                KaryaSetu is specifically designed to serve all districts of Jharkhand with
                localized features, regional language support, and integration with local government systems.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="group p-6 bg-white/60 rounded-2xl border border-gray-200/50 hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300">10+</div>
                  <div className="text-sm text-gray-600 font-medium">Districts</div>
                  <div className="mt-2 w-8 h-1 bg-indigo-400 rounded-full mx-auto"></div>
                </div>
                <div className="group p-6 bg-white/60 rounded-2xl border border-gray-200/50 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">4</div>
                  <div className="text-sm text-gray-600 font-medium">Categories</div>
                  <div className="mt-2 w-8 h-1 bg-blue-400 rounded-full mx-auto"></div>
                </div>
                <div className="group p-6 bg-white/60 rounded-2xl border border-gray-200/50 hover:border-green-300 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-sm text-gray-600 font-medium">Monitoring</div>
                  <div className="mt-2 w-8 h-1 bg-green-400 rounded-full mx-auto"></div>
                </div>
                <div className="group p-6 bg-white/60 rounded-2xl border border-gray-200/50 hover:border-purple-300 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
                  <div className="text-sm text-gray-600 font-medium">Transparency</div>
                  <div className="mt-2 w-8 h-1 bg-purple-400 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};