import React, { FC } from 'react'
import { Router, Redirect, LocationProvider } from '@reach/router'
import SignIn from '../SignIn/SignIn'
import Register from '../Register/Register'
import UnauthedTopNav from '../../_components/UnauthedTopNav/UnauthedTopNav'
import ConfirmEmailAddress from '../../Auth/ConfirmEmailAddress/ConfirmEmailAddress'
import ConfirmEmailCallback from '../../Auth/ConfirmEmailCallback/ConfirmEmailCallback'

const UnauthedRouter: FC = () => (
  <>
    <LocationProvider>
      <UnauthedTopNav />

      <Router>
        {window.location.pathname === '/' && (
          <Redirect from="/" to="/sign-in" noThrow />
        )}
        <SignIn path="/sign-in" />
        <Register path="/register" />
        <ConfirmEmailAddress path="/confirm-email-address" />
        <ConfirmEmailCallback path="/confirm-email-callback" />
      </Router>
    </LocationProvider>
  </>
)

export default UnauthedRouter
