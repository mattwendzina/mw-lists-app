import { useContext } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ListsContext from "../../store/lists-context";
import { getAllLists } from "../../lib/utils";

import SelectedList from "../../components/Lists/SelectedList";

const List = () => {
  const [list, setCurrentList] = useState();
  const router = useRouter();
  const query = router.query.title;
  const { lists, setLists, setSelectedList } = useContext(ListsContext);

  const fetchLists = async (query) => {
    const list = await getAllLists(query);
    setCurrentList(list);
    setSelectedList(list);
    setLists(list);
  };

  useEffect(() => {
    const selectedList = lists.find((list) => list._id === query);
    if (selectedList) {
      setCurrentList(selectedList);
      setSelectedList(selectedList);
      return;
    }
    if (query && !selectedList) {
      fetchLists(query);
    }
  }, [query]);

  if (!list) {
    return <p> Loading list...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SelectedList selectedList={list} />
    </motion.div>
  );
};

export default List;
