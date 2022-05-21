import { createContext, useState } from "react";

const ListsContext = createContext({
  lists: [],
  selectedList: null,
  setLists: (lists) => {},
  setSelectedLists: (list) => {},
});

export const ListsContextProvider = (props) => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState();
  const setListsHandler = (lists) => setLists(lists);
  const setSelectedListHandler = (list) => setSelectedList(list);

  const context = {
    lists: lists,
    selectedList: selectedList,
    setLists: setListsHandler,
    setSelectedList: setSelectedListHandler,
  };

  return (
    <ListsContext.Provider value={context}>
      {props.children}
    </ListsContext.Provider>
  );
};

export default ListsContext;
