import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { serviceProviders } from '../data/serviceProviders';

const ServiceProviderProfile = () => {
  const { id } = useParams();
  const provider = serviceProviders.find(p => p.id === parseInt(id));
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredDate: ''
  });

  if (!provider) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Service Provider not found</h1>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setShowContactForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end space-x-4">
              <img
                src={provider.profilePicture}
                alt={provider.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <div className="text-white">
                <h1 className="text-3xl font-bold">{provider.name}</h1>
                <p className="text-xl">{provider.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold mb-2">About</h2>
                  <p className="text-gray-600">{provider.description}</p>
                </div>

                {/* Experience */}
                <div>
                  <h2 className="text-xl font-semibold mb-2">Experience</h2>
                  <p className="text-gray-600">{provider.experience} of experience</p>
                </div>

                {/* Previous Works */}
                <div>
                  <h2 className="text-xl font-semibold mb-2">Previous Works</h2>
                  <ul className="list-disc list-inside text-gray-600">
                    {provider.previousWorks.map((work, index) => (
                      <li key={index}>{work}</li>
                    ))}
                  </ul>
                </div>

                {/* Reviews */}
                <div>
                  <h2 className="text-xl font-semibold mb-2">Reviews</h2>
                  <div className="space-y-4">
                    {provider.reviews.map((review, index) => (
                      <div key={index} className="border-b pb-4">
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">Hourly Rate: {provider.hourlyRate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{provider.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">+94 77 123 4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">contact@example.com</span>
                </div>

                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  onClick={() => setShowContactForm(true)}
                >
                  Contact Provider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact {provider.name}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  onClick={() => setShowContactForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderProfile; 