import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { ColorOptions } from '../../_types/types/ColorOptions'
import { TextAlignOptions } from '../../_types/types/TextAlignOptions'

interface Props {
  color?: ColorOptions
  textAlign?: TextAlignOptions
  children: ReactNode
}

const H1: FC<Props> = ({ children }: Props) => <H1Styles>{children}</H1Styles>

export const H1Styles = styled.h1<Props>`
  color: ${p => p.color || p.theme.palette.white};
  font-family: 'Rubik', monospace;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  text-align: ${p => p.textAlign || 'left'};
`

export default H1
