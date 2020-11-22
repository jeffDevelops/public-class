import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { RouteComponentProps, useLocation } from '@reach/router'
import { VibrantBackground } from '../../_styled/VibrantBackground'
import { Card } from '../../_styled/Card'
import { Container } from './styled'
import H1 from '../../_components/Typography/H1'
import Body1 from '../../_components/Typography/Body1'
import TextInput from '../../_components/TextInput/TextInput'
import { useForm } from '../../_hooks/useForm'
import { useApp } from '../../_context/AppProvider'
import Button from '../../_components/Button/Button'
import Flex from '../../_styled/Flex'
import { DangerText } from '../../_styled/ErrorMessage'

const ConfirmEmailAddress: FC<RouteComponentProps> = () => {
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const emailFromUrl = urlParams.get('email')

  const { app } = useApp()

  const [sent, setSent] = useState(false)
  const [erroneousEmail, setErroneousEmail] = useState('')

  useEffect(() => {
    let isMounted = true
    if (sent) {
      setTimeout(() => {
        if (isMounted) setSent(false)
      }, 5000)
    }
  }, [sent])

  const handleSendConfirmation = useCallback(async (email: string) => {
    setLoading(true)
    await app.emailPasswordAuth
      .resendConfirmationEmail(email)
      .then(() => setSent(true))
      .catch(error => {
        if (error.error === 'user not found') {
          setGlobalFormError(
            "A user with that email address could not be found. Please try another email, or click 'Register' above to create a new account with this email address.",
          )
          setErroneousEmail(email)
        }

        if (error.error === 'already confirmed') {
          setGlobalFormError(
            'That email address has already been confirmed. Click "Sign In" above to use it to sign in.',
          )
          setErroneousEmail(email)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const {
    formState,
    dispatchFormAction,
    dispatchErrorAction,
    errorState,
    formInvalid,
    setLoading,
    loading,
    didAttemptSubmit,
    setDidAttemptSubmit,
    globalFormError,
    setGlobalFormError,
  } = useForm({
    email: {
      blurred: false,
      value: '',
      validation: {
        type: 'email',
      },
    },
  })

  return (
    <VibrantBackground>
      <Container>
        <Card>
          <H1>Confirm email address</H1>

          <Flex height="24px" />

          {emailFromUrl ? (
            <>
              {globalFormError ? (
                <DangerText>{globalFormError}</DangerText>
              ) : (
                <Body1>
                  An email to confirm your identity was sent to {emailFromUrl}.
                  Didn't get the email?
                </Body1>
              )}

              <Flex height="16px" />

              <Button
                async
                loading={loading}
                width="100%"
                onClick={async () => await handleSendConfirmation(emailFromUrl)}
              >
                {sent ? 'Confirmation Email Sent!' : 'Resend Confirmation Email'}
              </Button>
            </>
          ) : (
            <>
              {globalFormError ? (
                <DangerText>{globalFormError}</DangerText>
              ) : (
                <Body1>
                  Enter your email address below and, if the email exists in our
                  system, we'll send you instructions to complete your registration.
                </Body1>
              )}

              <Flex height="16px" />
              <TextInput
                label="Email"
                name="confirm_email"
                id="confirm_email"
                required
                aria-required
                value={formState.email.value}
                errorMessage={errorState.email}
                error={
                  (didAttemptSubmit || formState.email.blurred) && !!errorState.email
                }
                onBlur={() =>
                  dispatchFormAction({ type: 'BLUR_INPUT', field: 'email' })
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatchFormAction({
                    type: 'UPDATE_VALUE',
                    field: 'email',
                    value: e.target.value,
                  })
                }
              />

              <Button
                async
                width="100%"
                loading={loading}
                onClick={async () => {
                  setDidAttemptSubmit(true)
                  if (formInvalid) return
                  if (formState.email.value === erroneousEmail) {
                    dispatchErrorAction({
                      type: 'UPDATE_ERROR',
                      field: 'email',
                      error: 'Please try a different email',
                    })
                    return
                  }
                  await handleSendConfirmation(formState.email.value)
                }}
              >
                {sent ? 'Confirmation Email Sent!' : 'Resend Confirmation Email'}
              </Button>
            </>
          )}
        </Card>
      </Container>
    </VibrantBackground>
  )
}

export default ConfirmEmailAddress
