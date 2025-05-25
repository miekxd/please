"use client";
import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Wrench, 
  CreditCard, 
  FileText, 
  Users, 
  Bell, 
  Calendar, 
  LogOut,
  Home,
  FileCode,
  User
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Dashboard = () => {
  // State for notifications
  const [currentUser, setCurrentUser] = useState(null);
  
  // Check if user is logged in using cookies
  useEffect(() => {
    fetch('/api/auth/check')
      .then(response => response.json())
      .then(data => {
        if (data.loggedIn) {
          setCurrentUser(data);
        } else {
          window.location.href = '/';
        }
      });
  }, []);

  // ADD THIS LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Annual General Meeting scheduled for May 15", type: "info", date: "2025-04-02" },
    { id: 2, message: "New maintenance request from Unit 305", type: "alert", date: "2025-04-03" },
    { id: 3, message: "Quarterly fee payments due by April 30", type: "warning", date: "2025-04-01" },
  ]);

  // State for upcoming events
  const [events, setEvents] = useState([
    { id: 1, title: "Annual General Meeting", date: "2025-05-15", location: "Community Room" },
    { id: 2, title: "Community BBQ", date: "2025-04-25", location: "Garden Area" },
    { id: 3, title: "Building Inspection", date: "2025-04-20", location: "Common Areas" },
  ]);

  // State for maintenance requests summary
  const [maintenanceStats, setMaintenanceStats] = useState({
    open: 2,
    inProgress: 1,
    completed: 1,
    urgent: 1
  });

  // State for financial summary
  const [financialSummary, setFinancialSummary] = useState({
    adminFund: 125842.00,
    capitalWorksFund: 347910.00,
    outstandingLevies: 10900.00,
    nextQuarterBudget: 68500.00
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Image src="/strata-logo.png" alt="StrataSphere Logo" width={40} height={40} className="rounded" />
              <h1 className="text-xl font-bold text-gray-900">StrataSphere</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {currentUser ? currentUser.username : 'Admin'}
              </span>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-sm"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-12">
            <Link href="/dashboard" className="flex items-center px-4 h-full bg-gray-900">
              <Home size={16} className="mr-2" />
              <span>Dashboard</span>
            </Link>
            <Link href="/financial" className="flex items-center px-4 h-full hover:bg-gray-700">
              <CreditCard size={16} className="mr-2" />
              <span>Financials</span>
            </Link>
            <Link href="/maintenance" className="flex items-center px-4 h-full hover:bg-gray-700">
              <Wrench size={16} className="mr-2" />
              <span>Maintenance</span>
            </Link>
            <Link href="/documents" className="flex items-center px-4 h-full hover:bg-gray-700">
              <FileText size={16} className="mr-2" />
              <span>Documents</span>
            </Link>
            <Link href="/community" className="flex items-center px-4 h-full hover:bg-gray-700">
              <Users size={16} className="mr-2" />
              <span>Community</span>
            </Link>
            <Link href="/unit-details" className="flex items-center px-4 h-full hover:bg-gray-700">
              <User size={16} className="mr-2" />
              <span>Unit Details</span>
            </Link>
            <a href="/api/php-demo.php" className="flex items-center px-4 h-full hover:bg-gray-700">
              <FileCode size={16} className="mr-2" />
              <span>PHP Demo</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>

        {currentUser && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-blue-900 mb-2">Current Session</h3>
            <div className="text-sm text-blue-700">
              <p><strong>User:</strong> {currentUser.username}</p>
              <p><strong>Role:</strong> {currentUser.role}</p>
              <p><strong>Login Time:</strong> {new Date(currentUser.loginTime).toLocaleString()}</p>
            </div>
          </div>
        )}
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Admin Fund</h3>
              <CreditCard className="text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">${financialSummary.adminFund.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">Last updated: April 1, 2025</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Capital Works Fund</h3>
              <Building className="text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">${financialSummary.capitalWorksFund.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">Last updated: April 1, 2025</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Maintenance</h3>
              <Wrench className="text-yellow-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-600">Open</p>
                <p className="text-xl font-bold text-gray-900">{maintenanceStats.open}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Urgent</p>
                <p className="text-xl font-bold text-red-500">{maintenanceStats.urgent}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-xl font-bold text-yellow-500">{maintenanceStats.inProgress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold text-green-500">{maintenanceStats.completed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Outstanding Levies</h3>
              <FileText className="text-red-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">${financialSummary.outstandingLevies.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">From 3 owners</p>
          </div>
        </div>
        
        {/* Notifications & Calendar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Notifications */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Recent Notifications</h3>
              <Bell className="text-gray-500" />
            </div>
            <div className="p-5">
              <ul className="divide-y divide-gray-200">
                {notifications.map(note => (
                  <li key={note.id} className="py-3 flex items-start">
                    <div className={`flex-shrink-0 h-3 w-3 rounded-full mt-2 mr-3 ${
                      note.type === 'alert' ? 'bg-red-500' : 
                      note.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">{note.message}</p>
                      <p className="text-xs text-gray-500">{new Date(note.date).toLocaleDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-500">
                View all notifications
              </button>
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Upcoming Events</h3>
              <Calendar className="text-gray-500" />
            </div>
            <div className="p-5">
              <ul className="divide-y divide-gray-200">
                {events.map(event => (
                  <li key={event.id} className="py-3">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                  </li>
                ))}
              </ul>
              <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-500">
                View full calendar
              </button>
            </div>
          </div>
        </div>
        
{/* Building Information */}
<div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">Available Apartments for View</h3>
          </div>
          
          {/* Unit 101 */}
          <div className="p-5">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                <Image 
                  src="/unit-101.jpg" 
                  alt="Unit 101" 
                  width={400}
                  height={300}
                  className="rounded-lg w-full h-auto" 
                />
              </div>
              <div className="md:w-2/3">
                <h4 className="text-lg font-medium mb-2 text-gray-800">Unit 101</h4>
                <p className="mb-4 text-gray-700">2-bedroom apartment with ocean view, 85 square meters, located on the first floor.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-3 rounded-md">
                    <h5 className="font-medium text-gray-800">Owner Details</h5>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      <li><span className="font-medium">Name:</span> Emma Thompson</li>
                      <li><span className="font-medium">Contact:</span> 0412 345 678</li>
                      <li><span className="font-medium">Email:</span> emma.t@email.com</li>
                    </ul>
                  </div>
                  <div className="border p-3 rounded-md">
                    <h5 className="font-medium text-gray-800">Unit Details</h5>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      <li><span className="font-medium">Bedrooms:</span> 2</li>
                      <li><span className="font-medium">Bathrooms:</span> 1</li>
                      <li><span className="font-medium">Parking:</span> 1 space</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Unit 205 */}
          <div className="p-5">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                <Image 
                  src="/unit-205.jpg" 
                  alt="Unit 205" 
                  width={400}
                  height={300}
                  className="rounded-lg w-full h-auto" 
                />
              </div>
              <div className="md:w-2/3">
                <h4 className="text-lg font-medium mb-2 text-gray-800">Unit 205</h4>
                <p className="mb-4 text-gray-700">3-bedroom apartment with city view, 120 square meters, located on the second floor.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-3 rounded-md">
                    <h5 className="font-medium text-gray-800">Owner Details</h5>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      <li><span className="font-medium">Name:</span> Michael Chen</li>
                      <li><span className="font-medium">Contact:</span> 0487 654 321</li>
                      <li><span className="font-medium">Email:</span> michael.c@email.com</li>
                    </ul>
                  </div>
                  <div className="border p-3 rounded-md">
                    <h5 className="font-medium text-gray-800">Unit Details</h5>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      <li><span className="font-medium">Bedrooms:</span> 3</li>
                      <li><span className="font-medium">Bathrooms:</span> 2</li>
                      <li><span className="font-medium">Parking:</span> 2 spaces</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Unit 309 */}
          <div className="p-5">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                <Image 
                  src="/unit-309.jpg" 
                  alt="Unit 309" 
                  width={400}
                  height={300}
                  className="rounded-lg w-full h-auto" 
                />
              </div>
              <div className="md:w-2/3">
                <h4 className="text-lg font-medium mb-2 text-gray-800">Unit 309</h4>
                <p className="mb-4 text-gray-700">2-bedroom apartment with pool view, 65 square meters, located on the third floor.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-3 rounded-md">
                    <h5 className="font-medium text-gray-800">Owner Details</h5>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      <li><span className="font-medium">Name:</span> Sarah Rodriguez</li>
                      <li><span className="font-medium">Contact:</span> 0455 123 789</li>
                      <li><span className="font-medium">Email:</span> sarah.r@email.com</li>
                    </ul>
                  </div>
                  <div className="border p-3 rounded-md">
                    <h5 className="font-medium text-gray-800">Unit Details</h5>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      <li><span className="font-medium">Bedrooms:</span> 2</li>
                      <li><span className="font-medium">Bathrooms:</span> 1</li>
                      <li><span className="font-medium">Parking:</span> 1 space</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">Quick Actions</h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <Wrench className="mx-auto h-6 w-6 text-blue-500 mb-2" />
                <span className="text-sm font-medium text-gray-700">New Maintenance Request</span>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <FileText className="mx-auto h-6 w-6 text-green-500 mb-2" />
                <span className="text-sm font-medium text-gray-700">Upload Document</span>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <CreditCard className="mx-auto h-6 w-6 text-purple-500 mb-2" />
                <span className="text-sm font-medium text-gray-700">Levy Payment</span>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <Calendar className="mx-auto h-6 w-6 text-red-500 mb-2" />
                <span className="text-sm font-medium text-gray-700">Schedule Meeting</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">&copy; 2025 StrataSphere. All rights reserved.</p>
              <p className="text-xs text-gray-400 mt-1">Compliant with NSW Strata Schemes Management Act (2015)</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/terms" className="text-sm text-gray-300 hover:text-white">Terms of Service</Link>
              <Link href="/privacy" className="text-sm text-gray-300 hover:text-white">Privacy Policy</Link>
              <Link href="/contact" className="text-sm text-gray-300 hover:text-white">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;