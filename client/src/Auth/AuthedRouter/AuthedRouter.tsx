import React, { FC } from 'react'
import { Router, Redirect } from '@reach/router'
import Home from '../../Home/views/Home'

const AuthedRouter: FC = () => (
  <Router>
    <Redirect noThrow from="/sign-in" to="/" />

    <Home path="/" />
  </Router>
)

export default AuthedRouter
