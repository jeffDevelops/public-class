import React, { ComponentType } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../_styled/theme'
import GlobalStyles from '../../_styled/GlobalStyles'

export const WithRenderContext = <Props extends {}>({ ...props }: Props) => (
  Component: ComponentType<Props>,
) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles>
      <Component {...props} />
    </GlobalStyles>
  </ThemeProvider>
)
