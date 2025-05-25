"use client";
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  CreditCard, 
  Wrench, 
  FileText, 
  Users, 
  LogOut,
  Bell,
  Mail,
  Phone,
  FileCode
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../utils/supabase';

const CommunityPage = () => {
  // State for residents data from database
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Existing state for announcements and events
  const [announcements, setAnnouncements] = useState([
    { 
      id: 1, 
      title: 'Annual General Meeting', 
      date: '2025-05-15', 
      content: 'The Annual General Meeting will be held on May 15, 2025 at 7:00 PM in the community room. All owners are encouraged to attend.', 
      priority: 'High' 
    },
    { 
      id: 2, 
      title: 'Maintenance Notice - Water Shutdown', 
      date: '2025-04-12', 
      content: 'There will be a scheduled water shutdown on April 12, 2025 from 9:00 AM to 12:00 PM for routine maintenance work.', 
      priority: 'Medium' 
    },
    { 
      id: 3, 
      title: 'New Garden Area Rules', 
      date: '2025-04-01', 
      content: 'Please note that updated garden area usage rules have been established. See the attached document for details.', 
      priority: 'Low' 
    }
  ]);

  const [events, setEvents] = useState([
    { id: 1, title: 'Annual General Meeting', date: '2025-05-15', time: '19:00', location: 'Community Room' },
    { id: 2, title: 'Community BBQ', date: '2025-04-25', time: '17:00', location: 'Garden Area' },
    { id: 3, title: 'Building Inspection', date: '2025-04-20', time: '10:00', location: 'Common Areas' }
  ]);

  // Fetch residents data from Supabase when component mounts
  useEffect(() => {
    async function fetchResidents() {
      try {
        setLoading(true);
        
        // Query the units table to get all residents
        const { data, error } = await supabase
          .from('units')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        // Map the database data to the format needed for our component
        const formattedResidents = data.map(unit => ({
          id: unit.id,
          unit: unit.unit_number,
          name: unit.owner_name,
          type: unit.status === 'Occupied' ? 'Owner' : 'Vacant',
          email: unit.email,
          phone: unit.phone
        }));
        
        setResidents(formattedResidents);
      } catch (err) {
        console.error('Error fetching residents:', err);
        setError('Failed to load residents. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchResidents();
  }, []);

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
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <button className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-sm">
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
            <Link href="/dashboard" className="flex items-center px-4 h-full hover:bg-gray-700">
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
            <Link href="/community" className="flex items-center px-4 h-full bg-gray-900">
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Community Portal</h2>
          <button className="flex items-center space-x-1 px-3 py-2 border border-transparent rounded-md bg-purple-600 text-sm font-medium text-white hover:bg-purple-700">
            <Bell size={16} />
            <span>Send Announcement</span>
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Announcements */}
          <div className="bg-white rounded-lg shadow">
            {/* Announcements content */}
            {/* ... existing code ... */}
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow">
            {/* Events content */}
            {/* ... existing code ... */}
          </div>

          {/* Residents Directory */}
          <div className="bg-white rounded-lg shadow lg:col-span-2">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <Users className="text-green-500 mr-2" size={18} />
                <h3 className="text-md font-medium text-gray-800">Residents Directory</h3>
              </div>
              <button className="text-sm text-green-600 hover:text-green-800 flex items-center">
                Add Resident
              </button>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">Loading residents data...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">
                  <p>{error}</p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {residents.map(resident => (
                      <tr key={resident.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Unit {resident.unit}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{resident.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            resident.type === 'Owner' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {resident.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-3">
                            <a href={`mailto:${resident.email}`} className="text-gray-500 hover:text-blue-500">
                              <Mail size={16} />
                            </a>
                            <a href={`tel:${resident.phone}`} className="text-gray-500 hover:text-green-500">
                              <Phone size={16} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Contact Committee */}
          <div className="bg-white rounded-lg shadow lg:col-span-2">
            {/* Contact form */}
            {/* ... existing code ... */}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-sm">&copy; 2025 StrataSphere. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/terms" className="text-sm text-gray-300 hover:text-white">Terms</Link>
              <Link href="/privacy" className="text-sm text-gray-300 hover:text-white">Privacy</Link>
              <Link href="/contact" className="text-sm text-gray-300 hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommunityPage;