import { useForm, router, usePage } from '@inertiajs/react';
import { Mail, Lock, Shield, Phone, MessageCircle, ChevronRight } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/layouts/auth-layout';
import AuthButton from '@/components/auth/auth-button';
import Recaptcha from '@/components/recaptcha';
import { useBrand } from '@/contexts/BrandContext';
import { Button } from '@/components/ui/button';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
    recaptcha_token?: string;
};

interface GlobalSettings {
    is_saas?: boolean;
    is_demo?: boolean;
    is_internal_demo?: boolean;
}

interface PageProps {
    globalSettings?: GlobalSettings;
    [key: string]: unknown;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { t } = useTranslation();
    const [recaptchaToken, setRecaptchaToken] = useState<string>('');
    const { themeColor, customColor } = useBrand();

    // IPINFRA Brand Colors - Modern Professional
    const IPINFRA_COLORS = {
        primary: '#0066CC',      // Corporate Blue
        secondary: '#0EA5E9',    // Light Blue
        accent: '#10B981',       // Success Green
        dark: '#1E293B',         // Dark Blue
        light: '#F8FAFC',        // Light Gray
    };

    const primaryColor = themeColor === 'custom' ? customColor : IPINFRA_COLORS.primary;
    const { props } = usePage<PageProps>();

    const globalSettings = props.globalSettings || {};
    const isSaas = globalSettings.is_saas || false;
    const isDemo = globalSettings.is_demo || false;

    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        if (isDemo) {
            setData({
                email: isSaas ? 'admin@ipinfra.com.my' : 'admin@ipinfra.com.my',
                password: 'Ipinfra@2024',
                remember: false
            });
        }
    }, [isDemo, isSaas, setData]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setData('recaptcha_token', recaptchaToken || '');
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleDemoLogin = (email: string, password: string) => {
        router.post(route('login'), {
            email,
            password,
            remember: false,
            recaptcha_token: recaptchaToken || ''
        });
    };

    return (
        <AuthLayout
            title={t("IPINFRA HRM System")}
            description={t("Human Resources & Payroll Management")}
            status={status}
        >
            {/* Modern Header with Logo */}
            <div className="text-center mb-8">
                {/* Logo & Company Name */}
                <div className="flex flex-col items-center mb-6">
                    <div className="mb-4">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white p-2">
                            <img
                                src="/images/logos/logo.png"
                                alt="IPINFRA Networks Logo"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerHTML = `
                                        <div class="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                                            <span class="text-white font-bold text-lg">IPINFRA</span>
                                        </div>
                                    `;
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                            IPINFRA NETWORKS
                        </h1>
                        <div className="space-y-1">
                            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                                SDN BHD
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Human Resources Management System
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Info - Elegant Design */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 mb-6 border border-blue-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center p-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-2">
                                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                +603-8750 5161
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">Office Line</span>
                        </div>

                        <div className="flex flex-col items-center p-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 mb-2">
                                <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                1700-82-7530
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">Hotline</span>
                        </div>

                        <div className="flex flex-col items-center p-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-2">
                                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                sales@ipinfra.com.my
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">Sales Email</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Form Container */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
                {/* Security Badge */}
                <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-4 py-2 rounded-full border border-green-200 dark:border-green-800">
                        <Shield className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                            🔐 Secure Login Portal
                        </span>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={submit}>
                    {/* Email Field */}
                    <div>
                        <Label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                Email Address
                            </div>
                        </Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="your.email@ipinfra.com.my"
                                className="pl-12 w-full h-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:border-blue-500 transition-all duration-200 text-base"
                                style={{
                                    '--tw-ring-color': primaryColor,
                                } as React.CSSProperties}
                            />
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <Label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <div className="flex items-center">
                                    <Lock className="w-4 h-4 mr-2" />
                                    Password
                                </div>
                            </Label>
                            {canResetPassword && (
                                <TextLink
                                    href={route('password.request')}
                                    className="text-xs font-medium transition-colors duration-200 hover:underline"
                                    style={{ color: primaryColor }}
                                >
                                    Forgot Password?
                                </TextLink>
                            )}
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter your password"
                                className="pl-12 w-full h-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:border-blue-500 transition-all duration-200 text-base"
                                style={{
                                    '--tw-ring-color': primaryColor,
                                } as React.CSSProperties}
                            />
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) => setData('remember', checked as boolean)}
                            className="border-2 border-gray-300 rounded-lg data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            style={{
                                '--tw-ring-color': primaryColor,
                            } as React.CSSProperties}
                        />
                        <Label htmlFor="remember" className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                            Keep me logged in on this device
                        </Label>
                    </div>

                    {/* reCAPTCHA */}
                    <Recaptcha
                        onVerify={setRecaptchaToken}
                        onExpired={() => setRecaptchaToken('')}
                        onError={() => setRecaptchaToken('')}
                    />

                    {/* Login Button */}
                    <AuthButton
                        processing={processing}
                        className="w-full h-12 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                        style={{
                            backgroundColor: primaryColor,
                            backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${IPINFRA_COLORS.secondary})`
                        }}
                    >
                        <div className="flex items-center justify-center">
                            {processing ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Access Dashboard
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </div>
                    </AuthButton>

                    {/* Demo Access */}
                    {isDemo && (
                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                                🚀 Quick Demo Access
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    type="button"
                                    onClick={() => handleDemoLogin('admin@ipinfra.com.my', 'Ipinfra@2024')}
                                    variant="outline"
                                    className="h-11 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 dark:border-gray-600 dark:hover:bg-blue-900/20"
                                >
                                    Admin Account
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => handleDemoLogin('manager@ipinfra.com.my', 'Manager@2024')}
                                    variant="outline"
                                    className="h-11 border-gray-300 hover:bg-green-50 hover:border-green-300 hover:text-green-600 dark:border-gray-600 dark:hover:bg-green-900/20"
                                >
                                    Manager Account
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Elegant Footer */}
            <div className="mt-8 text-center">
                <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        Need immediate assistance?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="mailto:support@ipinfra.com.my"
                            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            <Mail className="w-3 h-3 mr-1" />
                            support@ipinfra.com.my
                        </a>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            <Phone className="w-3 h-3 inline mr-1" />
                            +603-8750 5161
                        </span>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-xs text-gray-400 dark:text-gray-600">
                        © {new Date().getFullYear()} IPINFRA Networks SDN BHD. All Rights Reserved.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                        Enterprise HR & Payroll Management Solution
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}
