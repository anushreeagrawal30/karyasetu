import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { JHARKHAND_REGIONS } from '../../types';

interface AuthFormProps {
  type: 'citizen' | 'government';
}

type Role = 'citizen' | 'admin' | 'field_officer';

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    role: Role;
    region: string;
    department: string;
  }>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: type === 'citizen' ? 'citizen' : 'admin',
    region: '',
    department: '',
  });

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password, formData.role);
        if (success) {
          navigate(type === 'citizen' ? '/citizen' : '/admin');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        const success = await signup(formData, formData.role);
        if (success) {
          navigate(type === 'citizen' ? '/citizen' : '/admin');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4b39ef] to-[#6366f1] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-[#4b39ef] rounded-xl">
              {type === 'citizen' ? (
                <Users className="w-8 h-8 text-white" />
              ) : (
                <Shield className="w-8 h-8 text-white" />
              )}
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {type === 'citizen' ? 'Citizen Portal' : 'Government Portal'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef] transition-colors"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef] transition-colors"
              placeholder="Enter your email"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef] transition-colors"
                placeholder="Enter your phone number"
              />
            </div>
          )}

          {!isLogin && type === 'government' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef] transition-colors"
                >
                  <option value="admin">Admin</option>
                  <option value="field_officer">Field Officer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region (Jharkhand)
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef] transition-colors"
                >
                  <option value="">Select Region</option>
                  {JHARKHAND_REGIONS.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {formData.role === 'field_officer' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef] transition-colors"
                  >
                    <option value="">Select Department</option>
                  <option value="sanitation">Sanitation</option>
                  <option value="roads">Roads</option>
                    <option value="electrical">Electrical</option>
                  </select>
                </div>
              )}
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef] transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef] transition-colors"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4b39ef] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#4b39ef]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#4b39ef] hover:text-[#4b39ef]/80 font-medium"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Sign in'
              }
            </button>
          </div>

          <div className="text-center pt-4 border-t border-gray-200">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
            >
              ← Back to Homepage
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};