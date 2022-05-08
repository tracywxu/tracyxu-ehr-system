import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Image,
  Heading,
} from '@chakra-ui/react'
import styled from 'styled-components'
import { QUERIES } from '../lib/constants'
import { formatDate } from '../helpers'

export default function PatientDetails({ patient }) {
  return (
    <>
      <Wrapper>
        <Heading>{patient.name}</Heading>

        <PatientInfo>
          <Image
            borderRadius="full"
            boxSize="150px"
            src={patient.picture}
            alt={patient.name}
          />

          <TableContainer size="lg" variant="simple">
            <Table>
              <Thead>
                <Tr>
                  <Th>dob</Th>
                  <Th>state</Th>
                </Tr>
              </Thead>

              <Tbody>
                <Tr>
                  <Td>{patient.dob ? formatDate(patient.dob) : ''}</Td>
                  <Td>{patient.state}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </PatientInfo>

        <Notes>
          <Heading size="md">Patient Notes</Heading>
          <Box bg="pink.50" w="100%" p={4} color="black" borderRadius="md">
            <p>{patient.notes}</p>
          </Box>
        </Notes>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;

  @media ${QUERIES.tabletAndSmaller} {
    gap: 60px;
  }
`

const PatientInfo = styled.section`
  display: flex;
  justify-content: space-around;
  gap: 120px;
  flex-wrap: wrap;
  @media ${QUERIES.tabletAndSmaller} {
    gap: 60px;
  }
`

const Notes = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
