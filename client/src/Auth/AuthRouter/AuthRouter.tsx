import React, { FC } from 'react'
import { useApp } from '../../_context/AppProvider'
import UnauthedRouter from '../UnauthedRouter/UnauthedRouter'
import AuthedRouter from '../AuthedRouter/AuthedRouter'

const AuthRouter: FC = () => {
  const { user } = useApp()
  if (!user) return <UnauthedRouter />
  return <AuthedRouter />
}

export default AuthRouter
