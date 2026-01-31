'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ComparePdfPage() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setError('');
      setResult('');
    }
  };

  const handleCompare = async () => {
    if (!file1 || !file2) {
      setError('Please select two PDF files');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file1', file1);
      formData.append('file2', file2);

      const response = await fetch('/api/compare-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to compare');

      const data = await response.json();
      setResult(data.result || 'Files are identical');
    } catch (err) {
      setError('Error comparing PDFs. Please try again.');
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Compare PDFs</h1>
          <p className="text-gray-600 mb-8">Compare two PDF files to find differences</p>

          {!result ? (
            <>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">First PDF</label>
                  <div className="border-2 border-dashed border-indigo-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, setFile1)}
                      className="hidden"
                      id="file-input-1"
                    />
                    <label htmlFor="file-input-1" className="cursor-pointer">
                      <div className="text-5xl mb-4">📁</div>
                      <p className="text-lg text-gray-600">Click to select</p>
                    </label>
                  </div>
                  {file1 && (
                    <p className="text-gray-700 mt-2"><strong>Selected:</strong> {file1.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">Second PDF</label>
                  <div className="border-2 border-dashed border-indigo-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, setFile2)}
                      className="hidden"
                      id="file-input-2"
                    />
                    <label htmlFor="file-input-2" className="cursor-pointer">
                      <div className="text-5xl mb-4">📁</div>
                      <p className="text-lg text-gray-600">Click to select</p>
                    </label>
                  </div>
                  {file2 && (
                    <p className="text-gray-700 mt-2"><strong>Selected:</strong> {file2.name}</p>
                  )}
                </div>
              </div>

              {error && (
                <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <button
                onClick={handleCompare}
                disabled={!file1 || !file2 || uploading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                {uploading ? 'Comparing...' : 'Compare PDFs'}
              </button>
            </>
          ) : (
            <>
              <div className="mb-8 p-4 bg-blue-50 border border-blue-300 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Comparison Result</h3>
                <p className="text-gray-700">{result}</p>
              </div>

              <button
                onClick={() => {
                  setResult('');
                  setFile1(null);
                  setFile2(null);
                }}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Compare Another
              </button>
            </>
          )}
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
      </footer>
    </div>
  );
}
