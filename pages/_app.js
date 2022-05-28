import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { ListsContextProvider } from "../store/lists-context";
import { SetListsContextProvider } from "../store/set-lists.context";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <SetListsContextProvider>
        <ListsContextProvider>
          <Layout componentName={Component.name}>
            <Component {...pageProps} />
          </Layout>
        </ListsContextProvider>
      </SetListsContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
