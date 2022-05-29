import { useEffect, useState, useContext } from "react";
import { getSession } from "next-auth/react";
import { motion } from "framer-motion";

import { getData } from "../api/lists/all-lists"

import ListsContext from "../../store/lists-context";

import AllLists from "../../components/Lists/AllLists";

const Lists = ({ allLists }) => {

  const [lists, setLists] = useState([]);
  const listsCtx = useContext(ListsContext);

  useEffect(() => {
    const parsedlists = JSON.parse(allLists)
    setLists(parsedlists)
    listsCtx.setLists(parsedlists);
  }, []);

  if (lists === "No Lists Found") {
    return <p>No Lists found!</p>;
  }

  return (
    <>
      {lists && <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AllLists lists={lists} setLists={setLists} />
      </motion.div>}
    </>
  );
};

export async function getServerSideProps(context) {
  // Here we see if there is an authorized session. If the IS then redirect
  // any attempts to go to the login page to the '/'.
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const response = await getData(session);
  const lists = await JSON.stringify(response)

  return {
    props: { allLists: lists },
  };
}


export default Lists;


