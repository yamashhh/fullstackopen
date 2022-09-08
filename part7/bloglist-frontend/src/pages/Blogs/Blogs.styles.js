import styled from 'styled-components/macro'
import { Button } from '../../components/atoms/Button/Button.styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > ${Button} {
    align-self: flex-end;
    margin-top: 16px;
  }
`

export const OL = styled.ol`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  font-size: 2rem;
`
