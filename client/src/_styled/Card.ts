import styled from 'styled-components'
import Color from 'color'
import { breakpoints } from '../_styled/breakpoints'

// TODO: Storybook
export const Card = styled.div`
  padding: 56px 40px;
  border-radius: ${p => p.theme.borderRadius};
  background-color: ${p => Color(p.theme.palette.black).alpha(0.75).toString()};
  width: 100%;
  height: auto;
  border: 1.5px solid ${p => Color(p.theme.palette.white).alpha(0.025).toString()};

  ${breakpoints.down(500)} {
    width: 100%;
    padding: 56px 16px;
    border-radius: 0;
  }
`
