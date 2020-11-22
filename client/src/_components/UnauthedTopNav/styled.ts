import styled from 'styled-components'
import Color from 'color'
import { Button } from '../TextButton/TextButton'

const NAV_HEIGHT = 65

export const Nav = styled.nav`
  height: ${NAV_HEIGHT}px;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${p => Color(p.theme.palette.black).alpha(0.8).toString()};
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.5px solid
    ${p => Color(p.theme.palette.white).alpha(0.025).toString()};
`

export const LogoContainer = styled.div`
  width: 40px;
  height: 40px;
`

export const CTAContainer = styled.div`
  width: auto;

  ${Button}:first-of-type {
    margin-right: 16px;
  }
`

export const SpaceUnderNav = styled.div`
  height: ${NAV_HEIGHT}px;
  width: 100%;
`
