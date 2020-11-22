import React, { FC, useEffect, useState, useCallback } from 'react'
import { useLocation, navigate, RouteComponentProps } from '@reach/router'
import { VibrantBackground } from '../../_styled/VibrantBackground'
import H1 from '../../_components/Typography/H1'
import Body1 from '../../_components/Typography/Body1'
import { useApp } from '../../_context/AppProvider'
import Button from '../../_components/Button/Button'
import { Container, SecurityIcon } from './styled'
import Flex from '../../_styled/Flex'

const ConfirmEmailCallback: FC<RouteComponentProps> = () => {
  const location = useLocation()
  const { app } = useApp()
  const urlParams = new URLSearchParams(location.search)
  const tokenFromUrl = urlParams.get('token')
  const tokenIdFromUrl = urlParams.get('tokenId')

  const [expiredTokenError, setExpiredTokenError] = useState(false)
  const [loading, setLoading] = useState(true)

  const confirmUser = useCallback(
    async (token: string, tokenId: string) => {
      // Confirm the user; if the token is expired, prompt the user to send another confirmation email
      await app.emailPasswordAuth.confirmUser(token, tokenId).catch(error => {
        console.error(error.error)
        if (error.error === 'userpass token is expired or invalid') {
          setExpiredTokenError(true)
        }
      })
    },
    [app.emailPasswordAuth],
  )

  // When the token and tokenId from the url are truthy, confirm the user in Realm
  useEffect(() => {
    if (tokenFromUrl && tokenIdFromUrl)
      confirmUser(tokenFromUrl, tokenIdFromUrl).then(() => {
        setTimeout(() => {
          navigate('/sign-in')
          setLoading(false)
        }, 5000)
      })
  }, [tokenFromUrl, tokenIdFromUrl, confirmUser])

  return (
    <VibrantBackground>
      <Container>
        {loading && (
          <>
            <H1>Thank you for confirming your email!</H1>
            <Body1>
              You will be automatically redirected to sign into your new account.
            </Body1>
          </>
        )}

        {expiredTokenError && (
          <>
            <H1>
              <SecurityIcon /> That link has expired
            </H1>

            <Flex height="32px" />
            <Body1>
              For your security, this link has expired to prevent unauthorized access
              to your account. Please try sending a new confirmation email.
            </Body1>

            <Flex height="32px" />

            <Button
              color="primary"
              onClick={() => navigate('/confirm-email-address')}
            >
              Email confirmation page
            </Button>
          </>
        )}
      </Container>
    </VibrantBackground>
  )
}

export default ConfirmEmailCallback
