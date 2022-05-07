// our-domain.com/patient/name
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SinglePatient from '../../components/SinglePatient'
import Layout from '../../components/UI/Layout'
import { Spinner, Alert, AlertIcon } from '@chakra-ui/react'
import LoadingWrapper from '../../components/UI/LoadingWrapper'

export default function PatientPage() {
  const [patientRecord, setPatientRecord] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { patientId } = router.query

  useEffect(() => {
    async function getPatientData() {
      setIsLoading(true)
      const response = await fetch(`/api/patients/${patientId}`)
      if (response.status === 500) {
        setError(true)
      }
      const patientData = await response.json()
      setPatientRecord(patientData)
      setIsLoading(false)
    }
    getPatientData()
  }, [patientId])

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Spinner color="pink.300" thickness="4px" speed="0.65s" size="xl" />
      </LoadingWrapper>
    )
  }

  if (!isLoading && Object.keys(patientRecord).length === 0) {
    return (
      <Alert status="warning">
        <AlertIcon />
        No patient data to display yet! Try adding a patient.
      </Alert>
    )
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Sorry! Failed to load data.
      </Alert>
    )
  }

  return (
    <Layout>
      <SinglePatient
        name={patientRecord.name}
        dob={patientRecord.dob}
        notes={patientRecord.notes}
        picture={patientRecord.picture}
        state={patientRecord.state}
      />
    </Layout>
  )
}
