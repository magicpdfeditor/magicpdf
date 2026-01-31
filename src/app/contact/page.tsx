'use client';

import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <div style={{ maxWidth: 800, margin: "40px auto", padding: 20, flex: 1 }}>
        <h1>Contact Us</h1>

        <p>
          If you have any questions, feedback, or concerns about PDF Magic,
          feel free to contact us.
        </p>

        <p>
          📧 Email: <strong>alpharecordsworship@gmail.com</strong>
        </p>

        <p>
          We aim to respond within 24–48 hours.
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
