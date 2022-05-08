import styled from 'styled-components'
import { QUERIES } from '../lib/constants'

export default function Layout({ children }) {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.main`
  padding: 100px;

  @media ${QUERIES.tabletAndSmaller} {
    padding: 50px;
  }
`
