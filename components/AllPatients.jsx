import PatientsTable from './PatientsTable'
import { Spinner } from '@chakra-ui/react'
import LoadingWrapper from './LoadingWrapper'
import Layout from './Layout'

export default function AllPatients({ allPatients, isLoading }) {
  if (isLoading) {
    return (
      <LoadingWrapper>
        <Spinner color="pink.300" thickness="4px" speed="0.65s" size="xl" />
      </LoadingWrapper>
    )
  }

  return (
    <Layout>
      <PatientsTable allPatients={allPatients} isLoading={isLoading} />
    </Layout>
  )
}
