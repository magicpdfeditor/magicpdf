'use client';

import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <div style={{ maxWidth: 800, margin: "40px auto", padding: 20, flex: 1 }}>
        <h1>Terms of Service</h1>

        <p>
          By accessing this website, you agree to be bound by these Terms and
          Conditions of Use.
        </p>

        <h2>Use License</h2>
        <p>
          Permission is granted to temporarily use PDF Magic for personal,
          non-commercial use only.
        </p>

        <h2>File Responsibility</h2>
        <p>
          Users are responsible for the content they upload. Do not upload illegal,
          copyrighted, or harmful material.
        </p>

        <h2>Service Availability</h2>
        <p>
          We do not guarantee that the service will always be available or error-free.
        </p>

        <h2>Limitations</h2>
        <p>
          PDF Magic shall not be held liable for any damages arising from the use or
          inability to use the service.
        </p>

        <h2>Changes</h2>
        <p>
          We may revise these terms at any time without prior notice.
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
