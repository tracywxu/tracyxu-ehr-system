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
import { useRouter } from 'next/router'
import { formatDate } from '../helpers'

export default function PatientsTable({ allPatients }) {
  const router = useRouter()

  async function postNewPatientData() {
    const response = await fetch('/api/patients/new-patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '',
        birthdate: null,
        picture: '',
        notes: '',
        state: '',
      }),
    })
    const { id } = await response.json()
    return id
  }

  async function handleClick(e) {
    e.preventDefault()
    const newPatientId = await postNewPatientData()
    router.push(`/patients/${newPatientId}?edit=true`)
  }

  return (
    <PatientsCard>
      <Header>
        <Heading as="h2" size="lg">
          All Patients
        </Heading>
        <NextLink href={`${router}`} passHref>
          <Button colorScheme="pink" onClick={handleClick}>
            Add New Patient
          </Button>
        </NextLink>
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
                <Td>{dob ? formatDate(dob) : ''}</Td>
                <Td>{state}</Td>
                <Td>
                  <NextLink href={`/patients/${id}`} passHref>
                    <Button colorScheme="pink" variant="link">
                      View
                    </Button>
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
