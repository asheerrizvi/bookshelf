/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import { client } from 'utils/api-client.exercise'

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }

  return user
}

function App() {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    getUser().then(u => setUser(u))
  }, [])

  function login(form) {
    return auth.login(form).then(u => setUser(u))
  }

  function register(form) {
    return auth.register(form).then(u => setUser(u))
  }

  function logout() {
    auth.logout()
    setUser(null)
  }

  return user ? (
    <AuthenticatedApp logout={logout} user={user} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
