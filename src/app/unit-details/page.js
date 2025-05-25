"use client";
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  CreditCard, 
  Wrench, 
  FileText, 
  Users, 
  LogOut,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  AlertTriangle,
  FileCode
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../utils/supabase';

const UnitDetailsPage = () => {
  const [selectedUnit, setSelectedUnit] = useState('');
  const [unitData, setUnitData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allUnits, setAllUnits] = useState([]);

  // Fetch all units for the dropdown
  useEffect(() => {
    async function fetchAllUnits() {
      try {
        const { data, error } = await supabase
          .from('units')
          .select('id, unit_number')
          .order('unit_number');
        
        if (error) throw error;
        setAllUnits(data);
      } catch (err) {
        console.error('Error fetching units:', err);
      }
    }
    
    fetchAllUnits();
  }, []);

  // Fetch detailed unit data with relationships
  const fetchUnitDetails = async (unitId) => {
    if (!unitId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Fetch unit basic info
      const { data: unitInfo, error: unitError } = await supabase
        .from('units')
        .select('*')
        .eq('id', unitId)
        .single();
      
      if (unitError) throw unitError;
      
      // Fetch maintenance requests for this unit
      const { data: maintenanceData, error: maintenanceError } = await supabase
        .from('maintenance_requests')
        .select('*')
        .eq('unit_id', unitId)
        .order('created_at', { ascending: false });
      
      if (maintenanceError) throw maintenanceError;
      
      // Fetch financial transactions for this unit
      const { data: financialData, error: financialError } = await supabase
        .from('financial_transactions')
        .select('*')
        .eq('unit_id', unitId)
        .order('transaction_date', { ascending: false });
      
      if (financialError) throw financialError;
      
      // Combine all data
      setUnitData({
        unit: unitInfo,
        maintenance: maintenanceData || [],
        financial: financialData || []
      });
      
    } catch (err) {
      console.error('Error fetching unit details:', err);
      setError('Failed to load unit details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnitChange = (e) => {
    const unitId = e.target.value;
    setSelectedUnit(unitId);
    if (unitId) {
      fetchUnitDetails(unitId);
    } else {
      setUnitData(null);
    }
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
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
            <Link href="/community" className="flex items-center px-4 h-full hover:bg-gray-700">
              <Users size={16} className="mr-2" />
              <span>Community</span>
            </Link>
            <Link href="/unit-details" className="flex items-center px-4 h-full bg-gray-900">
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
        <div className="flex items-center mb-6">
          <Link href="/dashboard" className="mr-4 text-blue-600 hover:text-blue-800">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Unit Details - Database Relationships Demo</h2>
        </div>

        {/* Unit Selector */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">Select a Unit to View Complete Details</h3>
          <select 
            value={selectedUnit} 
            onChange={handleUnitChange}
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">Choose a unit...</option>
            {allUnits.map(unit => (
              <option key={unit.id} value={unit.id}>
                Unit {unit.unit_number}
              </option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">Loading unit details...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-lg shadow p-8 text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* Unit Details */}
        {unitData && !loading && (
          <div className="space-y-6">
            {/* Basic Unit Info */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 bg-blue-50 border-b">
                <h3 className="text-lg font-medium text-gray-800 flex items-center">
                  <User className="mr-2 text-blue-500" size={20} />
                  Unit Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Basic Details</h4>
                    <div className="space-y-2">
                      <p><strong>Unit Number:</strong> {unitData.unit.unit_number}</p>
                      <p><strong>Owner:</strong> {unitData.unit.owner_name}</p>
                      <p><strong>Status:</strong> 
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          unitData.unit.status === 'Occupied' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {unitData.unit.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Contact Information</h4>
                    <div className="space-y-2">
                      <p className="flex items-center">
                        <Mail size={16} className="mr-2 text-gray-400" />
                        {unitData.unit.email || 'Not provided'}
                      </p>
                      <p className="flex items-center">
                        <Phone size={16} className="mr-2 text-gray-400" />
                        {unitData.unit.phone || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Maintenance Requests */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 bg-yellow-50 border-b">
                <h3 className="text-lg font-medium text-gray-800 flex items-center">
                  <Wrench className="mr-2 text-yellow-500" size={20} />
                  Maintenance Requests ({unitData.maintenance.length})
                </h3>
              </div>
              <div className="p-6">
                {unitData.maintenance.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No maintenance requests found for this unit.</p>
                ) : (
                  <div className="space-y-4">
                    {unitData.maintenance.map(request => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{request.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            request.status === 'Open' ? 'bg-red-100 text-red-800' :
                            request.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{request.description}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          {new Date(request.created_at).toLocaleDateString()}
                          <span className="mx-2">•</span>
                          <AlertTriangle size={14} className="mr-1" />
                          Priority: {request.priority}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Financial Transactions */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 bg-green-50 border-b">
                <h3 className="text-lg font-medium text-gray-800 flex items-center">
                  <DollarSign className="mr-2 text-green-500" size={20} />
                  Financial Transactions ({unitData.financial.length})
                </h3>
              </div>
              <div className="p-6">
                {unitData.financial.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No financial transactions found for this unit.</p>
                ) : (
                  <div className="space-y-4">
                    {unitData.financial.map(transaction => (
                      <div key={transaction.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                          <div className="text-right">
                            <p className={`font-medium ${
                              transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'Income' ? '+' : '-'}{formatMoney(Math.abs(transaction.amount))}
                            </p>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              transaction.fund_type === 'admin' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {transaction.fund_type === 'admin' ? 'Admin Fund' : 'Capital Fund'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          {new Date(transaction.transaction_date).toLocaleDateString()}
                          <span className="mx-2">•</span>
                          Type: {transaction.type}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{unitData.maintenance.length}</p>
                  <p className="text-sm text-gray-600">Total Maintenance Requests</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{unitData.financial.length}</p>
                  <p className="text-sm text-gray-600">Financial Transactions</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {unitData.maintenance.filter(m => m.status === 'Open').length}
                  </p>
                  <p className="text-sm text-gray-600">Open Issues</p>
                </div>
              </div>
            </div>
          </div>
        )}
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

export default UnitDetailsPage;