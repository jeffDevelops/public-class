import styled from 'styled-components'

interface FlexProps {
  column?: boolean
  justifyContent?: string
  alignItems?: string
  margin?: string
  padding?: string
  width?: string
  maxWidth?: string
  minWidth?: string
  height?: string
  minHeight?: string
  maxHeight?: string
}

const Flex = styled.div<FlexProps>`
  display: flex;
  justify-content: ${p => p.justifyContent || 'center'};
  align-items: ${p => p.alignItems || 'center'};
  flex-direction: ${p => (p.column ? 'column' : 'row')};
  margin: ${p => p.margin || '0'};
  padding: ${p => p.padding || '0'};
  width: ${p => p.width || '100%'};
  max-width: ${p => p.maxWidth || 'none'};
  min-width: ${p => p.minWidth || '0'};
  height: ${p => p.height || '100%'};
  min-height: ${p => p.minHeight || '0'};
  max-height: ${p => p.maxHeight || 'none'};
`

export default Flex
