import React from 'react'
import { useSelector } from 'react-redux'

const DebugPanel = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono max-w-sm z-50">
      <h3 className="text-yellow-400 font-bold mb-2">🐛 Debug Info</h3>
      <div className="space-y-1">
        <div>Authenticated: {isAuthenticated ? '✅' : '❌'}</div>
        <div>User ID: {user?._id || 'None'}</div>
        <div>Email: {user?.email || 'None'}</div>
        <div>Role: {user?.role || 'None'}</div>
        <div>Status: {user?.status || 'None'}</div>
        <div>Provider: {user?.authProvider || 'None'}</div>
        <div>Token: {localStorage.getItem('token') ? '✅' : '❌'}</div>
      </div>
    </div>
  )
}

export default DebugPanel