import styled from 'styled-components/macro'
import { Button } from '../../atoms/Button/Button.styles'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 8px;
  padding: 24px;
  row-gap: 16px;

  > ${Button} {
    align-self: flex-end;
  }
`
