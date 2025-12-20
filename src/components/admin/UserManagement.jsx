import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { adminAPI } from '../../services/api'
import ConfirmDialog from '../ui/ConfirmDialog'
import ProgressBar from '../ui/ProgressBar'
import toast from 'react-hot-toast'


const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    hasNext: false,
    hasPrev: false
  })
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    role: '',
    page: 1
  })
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [filters])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const response = await adminAPI.getUsers({
        page: filters.page,
        search: filters.search,
        status: filters.status,
        role: filters.role
      })
      setUsers(response.data.users)
      setPagination(response.data.pagination)
    } catch (error) {
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (userId, status, reason) => {
    try {
      await adminAPI.updateUserStatus(userId, status, reason)
      toast.success(`User status updated to ${status}`)
      loadUsers()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user status')
    }
  }

  const handleRoleChange = async (userId, role) => {
    try {
      await adminAPI.updateUserRole(userId, role)
      toast.success(`User role updated to ${role}`)
      loadUsers()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user role')
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      await adminAPI.deleteUser(userId)
      toast.success('User deleted successfully')
      loadUsers()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user')
    }
  }

  const handleBulkAction = async (action, userIds) => {
    try {
      await adminAPI.bulkUserAction(userIds, action)
      toast.success(`Bulk ${action} completed successfully`)
      setSelectedUsers([])
      loadUsers()
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to perform bulk ${action}`)
    }
  }

  const openConfirmDialog = (action) => {
    setConfirmAction(action)
    setShowConfirmDialog(true)
  }

  const handleConfirmAction = async () => {
    if (!confirmAction) return

    try {
      switch (confirmAction.type) {
        case 'delete':
          await handleDeleteUser(confirmAction.userId)
          break
        case 'ban':
          await handleStatusChange(confirmAction.userId, 'banned', 'Banned by admin')
          break
        case 'bulk-delete':
          await handleBulkAction('delete', confirmAction.userIds)
          break
        case 'bulk-ban':
          await handleBulkAction('ban', confirmAction.userIds)
          break
        case 'bulk-activate':
          await handleBulkAction('activate', confirmAction.userIds)
          break
      }
    } catch (error) {
      // Error handling is done in individual functions
    } finally {
      setShowConfirmDialog(false)
      setConfirmAction(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
      case 'banned': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
      case 'suspended': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
      case 'pending': return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
      case 'moderator': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          User Management
        </h2>
        {selectedUsers.length > 0 && (
          <div className="flex space-x-2">
            <button
              onClick={() => openConfirmDialog({ type: 'bulk-activate', userIds: selectedUsers })}
              className="btn-secondary text-sm"
            >
              Activate ({selectedUsers.length})
            </button>
            <button
              onClick={() => openConfirmDialog({ type: 'bulk-ban', userIds: selectedUsers })}
              className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
            >
              Ban ({selectedUsers.length})
            </button>
            <button
              onClick={() => openConfirmDialog({ type: 'bulk-delete', userIds: selectedUsers })}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Delete ({selectedUsers.length})
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Users
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
              className="input-field"
              placeholder="Name, email, or username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
              className="input-field"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role
            </label>
            <select
              value={filters.role}
              onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value, page: 1 }))}
              className="input-field"
            >
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => setFilters({ search: '', status: '', role: '', page: 1 })}
              className="btn-secondary w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length && users.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(users.map(u => u._id))
                      } else {
                        setSelectedUsers([])
                      }
                    }}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Portfolio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {users.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers(prev => [...prev, user._id])
                          } else {
                            setSelectedUsers(prev => prev.filter(id => id !== user._id))
                          }
                        }}
                        className="rounded border-gray-300 dark:border-gray-600"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 dark:text-primary-400 font-semibold">
                            {user.fullName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user.fullName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {user.email}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getRoleColor(user.role)}`}
                        disabled={user.role === 'admin'}
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user._id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(user.status)}`}
                      >
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="banned">Banned</option>
                        <option value="pending">Pending</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Completion</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {user.completionPercentage}%
                          </span>
                        </div>
                        <ProgressBar
                          value={user.completionPercentage}
                          height="h-1"
                          animated={false}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {user.projectCount} projects
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-900 dark:text-white">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-500 dark:text-gray-500">
                          {user.authProvider}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <a
                          href={`/${user.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          title="View Portfolio"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </a>
                        
                        {user.status !== 'banned' && (
                          <button
                            onClick={() => openConfirmDialog({
                              type: 'ban',
                              userId: user._id,
                              userName: user.fullName
                            })}
                            className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors"
                            title="Ban User"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                            </svg>
                          </button>
                        )}
                        
                        <button
                          onClick={() => openConfirmDialog({
                            type: 'delete',
                            userId: user._id,
                            userName: user.fullName
                          })}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                          title="Delete User"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {((pagination.currentPage - 1) * 20) + 1} to {Math.min(pagination.currentPage * 20, pagination.totalUsers)} of {pagination.totalUsers} users
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={!pagination.hasPrev}
                className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={!pagination.hasNext}
                className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title={
          confirmAction?.type === 'delete' ? 'Delete User' :
          confirmAction?.type === 'ban' ? 'Ban User' :
          confirmAction?.type === 'bulk-delete' ? 'Delete Users' :
          confirmAction?.type === 'bulk-ban' ? 'Ban Users' :
          confirmAction?.type === 'bulk-activate' ? 'Activate Users' :
          'Confirm Action'
        }
        message={
          confirmAction?.type === 'delete' ? `Are you sure you want to delete ${confirmAction.userName}? This will permanently delete their account and all associated data.` :
          confirmAction?.type === 'ban' ? `Are you sure you want to ban ${confirmAction.userName}? They will no longer be able to access their account.` :
          confirmAction?.type === 'bulk-delete' ? `Are you sure you want to delete ${confirmAction.userIds?.length} users? This will permanently delete their accounts and all associated data.` :
          confirmAction?.type === 'bulk-ban' ? `Are you sure you want to ban ${confirmAction.userIds?.length} users? They will no longer be able to access their accounts.` :
          confirmAction?.type === 'bulk-activate' ? `Are you sure you want to activate ${confirmAction.userIds?.length} users?` :
          'Are you sure you want to perform this action?'
        }
        confirmText={
          confirmAction?.type === 'delete' || confirmAction?.type === 'bulk-delete' ? 'Delete' :
          confirmAction?.type === 'ban' || confirmAction?.type === 'bulk-ban' ? 'Ban' :
          confirmAction?.type === 'bulk-activate' ? 'Activate' :
          'Confirm'
        }
        onConfirm={handleConfirmAction}
        onCancel={() => {
          setShowConfirmDialog(false)
          setConfirmAction(null)
        }}
        type={
          confirmAction?.type === 'delete' || confirmAction?.type === 'bulk-delete' ? 'danger' :
          confirmAction?.type === 'ban' || confirmAction?.type === 'bulk-ban' ? 'warning' :
          'info'
        }
      />
    </div>
  )
}

export default UserManagement