import { Image, Heading, Button } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Icon,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import styled from 'styled-components'
import NextLink from 'next/link'
import { QUERIES } from '../lib/constants'

export default function SinglePatient({ name, dob, picture, state, notes }) {
  return (
    <>
      <NextLink href={`/`} passHref>
        <Button colorScheme="pink" size="md" variant="link">
          <Icon as={ArrowBackIcon} />
          All Patients
        </Button>
      </NextLink>
      <Wrapper>
        <Heading>{name}</Heading>

        <PatientInfo>
          <Image borderRadius="full" boxSize="150px" src={picture} alt={name} />

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
                  <Td>
                    {new Date(dob).toLocaleDateString('default', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Td>
                  <Td>{state}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </PatientInfo>

        <Notes>
          <Heading size="md">Patient Notes</Heading>
          <Box bg="pink.50" w="100%" p={4} color="black" borderRadius="md">
            <p>{notes}</p>
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
