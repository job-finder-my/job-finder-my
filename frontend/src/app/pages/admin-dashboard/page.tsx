"use client"

import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  Building2,
  GraduationCap,
  BarChart3,
  Settings,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  MoreVertical,
  Search,
  Filter,
  Plus,
  AlertTriangle
} from 'lucide-react';
import UserProfile from '@/components/UserProfile';
import { withAuth } from '@/contexts/auth-context';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'company' | 'admin';
  status: 'active' | 'pending' | 'suspended';
  joinDate: string;
  lastActive: string;
}

interface JobPosting {
  id: string;
  title: string;
  company: string;
  status: 'pending' | 'approved' | 'rejected';
  applications: number;
  posted: string;
  salary: string;
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with real API calls
  const stats = {
    totalUsers: 1247,
    totalStudents: 892,
    totalCompanies: 156,
    totalJobs: 234,
    pendingApprovals: 23,
    activeJobs: 189
  };

  const recentUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'student',
      status: 'pending',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'TechCorp Inc',
      email: 'hr@techcorp.com',
      role: 'company',
      status: 'active',
      joinDate: '2024-01-10',
      lastActive: '1 day ago'
    }
  ];

  const pendingJobs: JobPosting[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc',
      status: 'pending',
      applications: 0,
      posted: '2 hours ago',
      salary: '$120k-150k'
    },
    {
      id: '2',
      title: 'Data Scientist',
      company: 'DataWorks',
      status: 'pending',
      applications: 0,
      posted: '1 day ago',
      salary: '$100k-130k'
    }
  ];

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <GraduationCap className="h-4 w-4" />;
      case 'company':
        return <Building2 className="h-4 w-4" />;
      case 'admin':
        return <Shield className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-600" />
            Admin Panel
          </h1>
        </div>
        <nav className="mt-6">
          <a
            href="#"
            className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 ${
              activeTab === 'overview' ? 'bg-purple-50 text-purple-600' : ''
            }`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 className="h-5 w-5" />
            Overview
          </a>
          <a
            href="#"
            className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 ${
              activeTab === 'users' ? 'bg-purple-50 text-purple-600' : ''
            }`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="h-5 w-5" />
            User Management
          </a>
          <a
            href="#"
            className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 ${
              activeTab === 'jobs' ? 'bg-purple-50 text-purple-600' : ''
            }`}
            onClick={() => setActiveTab('jobs')}
          >
            <Briefcase className="h-5 w-5" />
            Job Approvals
          </a>
          <a
            href="#"
            className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 ${
              activeTab === 'companies' ? 'bg-purple-50 text-purple-600' : ''
            }`}
            onClick={() => setActiveTab('companies')}
          >
            <Building2 className="h-5 w-5" />
            Companies
          </a>
          <a
            href="#"
            className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 ${
              activeTab === 'students' ? 'bg-purple-50 text-purple-600' : ''
            }`}
            onClick={() => setActiveTab('students')}
          >
            <GraduationCap className="h-5 w-5" />
            Students
          </a>
          <a
            href="#"
            className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 ${
              activeTab === 'settings' ? 'bg-purple-50 text-purple-600' : ''
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="h-5 w-5" />
            Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'jobs' && 'Job Approvals'}
            {activeTab === 'companies' && 'Company Management'}
            {activeTab === 'students' && 'Student Management'}
            {activeTab === 'settings' && 'System Settings'}
          </h2>
          <UserProfile />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Students</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Companies</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalCompanies}</p>
                  </div>
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Users */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent User Registrations</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getRoleIcon(user.role)}
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pending Job Approvals */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Pending Job Approvals</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {pendingJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{job.title}</p>
                          <p className="text-sm text-gray-500">{job.company} • {job.salary}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                            <XCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users by name or email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-5 w-5" />
                  Filters
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Join Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Active</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {getRoleIcon(user.role)}
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="capitalize text-gray-900">{user.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{user.joinDate}</td>
                      <td className="px-6 py-4 text-gray-500">{user.lastActive}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                            <Eye className="h-4 w-4" />
                          </button>
                          {user.status === 'pending' && (
                            <>
                              <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          <button className="p-1 text-gray-400 hover:bg-gray-50 rounded">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Job Approvals Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search job postings"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-5 w-5" />
                  Filters
                </button>
              </div>
            </div>

            {/* Jobs Table */}
            <div className="bg-white rounded-lg shadow">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Job Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Salary</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Posted</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingJobs.map((job) => (
                    <tr key={job.id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{job.title}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{job.company}</td>
                      <td className="px-6 py-4 text-gray-900">{job.salary}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{job.posted}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                            <Eye className="h-4 w-4" />
                          </button>
                          {job.status === 'pending' && (
                            <>
                              <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Companies Tab */}
        {activeTab === 'companies' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Company Management</h3>
                <p className="text-gray-500">Manage company registrations, profiles, and permissions.</p>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center py-12">
                <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Student Management</h3>
                <p className="text-gray-500">Manage student registrations, profiles, and applications.</p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center py-12">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">System Settings</h3>
                <p className="text-gray-500">Configure system settings, permissions, and platform preferences.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard);
