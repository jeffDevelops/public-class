import styled from 'styled-components'
import { breakpoints } from '../../_styled/breakpoints'
import { Security } from '@styled-icons/material/Security'

export const Container = styled.div`
  width: calc(100% - 32px);
  margin: 125px auto;
  max-width: 675px;

  ${breakpoints.down(500)} {
    width: 100%;
    max-width: none;
  }
`

export const SecurityIcon = styled(Security)`
  fill: ${p => p.theme.palette.white};
  height: 32px;
  margin-top: -5px;
`
