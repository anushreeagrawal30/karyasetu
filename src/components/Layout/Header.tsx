import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImage from '../../../logo.jpg';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isAuthPage = location.pathname.includes('/auth');
  const isLanding = location.pathname === '/';

  if (isAuthPage) return null;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-[#4b39ef] rounded-lg">
              <img src={logoImage} alt="Logo" className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">KaryaSetu</h1>
              <p className="text-xs text-gray-600">Civic Engagement Platform</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {isLanding && (
              <>
                <Link to="#features" className="text-gray-700 hover:text-[#4b39ef] transition-colors">
                  Features
                </Link>
                <Link to="#how-it-works" className="text-gray-700 hover:text-[#4b39ef] transition-colors">
                  How it Works
                </Link>
                <Link to="#contact" className="text-gray-700 hover:text-[#4b39ef] transition-colors">
                  Contact
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600 capitalize">{user.role.replace('_', ' ')}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth/citizen"
                  className="px-4 py-2 text-sm font-medium text-[#4b39ef] hover:bg-[#4b39ef]/5 rounded-lg transition-colors"
                >
                  Citizen Login
                </Link>
                <Link
                  to="/auth/government"
                  className="px-4 py-2 text-sm font-medium bg-[#4b39ef] text-white hover:bg-[#4b39ef]/90 rounded-lg transition-colors"
                >
                  Government Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};