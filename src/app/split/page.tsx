'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState('1');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleSplit = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pages', pages);

      const response = await fetch('/api/split', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to split PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'split.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Error splitting PDF. Please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-indigo-600">
            PDF Magic
          </Link>
          <Link href="/" className="text-gray-600 hover:text-indigo-600">
            ← Back Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Split PDF</h1>
          <p className="text-gray-600 mb-2">Extract specific pages from your PDF</p>
          <p className="text-gray-500 mb-8">This free PDF splitter lets you extract specific pages from your PDF file and create a new document. Perfect for separating important pages or removing unwanted content.</p>

          {/* File Upload */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Select a PDF File
            </label>
            <div className="border-2 border-dashed border-indigo-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <div className="text-5xl mb-4">📁</div>
                <p className="text-lg text-gray-600">
                  Click to select file or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  Only PDF files are supported
                </p>
              </label>
            </div>
          </div>

          {file && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                <strong>Selected:</strong> {file.name}
              </p>
            </div>
          )}

          {/* Pages Input */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Pages to Extract
            </label>
            <input
              type="text"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="e.g., 1,3,5 or 1-5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <p className="text-sm text-gray-500 mt-2">
              Enter page numbers separated by commas (1,2,3) or ranges (1-5)
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Split Button */}
          <button
            onClick={handleSplit}
            disabled={uploading || !file}
            className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-colors ${
              uploading || !file
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {uploading ? 'Splitting...' : 'Extract Pages'}
          </button>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 PDF Magic. All rights reserved. Made with ❤️</p>
          <div className="mt-4 space-x-6">
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300 underline">About</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 underline">Contact</Link>
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300 underline">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300 underline">Terms of Service</Link>
          </div>
        </div>
      </footer>    </div>
  );
}
