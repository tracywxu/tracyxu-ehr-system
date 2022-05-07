import styled from 'styled-components'

export default function LoadingWrapper({ children }) {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  padding: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
