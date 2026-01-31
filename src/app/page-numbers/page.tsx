'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PageNumbersPage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState('bottom-center');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleAdd = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('format', format);

      const response = await fetch('/api/page-numbers', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to add');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'numbered.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setFile(null);
    } catch (err) {
      setError('Error adding page numbers. Please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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

      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Add Page Numbers</h1>
          <p className="text-gray-600 mb-8">Add page numbers to your PDF document</p>

          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">Select a PDF File</label>
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
                <p className="text-lg text-gray-600">Click to select file</p>
              </label>
            </div>
          </div>

          {file && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700"><strong>Selected:</strong> {file.name}</p>
            </div>
          )}

          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">Position</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'top-left', label: 'Top Left' },
                { value: 'top-center', label: 'Top Center' },
                { value: 'top-right', label: 'Top Right' },
                { value: 'bottom-left', label: 'Bottom Left' },
                { value: 'bottom-center', label: 'Bottom Center' },
                { value: 'bottom-right', label: 'Bottom Right' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setFormat(value)}
                  className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
                    format === value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <button
            onClick={handleAdd}
            disabled={!file || uploading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {uploading ? 'Adding...' : 'Add Page Numbers'}
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
