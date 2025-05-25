"use client";
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  CreditCard, 
  Wrench, 
  FileText, 
  Users, 
  LogOut,
  PlusCircle,
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../utils/supabase';

const MaintenancePage = () => {
  // State for maintenance requests from database
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filtering
  const [filter, setFilter] = useState('all');
  
  // Fetch maintenance requests from Supabase when component mounts
  useEffect(() => {
    async function fetchMaintenanceRequests() {
      try {
        setLoading(true);
        
        // Query the maintenance_requests table and join with the units table
        const { data, error } = await supabase
          .from('maintenance_requests')
          .select(`
            *,
            units:unit_id (unit_number, owner_name)
          `);
        
        if (error) {
          throw error;
        }
        
        // Map the database data to the format needed for our component
        const formattedRequests = data.map(request => ({
          id: request.id,
          unitNumber: request.units?.unit_number || 'N/A',
          owner: request.units?.owner_name || 'N/A',
          title: request.title,
          description: request.description,
          status: request.status,
          priority: request.priority,
          date: new Date(request.created_at).toLocaleDateString(),
        }));
        
        setMaintenanceRequests(formattedRequests);
      } catch (err) {
        console.error('Error fetching maintenance requests:', err);
        setError('Failed to load maintenance requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchMaintenanceRequests();
  }, []);
  
  // Filter maintenance requests based on status
  const filteredRequests = filter === 'all' 
    ? maintenanceRequests 
    : maintenanceRequests.filter(request => request.status.toLowerCase() === filter);
  
  // Get counts for each status
  const statusCounts = {
    open: maintenanceRequests.filter(req => req.status === 'Open').length,
    inProgress: maintenanceRequests.filter(req => req.status === 'In Progress').length,
    completed: maintenanceRequests.filter(req => req.status === 'Completed').length,
    all: maintenanceRequests.length
  };
  
  // Status icon mapping
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Open':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'In Progress':
        return <Clock size={16} className="text-yellow-500" />;
      case 'Completed':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return null;
    }
  };

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
            <a href="/api/php-demo.php" className="flex items-center px-4 h-full hover:bg-gray-700">
              <Wrench size={16} className="mr-2" />
              <span>PHP Demo</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Maintenance Requests</h2>
          <button className="flex items-center space-x-1 px-3 py-2 border border-transparent rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700">
            <PlusCircle size={16} className="mr-1" />
            <span>New Request</span>
          </button>
        </div>
        
        {/* Status Filters */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <button 
            onClick={() => setFilter('all')} 
            className={`p-3 rounded-lg shadow ${filter === 'all' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-white'}`}
          >
            <p className="text-sm font-medium text-gray-500">All Requests</p>
            <p className="text-2xl font-bold text-gray-800">{statusCounts.all}</p>
          </button>
          
          <button 
            onClick={() => setFilter('open')} 
            className={`p-3 rounded-lg shadow ${filter === 'open' ? 'bg-red-100 border-2 border-red-500' : 'bg-white'}`}
          >
            <p className="text-sm font-medium text-gray-500">Open</p>
            <p className="text-2xl font-bold text-red-600">{statusCounts.open}</p>
          </button>
          
          <button 
            onClick={() => setFilter('in progress')} 
            className={`p-3 rounded-lg shadow ${filter === 'in progress' ? 'bg-yellow-100 border-2 border-yellow-500' : 'bg-white'}`}
          >
            <p className="text-sm font-medium text-gray-500">In Progress</p>
            <p className="text-2xl font-bold text-yellow-600">{statusCounts.inProgress}</p>
          </button>
          
          <button 
            onClick={() => setFilter('completed')} 
            className={`p-3 rounded-lg shadow ${filter === 'completed' ? 'bg-green-100 border-2 border-green-500' : 'bg-white'}`}
          >
            <p className="text-sm font-medium text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600">{statusCounts.completed}</p>
          </button>
        </div>
        
        {/* Maintenance Requests Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">
              {filter === 'all' ? 'All Requests' : 
               filter === 'open' ? 'Open Requests' :
               filter === 'in progress' ? 'In Progress Requests' :
               'Completed Requests'}
            </h3>
            <button className="flex items-center text-gray-500 hover:text-gray-700">
              <Filter size={16} className="mr-1" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Loading maintenance requests...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              <p>{error}</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No maintenance requests found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map(request => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{request.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Unit {request.unitNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>
                          <p className="font-medium">{request.title}</p>
                          <p className="text-gray-500 truncate">{request.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(request.status)}
                          <span className={`ml-1.5 text-sm ${
                            request.status === 'Open' ? 'text-red-800' : 
                            request.status === 'In Progress' ? 'text-yellow-800' : 
                            'text-green-800'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          request.priority === 'High' ? 'bg-red-100 text-red-800' : 
                          request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {request.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

export default MaintenancePage;