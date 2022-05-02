import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import Layout from "../components/Layout/Layout"
import { ListsContextProvider } from '../store/lists-context';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <SessionProvider session={session}>
      <ListsContextProvider>
        <Layout componentName={Component.name}>
          <Component {...pageProps} />
        </Layout>
      </ListsContextProvider>
    </SessionProvider>
  )
}

export default MyApp
