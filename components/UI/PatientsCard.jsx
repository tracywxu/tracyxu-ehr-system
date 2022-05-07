import styled from 'styled-components'

export default function PatientsCard({ children }) {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 40px;
  padding: 50px 40px;
  border: 1px lightgray solid;
  border-radius: 10px;
`
