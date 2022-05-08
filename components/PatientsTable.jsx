import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Button,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import PatientsCard from './PatientsCard'
import styled from 'styled-components'

export default function PatientsTable({ allPatients }) {
  return (
    <PatientsCard>
      <Header>
        <Heading as="h2" size="lg">
          All Patients
        </Heading>
        {/* Add new patient feature has not been implemented */}
        <Button>Add New Patient</Button>
      </Header>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>name</Th>
              <Th>dob</Th>
              <Th>state</Th>
              <Th>details</Th>
            </Tr>
          </Thead>

          <Tbody>
            {allPatients.map(({ name, dob, state, id }) => (
              <Tr key={id}>
                <Td>{name}</Td>
                <Td>
                  {new Date(dob).toLocaleDateString('default', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Td>
                <Td>{state}</Td>
                <Td>
                  <NextLink href={`/patients/${id}`} passHref>
                    <Button colorScheme="pink">View</Button>
                  </NextLink>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </PatientsCard>
  )
}

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
`
