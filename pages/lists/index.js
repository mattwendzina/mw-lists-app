import { useEffect, useState, useContext } from "react";

import { getAllLists } from "../../lib/utils";

import ListsContext from "../../store/lists-context";

import AllLists from "../../components/Lists/AllLists";

const Lists = () => {
  const [allLists, setAllLists] = useState([]);
  const listsCtx = useContext(ListsContext);

  const fetchLists = async () => {
    const lists = await getAllLists();
    listsCtx.setLists(lists);
    setAllLists(lists);
  };

  useEffect(() => {
    fetchLists();
  }, []);

  if (allLists.length === 0) {
    return <p>Loading...</p>;
  }

  if (allLists === "No Lists Found") {
    return <p>No Lists found!</p>;
  }

  return (
    <div>
      <AllLists lists={allLists} />
    </div>
  );
};

export default Lists;
