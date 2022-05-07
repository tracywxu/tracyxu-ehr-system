import PatientsTable from './PatientsTable'
import { Heading, Spinner } from '@chakra-ui/react'
import LoadingWrapper from './UI/LoadingWrapper'
import Layout from './UI/Layout'

export default function AllPatients({ allPatients, isLoading }) {
  if (isLoading) {
    return (
      <LoadingWrapper>
        <Spinner color="pink.300" thickness="4px" speed="0.65s" size="xl" />
      </LoadingWrapper>
    )
  }

  if (!isLoading && allPatients.length === 0) {
    return <Heading>No patient data to display yet.</Heading>
  }

  return (
    <Layout>
      <PatientsTable allPatients={allPatients} isLoading={isLoading} />
    </Layout>
  )
}
