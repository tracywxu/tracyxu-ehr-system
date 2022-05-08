import {
  Stack,
  Input,
  Text,
  Heading,
  Button,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { formatDate } from '../helpers'

export default function EditPatient({
  patient,
  updatePatient,
  patientId,
  setEditing,
}) {
  const [name, setName] = useState(patient.name || '')
  const [birthdate, setBirthdate] = useState(formatDate(patient.dob))
  const [residenceState, setResidenceState] = useState(patient.state || '')
  const [picture, setPicture] = useState(patient.picture || '')
  const [notes, setNotes] = useState(patient.notes || '')

  const toast = useToast()

  async function updatePatientRecord() {
    // optimistic update state locally
    updatePatient({
      name,
      dob: birthdate,
      state: residenceState,
      picture,
      notes,
    })

    await fetch('/api/patients/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patientId,
        name,
        dob: birthdate,
        state: residenceState,
        picture,
        notes,
      }),
    })
    setEditing(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log('submitted!')
    await updatePatientRecord()
  }

  return (
    <EditWrapper>
      <Form onSubmit={handleSubmit}>
        <Heading>Edit Patient</Heading>
        <Stack spacing={10}>
          <label>
            <Text mb="8px">Name</Text>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="filled"
              placeholder="John Doe"
            />
          </label>

          <label>
            <Text mb="8px">Birthdate</Text>
            <Input
              value={birthdate}
              variant="filled"
              onChange={(e) => setBirthdate(e.target.value)}
              placeholder="Jan 3, 1980"
            />
          </label>

          <label>
            <Text mb="8px">State</Text>
            <Input
              value={residenceState}
              onChange={(e) => setResidenceState(e.target.value)}
              variant="filled"
              placeholder="CA"
            />
          </label>

          <label>
            <Text mb="8px">Photo URL</Text>
            <Input
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              variant="filled"
              placeholder="https://photo-url.com"
            />
          </label>

          <label>
            <Text mb="8px">Notes</Text>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              variant="filled"
              placeholder="Type patient notes here..."
            />
          </label>
        </Stack>

        <ButtonGroup>
          <Button
            colorScheme="pink"
            type="submit"
            onClick={() => {
              toast({
                title: 'Patient Updated.',
                description: "We've updated this patient for you.",
                status: 'success',
                duration: 1500,
                isClosable: true,
              })
            }}
          >
            Save Changes
          </Button>
        </ButtonGroup>
      </Form>
    </EditWrapper>
  )
}

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const ButtonGroup = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`
