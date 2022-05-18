import * as React from 'react'
import * as auth from 'auth-provider'
import { useAsync } from 'utils/hooks'
import {client} from 'utils/api-client'
import { FullPageErrorFallback, FullPageSpinner } from 'components/lib'

const AuthContext = React.createContext()

function useAuth() {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a Provider!')
  }

  return context
}

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }

  return user
}

function AuthProvider(props) {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
    status
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = form => auth.login(form).then(user => setData(user))
  const register = form => auth.register(form).then(user => setData(user))
  const logout = () => {
    auth.logout()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }


  if (isSuccess) {
    const value = {user, login, register, logout}
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

export {AuthProvider, useAuth}
