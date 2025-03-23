import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, MessageSquare, User, LogOut, Briefcase, Star } from 'lucide-react';

const ServiceProviderDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || user.role !== 'provider') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Home', href: '/provider-dashboard', icon: Home },
    { name: 'Previous Works', href: '/provider-dashboard/works', icon: Briefcase },
    { name: 'Reviews', href: '/provider-dashboard/reviews', icon: Star },
    { name: 'User Inquiries', href: '/provider-dashboard/inquiries', icon: MessageSquare },
    { name: 'Profile Settings', href: '/provider-dashboard/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Service Provider</h2>
            <p className="text-sm text-gray-600">{user?.firstName} {user?.lastName}</p>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/works" element={<PreviousWorks />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/inquiries" element={<UserInquiries />} />
            <Route path="/profile" element={<ProfileSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Dashboard Home Component
const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Welcome to your Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">New Inquiries</dt>
                  <dd className="text-lg font-medium text-gray-900">5</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Home className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Jobs</dt>
                  <dd className="text-lg font-medium text-gray-900">3</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed Jobs</dt>
                  <dd className="text-lg font-medium text-gray-900">12</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Previous Works Component
const PreviousWorks = () => {
  const [works, setWorks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingWork, setEditingWork] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    price: '',
    beforeImage: null,
    afterImage: null,
  });

  useEffect(() => {
    const storedWorks = JSON.parse(localStorage.getItem('previousWorks')) || [];
    setWorks(storedWorks);
  }, []);

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [type]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWork = {
      id: editingWork?.id || Date.now(),
      ...formData,
    };

    let updatedWorks;
    if (editingWork) {
      updatedWorks = works.map(work => work.id === editingWork.id ? newWork : work);
    } else {
      updatedWorks = [...works, newWork];
    }

    setWorks(updatedWorks);
    localStorage.setItem('previousWorks', JSON.stringify(updatedWorks));
    setShowAddForm(false);
    setEditingWork(null);
    setFormData({
      description: '',
      price: '',
      beforeImage: null,
      afterImage: null,
    });
  };

  const handleEdit = (work) => {
    setEditingWork(work);
    setFormData(work);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    const updatedWorks = works.filter(work => work.id !== id);
    setWorks(updatedWorks);
    localStorage.setItem('previousWorks', JSON.stringify(updatedWorks));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Previous Works</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Work
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {editingWork ? 'Edit Work' : 'Add New Work'}
              </h2>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingWork(null);
                    setFormData({
                      description: '',
                      price: '',
                      beforeImage: null,
                      afterImage: null,
                    });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="workForm"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  {editingWork ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
            <form id="workForm" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Before Fix Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'beforeImage')}
                    className="mt-1 block w-full"
                    required={!editingWork}
                  />
                  {formData.beforeImage && (
                    <img src={formData.beforeImage} alt="Before" className="mt-2 h-32 w-32 object-cover rounded" />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">After Fix Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'afterImage')}
                    className="mt-1 block w-full"
                    required={!editingWork}
                  />
                  {formData.afterImage && (
                    <img src={formData.afterImage} alt="After" className="mt-2 h-32 w-32 object-cover rounded" />
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Before Fix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">After Fix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {works.map((work) => (
              <tr key={work.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{work.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${work.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={work.beforeImage}
                    alt="Before"
                    className="h-24 w-24 rounded-lg object-cover cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => window.open(work.beforeImage, '_blank')}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={work.afterImage}
                    alt="After"
                    className="h-24 w-24 rounded-lg object-cover cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => window.open(work.afterImage, '_blank')}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(work)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(work.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Reviews Component
const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews'));
    if (!storedReviews || storedReviews.length === 0) {
      const sampleReviews = [
        {
          id: 1,
          userName: "John Doe",
          rating: 5,
          text: "Excellent service! Fixed my electrical issues quickly and professionally."
        },
        {
          id: 2,
          userName: "Sarah Wilson",
          rating: 4,
          text: "Very knowledgeable plumber. Solved my complex plumbing problem efficiently."
        },
        {
          id: 3,
          userName: "Michael Brown",
          rating: 5,
          text: "Great work on my home renovation. Very clean and professional."
        },
        {
          id: 4,
          userName: "Emma Davis",
          rating: 4,
          text: "Good service overall. Would recommend for basic repairs."
        },
        {
          id: 5,
          userName: "David Lee",
          rating: 5,
          text: "Outstanding work on my kitchen remodeling. Very satisfied!"
        },
        {
          id: 6,
          userName: "Lisa Anderson",
          rating: 4,
          text: "Professional and punctual. Fixed my AC issues in no time."
        },
        {
          id: 7,
          userName: "Robert Taylor",
          rating: 5,
          text: "Best carpenter I've worked with. Quality workmanship!"
        },
        {
          id: 8,
          userName: "Jennifer White",
          rating: 4,
          text: "Good communication and reasonable pricing. Would hire again."
        },
        {
          id: 9,
          userName: "Thomas Martin",
          rating: 5,
          text: "Expert in his field. Solved my complex wiring issues safely."
        },
        {
          id: 10,
          userName: "Mary Johnson",
          rating: 4,
          text: "Very helpful and friendly. Completed the work on time."
        }
      ];
      localStorage.setItem('reviews', JSON.stringify(sampleReviews));
      setReviews(sampleReviews);
    } else {
      setReviews(storedReviews);
    }
  }, []);

  const handleDelete = (id) => {
    const updatedReviews = reviews.filter(review => review.id !== id);
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Customer Reviews</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.userName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {'⭐'.repeat(review.rating)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{review.text}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// User Inquiries Component
const UserInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    // Load inquiries from localStorage or initialize with sample data
    const storedInquiries = JSON.parse(localStorage.getItem('inquiries'));
    if (!storedInquiries || storedInquiries.length === 0) {
      const sampleInquiries = [
        {
          id: 1,
          userName: "Michael Lee",
          address: "78 Green Rd, Galle",
          message: "Ceiling fan making loud noise and wobbling. Need urgent repair as it might fall.",
          photo: "https://images.unsplash.com/photo-1575344499859-391c5b9d3b6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          status: "pending"
        },
        {
          id: 2,
          userName: "Sarah Johnson",
          address: "12 Beach Rd, Negombo",
          message: "Main bathroom door hinges completely rusted and door is scraping the floor. Need replacement ASAP.",
          photo: "https://images.unsplash.com/photo-1534609146522-5d8de8a50058?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          status: "pending"
        },
        {
          id: 3,
          userName: "David Wilson",
          address: "34 Lake View, Nuwara Eliya",
          message: "Severe water damage on living room wall after recent rains. Mold starting to form. Need assessment and repair.",
          photo: "https://images.unsplash.com/photo-1562518015-4d9a37e6980a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          status: "pending"
        },
        {
          id: 4,
          userName: "Emma Thompson",
          address: "45 Hill St, Kandy",
          message: "Complete kitchen sink blockage. Water not draining at all. Multiple attempts to clear with plunger failed.",
          photo: "https://images.unsplash.com/photo-1573298626282-9855589c7d36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          status: "pending"
        },
        {
          id: 5,
          userName: "James Anderson",
          address: "89 Palm Grove, Colombo 5",
          message: "Need installation of 4 new electrical outlets and ethernet ports for home office setup. Walls are concrete.",
          photo: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          status: "pending"
        },
        {
          id: 6,
          userName: "Lisa Chen",
          address: "23 Beach Front, Mount Lavinia",
          message: "2-ton AC unit leaking heavily and making grinding noise. Room not cooling below 28°C.",
          photo: "https://images.unsplash.com/photo-1581275288578-bef1b4e35e8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          status: "pending"
        },
        {
          id: 7,
          userName: "Robert Kumar",
          address: "56 Temple Rd, Matara",
          message: "Master bathroom needs complete retiling. Current tiles cracking and some falling off. Area: 8x10 feet.",
          photo: "https://images.unsplash.com/photo-1519690889869-e705e59f72e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          status: "pending"
        },
        {
          id: 8,
          userName: "Maria Silva",
          address: "67 Green Lane, Batticaloa",
          message: "All bathroom taps leaking severely. Need replacement of washers or full tap replacement if necessary.",
          photo: "https://images.unsplash.com/photo-1585587161406-4c6ef6b6b9d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          status: "pending"
        },
        {
          id: 9,
          userName: "Tom Parker",
          address: "90 Hill View, Badulla",
          message: "Garden irrigation system broken in multiple places. Need repair of main line and replacement of 5 sprinkler heads.",
          photo: "https://images.unsplash.com/photo-1564944426391-6be821d81282?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          status: "pending"
        },
        {
          id: 10,
          userName: "Priya Patel",
          address: "34 Lake Road, Kurunegala",
          message: "Need professional installation of 3 new ceiling fans with LED lights. Existing wiring needs inspection.",
          photo: "https://images.unsplash.com/photo-1513694203232-719a280e857b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          status: "pending"
        }
      ];
      localStorage.setItem('inquiries', JSON.stringify(sampleInquiries));
      setInquiries(sampleInquiries);
    } else {
      setInquiries(storedInquiries);
    }
  }, []);

  const showPopupNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleTakeOrder = (id) => {
    const updatedInquiries = inquiries.map(inquiry => 
      inquiry.id === id ? { ...inquiry, status: 'taken' } : inquiry
    );
    setInquiries(updatedInquiries);
    localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
    showPopupNotification('Order has been taken successfully!');
  };

  const handleReject = (id) => {
    const updatedInquiries = inquiries.filter(inquiry => inquiry.id !== id);
    setInquiries(updatedInquiries);
    localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
    showPopupNotification('Order has been rejected.');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">User Inquiries</h1>

      {/* Notification Popup */}
      <div className={`fixed top-4 right-4 z-50 transition-all duration-500 transform ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative shadow-lg">
          <span className="block sm:inline">{notificationMessage}</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User's Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Photo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{inquiry.userName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{inquiry.address}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{inquiry.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={inquiry.photo}
                      alt="Problem"
                      className="h-16 w-16 rounded-lg object-cover cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => window.open(inquiry.photo, '_blank')}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {inquiry.status === 'taken' ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Taken
                      </span>
                    ) : (
                      <button
                        onClick={() => handleTakeOrder(inquiry.id)}
                        className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md transition-colors"
                      >
                        Take Order
                      </button>
                    )}
                    <button
                      onClick={() => handleReject(inquiry.id)}
                      className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition-colors ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Profile Settings Component
const ProfileSettings = () => {
  const { user, updateProfile, deleteProfile } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    category: user?.category || '',
    experience: user?.experience || '',
    contactNumber: user?.contactNumber || '',
    address: user?.address || '',
    hourlyRate: user?.hourlyRate || '',
    profilePicture: user?.profilePicture || '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.profilePicture || '');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({
          ...formData,
          profilePicture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setShowSuccess(true);
    // Hide the notification after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      deleteProfile();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
      {/* Success Notification */}
      <div className={`fixed top-4 right-4 z-50 transition-all duration-500 transform ${showSuccess ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative shadow-lg">
          <span className="block sm:inline">Profile updated successfully!</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-4 w-4 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      </div>
      <div className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={previewImage || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
              <label
                htmlFor="profile-picture"
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </label>
              <input
                type="file"
                id="profile-picture"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Profile Picture</h3>
              <p className="text-sm text-gray-500">Upload a new profile picture</p>
              <p className="text-xs text-gray-400 mt-1">Recommended: Square image, max 2MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Category</option>
                <option value="plumber">Plumber</option>
                <option value="electrician">Electrician</option>
                <option value="carpenter">Carpenter</option>
                <option value="painter">Painter</option>
                <option value="mason">Mason</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hourly Rate (Rs.)</label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <p className="mt-1 text-sm text-gray-500">Your hourly rate in Sri Lankan Rupees</p>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleDeleteProfile}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Profile
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard; 