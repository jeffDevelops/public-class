// styled.d.ts
import 'styled-components'
import { PartiallyEmittedExpression } from 'typescript'

interface Palette {
  color: string
  contrastTextColor: string // accessible text color to contrast the color
}

declare module 'styled-components' {
  export interface Theme {
    borderRadius: string
    palette: {
      primary: Palette
      secondary: Palette
      warning: Palette
      danger: Palette
      disabled: Palette
      black: string
      white: string

      // Tag categories
      entity: Palette
      userInterface: Palette
      action: Palette
      infrastructure: Palette
      endpoint: Palette
      descriptor: Palette
    }
  }
}
