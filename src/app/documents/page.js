"use client";
import React, { useState } from 'react';
import { 
  Home, 
  CreditCard, 
  Wrench, 
  FileText, 
  Users, 
  LogOut,
  Search,
  Upload,
  Download,
  File,
  Folder,
  ChevronRight,
  Filter,
  FileCode
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const DocumentsPage = () => {
  // Document categories
  const categories = [
    { id: 'bylaws', name: 'By-laws & Regulations' },
    { id: 'minutes', name: 'Meeting Minutes' },
    { id: 'financial', name: 'Financial Documents' },
    { id: 'insurance', name: 'Insurance Documents' }
  ];

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState('bylaws');

  // Documents by category
  const documents = {
    bylaws: [
      { id: 1, name: 'Strata By-laws', date: '2023-05-10', type: 'PDF', size: '1.2 MB' },
      { id: 2, name: 'Pet Policy', date: '2024-01-15', type: 'PDF', size: '0.5 MB' },
      { id: 3, name: 'Noise Regulations', date: '2023-08-22', type: 'DOCX', size: '0.3 MB' }
    ],
    minutes: [
      { id: 4, name: 'AGM Minutes 2024', date: '2024-01-25', type: 'PDF', size: '1.5 MB' },
      { id: 5, name: 'Committee Meeting - March 2025', date: '2025-03-15', type: 'PDF', size: '0.8 MB' },
      { id: 6, name: 'Committee Meeting - February 2025', date: '2025-02-12', type: 'PDF', size: '0.9 MB' }
    ],
    financial: [
      { id: 7, name: 'Annual Budget 2024-2025', date: '2024-06-30', type: 'PDF', size: '2.1 MB' },
      { id: 8, name: 'Quarterly Financial Statement Q1 2025', date: '2025-03-31', type: 'PDF', size: '1.8 MB' },
      { id: 9, name: 'Levy Schedule 2025', date: '2024-12-15', type: 'XLSX', size: '0.5 MB' }
    ],
    insurance: [
      { id: 10, name: 'Building Insurance Policy', date: '2024-11-05', type: 'PDF', size: '2.5 MB' },
      { id: 11, name: 'Public Liability Insurance', date: '2024-10-30', type: 'PDF', size: '1.1 MB' },
      { id: 12, name: 'Insurance Valuation Report', date: '2024-09-15', type: 'PDF', size: '4.2 MB' }
    ]
  };

  // Documents for selected category
  const selectedDocuments = documents[selectedCategory] || [];

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered documents
  const filteredDocuments = searchQuery 
    ? selectedDocuments.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedDocuments;

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
            <Link href="/documents" className="flex items-center px-4 h-full bg-gray-900">
              <FileText size={16} className="mr-2" />
              <span>Documents</span>
            </Link>
            <Link href="/community" className="flex items-center px-4 h-full hover:bg-gray-700">
              <Users size={16} className="mr-2" />
              <span>Community</span>
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
        {/* Header and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold text-gray-800">Document Repository</h2>
          <div className="flex space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button className="flex items-center space-x-1 px-3 py-2 border border-transparent rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700">
              <Upload size={16} />
              <span>Upload</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Categories sidebar */}
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white rounded-lg shadow">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center">
                <Folder className="text-blue-500 mr-2" size={18} />
                <h3 className="text-md font-medium text-gray-800">Categories</h3>
              </div>
              <div className="p-2">
                <ul className="space-y-1">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center ${
                          selectedCategory === category.id
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Folder size={16} className={`mr-2 ${selectedCategory === category.id ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span>{category.name}</span>
                        {selectedCategory === category.id && (
                          <ChevronRight size={16} className="ml-auto text-blue-500" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Document list */}
          <div className="col-span-12 md:col-span-9">
            <div className="bg-white rounded-lg shadow">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  <FileText className="text-blue-500 mr-2" size={18} />
                  <h3 className="text-md font-medium text-gray-800">
                    {categories.find(c => c.id === selectedCategory)?.name} ({filteredDocuments.length})
                  </h3>
                </div>
                <div className="flex items-center">
                  <Filter size={16} className="text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">Filter</span>
                </div>
              </div>
              
              {filteredDocuments.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {filteredDocuments.map(document => (
                    <li key={document.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-md mr-3 ${
                            document.type === 'PDF' ? 'bg-red-100' : 
                            document.type === 'DOCX' ? 'bg-blue-100' : 'bg-green-100'
                          }`}>
                            <File size={18} className={`${
                              document.type === 'PDF' ? 'text-red-500' : 
                              document.type === 'DOCX' ? 'text-blue-500' : 'text-green-500'
                            }`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{document.name}</p>
                            <p className="text-xs text-gray-500">Updated: {new Date(document.date).toLocaleDateString()} • {document.size}</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-blue-500">
                          <Download size={18} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-300" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your search or upload a new document.</p>
                </div>
              )}
            </div>
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

export default DocumentsPage;