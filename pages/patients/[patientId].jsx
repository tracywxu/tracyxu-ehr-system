// our-domain.com/patient/name
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SinglePatient from '../../components/SinglePatient'
import Layout from '../../components/Layout'
import { Spinner, Alert, AlertIcon } from '@chakra-ui/react'
import LoadingWrapper from '../../components/LoadingWrapper'

export default function PatientPage() {
  const [patientRecord, setPatientRecord] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { patientId } = router.query

  useEffect(() => {
    async function getPatientData() {
      const response = await fetch(`/api/patients/${patientId}`)
      if (response.status === 500) {
        setError(true)
      }
      const patientData = await response.json()
      setPatientRecord(patientData)
      setIsLoading(false)
    }
    if (patientId) {
      getPatientData()
    }
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
      <Alert status="error">
        <AlertIcon />
        Something is wrong.
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
