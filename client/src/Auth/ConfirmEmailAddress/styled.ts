import styled from 'styled-components'
import { breakpoints } from '../../_styled/breakpoints'

export const Container = styled.div`
  width: calc(100% - 32px);
  margin: 125px auto;
  max-width: 675px;

  ${breakpoints.down(500)} {
    width: 100%;
    max-width: none;
  }
`
