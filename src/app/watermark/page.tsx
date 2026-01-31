'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WatermarkPage() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [watermarkText, setWatermarkText] = useState('');
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [opacity, setOpacity] = useState(50);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleWatermarkImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setWatermarkImage(e.target.files[0]);
    }
  };

  const handleAddWatermark = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    if (watermarkType === 'text' && !watermarkText.trim()) {
      setError('Please enter watermark text');
      return;
    }

    if (watermarkType === 'image' && !watermarkImage) {
      setError('Please select an image for watermark');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('watermarkType', watermarkType);
      formData.append('opacity', opacity.toString());

      if (watermarkType === 'text') {
        formData.append('watermarkText', watermarkText);
      } else if (watermarkImage) {
        formData.append('watermarkImage', watermarkImage);
      }

      const response = await fetch('/api/watermark', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to add watermark');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'watermarked.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setFile(null);
      setWatermarkText('');
      setWatermarkImage(null);
    } catch (err) {
      setError('Error adding watermark. Please try again.');
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Add Watermark</h1>
          <p className="text-gray-600 mb-2">Add text or image watermarks to PDFs</p>
          <p className="text-gray-500 mb-8">This free PDF watermark tool lets you add text or image watermarks to protect your documents or brand them. Customize opacity and position to create the perfect watermark.</p>

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

          {/* Watermark Type Selection */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Watermark Type
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setWatermarkType('text')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                  watermarkType === 'text'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Text Watermark
              </button>
              <button
                onClick={() => setWatermarkType('image')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                  watermarkType === 'image'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Image Watermark
              </button>
            </div>
          </div>

          {/* Watermark Input */}
          {watermarkType === 'text' ? (
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Watermark Text
              </label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="Enter watermark text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          ) : (
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Watermark Image
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleWatermarkImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {watermarkImage && (
                <p className="mt-2 text-gray-600">
                  <strong>Selected:</strong> {watermarkImage.name}
                </p>
              )}
            </div>
          )}

          {/* Opacity Slider */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Watermark Opacity: {opacity}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Add Watermark Button */}
          <button
            onClick={handleAddWatermark}
            disabled={!file || uploading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Adding Watermark...' : 'Add Watermark'}
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
