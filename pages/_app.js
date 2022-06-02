import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { ListsContextProvider } from "../store/lists-context";
import { SetListsContextProvider } from "../store/set-lists.context";
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  return (
    <SessionProvider session={session}>
      <SetListsContextProvider>
        <ListsContextProvider>
          <Layout>
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.pathname} />
            </AnimatePresence>
          </Layout>
        </ListsContextProvider>
      </SetListsContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
