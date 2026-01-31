'use client';

import { useState } from 'react';
import Link from 'next/link';

const tools = [
  { name: 'JPG to PDF', icon: '🖼️', href: '/jpg-to-pdf', category: 'Convert PDF', desc: 'Convert JPG, PNG images to PDF instantly' },
  { name: 'Merge PDF', icon: '🔗', href: '/merge', category: 'Organize PDF', desc: 'Combine multiple PDFs into one file' },
  { name: 'Split PDF', icon: '✂️', href: '/split', category: 'Organize PDF', desc: 'Extract specific pages from PDFs' },
  { name: 'Compress PDF', icon: '📦', href: '/compress', category: 'Optimize PDF', desc: 'Reduce PDF file size without losing quality' },
  { name: 'Convert to PDF', icon: '🔄', href: '/convert', category: 'Convert PDF', desc: 'Convert images & documents to PDF' },
  { name: 'Extract Text', icon: '📝', href: '/extract', category: 'Optimize PDF', desc: 'Extract all text from PDF documents' },
  { name: 'Add Watermark', icon: '💧', href: '/watermark', category: 'Edit PDF', desc: 'Add text or image watermarks to PDFs' },
  { name: 'Word to PDF', icon: '📄', href: '/word-to-pdf', category: 'Convert PDF', desc: 'Convert DOC and DOCX files to PDF' },
  { name: 'PowerPoint to PDF', icon: '🎨', href: '/powerpoint-to-pdf', category: 'Convert PDF', desc: 'Convert presentations to PDF format' },
  { name: 'Excel to PDF', icon: '📊', href: '/excel-to-pdf', category: 'Convert PDF', desc: 'Convert spreadsheets to PDF easily' },
  { name: 'PDF to JPG', icon: '🖼️', href: '/pdf-to-jpg', category: 'Convert PDF', desc: 'Convert PDF pages to image files' },
  { name: 'Rotate PDF', icon: '🔀', href: '/rotate-pdf', category: 'Organize PDF', desc: 'Rotate PDF pages any direction' },
  { name: 'HTML to PDF', icon: '🌐', href: '/html-to-pdf', category: 'Convert PDF', desc: 'Convert web pages and HTML to PDF' },
  { name: 'Edit PDF', icon: '✏️', href: '/edit-pdf', category: 'Edit PDF', desc: 'Edit text, images, and PDF content' },
  { name: 'Sign PDF', icon: '✍️', href: '/sign-pdf', category: 'PDF Security', desc: 'Add digital signatures to PDFs' },
  { name: 'Unlock PDF', icon: '🔓', href: '/unlock-pdf', category: 'PDF Security', desc: 'Remove PDF password protection' },
  { name: 'Protect PDF', icon: '🔐', href: '/protect-pdf', category: 'PDF Security', desc: 'Add password protection to PDFs' },
  { name: 'Organize PDF', icon: '📑', href: '/organize-pdf', category: 'Organize PDF', desc: 'Rearrange and organize PDF pages' },
  { name: 'Page Numbers', icon: '📖', href: '/page-numbers', category: 'Edit PDF', desc: 'Add page numbers to PDF documents' },
  { name: 'Redact PDF', icon: '🚫', href: '/redact-pdf', category: 'PDF Security', desc: 'Remove sensitive information from PDFs' },
  { name: 'Crop PDF', icon: '✂️', href: '/crop-pdf', category: 'Edit PDF', desc: 'Crop and resize PDF pages' },
  { name: 'PDF to PDF/A', icon: '📚', href: '/pdf-to-pdfa', category: 'Optimize PDF', desc: 'Convert to PDF/A archive format' },
  { name: 'Repair PDF', icon: '🔧', href: '/repair-pdf', category: 'Optimize PDF', desc: 'Fix corrupted PDF files' },
  { name: 'Scan PDF', icon: '📸', href: '/scan-pdf', category: 'Optimize PDF', desc: 'Enhance and optimize scanned documents' },
  { name: 'OCR PDF', icon: '🔍', href: '/ocr-pdf', category: 'Optimize PDF', desc: 'Extract text from scanned PDFs' },
  { name: 'Compare PDF', icon: '🔎', href: '/compare-pdf', category: 'Organize PDF', desc: 'Find differences between PDF files' },
];

const categories = ['All', 'Workflows', 'Organize PDF', 'Optimize PDF', 'Convert PDF', 'Edit PDF', 'PDF Security'];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  const filteredTools = activeCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-red-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
            PDF Magic ❤️
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              href="/merge" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300 relative group"
            >
              MERGE PDF
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/split" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300 relative group"
            >
              SPLIT PDF
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/compress" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300 relative group"
            >
              COMPRESS PDF
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {/* ALL PDF TOOLS Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300 flex items-center relative"
              >
                ALL PDF TOOLS 
                <span className={`ml-1 transition-transform duration-300 ${showToolsDropdown ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 transform origin-top ${
                showToolsDropdown 
                  ? 'opacity-100 scale-y-100 visible' 
                  : 'opacity-0 scale-y-95 invisible'
              }`}>
                <div className="grid grid-cols-2 gap-2 p-4 max-h-96 overflow-y-auto">
                  {tools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      onClick={() => setShowToolsDropdown(false)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors duration-200 group/item"
                    >
                      <span className="text-2xl group-hover/item:scale-125 transition-transform duration-300">{tool.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 group-hover/item:text-indigo-600 transition-colors">{tool.name}</p>
                        <p className="text-xs text-gray-500">{tool.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3 items-center">
            <button className="px-6 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300 relative group">
              Login
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105">
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Every tool you need to work with <span className="bg-gradient-to-r from-red-500 to-indigo-600 bg-clip-text text-transparent">PDFs in one place</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Every tool you need to use PDFs, at your fingertips. All are <span className="font-bold text-green-600">100% FREE</span> and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
          </p>
        </div>

        {/* Category Filter with Animation */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-slide-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? 'bg-gray-800 text-white shadow-lg shadow-gray-800/50'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-600 hover:text-indigo-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {filteredTools.map((tool, index) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 p-8 cursor-pointer"
              style={{
                animation: `slideInUp 0.5s ease-out forwards`,
                animationDelay: `${index * 50}ms`
              }}
            >
              {/* Animated Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {tool.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{tool.desc}</p>
                <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Start now <span className="ml-2">→</span>
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              <div className="absolute inset-[2px] bg-white rounded-2xl -z-10"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Why Choose PDF Magic?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🔒', title: 'Secure', desc: 'Your files are secure and deleted after processing' },
              { icon: '⚡', title: 'Lightning Fast', desc: 'Process your PDFs instantly with our optimized servers' },
              { icon: '💰', title: '100% Free', desc: 'No registration, watermarks, or hidden costs' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group text-center p-8 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer backdrop-blur"
              >
                <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-500 inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to get started?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Start using PDF Magic for free. No signup required!
        </p>
        <Link
          href="/merge"
          className="inline-block px-8 py-4 bg-gradient-to-r from-red-500 to-indigo-600 text-white font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-red-500/50 transform hover:scale-110 transition-all duration-300 animate-pulse"
        >
          Start Using Now →
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 PDF Magic. All rights reserved. Made with ❤️</p>
          <div className="mt-4 space-x-6">
            <Link 
              href="/about"
              className="text-gray-400 hover:text-white transition-colors duration-300 underline"
            >
              About
            </Link>
            <Link 
              href="/contact"
              className="text-gray-400 hover:text-white transition-colors duration-300 underline"
            >
              Contact
            </Link>
            <Link 
              href="/privacy-policy"
              className="text-gray-400 hover:text-white transition-colors duration-300 underline"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors duration-300 underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
