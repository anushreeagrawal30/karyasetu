import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Citizen, Ranchi",
    content: "KaryaSetu helped me resolve a sanitation issue in my neighborhood within 48 hours. The real-time updates kept me informed throughout the process.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Rajesh Kumar",
    role: "Field Officer, Dhanbad",
    content: "As a government official, KaryaSetu has streamlined our workflow tremendously. The categorization system makes it easy to prioritize and resolve issues efficiently.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Anita Singh",
    role: "Citizen, Jamshedpur",
    content: "The transparency and accountability features are outstanding. I can track my reported issues and see exactly what's happening at each step.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

export const SuccessStories: React.FC = () => {
  return (
    <section id="success-stories" className="py-24 bg-gradient-to-br from-indigo-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-100/40 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-100 rounded-full px-6 py-3 mb-6">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-700">Success Stories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real experiences from citizens and government officials who have transformed
            their civic engagement with KaryaSetu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <Quote className="w-8 h-8 text-indigo-300 mb-4 group-hover:text-indigo-400 transition-colors duration-300" />

              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                "{testimonial.content}"
              </p>

              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200 group-hover:border-indigo-300 transition-colors duration-300"
                />
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Decorative element */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-indigo-200/50 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Thousands of Satisfied Users</h3>
            <p className="text-gray-600 mb-6">
              Over 10,000 citizens and 500+ government officials across Jharkhand trust KaryaSetu
              for efficient civic issue resolution.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-indigo-600 mb-2">10,000+</div>
                <div className="text-sm text-gray-600">Active Citizens</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">Govt. Officials</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
