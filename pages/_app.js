import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import Layout from "../components/Layout/Layout"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout componentName={Component.name}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
