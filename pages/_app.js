import GlobalStyles from '../styles/GlobalStyles'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <GlobalStyles />
    </ChakraProvider>
  )
}

export default MyApp
