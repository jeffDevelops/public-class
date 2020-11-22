import React, { FC, useCallback, FormEvent, ChangeEvent } from 'react'
import { navigate, RouteComponentProps } from '@reach/router'
import { useForm } from '../../_hooks/useForm'
import { useApp } from '../../_context/AppProvider'
import { Container, Form } from './styled'
import H1 from '../../_components/Typography/H1'
import TextInput from '../../_components/TextInput/TextInput'
import Flex from '../../_styled/Flex'
import { VibrantBackground } from '../../_styled/VibrantBackground'
import Button from '../../_components/Button/Button'
import { DangerText } from '../../_styled/ErrorMessage'

const Register: FC<RouteComponentProps> = () => {
  const { app } = useApp()
  const {
    formState,
    dispatchFormAction,
    loading,
    setLoading,
    didAttemptSubmit,
    setDidAttemptSubmit,
    globalFormError,
    setGlobalFormError,
    errorState,
    formInvalid,
  } = useForm({
    email: {
      value: '',
      validation: {
        type: 'email',
      },
    },
    password: {
      value: '',
      validation: {
        type: 'password',
      },
    },
    passwordConfirmation: {
      value: '',
      validation: {
        type: 'passwordConfirmation',
      },
    },
    firstName: {
      value: '',
      validation: {
        type: 'firstName',
      },
    },
    lastName: {
      value: '',
      validation: {
        type: 'lastName',
      },
    },
  })

  const registerWithEmailAndPassword = useCallback(async () => {
    await app.emailPasswordAuth
      .registerUser(formState.email.value, formState.password.value)
      .then(async () => {
        await navigate(`/confirm-email-address?email=${formState.email.value}`)
      })
      .catch(error => {
        if (error.error === 'name already in use') {
          setGlobalFormError(
            'An account is already registered to that email address. Please sign in, or use a new email address.',
          )
        }
        console.error(error)
      })
      .finally(() => setLoading(false))
  }, [formState, app.emailPasswordAuth, setLoading, setGlobalFormError])

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setDidAttemptSubmit(true)

      if (!formInvalid) {
        registerWithEmailAndPassword()
      }
    },
    [formInvalid, registerWithEmailAndPassword, setDidAttemptSubmit],
  )

  return (
    <VibrantBackground>
      <Container>
        <Form as="form" onSubmit={handleSubmit}>
          <H1>Register</H1>

          <Flex height="16px" />

          <DangerText>{globalFormError}</DangerText>

          <Flex height="16px" />

          <TextInput
            id="register_email"
            required
            label="Email"
            value={formState.email.value}
            error={
              (didAttemptSubmit || formState.email.blurred) && !!errorState.email
            }
            errorMessage={errorState.email}
            onBlur={() =>
              dispatchFormAction({
                type: 'BLUR_INPUT',
                field: 'email',
              })
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatchFormAction({
                type: 'UPDATE_VALUE',
                field: 'email',
                value: e.target.value,
              })
            }
          />
          <TextInput
            id="register_password"
            required
            label="Password"
            type="password"
            value={formState.password.value}
            error={
              (didAttemptSubmit || formState.password.blurred) &&
              !!errorState.password
            }
            errorMessage={errorState.password}
            onBlur={() =>
              dispatchFormAction({
                type: 'BLUR_INPUT',
                field: 'password',
              })
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatchFormAction({
                type: 'UPDATE_VALUE',
                field: 'password',
                value: e.target.value,
              })
            }
          />
          <TextInput
            id="register_confirm_password"
            required
            label="Confirm Password"
            type="password"
            error={
              (didAttemptSubmit || formState.passwordConfirmation.blurred) &&
              !!errorState.passwordConfirmation
            }
            errorMessage={errorState.passwordConfirmation}
            onBlur={() =>
              dispatchFormAction({
                type: 'BLUR_INPUT',
                field: 'passwordConfirmation',
              })
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatchFormAction({
                type: 'UPDATE_VALUE',
                field: 'passwordConfirmation',
                value: e.target.value,
              })
            }
          />
          <TextInput
            id="register_first_name"
            required
            label="First Name"
            value={formState.firstName.value}
            error={
              (didAttemptSubmit || formState.firstName.blurred) &&
              !!errorState.firstName
            }
            errorMessage={errorState.firstName}
            onBlur={() =>
              dispatchFormAction({ type: 'BLUR_INPUT', field: 'firstName' })
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatchFormAction({
                type: 'UPDATE_VALUE',
                field: 'firstName',
                value: e.target.value,
              })
            }
          />
          <TextInput
            id="register_last_name"
            required
            label="Last Name"
            value={formState.lastName.value}
            error={
              (didAttemptSubmit || formState.lastName.blurred) &&
              !!errorState.lastName
            }
            errorMessage={errorState.lastName}
            onBlur={() =>
              dispatchFormAction({
                type: 'BLUR_INPUT',
                field: 'lastName',
              })
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatchFormAction({
                type: 'UPDATE_VALUE',
                field: 'lastName',
                value: e.target.value,
              })
            }
          />

          <Flex height="auto" justifyContent="flex-end">
            <Button
              async
              loading={loading ? true : undefined}
              type="submit"
              disabled={loading || (didAttemptSubmit && formInvalid)}
            >
              Register
            </Button>
          </Flex>
        </Form>
      </Container>
    </VibrantBackground>
  )
}

export default Register
