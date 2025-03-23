import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, Phone, Mail, MapPin, DollarSign, Briefcase } from 'lucide-react';
import { serviceProviders } from '../data/serviceProviders';

const ServiceProviderProfile = () => {
  const { id } = useParams();
  const provider = serviceProviders.find(p => p.id === parseInt(id));

  if (!provider) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Service Provider not found</h1>
        </div>
      </div>
    );
  }

  const averageRating = provider.reviews.reduce((acc, review) => acc + review.rating, 0) / provider.reviews.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img
              src={provider.profilePicture}
              alt={provider.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
              <p className="text-xl text-gray-600 mt-2">{provider.category}</p>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-700">{averageRating.toFixed(1)}</span>
                  <span className="ml-2 text-gray-500">({provider.reviews.length} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-gray-600" />
                  <span className="ml-1 text-gray-700">{provider.experience} years experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600">{provider.description}</p>
          </div>

          {/* Previous Works */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Previous Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {provider.previousWorks.map((work, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <h3 className="font-semibold text-gray-900">{work.title}</h3>
                  <p className="text-sm text-gray-600">{work.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reviews</h2>
            <div className="space-y-4">
              {provider.reviews.map((review, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Contact & Pricing */}
        <div className="space-y-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-600" />
                <span className="ml-2 text-gray-700">{provider.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-600" />
                <span className="ml-2 text-gray-700">{provider.email}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span className="ml-2 text-gray-700">{provider.address}</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pricing</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span className="ml-2 text-gray-700">Hourly Rate</span>
                </div>
                <span className="text-gray-900 font-semibold">{provider.hourlyRate}</span>
              </div>
              {provider.pricingDetails && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Additional Pricing Details</h3>
                  <p className="text-gray-600">{provider.pricingDetails}</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Button */}
          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300">
            Contact Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderProfile; 