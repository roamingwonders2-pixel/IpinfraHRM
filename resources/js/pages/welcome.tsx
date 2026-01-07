import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();

    return (
        <>
            <Head title="IPINFRA NETWORKS - HR & Payroll Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
                <meta name="description" content="IPINFRA NETWORKS HR & Payroll System - Comprehensive HR management solution for Malaysian businesses" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 p-6 text-gray-900 lg:p-8 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white">
                {/* Header */}
                <header className="mb-10 lg:mb-12">
                    <div className="mx-auto max-w-6xl">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg">
                                    <span className="text-xl font-bold text-white">IP</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">IPINFRA NETWORKS</h1>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">HR & Payroll System</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-lg border-2 border-blue-600 px-5 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/30"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-6xl">
                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                        {/* Left Column - Content */}
                        <div className="space-y-8">
                            {/* Hero Section */}
                            <div className="space-y-4">
                                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                    🚀 Enterprise HR Solution for Malaysia
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-5xl">
                                    Streamline Your <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">HR Operations</span>
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    Comprehensive Human Resource and Payroll Management System designed specifically for Malaysian businesses.
                                    Automate payroll processing, manage employees, track attendance, and ensure compliance with local regulations.
                                </p>
                            </div>

                            {/* Features Grid */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                        <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Employee Management</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Centralized employee records, documents, and comprehensive profile management.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                        <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Malaysian Payroll</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Automated EPF, SOCSO, EIS, PCB calculations with full LHDN compliance.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                        <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Attendance & Leave</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Real-time attendance tracking, leave management, and timesheet automation.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                                        <svg className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Recruitment</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Complete recruitment workflow from job posting to employee onboarding.
                                    </p>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20">
                                <h3 className="mb-3 text-lg font-semibold text-blue-800 dark:text-blue-300">
                                    Ready to transform your HR operations?
                                </h3>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-center font-medium text-white transition-all hover:from-blue-700 hover:to-blue-800"
                                        >
                                            Access Your Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-center font-medium text-white transition-all hover:from-blue-700 hover:to-blue-800"
                                            >
                                                Sign In to Account
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="rounded-lg border-2 border-blue-600 px-6 py-3 text-center font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/30"
                                            >
                                                Request Demo
                                            </Link>
                                        </>
                                    )}
                                </div>
                                <p className="mt-4 text-sm text-blue-700 dark:text-blue-300">
                                    Need assistance? Contact our support team at{' '}
                                    <a href="mailto:support@ipinfra.com" className="font-semibold underline hover:text-blue-800 dark:hover:text-blue-200">
                                        support@ipinfra.com
                                    </a>{' '}
                                    or call +60-3-XXXX-XXXX
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Info Panel */}
                        <div className="space-y-8">
                            {/* Security Card */}
                            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 shadow-2xl">
                                <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
                                <div className="relative p-8">
                                    <div className="mb-6 text-center">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <h2 className="mb-2 text-2xl font-bold text-white">Enterprise Security</h2>
                                        <p className="text-blue-100">
                                            Bank-level encryption & compliance with Malaysian data protection regulations
                                        </p>
                                    </div>

                                    <div className="mb-6 rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                                        <h3 className="mb-4 text-lg font-semibold text-white">Why Choose IPINFRA HRM?</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <svg className="h-5 w-5 flex-shrink-0 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-blue-100">Full Malaysian payroll compliance (EPF, SOCSO, EIS, PCB)</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <svg className="h-5 w-5 flex-shrink-0 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-blue-100">GDPR & PDPA compliant data protection</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <svg className="h-5 w-5 flex-shrink-0 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-blue-100">24/7 Malaysian-based customer support</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <svg className="h-5 w-5 flex-shrink-0 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-blue-100">Cloud-based with 99.9% uptime SLA</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                                            <div className="text-2xl font-bold text-white">100%</div>
                                            <div className="text-xs text-blue-200">Compliance</div>
                                        </div>
                                        <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                                            <div className="text-2xl font-bold text-white">24/7</div>
                                            <div className="text-xs text-blue-200">Support</div>
                                        </div>
                                        <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                                            <div className="text-2xl font-bold text-white">99.9%</div>
                                            <div className="text-xs text-blue-200">Uptime</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-white/20 bg-white/5 p-4 text-center">
                                    <p className="text-sm text-white/90">
                                        Trusted by Malaysian businesses • ISO 27001 Certified • Data hosted in Malaysia
                                    </p>
                                </div>
                            </div>

                            {/* Testimonial/Info Card */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">About IPINFRA NETWORKS</h3>
                                <p className="mb-4 text-gray-600 dark:text-gray-300">
                                    IPINFRA NETWORKS SDN BHD is a leading provider of enterprise solutions in Malaysia,
                                    specializing in HR technology, payroll services, and business process automation.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Founded: 2010</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Location: Kuala Lumpur, Malaysia</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Specialization: HR Technology & Payroll</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <div className="text-center sm:text-left">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    © {new Date().getFullYear()} IPINFRA NETWORKS SDN BHD. All rights reserved.
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    Human Resource & Payroll Management System v2.0
                                </p>
                            </div>
                            <div className="flex gap-6">
                                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                                    Terms of Service
                                </a>
                                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                                    Documentation
                                </a>
                                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
