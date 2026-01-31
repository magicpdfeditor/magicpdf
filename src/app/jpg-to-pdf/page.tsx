'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JpgToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setError('');
    }
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setError('Please select at least one image');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));

      const response = await fetch('/api/jpg-to-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to convert');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setFiles([]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error converting JPG to PDF. Please try again.';
      setError(message);
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">JPG to PDF</h1>
          <p className="text-gray-600 mb-2">Convert JPG images to PDF</p>
          <p className="text-gray-500 mb-8">This free image to PDF converter transforms JPG and PNG images into high-quality PDF documents. Combine multiple images into a single PDF file easily.</p>

          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">Select JPG Files</label>
            <div className="border-2 border-dashed border-indigo-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                multiple
                id="file-input"
                className="mx-auto block"
              />
              <label htmlFor="file-input" className="cursor-pointer block mt-4">
                <div className="text-5xl mb-4">📁</div>
                <p className="text-lg text-gray-600">Click to select files (hold Ctrl/Cmd to select multiple)</p>
                <p className="text-sm text-gray-500">JPG, JPEG, PNG — you can select multiple images</p>
              </label>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Selected Files ({files.length})</h3>
              <div className="space-y-2">
                {files.map((file, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <span className="text-gray-700">{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <button
            onClick={handleConvert}
            disabled={files.length === 0 || uploading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {uploading ? 'Converting...' : 'Convert to PDF'}
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
      </footer>
    </div>
  );
}
