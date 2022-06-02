import Head from "next/head";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>Photography App</title>
        <meta name="description" content="Photography App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome</h1>

        <p className={styles.description}>Welcome to your app</p>
      </main>
    </motion.div>
  );
}
