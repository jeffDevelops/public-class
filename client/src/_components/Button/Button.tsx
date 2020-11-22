import React, { FC, ButtonHTMLAttributes, useState, useRef, useEffect } from 'react'
import styled, { css, keyframes, Theme } from 'styled-components'
import { ColorOptions } from '../../_types/types/ColorOptions'
import { determineColor } from '../../_utils/determineColor'
import Color from 'color'

// TODO: Storybook

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  async?: boolean
  disabled?: boolean
  loading?: boolean
  color?: ColorOptions
  width?: string /* px */
}

const Button: FC<Props> = ({ children, loading, ...props }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  /**
   * Maintain the original width of the button with the dynamic amount of inner text passed, before the async state
   */
  const [originalWidth, setOriginalWidth] = useState<string | null>(
    props.width || null,
  )

  useEffect(() => {
    if (!props.async) return
    if (loading) return

    if (buttonRef?.current) {
      setOriginalWidth(`${buttonRef.current?.getBoundingClientRect().width}px`)
    }
  }, [buttonRef, loading, props.async])

  return (
    <StyledButton
      ref={buttonRef}
      width={originalWidth || 'auto'}
      loading={loading}
      {...props}
    >
      {loading ? (
        <>
          <First loading={loading}>•</First>
          <Second loading={loading}>•</Second>
          <Third loading={loading}>•</Third>
        </>
      ) : (
        children
      )}
    </StyledButton>
  )
}

const EMIT = (p: Props & { theme: Theme }) => keyframes`
  0% {
    box-shadow: 0 0 100px 0 ${determineColor(p.color || 'primary', p.theme, 0.1)};
  }
  50% {
    box-shadow: 0 0 80px 80px ${determineColor(p.color || 'primary', p.theme, 0.1)};
  }
  100% {
    box-shadow: 0 0 90px 90px ${determineColor(p.color || 'primary', p.theme, 0.01)};
  }
`

const DOTS = (p: Props & { theme: Theme }) => keyframes`
  0% {
    transform: translate(0, 0px);
  }
  25% {
    transform: translate(0, 1px);
  }
  50% {
    transform: translate(0, 0px);
  }
  75% {
    transform: translate(0, -1px);
  }
  100% {
    transform: translate(0, 0px);
  }
`

const emitAnimation = (props: Props & { theme: Theme }) =>
  css`
    ${EMIT(props)} 1.75s linear infinite;
  `

const dotsAnimation = (props: Props & { theme: Theme }, delay: number) =>
  css`
    ${DOTS(props)} 1s ${delay.toString()}s ease-in-out infinite;
  `

export const StyledButton = styled.button.attrs<Props>(props => ({
  loading: props.loading,
}))<Props>`
  z-index: 2;
  cursor: ${p => (p.disabled || p.loading ? 'not-allowed' : 'pointer')};
  color: ${p => determineColor(p.color || 'primary', p.theme, 1)};
  background-color: ${p => determineColor(p.color || 'primary', p.theme, 0.1)};
  transition: background-color 0.2s ease-out, border 0.2s ease-out,
    color 0.2s ease-in, transform 0.2s ease-out;
  border: 1px solid ${p => determineColor(p.color || 'primary', p.theme, 1)};
  height: 40px;
  width: ${p => p.width};
  padding: 12px 18px;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  border-radius: ${p => p.theme.borderRadius};
  outline: none;
  animation: ${p => (p.loading ? emitAnimation(p) : 'none')};

  ${p =>
    p.disabled &&
    `
      background-color: ${Color(p.theme.palette.disabled.color)
        .alpha(0.4)
        .toString()};
      color: ${Color(p.theme.palette.disabled.contrastTextColor)
        .alpha(0.4)
        .toString()};
      border: 1px solid ${Color(p.theme.palette.disabled.contrastTextColor)
        .alpha(0.4)
        .toString()};
    `}

  ${p =>
    p.loading &&
    `
      cursor: 'not-allowed';
      background-color: ${Color(determineColor(p.color || 'primary', p.theme, 1))
        .alpha(0.4)
        .toString()};
      color: ${Color(p.theme.palette.disabled.contrastTextColor)
        .alpha(0.4)
        .toString()};
      border: 1px solid ${Color(determineColor(p.color || 'primary', p.theme, 1))
        .alpha(0.4)
        .toString()};
    `}

  &:active {
    transform: scale(0.99);
    transition: transform 0.3s ease-in;
  }

  &:hover {
    ${p =>
      !p.disabled &&
      !p.loading &&
      `
        background-color: ${determineColor(p.color || 'primary', p.theme, 1)};
        transition: background-color 0.3s ease-in, border 0.3s ease-in, color 0.3s ease-in;
        color: ${p.theme.palette.white};
    `}
  }
`

const dotsStyles = css<Props>`
  display: inline-block;
  line-height: 2px;
  font-size: 18px;
  color: ${p => determineColor(p.color || 'primary', p.theme, 1)};
  letter-spacing: 0;
`

const First = styled.div<Props>`
  ${dotsStyles}
  animation: ${p => (p.loading ? dotsAnimation(p, 0) : 'none')};
`
const Second = styled.div<Props>`
  ${dotsStyles}
  animation: ${p => (p.loading ? dotsAnimation(p, 0.35) : 'none')};
`
const Third = styled.div<Props>`
  ${dotsStyles}
  animation: ${p => (p.loading ? dotsAnimation(p, 0.65) : 'none')};
`

export default Button
