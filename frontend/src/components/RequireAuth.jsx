import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

export default function RequireAuth() {
  const auth = useContext(AuthContext)
  const location = useLocation()

  if (!auth?.isAuthed) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
