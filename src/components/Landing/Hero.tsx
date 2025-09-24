import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const [animatedStats, setAnimatedStats] = useState({ issues: 0, districts: 0, support: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({ issues: 500, districts: 10, support: 24 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-[#4b39ef] via-[#6366f1] to-[#8b5cf6] text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-medium">Trusted by 10,000+ Citizens</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-center animate-slide-up">
                Report, Track, Resolve
                <span className="block text-yellow-300 bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  Civic Issues
                </span>
              </h1>

              <p className="text-xl text-blue-100 max-w-2xl mx-auto text-center leading-relaxed animate-fade-in">
                Connecting citizens with government for better civic services and community
                development across Jharkhand. Experience seamless issue resolution with real-time updates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
              <Link
                to="/auth/citizen"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#4b39ef] font-semibold rounded-xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                Report an Issue
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/auth/government"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-[#4b39ef] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Government Login
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 animate-fade-in-up delay-500">
              <div className="text-center group">
                <div className="relative">
                  <div className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-2 transition-all group-hover:scale-110">
                    {animatedStats.issues}+
                  </div>
                  <div className="text-blue-100 text-sm">Issues Resolved</div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">✓</span>
                  </div>
                </div>
              </div>

              <div className="text-center group">
                <div className="relative">
                  <div className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-2 transition-all group-hover:scale-110">
                    {animatedStats.districts}+
                  </div>
                  <div className="text-blue-100 text-sm">Districts Covered</div>
                  <MapPin className="w-4 h-4 text-yellow-300 mx-auto mt-1" />
                </div>
              </div>

              <div className="text-center group">
                <div className="relative">
                  <div className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-2 transition-all group-hover:scale-110">
                    {animatedStats.support}/7
                  </div>
                  <div className="text-blue-100 text-sm">Support Available</div>
                  <Users className="w-4 h-4 text-yellow-300 mx-auto mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
