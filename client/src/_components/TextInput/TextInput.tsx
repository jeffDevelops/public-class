import React, { FC, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import Color from 'color'
import { ColorOptions } from '../../_types/types/ColorOptions'
import { ErrorMessage, DangerText } from '../../_styled/ErrorMessage'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  color?: ColorOptions
  fullWidth?: boolean
  label: string
  id: string
  required?: boolean

  // Input Validation
  error?: boolean
  errorMessage?: string
}

const TextInput: FC<Props> = ({
  id,
  required,
  error,
  errorMessage,
  ...props
}: Props) => {
  return (
    <FormControl {...props}>
      <Label htmlFor={id}>
        {props.label}
        {required && <RequiredAsterisk />}
      </Label>
      <StyledInput id={id} {...props} />
      {error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </FormControl>
  )
}

export const StyledInput = styled.input<Props>`
  border: 1px solid ${p => Color(p.theme.palette.white).alpha(0.5).toString()};
  color: ${p => p.theme.palette.white};
  background-color: transparent;
  height: 40px;
  border-radius: ${p => p.theme.borderRadius};
  outline: none;
  padding: 0 16px 2px;
  font-size: 16px;
  line-height: 12px;
  transition: border 0.3s ease-in;

  &:focus {
    border: 1px solid ${p => p.theme.palette.white};
    transition: border 0.2s ease-out;
  }
`

export const FormControl = styled.div<Pick<Props, 'fullWidth'>>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  margin-bottom: 32px;
  width: ${p => (p.fullWidth ? '100%' : 'auto')};
`

export const Label = styled.label`
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  color: ${p => p.theme.palette.white};
  letter-spacing: 2px;
  margin-bottom: 8px;
`

export const RequiredAsterisk = () => <DangerText> *</DangerText>

export default TextInput
