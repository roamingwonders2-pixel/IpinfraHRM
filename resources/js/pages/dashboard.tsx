import React from 'react';
import { PageTemplate } from '@/components/page-template';
import { RefreshCw, Users, Building2, Briefcase, UserPlus, Calendar, Clock, TrendingUp, BarChart3, Bell, Target, Award, Shield, Zap, Home, Mail, Phone, MapPin, FileText } from 'lucide-react'; // Added FileText
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, AreaChart, Area, LineChart, Line } from 'recharts';
import { format } from 'date-fns';

interface CompanyDashboardData {
  stats: {
    totalEmployees: number;
    totalBranches: number;
    totalDepartments: number;
    newEmployeesThisMonth: number;
    jobPostsThisMonth: number;
    candidatesThisMonth: number;
    attendanceRate: number;
    presentToday: number;
    pendingLeaves: number;
    onLeaveToday: number;
    activeJobPostings: number;
    totalCandidates: number;
  };
  charts: {
    departmentStats: Array<{name: string; value: number; color: string}>;
    hiringTrend: Array<{month: string; hires: number}>;
    candidateStatusStats: Array<{name: string; value: number; color: string}>;
    leaveTypesStats: Array<{name: string; value: number; color: string}>;
    employeeGrowthChart: Array<{month: string; employees: number}>;
  };
  recentActivities: {
    leaves: Array<{
      employee?: { name: string };
      status: string;
      leave_type?: { name: string };
      start_date?: string;
      end_date?: string;
    }>;
    candidates: Array<{
      first_name: string;
      last_name: string;
      status: string;
      job?: { title: string };
      created_at?: string;
    }>;
    announcements: Array<{
      title: string;
      category: string;
      is_high_priority: boolean;
      created_at?: string;
    }>;
    meetings: Array<{
      title: string;
      status: string;
      meeting_date?: string;
      start_time?: string;
      end_time?: string;
    }>;
  };
  userType: string;
}

interface PageAction {
  label: string;
  icon: React.ReactNode;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  onClick: () => void;
}

// IPINFRA Brand Colors - Official Colors
const IPINFRA_COLORS = {
  primary: '#0056b3',      // IPINFRA Blue
  secondary: '#00a86b',    // IPINFRA Green
  accent: '#ff6b35',       // IPINFRA Orange
  darkBlue: '#003d82',
  lightBlue: '#e6f2ff',
  lightGreen: '#e6f7f0',
  lightOrange: '#fff0e6',
  gray: '#6b7280',
  lightGray: '#f9fafb',
};

export default function Dashboard({ dashboardData }: { dashboardData: CompanyDashboardData }) {
  const { t } = useTranslation();
  const { auth } = usePage<{ auth: { user: any } }>().props;

  const pageActions: PageAction[] = [
    {
      label: t('Refresh Dashboard'),
      icon: <RefreshCw className="h-4 w-4" />,
      variant: 'outline',
      onClick: () => window.location.reload()
    }
  ];

  const stats = dashboardData?.stats || {
    totalEmployees: 0,
    totalBranches: 0,
    totalDepartments: 0,
    newEmployeesThisMonth: 0,
    jobPostsThisMonth: 0,
    candidatesThisMonth: 0,
    attendanceRate: 0,
    presentToday: 0,
    pendingLeaves: 0,
    onLeaveToday: 0,
    activeJobPostings: 0,
    totalCandidates: 0
  };

  const charts = dashboardData?.charts || {
    departmentStats: [],
    hiringTrend: [],
    candidateStatusStats: [],
    leaveTypesStats: [],
    employeeGrowthChart: []
  };

  const recentActivities = dashboardData?.recentActivities || {
    leaves: [],
    candidates: [],
    announcements: [],
    meetings: []
  };

  const userType = dashboardData?.userType || 'employee';
  const isCompanyUser = userType === 'company';

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'approved': 'bg-green-50 text-green-700 ring-green-600/20',
      'pending': 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
      'rejected': 'bg-red-50 text-red-700 ring-red-600/20',
      'New': 'bg-blue-50 text-blue-700 ring-blue-600/20',
      'Screening': 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
      'Interview': 'bg-purple-50 text-purple-700 ring-purple-600/20',
      'Hired': 'bg-green-50 text-green-700 ring-green-600/20',
      'Rejected': 'bg-red-50 text-red-700 ring-red-600/20'
    };
    return colors[status] || 'bg-gray-50 text-gray-700 ring-gray-600/20';
  };

  // Quick Actions
  const quickActions = [
    { label: 'Add Employee', icon: <UserPlus className="h-5 w-5" />, color: 'bg-blue-500', route: '/hr/employees/create' },
    { label: 'Post Job', icon: <Briefcase className="h-5 w-5" />, color: 'bg-green-500', route: '/hr/recruitment/job-postings/create' },
    { label: 'Schedule Meeting', icon: <Calendar className="h-5 w-5" />, color: 'bg-purple-500', route: '/meetings/meetings/create' },
    { label: 'Process Payroll', icon: <Zap className="h-5 w-5" />, color: 'bg-orange-500', route: '/hr/payroll-runs/create' },
  ];

  return (
    <PageTemplate
      title={t('IPINFRA HR Dashboard')}
      description="Comprehensive overview of IPINFRA NETWORKS HR metrics and operations"
      url="/dashboard"
      actions={pageActions}
    >
      {/* ========== IPINFRA NETWORKS HEADER WITH LOGO ========== */}
      <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 dark:from-gray-900 dark:to-gray-800 border-0 shadow-xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                {/* Logo Container */}
                <div className="relative">
                  <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 p-3 shadow-2xl">
                    <div className="h-full w-full rounded-xl bg-gradient-to-br from-white to-blue-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                          IP
                        </div>
                        <div className="text-[10px] font-semibold text-blue-700 mt-1">NETWORKS</div>
                      </div>
                    </div>
                  </div>
                  {/* Badge */}
                  <div className="absolute -top-2 -right-2">
                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Company Details */}
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                      IPINFRA NETWORKS
                    </h1>
                    <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                      SDN BHD
                    </Badge>
                  </div>
                  <p className="text-xl text-blue-100 font-medium">
                    Human Resources & Payroll Management System
                  </p>
                  <div className="flex items-center space-x-4 mt-3 text-blue-100">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">Malaysia</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4" />
                      <span className="text-sm">Since 2010</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4" />
                      <span className="text-sm">Certified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-100">Team Strength</p>
                      <p className="text-2xl font-bold text-white mt-1">{stats.totalEmployees}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-200" />
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-100">National Presence</p>
                      <p className="text-2xl font-bold text-white mt-1">{stats.totalBranches}</p>
                    </div>
                    <Building2 className="h-8 w-8 text-blue-200" />
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-100">Active Roles</p>
                      <p className="text-2xl font-bold text-white mt-1">{stats.activeJobPostings}</p>
                    </div>
                    <Briefcase className="h-8 w-8 text-blue-200" />
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-100">Performance</p>
                      <p className="text-2xl font-bold text-white mt-1">{stats.attendanceRate}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-200" />
                  </div>
                </div>
              </div>
            </div>

            {/* Date and Actions */}
            <div className="lg:w-96">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-center mb-4">
                  <p className="text-sm text-blue-100">Today's Operations</p>
                  <p className="text-2xl font-bold text-white mt-2">
                    {format(new Date(), 'EEEE, MMMM d, yyyy')}
                  </p>
                  <p className="text-sm text-blue-100 mt-1">
                    Week {format(new Date(), 'w')} • Q{Math.ceil(new Date().getMonth() / 3 + 1)}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-white">
                    <span>Present Today</span>
                    <Badge className="bg-green-500/20 text-green-100 border-green-500/30">
                      {stats.presentToday} employees
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <span>On Leave</span>
                    <Badge className="bg-yellow-500/20 text-yellow-100 border-yellow-500/30">
                      {stats.onLeaveToday} employees
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <span>New Candidates</span>
                    <Badge className="bg-blue-500/20 text-blue-100 border-blue-500/30">
                      +{stats.candidatesThisMonth} this month
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ========== END HEADER ========== */}

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
          <p className="text-sm text-gray-500">Manage your HR operations efficiently</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => window.location.href = action.route}
              className={`group p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${action.color.replace('bg-', 'hover:bg-')} hover:bg-opacity-10`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {action.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Click to start</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CLAIM FORM CARD FOR ADMIN */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Claim Management</h2>
          <p className="text-sm text-gray-500">Manage employee expense claims</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* View All Claims Card */}
          <div className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-blue-500 text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Claims</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  View and manage all employee claims (mileage, travel, meal, etc.)
                </p>
                <button
                  onClick={() => window.location.href = '/admin/claims'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  View All Claims
                </button>
              </div>
            </div>
          </div>

          {/* Pending Claims Card */}
          <div className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-yellow-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Approval</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Review claims waiting for your approval
                </p>
                <button
                  onClick={() => window.location.href = '/admin/claims?status=pending'}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Review Claims
                </button>
              </div>
            </div>
          </div>

          {/* Claim Analytics Card */}
          <div className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-green-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Claim Analytics</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  View claim statistics and monthly reports
                </p>
                <button
                  onClick={() => window.location.href = '/admin/claims/analytics'}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END CLAIM FORM CARD */}

      <div className="space-y-8">
        {/* Key Metrics Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Team Analytics */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">TEAM ANALYTICS</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stats.totalEmployees}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">This Month</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    +{stats.newEmployeesThisMonth}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Departments</span>
                  <span className="font-medium">{stats.totalDepartments}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recruitment Metrics */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">RECRUITMENT</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stats.totalCandidates}</p>
                </div>
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                  <UserPlus className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Active Positions</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {stats.activeJobPostings}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Monthly Candidates</span>
                  <span className="font-medium">+{stats.candidatesThisMonth}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance & Leave */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">ATTENDANCE</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stats.attendanceRate}%</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                  <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Present Today</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {stats.presentToday}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Pending Leaves</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    {stats.pendingLeaves}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Department Distribution */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Department Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {charts.departmentStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={charts.departmentStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      label={(entry) => `${entry.name}: ${entry.value}`}
                    >
                      {charts.departmentStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p>No department data available</p>
                  <p className="text-sm text-gray-500 mt-1">Add departments to see distribution</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hiring Trend */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Hiring Trend (Last 6 Months)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {charts.hiringTrend.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={charts.hiringTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="hires"
                      stroke={IPINFRA_COLORS.primary}
                      strokeWidth={3}
                      dot={{ fill: IPINFRA_COLORS.primary, strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p>No hiring data available</p>
                  <p className="text-sm text-gray-500 mt-1">Post jobs to track hiring trends</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Leave Requests */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Recent Leave Requests
                </CardTitle>
                <Badge variant="secondary">{recentActivities.leaves.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {recentActivities.leaves.length > 0 ? (
                <div className="space-y-4">
                  {recentActivities.leaves.slice(0, 5).map((leave, index) => (
                    <div key={index} className="flex items-center p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {leave.employee?.name || 'IPINFRA Employee'}
                          </p>
                          <Badge className={getStatusColor(leave.status)}>
                            {leave.status}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {leave.leave_type?.name || 'Leave'}
                          </span>
                          <span className="mx-2">•</span>
                          <span>
                            {leave.start_date ? format(new Date(leave.start_date), 'MMM dd') : 'N/A'}
                            {' → '}
                            {leave.end_date ? format(new Date(leave.end_date), 'MMM dd') : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p>No recent leave applications</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Candidates */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <UserPlus className="h-5 w-5 text-green-600" />
                  Recent Candidates
                </CardTitle>
                <Badge variant="secondary">{recentActivities.candidates.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {recentActivities.candidates.length > 0 ? (
                <div className="space-y-4">
                  {recentActivities.candidates.slice(0, 5).map((candidate, index) => (
                    <div key={index} className="flex items-center p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
                          {candidate.first_name.charAt(0)}{candidate.last_name.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {candidate.first_name} {candidate.last_name}
                          </p>
                          <Badge className={getStatusColor(candidate.status)}>
                            {candidate.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {candidate.job?.title || 'IPINFRA Position'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Applied {candidate.created_at ? format(new Date(candidate.created_at), 'MMM dd, yyyy') : 'recently'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <UserPlus className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p>No recent candidates</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Team Growth Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100 dark:border-gray-700">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              IPINFRA Team Growth ({new Date().getFullYear()})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {charts.employeeGrowthChart.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={charts.employeeGrowthChart}>
                  <defs>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={IPINFRA_COLORS.primary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={IPINFRA_COLORS.primary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="employees"
                    stroke={IPINFRA_COLORS.primary}
                    strokeWidth={3}
                    fill="url(#colorGrowth)"
                    dot={{ fill: IPINFRA_COLORS.primary, strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 8, fill: IPINFRA_COLORS.primary }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p>No team growth data available</p>
                <p className="text-sm text-gray-500 mt-1">Add employees to track growth</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer Note */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} IPINFRA NETWORKS SDN BHD. All rights reserved.</p>
          <p className="mt-1">Human Resources Management System v2.0 • Last updated: {format(new Date(), 'MMM dd, yyyy')}</p>
        </div>
      </div>
    </PageTemplate>
  );
}
