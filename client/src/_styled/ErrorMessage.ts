import styled from 'styled-components'

export const DangerText = styled.span`
  color: ${p => p.theme.palette.danger.color};
  font-family: 'Rubik', sans-serif;
  font-size: 11px;
  letter-spacing: 0.5px;
`

/* Error Message appearing below input fields */
export const ErrorMessage = styled(DangerText)`
  position: absolute;
  top: 72px; /* Height of input, plus height of label, plus 8px */
  left: 0;
  right: 0;
`
