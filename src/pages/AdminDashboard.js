import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30
  },
  section: {
    margin: 10,
    padding: 10
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10
  },
  text: {
    fontSize: 12,
    marginBottom: 5
  },
  table: {
    display: 'table',
    width: 'auto',
    marginTop: 10,
    marginBottom: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: 25,
    alignItems: 'center'
  },
  tableHeader: {
    backgroundColor: '#f0f0f0'
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000'
  }
});

// PDF Document Component
const AdminReport = ({ users, providers, shops }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Admin Dashboard Report</Text>
        <Text style={styles.text}>Generated on: {new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Summary Statistics</Text>
        <Text style={styles.text}>Total Users: {users.length}</Text>
        <Text style={styles.text}>Total Service Providers: {providers.length}</Text>
        <Text style={styles.text}>Total Shops: {shops.length}</Text>
        <Text style={styles.text}>Approved Service Providers: {providers.filter(p => p.approved).length}</Text>
        <Text style={styles.text}>Pending Service Providers: {providers.filter(p => !p.approved).length}</Text>
        <Text style={styles.text}>Approved Shops: {shops.filter(s => s.approved).length}</Text>
        <Text style={styles.text}>Pending Shops: {shops.filter(s => !s.approved).length}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Users List</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCell}><Text>Name</Text></View>
            <View style={styles.tableCell}><Text>Email</Text></View>
            <View style={styles.tableCell}><Text>Address</Text></View>
          </View>
          {users.map((user, i) => (
            <View key={i} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{user.firstName} {user.lastName}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{user.email}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{user.address}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Service Providers List</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCell}><Text>Name</Text></View>
            <View style={styles.tableCell}><Text>Email</Text></View>
            <View style={styles.tableCell}><Text>Category</Text></View>
            <View style={styles.tableCell}><Text>Status</Text></View>
          </View>
          {providers.map((provider, i) => (
            <View key={i} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{provider.firstName} {provider.lastName}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{provider.email}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{provider.category}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{provider.approved ? 'Approved' : 'Pending'}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Shops List</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCell}><Text>Shop Name</Text></View>
            <View style={styles.tableCell}><Text>Email</Text></View>
            <View style={styles.tableCell}><Text>Address</Text></View>
            <View style={styles.tableCell}><Text>Status</Text></View>
          </View>
          {shops.map((shop, i) => (
            <View key={i} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{shop.shopName}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{shop.email}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{shop.address}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{shop.approved ? 'Approved' : 'Pending'}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    category: '',
    shopName: '',
    role: 'user'
  });

  useEffect(() => {
    // Redirect if not admin
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    // Load data from localStorage
    const loadData = () => {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const storedProviders = JSON.parse(localStorage.getItem('serviceProviders') || '[]');
      const storedShops = JSON.parse(localStorage.getItem('shops') || '[]');

      setUsers(storedUsers);
      setProviders(storedProviders);
      setShops(storedShops);
    };

    loadData();
  }, [user, navigate]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleCreate = () => {
    setShowCreateModal(true);
    setEditingItem(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      category: '',
      shopName: '',
      role: activeTab === 'users' ? 'user' : activeTab === 'providers' ? 'provider' : 'shop'
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowCreateModal(true);
    setFormData({
      firstName: item.firstName || '',
      lastName: item.lastName || '',
      email: item.email || '',
      password: '',
      address: item.address || '',
      category: item.category || '',
      shopName: item.shopName || '',
      role: item.role || activeTab === 'users' ? 'user' : activeTab === 'providers' ? 'provider' : 'shop'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      // Update existing item
      const updatedItems = {
        users: users.map(u => u.email === editingItem.email ? { ...formData, email: editingItem.email } : u),
        providers: providers.map(p => p.email === editingItem.email ? { ...formData, email: editingItem.email } : p),
        shops: shops.map(s => s.email === editingItem.email ? { ...formData, email: editingItem.email } : s)
      };
      
      localStorage.setItem('users', JSON.stringify(updatedItems.users));
      localStorage.setItem('serviceProviders', JSON.stringify(updatedItems.providers));
      localStorage.setItem('shops', JSON.stringify(updatedItems.shops));
      
      setUsers(updatedItems.users);
      setProviders(updatedItems.providers);
      setShops(updatedItems.shops);
    } else {
      // Create new item
      const newItem = { ...formData, approved: formData.role !== 'user' };
      const updatedItems = {
        users: [...users, newItem],
        providers: [...providers, newItem],
        shops: [...shops, newItem]
      };
      
      localStorage.setItem('users', JSON.stringify(updatedItems.users));
      localStorage.setItem('serviceProviders', JSON.stringify(updatedItems.providers));
      localStorage.setItem('shops', JSON.stringify(updatedItems.shops));
      
      setUsers(updatedItems.users);
      setProviders(updatedItems.providers);
      setShops(updatedItems.shops);
    }
    setShowCreateModal(false);
    setEditingItem(null);
  };

  const handleDeleteUser = (email) => {
    const updatedUsers = users.filter(user => user.email !== email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handleDeleteProvider = (email) => {
    const updatedProviders = providers.filter(provider => provider.email !== email);
    localStorage.setItem('serviceProviders', JSON.stringify(updatedProviders));
    setProviders(updatedProviders);
  };

  const handleDeleteShop = (email) => {
    const updatedShops = shops.filter(shop => shop.email !== email);
    localStorage.setItem('shops', JSON.stringify(updatedShops));
    setShops(updatedShops);
  };

  const handleApproveProvider = (email) => {
    const updatedProviders = providers.map(provider => 
      provider.email === email ? { ...provider, approved: true } : provider
    );
    localStorage.setItem('serviceProviders', JSON.stringify(updatedProviders));
    setProviders(updatedProviders);
  };

  const handleApproveShop = (email) => {
    const updatedShops = shops.map(shop => 
      shop.email === email ? { ...shop, approved: true } : shop
    );
    localStorage.setItem('shops', JSON.stringify(updatedShops));
    setShops(updatedShops);
  };

  // Replace the generateReport function with PDFDownloadLink
  const ReportButton = () => (
    <PDFDownloadLink
      document={<AdminReport users={users} providers={providers} shops={shops} />}
      fileName="admin-dashboard-report.pdf"
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Generating PDF...' : 'Generate Report'
      }
    </PDFDownloadLink>
  );

  const filteredItems = {
    users: users.filter(user => 
      (user.firstName + ' ' + user.lastName + ' ' + user.email).toLowerCase().includes(searchTerm.toLowerCase())
    ),
    providers: providers.filter(provider => 
      (provider.firstName + ' ' + provider.lastName + ' ' + provider.email).toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'all' || (filterStatus === 'approved' && provider.approved) || (filterStatus === 'pending' && !provider.approved))
    ),
    shops: shops.filter(shop => 
      (shop.shopName + ' ' + shop.email).toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'all' || (filterStatus === 'approved' && shop.approved) || (filterStatus === 'pending' && !shop.approved))
    )
  };

  // Chart data
  const userTypeData = {
    labels: ['Users', 'Service Providers', 'Shops'],
    datasets: [
      {
        data: [users.length, providers.length, shops.length],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(75, 192, 192, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const approvalStatusData = {
    labels: ['Service Providers', 'Shops'],
    datasets: [
      {
        label: 'Approved',
        data: [
          providers.filter(p => p.approved).length,
          shops.filter(s => s.approved).length
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Pending',
        data: [
          providers.filter(p => !p.approved).length,
          shops.filter(s => !s.approved).length
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const categoryData = {
    labels: [...new Set(providers.map(p => p.category))],
    datasets: [
      {
        label: 'Service Providers by Category',
        data: [...new Set(providers.map(p => p.category))].map(category => 
          providers.filter(p => p.category === category).length
        ),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Dashboard Statistics'
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <ReportButton />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
          <div className="h-64">
            <Pie data={userTypeData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Approval Status</h2>
          <div className="h-64">
            <Bar data={approvalStatusData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Service Provider Categories</h2>
          <div className="h-64">
            <Bar data={categoryData} options={chartOptions} />
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`${
              activeTab === 'users'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('providers')}
            className={`${
              activeTab === 'providers'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Service Providers
          </button>
          <button
            onClick={() => setActiveTab('shops')}
            className={`${
              activeTab === 'shops'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Shops
          </button>
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded px-3 py-2 flex-grow"
        />
        {activeTab !== 'users' && (
          <select
            value={filterStatus}
            onChange={handleFilter}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        )}
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New
        </button>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingItem ? 'Edit' : 'Create New'} {activeTab.slice(0, -1)}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                  required
                  disabled={editingItem}
                />
                {!editingItem && (
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="border rounded px-3 py-2 w-full"
                    required
                  />
                )}
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
                {activeTab === 'providers' && (
                  <input
                    type="text"
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="border rounded px-3 py-2 w-full"
                    required
                  />
                )}
                {activeTab === 'shops' && (
                  <input
                    type="text"
                    placeholder="Shop Name"
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    className="border rounded px-3 py-2 w-full"
                    required
                  />
                )}
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      {activeTab === 'users' && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.users.map((user) => (
                <tr key={user.email}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.firstName} {user.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.email)}
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
      )}

      {/* Service Providers Table */}
      {activeTab === 'providers' && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.providers.map((provider) => (
                <tr key={provider.email}>
                  <td className="px-6 py-4 whitespace-nowrap">{provider.firstName} {provider.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{provider.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{provider.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      provider.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {provider.approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleEdit(provider)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    {!provider.approved && (
                      <button
                        onClick={() => handleApproveProvider(provider.email)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteProvider(provider.email)}
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
      )}

      {/* Shops Table */}
      {activeTab === 'shops' && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.shops.map((shop) => (
                <tr key={shop.email}>
                  <td className="px-6 py-4 whitespace-nowrap">{shop.shopName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{shop.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{shop.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      shop.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {shop.approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleEdit(shop)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    {!shop.approved && (
                      <button
                        onClick={() => handleApproveShop(shop.email)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteShop(shop.email)}
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
      )}
    </div>
  );
};

export default AdminDashboard; 