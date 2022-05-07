import styled from 'styled-components'

export default function Layout({ children }) {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.main`
  padding: 100px;
`
