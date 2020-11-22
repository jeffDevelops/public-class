import React from 'react'
import TextButton, {
  Props as TextButtonProps,
} from '../_components/TextButton/TextButton'
import { ThemeProvider } from 'styled-components'
import { theme } from '../_styled/theme'

const TextButtonRenderContext = <Props extends TextButtonProps>(props: Props) => (
  <ThemeProvider theme={theme}>
    <TextButton {...props} />
  </ThemeProvider>
)

export default TextButtonRenderContext
