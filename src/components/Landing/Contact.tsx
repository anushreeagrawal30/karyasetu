import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get Support & Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Need help with KaryaSetu? Our support team is available 24/7 to assist you with 
            any questions or technical issues.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 text-sm mb-2">Call us directly for immediate assistance</p>
                <p className="text-[#4b39ef] font-medium">+91-1800-xxx-xxxx</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-2">Send us your queries via email</p>
                <p className="text-[#4b39ef] font-medium">support@karyasetu.gov.in</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Office Address</h3>
                <p className="text-gray-600 text-sm">
                  Secretariat Building<br />
                  Ranchi, Jharkhand 834001
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Support Hours</h3>
                <p className="text-gray-600 text-sm">
                  24/7 Online Support<br />
                  Office: 9 AM - 6 PM (Mon-Fri)
                </p>
              </div>
            </div>

            <div className="bg-[#4b39ef] text-white p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Emergency Contact</h3>
              <p className="text-blue-100 mb-4">
                For urgent civic issues that require immediate attention, 
                please use our emergency hotline available 24/7.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <p className="text-2xl font-bold">Emergency: 108</p>
                  <p className="text-blue-100 text-sm">For life-threatening emergencies</p>
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold">Civic: 1800-xxx-xxx</p>
                  <p className="text-blue-100 text-sm">For urgent civic issues</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef] transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef] transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef] transition-colors"
                  placeholder="What can we help you with?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b39ef]/20 focus:border-[#4b39ef] transition-colors resize-none"
                  placeholder="Please describe your query or feedback..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#4b39ef] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#4b39ef]/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};