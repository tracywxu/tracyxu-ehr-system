import React, { useState, useEffect } from 'react'
import AllPatients from '../components/AllPatients'
import { Alert, AlertIcon } from '@chakra-ui/react'

export default function App() {
  const [allPatients, setAllPatients] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getAllPatientsData() {
      const response = await fetch(`/api/patients`)
      if (response.status === 500) {
        setError(true)
      }
      const patientsData = await response.json()

      setAllPatients(patientsData)
      setIsLoading(false)
    }

    getAllPatientsData()
  }, [])

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Sorry! Failed to load data.
      </Alert>
    )
  }

  {
    !isLoading && allPatients.length === 0 && (
      <Alert status="warning">
        <AlertIcon />
        No patient data to display yet! Try adding a patient.
      </Alert>
    )
  }

  return (
    <>
      <AllPatients allPatients={allPatients} isLoading={isLoading} />
    </>
  )
}
