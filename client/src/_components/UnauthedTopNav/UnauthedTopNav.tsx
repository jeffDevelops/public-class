import React from 'react'
import { useLocation } from '@reach/router'
import { Nav, LogoContainer, CTAContainer, SpaceUnderNav } from './styled'
import { ReactComponent as PCLogo } from '../../assets/pcLogo.svg'
import TextButton from '../TextButton/TextButton'

const UnauthedTopNav = () => {
  const location = useLocation()
  return (
    <>
      <SpaceUnderNav />
      <Nav>
        <LogoContainer>
          <PCLogo />
        </LogoContainer>

        <CTAContainer>
          <TextButton
            asLinkTo={'/register'}
            active={location.pathname === '/register'}
          >
            Register
          </TextButton>
          <TextButton
            asLinkTo={'/sign-in'}
            color="secondary"
            active={location.pathname === '/sign-in'}
          >
            Sign In
          </TextButton>
        </CTAContainer>
      </Nav>
    </>
  )
}
export default UnauthedTopNav
