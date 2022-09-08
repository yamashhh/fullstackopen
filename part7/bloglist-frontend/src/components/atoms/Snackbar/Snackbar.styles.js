import styled from 'styled-components/macro'

export const Wrapper = styled.div`
  color: ${({ isError }) => (isError ? 'red' : 'green')};
  background: lightgrey;
  font-size: 2rem;
  border: 1px solid;
  border-radius: 8px;
  padding: 16px;
`
