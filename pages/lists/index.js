import { useEffect, useState, useContext } from "react";

import { getAllLists } from "../../lib/utils";

import ListsContext from "../../store/lists-context";

import AllLists from "../../components/Lists/AllLists";

const Lists = () => {
  const [lists, setLists] = useState([]);
  const listsCtx = useContext(ListsContext);

  const fetchLists = async () => {
    const lists = await getAllLists();
    listsCtx.setLists(lists);
    setLists(lists);
  };

  useEffect(() => {
    fetchLists();
  }, []);

  if (lists.length === 0) {
    return <p>Loading...</p>;
  }

  if (lists === "No Lists Found") {
    return <p>No Lists found!</p>;
  }

  return (
    <div>
      <AllLists lists={lists} setLists={setLists} />
    </div>
  );
};

export default Lists;
