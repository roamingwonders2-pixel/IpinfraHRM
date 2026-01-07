import React from 'react';
import { usePage, Head } from '@inertiajs/react';
import { Phone, Mail, MessageCircle, Building } from 'lucide-react';

interface LandingSettings {
  company_name: string;
}

interface PageProps {
  settings: LandingSettings;
}

export default function BrandedLandingPage() {
  const pageProps = usePage<PageProps>();
  const { settings } = pageProps.props;

  return (
    <>
      <Head title="IPINFRA HRM System - Login" />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
        {/* Professional Header with Logo */}
        <header className="bg-white shadow-lg border-b">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Logo & Company Name */}
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-md bg-white p-1">
                  <img
                    src="/images/logos/logo.png"
                    alt="IPINFRA Networks Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                          <span class="text-white font-bold">IN</span>
                        </div>
                      `;
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    IPINFRA NETWORKS
                  </h1>
                  <p className="text-sm text-gray-600">
                    SDN BHD • HRM System
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <div className="flex items-center text-gray-700">
                  <Phone className="w-3 h-3 mr-1 text-blue-600" />
                  <span>+603-8750 5161</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MessageCircle className="w-3 h-3 mr-1 text-green-600" />
                  <span>1700-82-7530</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Mail className="w-3 h-3 mr-1 text-purple-600" />
                  <span>sales@ipinfra.com.my</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Login Section */}
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 w-full max-w-md">
            {/* Logo in Center */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Building className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                HR Management System
              </h2>
              <p className="text-gray-600">
                Secure access to HR and Payroll dashboard
              </p>
            </div>

            {/* Login Button */}
            <div className="space-y-4">
              <a
                href="/login"
                className="block w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-lg text-center transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Login to Dashboard
              </a>

              {/* Company Info */}
              <div className="text-center text-sm text-gray-500 pt-4 border-t">
                <p className="font-medium">IPINFRA NETWORKS SDN BHD</p>
                <p className="mt-1">Human Resources & Payroll Management</p>
              </div>

              {/* Quick Contact */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-center text-xs text-gray-500 mb-2">
                  Need assistance?
                </p>
                <div className="flex flex-col items-center space-y-1">
                  <a
                    href="mailto:support@ipinfra.com.my"
                    className="text-xs text-blue-600 hover:underline flex items-center"
                  >
                    <Mail className="w-3 h-3 mr-1" />
                    support@ipinfra.com.my
                  </a>
                  <div className="flex space-x-3">
                    <span className="text-xs text-gray-600 flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      +603-8750 5161
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="text-xs text-gray-600 flex items-center">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      1700-82-7530
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Professional Footer */}
        <footer className="bg-gray-900 text-white py-6">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Company Info */}
              <div className="mb-4 md:mb-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded bg-white p-0.5">
                    <img
                      src="/images/logos/logo.png"
                      alt="IPINFRA Logo"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 rounded flex items-center justify-center">
                            <span class="text-white font-bold text-xs">IN</span>
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm">IPINFRA NETWORKS</p>
                    <p className="text-xs text-gray-400">SDN BHD</p>
                  </div>
                </div>
              </div>

              {/* Contact & Copyright */}
              <div className="text-center md:text-right">
                <div className="flex flex-wrap justify-center md:justify-end gap-3 mb-2 text-xs text-gray-300">
                  <span className="flex items-center">
                    <Phone className="w-3 h-3 mr-1" />
                    +603-8750 5161
                  </span>
                  <span className="text-gray-600">•</span>
                  <span className="flex items-center">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    1700-82-7530
                  </span>
                  <span className="text-gray-600">•</span>
                  <a href="mailto:sales@ipinfra.com.my" className="flex items-center hover:text-white">
                    <Mail className="w-3 h-3 mr-1" />
                    sales@ipinfra.com.my
                  </a>
                </div>
                <p className="text-xs text-gray-500">
                  © {new Date().getFullYear()} IPINFRA Networks SDN BHD. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
