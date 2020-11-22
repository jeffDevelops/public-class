import { Theme } from 'styled-components'

export const theme: Theme = {
  borderRadius: '8px',
  palette: {
    primary: {
      color: '#17BEBB',
      contrastTextColor: '#343434',
    },
    secondary: {
      color: '#FF2177',
      contrastTextColor: '#343434',
    },
    warning: {
      color: '#FFC915',
      contrastTextColor: '#fffffa',
    },
    danger: {
      color: '#EE1144',
      contrastTextColor: '#fffffa',
    },
    disabled: {
      color: '#676767',
      contrastTextColor: '#e5e5e0',
    },
    // Tags
    entity: {
      color: '#17BEBB',
      contrastTextColor: '#fffffa',
    },
    userInterface: {
      color: '#5F843A',
      contrastTextColor: '#fffffa',
    },
    action: {
      color: '#E4572E',
      contrastTextColor: '#fffffa',
    },
    infrastructure: {
      color: '#A556DE',
      contrastTextColor: '#fffffa',
    },
    endpoint: {
      color: '#FFC915',
      contrastTextColor: '#fffffa',
    },
    descriptor: {
      color: '#FF2177',
      contrastTextColor: '#fffffa',
    },

    white: '#fffffa',
    black: '#1a1a24',
  },
}
