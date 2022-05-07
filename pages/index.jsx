import React, { useState, useEffect } from 'react'
import AllPatients from '../components/AllPatients'
import { Alert, AlertIcon } from '@chakra-ui/react'

export default function App() {
  const [allPatients, setAllPatients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getAllPatientsData() {
      setIsLoading(true)
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

  return (
    <>
      <AllPatients allPatients={allPatients} isLoading={isLoading} />
    </>
  )
}
