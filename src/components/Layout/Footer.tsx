import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-[#4b39ef] rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">KaryaSetu</h3>
                <p className="text-sm text-gray-400">Civic Engagement Platform</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting citizens with government for better civic services and community development 
              across Jharkhand. Report issues, track progress, and build a better tomorrow together.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                Serving all districts of Jharkhand
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/auth/citizen" className="text-gray-400 hover:text-white transition-colors">
                  Citizen Portal
                </Link>
              </li>
              <li>
                <Link to="/auth/government" className="text-gray-400 hover:text-white transition-colors">
                  Government Portal
                </Link>
              </li>
              <li>
                <Link to="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                +91-1800-xxx-xxxx
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                support@karyasetu.gov.in
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                Secretariat, Ranchi, Jharkhand
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 KaryaSetu - Government of Jharkhand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};