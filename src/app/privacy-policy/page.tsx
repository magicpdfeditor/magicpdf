'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <div style={{ maxWidth: 800, margin: "40px auto", padding: 20, flex: 1 }}>
        <h1>Privacy Policy</h1>

        <p>
          At PDF Magic, accessible from https://magicpdf-eight.vercel.app,
          the privacy of our visitors is one of our main priorities.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We do not require users to create accounts. Uploaded files are processed
          temporarily and automatically deleted after conversion.
        </p>

        <h2>Log Files</h2>
        <p>
          PDF Magic follows standard procedures of using log files. These files log
          visitors when they visit websites. The information collected includes IP
          addresses, browser type, Internet Service Provider (ISP), date and time
          stamp, and referring pages.
        </p>

        <h2>Cookies and Web Beacons</h2>
        <p>
          PDF Magic uses cookies to store information about visitors' preferences
          and to optimize user experience.
        </p>

        <h2>Google AdSense</h2>
        <p>
          Google is a third-party vendor on our site. It uses cookies (DoubleClick
          cookie) to serve ads based on users' visits to this and other websites.
        </p>

        <h2>Third Party Privacy Policies</h2>
        <p>
          PDF Magic's Privacy Policy does not apply to other advertisers or websites.
          We advise you to consult the respective Privacy Policies of third-party ad
          servers for more detailed information.
        </p>

        <h2>Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree
          to its terms.
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
