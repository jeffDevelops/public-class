import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { ColorOptions } from '../../_types/types/ColorOptions'
import { TextAlignOptions } from '../../_types/types/TextAlignOptions'

export interface Props {
  color?: ColorOptions
  textAlign?: TextAlignOptions
  children: ReactNode
}

export const Body1: FC<Props> = ({ children }: Props) => (
  <Body1Styles>{children}</Body1Styles>
)

export const Body1Styles = styled.span<Props>`
  color: ${p => p.color || p.theme.palette.white};
  font-family: 'Dank Mono', monospace;
  letter-spacing: 0.5px;
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
  text-align: ${p => p.textAlign || 'left'};
`

export default Body1
