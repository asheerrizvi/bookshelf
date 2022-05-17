import * as React from 'react'
// 🐨 create and export a React context variable for the AuthContext
// 💰 using React.createContext
const AuthContext = React.createContext()

function useAuth() {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a Provider!')
  }

  return context
}

export {AuthContext, useAuth}
