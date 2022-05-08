import { Image, Heading, Button, Textarea } from '@chakra-ui/react'
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
  Stack,
  Input,
  Text,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import styled from 'styled-components'
import NextLink from 'next/link'
import { QUERIES } from '../lib/constants'
import { useState } from 'react'

const formatDate = (timestamp) =>
  new Date(timestamp).toLocaleDateString('default', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

export default function SinglePatient({ patient }) {
  const [editing, setEditing] = useState(false)
  return (
    <>
      <ButtonGroup>
        <NextLink href={`/`} passHref>
          <Button colorScheme="pink" size="md" variant="link">
            <Icon as={ArrowBackIcon} />
            All Patients
          </Button>
        </NextLink>
        <Button
          colorScheme="pink"
          onClick={() => setEditing((current) => !current)}
          variant={editing ? 'outline' : 'solid'}
        >
          {editing ? 'Cancel' : 'Edit'}
        </Button>
      </ButtonGroup>
      {!editing && <PatientDetail patient={patient} />}
      {editing && <EditPatient patient={patient} />}
    </>
  )
}

const EditPatient = ({ patient }) => {
  const [name, setName] = useState(patient.name)
  const [birthdate, setBirthdate] = useState(formatDate(patient.dob))
  const [residenceState, setResidenceState] = useState(patient.state)
  const [picture, setPicture] = useState(patient.picture)
  const [notes, setNotes] = useState(patient.notes)

  return (
    <EditWrapper>
      <Heading>Edit Patient</Heading>
      <Stack spacing={10}>
        <label>
          <Text mb="8px">Name</Text>
          <Input value={name} variant="filled" placeholder="John Doe" />
        </label>

        <label>
          <Text mb="8px">Birthdate</Text>
          <Input
            value={birthdate}
            variant="filled"
            placeholder="January 3, 1980"
          />
        </label>

        <label>
          <Text mb="8px">State</Text>
          <Input value={residenceState} variant="filled" placeholder="CA" />
        </label>

        <label>
          <Text mb="8px">Photo URL</Text>
          <Input
            value={picture}
            variant="filled"
            placeholder="https://photo-url.com"
          />
        </label>

        <label>
          <Text mb="8px">Notes</Text>
          <Textarea
            value={notes}
            variant="filled"
            placeholder="Type patient notes here..."
          />
        </label>
      </Stack>
      <Button colorScheme="pink">Save Changes</Button>
    </EditWrapper>
  )
}

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const PatientDetail = ({ patient }) => {
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
                  <Td>{formatDate(patient.dob)}</Td>
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

const ButtonGroup = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`
