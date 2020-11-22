import React from 'react'
import * as Realm from 'realm-web'
import { ThemeProvider } from 'styled-components'
import AppProvider from './_context/AppProvider'
import Router from './Auth/AuthRouter/AuthRouter'
import { theme } from './_styled/theme'
import GlobalStyles from './_styled/GlobalStyles'

const REALM_APP_ID = 'publicclass-mxlfm'
const app: Realm.App = new Realm.App({ id: REALM_APP_ID })

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles>
      <AppProvider app={app}>
        <Router />
      </AppProvider>
    </GlobalStyles>
  </ThemeProvider>
)

export default App
