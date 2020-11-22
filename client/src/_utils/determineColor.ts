import { Theme } from 'styled-components'
import Color from 'color'
import { ColorOptions } from '../_types/types/ColorOptions'

export const determineColor = (
  colorOption: ColorOptions,
  theme: Theme,
  alpha = 0.1,
) => {
  switch (colorOption) {
    case 'warning':
      return Color(theme.palette.warning.color)
        .alpha(alpha ? alpha : 1)
        .toString()

    case 'danger':
      return Color(theme.palette.danger.color)
        .alpha(alpha ? alpha : 1)
        .toString()

    case 'secondary':
      return Color(theme.palette.secondary.color)
        .alpha(alpha ? alpha : 1)
        .toString()

    case 'primary':
    default:
      return Color(theme.palette.primary.color)
        .alpha(alpha ? alpha : 1)
        .toString()
  }
}
