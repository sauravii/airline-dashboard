import { createContext, useCallback, useMemo, useState } from 'react'

import { getToken as getStoredToken, setToken as setStoredToken } from '../services/api'
import { login as loginRequest } from '../services/auth'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getStoredToken())

  const setToken = useCallback((nextToken) => {
    setStoredToken(nextToken)
    setTokenState(nextToken)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
  }, [setToken])

  const login = useCallback(async ({ username, password }) => {
    const res = await loginRequest({ username, password })
    if (!res?.token) {
      throw new Error('Token tidak ditemukan dari response')
    }
    setToken(res.token)
    return res
  }, [setToken])

  const value = useMemo(() => ({
    token,
    isAuthed: Boolean(token),
    login,
    logout,
    setToken,
  }), [token, login, logout, setToken])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
