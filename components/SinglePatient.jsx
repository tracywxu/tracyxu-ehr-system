import { Icon, Button } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import styled from 'styled-components'
import NextLink from 'next/link'
import { useState, useEffect } from 'react'
import PatientDetails from './PatientDetails'
import EditPatient from './EditPatient'

export default function SinglePatient({ patient, edit, patientId }) {
  const [editing, setEditing] = useState(false)
  const [currentPatient, setCurrentPatient] = useState(patient)

  useEffect(() => {
    if (edit) {
      setEditing(true)
    }
  }, [])

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

      {!editing && <PatientDetails patient={currentPatient} />}
      {editing && (
        <EditPatient
          patient={currentPatient}
          updatePatient={setCurrentPatient}
          patientId={patientId}
          setEditing={setEditing}
        />
      )}
    </>
  )
}

const ButtonGroup = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`
