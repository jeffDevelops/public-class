import React, {
  FC,
  useCallback,
  useState,
  useMemo,
  FormEvent,
  ChangeEvent,
  useEffect,
} from 'react'
import { RouteComponentProps } from '@reach/router'
import { useApp } from '../../_context/AppProvider'
import { Credentials } from 'realm-web'
import { Container, Form } from './styled'
import H1 from '../../_components/Typography/H1'
import TextInput from '../../_components/TextInput/TextInput'
import Flex from '../../_styled/Flex'
import Button from '../../_components/Button/Button'
import validator from 'validator'
import { VibrantBackground } from '../../_styled/VibrantBackground'
import { DangerText } from '../../_styled/ErrorMessage'
import TextButton from '../../_components/TextButton/TextButton'

const SignIn: FC<RouteComponentProps> = () => {
  const { app, setUser } = useApp()

  const [email, setEmail] = useState('')
  const [emailBlurred, setEmailBlurred] = useState(false)

  const [password, setPassword] = useState('')
  const [passwordBlurred, setPasswordBlurred] = useState(false)

  const [didAttemptSubmit, setDidAttemptSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const [
    shouldDiplayVerifyAccountLink,
    setShouldDisplayVerifyAccountLink,
  ] = useState(false)

  const formErrors = useMemo(() => {
    const errors: { email: string; password: string } = { email: '', password: '' }

    if (!validator.isEmail(email)) {
      errors.email = 'Please provide an email'
    }

    if (password === '') {
      errors.password = 'Please provide a password'
    }

    return errors
  }, [email, password])

  const signInWithEmailAndPassword = useCallback(async () => {
    setLoading(true)
    await app
      .logIn(Credentials.emailPassword(email, password))
      .then(user => setUser(user))
      .catch(error => {
        console.error(error.error)
        if (error.error === 'invalid username/password') {
          return setFormError(
            'An account with those credentials could not be found. Please try again.',
          )
        } else if (error.error === 'confirmation required') {
          setShouldDisplayVerifyAccountLink(true)
          return setFormError(
            'This account is registered, but the associated email has not yet been verified.',
          )
        }
        console.error(error)
      })
      .finally(() => setLoading(false))
  }, [email, password, app])

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setDidAttemptSubmit(true)

      // Don't submit if invalid text inputs
      if (Object.values(formErrors).find(value => !!value)) return

      await signInWithEmailAndPassword()
    },
    [formErrors, signInWithEmailAndPassword],
  )

  // Reset the form error if the user makes changes to the inputs
  useEffect(() => {
    setFormError('')
  }, [email, password])

  return (
    <VibrantBackground>
      <Container>
        <Form as="form" onSubmit={handleSubmit}>
          <H1>Sign In</H1>
          <Flex height="24px" />

          {formError && <DangerText>{formError}</DangerText>}

          {shouldDiplayVerifyAccountLink && (
            <>
              <Flex height="16px" />
              <TextButton asLinkTo={`/confirm-email-address?email=${email}`}>
                Verify Now
              </TextButton>
            </>
          )}

          <Flex height="24px" />
          <TextInput
            autoComplete="off"
            name="email"
            value={email}
            onBlur={() => setEmailBlurred(true)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            id="signin_email"
            required
            label="Email"
            error={(didAttemptSubmit || emailBlurred) && !!formErrors.email}
            errorMessage={formErrors.email}
          />
          <TextInput
            autoComplete="off"
            name="password"
            value={password}
            onBlur={() => setPasswordBlurred(true)}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            id="signin_password"
            required
            label="Password"
            type="password"
            error={(didAttemptSubmit || passwordBlurred) && !!formErrors.password}
            errorMessage={formErrors.password}
          />

          <Flex height="auto" justifyContent="flex-end">
            <Button
              async
              type="submit"
              loading={loading ? true : undefined}
              disabled={
                loading ||
                (didAttemptSubmit &&
                  (!!Object.values(formErrors).find(value => !!value) ||
                    !!formError))
              }
            >
              Sign In
            </Button>
          </Flex>
        </Form>
      </Container>
    </VibrantBackground>
  )
}

export default SignIn
