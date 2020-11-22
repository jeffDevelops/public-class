import React, { FC, ButtonHTMLAttributes, ReactText } from 'react'
import styled from 'styled-components'
import { navigate } from '@reach/router'
import { ColorOptions } from '../../_types/types/ColorOptions'
import { determineColor } from '../../_utils/determineColor'

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button label
   */
  children: ReactText

  /**
   * Path to navigate the user to on click
   */
  asLinkTo?: string

  /**
   * No padding or background--only text
   */
  disableBackground?: boolean

  /**
   * Whether to always display the semi-transparent background (only works if disableBackground is false or not set / undefined)
   */
  active?: boolean

  /**
   * Color - primary, secondary, danger, warning
   */
  color?: ColorOptions

  /**
   * Width (css value string)
   */
  width?: string
}

const TextButton: FC<Props> = ({ children, asLinkTo, ...intrinsicAttrs }: Props) => (
  <Button
    onClick={asLinkTo ? () => navigate(asLinkTo) : intrinsicAttrs.onClick}
    {...intrinsicAttrs}
  >
    {children}
  </Button>
)

export default TextButton

export const Button = styled.button<Props>`
  cursor: pointer;
  border-radius: ${p => p.theme.borderRadius};
  width: ${p => p.width || 'auto'};
  height: auto;
  color: ${p => determineColor(p.color || 'primary', p.theme, 1)};
  text-transform: ${p => (p.disableBackground ? 'none' : 'uppercase')};
  transition: background-color 0.2s ease-in;
  background-color: ${p =>
    p.active ? determineColor(p.color || 'primary', p.theme) : 'transparent'};
  outline: none;
  border: none;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 3px;
  line-height: 15px;

  /** Add padding if not disableBackground */
  ${p => !p.disableBackground && 'padding: 12px 18px;'}

  &:hover {
    /** Add text-transform if disableBackground */
    ${p => p.disableBackground && 'text-decoration: underline;'}
    ${p =>
      !p.disableBackground &&
      `background-color: ${determineColor(
        p.color || 'primary',
        p.theme,
      )};`}
    transition: background-color .3s ease-in;
  }
`
