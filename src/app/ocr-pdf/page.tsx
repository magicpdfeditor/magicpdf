'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OcrPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [ocrText, setOcrText] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setError('');
      setOcrText('');
    }
  };

  const handleOcr = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/ocr-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to process');

      const data = await response.json();
      setOcrText(data.text || 'No text found');
    } catch (err) {
      setError('Error processing OCR. Please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([ocrText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'ocr-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">OCR PDF</h1>
          <p className="text-gray-600 mb-8">Extract text from scanned PDFs using Optical Character Recognition</p>

          {!ocrText ? (
            <>
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

              {error && (
                <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <button
                onClick={handleOcr}
                disabled={!file || uploading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                {uploading ? 'Processing...' : 'Extract Text (OCR)'}
              </button>
            </>
          ) : (
            <>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Extracted Text</h3>
                <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto border border-gray-300">
                  <p className="text-gray-700 whitespace-pre-wrap">{ocrText}</p>
                </div>
              </div>

              <button
                onClick={handleDownloadText}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              >
                Download as Text
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
