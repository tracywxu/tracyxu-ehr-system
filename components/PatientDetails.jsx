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
  Spinner,
} from '@chakra-ui/react'
import styled from 'styled-components'
import { QUERIES } from '../lib/constants'
import { formatDate } from '../helpers'
import { useEffect, useState } from 'react'
import PatientsCard from './PatientsCard'

export default function PatientDetails({ patient, patientId }) {
  const [allAppointments, setAllAppointments] = useState([])
  const [patientAppointmentsIds, setPatientAppointmentsIds] = useState([])
  const [filteredAppointments, setFilteredAppointments] = useState([])

  useEffect(() => {
    async function getAllAppointments() {
      const response = await fetch(`/api/appointments`)
      const appointmentsData = await response.json()
      setAllAppointments(appointmentsData)
    }

    async function getPatientAppointments() {
      const response = await fetch(`/api/patients/${patientId}`)
      const { Appointments } = await response.json()
      setPatientAppointmentsIds(Appointments)
    }

    getAllAppointments()
    getPatientAppointments()
  }, [])

  useEffect(() => {
    function filterAppointments() {
      const target = []
      for (const appointment of allAppointments) {
        for (const patientAppointmentId of patientAppointmentsIds) {
          if (appointment.id === patientAppointmentId) {
            target.push(appointment)
          }
        }
      }
      setFilteredAppointments(target)
    }
    filterAppointments()
  }, [allAppointments, patientAppointmentsIds])

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

        <PatientsCard>
          <Heading size="md">Past Appointments</Heading>
          <TableContainer size="lg" variant="simple">
            <Table>
              <Thead>
                <Tr>
                  <Th>Clinician</Th>
                  <Th>Date</Th>
                  <Th>Notes</Th>
                </Tr>
              </Thead>

              <Tbody>
                {filteredAppointments.map(({ Notes, Clinician, Date }) => (
                  <Tr>
                    <Td>{Clinician}</Td>
                    <Td>{Date}</Td>
                    <Td>{Notes}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </PatientsCard>
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
