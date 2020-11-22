import styled from 'styled-components'
import { breakpoints } from '../../_styled/breakpoints'
import { Card } from '../../_styled/Card'

export const Container = styled.div`
  width: calc(100% - 32px);
  margin: 0 auto;
  max-width: 675px;

  ${breakpoints.down(500)} {
    width: 100%;
    max-width: none;
  }
`

export const Form = styled(Card).attrs({ as: 'form' })`
  margin: 175px auto 0;
  max-width: 425px;

  ${breakpoints.down(500)} {
    width: 100%;
    max-width: none;
    margin: 65px 0 0 0; /* 65px is the height of the top nav */
    height: calc(100vh - 65px);
    border: none;
    padding: 56px 16px;
  }
`
