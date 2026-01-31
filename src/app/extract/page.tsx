'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ExtractPage() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setError('');
      setExtractedText('');
    }
  };

  const handleExtract = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setExtracting(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to extract text');

      const data = await response.json();
      setExtractedText(data.text);
    } catch (err) {
      setError('Error extracting text. Please try again.');
      console.error(err);
    } finally {
      setExtracting(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(extractedText);
    alert('Text copied to clipboard!');
  };

  const handleDownloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([extractedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'extracted-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Extract Text</h1>
          <p className="text-gray-600 mb-8">
            Extract text content from your PDF files
          </p>

          {!extractedText ? (
            <>
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

              {/* Selected File */}
              {file && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Selected:</strong> {file.name}
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              {/* Extract Button */}
              <button
                onClick={handleExtract}
                disabled={!file || extracting}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {extracting ? 'Extracting...' : 'Extract Text'}
              </button>
            </>
          ) : (
            <>
              {/* Extracted Text Display */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Extracted Text
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto border border-gray-300">
                  <p className="text-gray-700 whitespace-pre-wrap">{extractedText}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleCopyText}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Copy Text
                </button>
                <button
                  onClick={handleDownloadText}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Download as TXT
                </button>
                <button
                  onClick={() => {
                    setExtractedText('');
                    setFile(null);
                  }}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
                >
                  Extract Another
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
