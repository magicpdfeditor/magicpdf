'use client';

import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <div style={{ maxWidth: 800, margin: "40px auto", padding: 20, flex: 1 }}>
        <h1>About PDF Magic</h1>

        <p>
          PDF Magic is a free online platform that provides simple, fast, and
          reliable PDF tools for everyday use. Our goal is to help users work
          with documents efficiently without installing any software.
        </p>

        <p>
          We offer a wide range of tools including PDF conversion, compression,
          merging, splitting, and editing. All tools are designed to be easy to
          use and accessible from any device.
        </p>

        <p>
          User privacy is important to us. Files uploaded to PDF Magic are
          processed automatically and deleted shortly after conversion. We do
          not store or share user documents.
        </p>

        <p>
          PDF Magic is suitable for students, professionals, and businesses who
          need quick document solutions online.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to make document management simple, secure, and
          accessible for everyone.
        </p>
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
