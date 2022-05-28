import { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { initialState, itemsReducer } from "./reducers/items-reducer";

const SetListsContext = createContext({
  state: [],
  addItem: () => {},
  setList: () => {},
  removeItem: () => {},
  checkItem: () => {},
  updateItem: () => {},
  resetList: () => {},
});

export const SetListsContextProvider = (props) => {
  const [state, dispatch] = useReducer(itemsReducer, initialState);

  const addItem = (item) =>
    dispatch({
      type: "SET_CURRENT_LIST",
      payload: [
        ...state.currentList,
        { name: item, checked: false, id: uuidv4() },
      ],
    });

  const setList = (selectedList) =>
    dispatch({ type: "INITIATE_LIST", payload: selectedList.items });

  const removeItem = (id) =>
    dispatch({
      type: "SET_CURRENT_LIST",
      payload: state.currentList.filter((item) => item.id !== id),
    });

  const checkItem = (id) =>
    dispatch({
      type: "SET_CURRENT_LIST",
      payload: state.currentList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    });

  const updateItem = (id, itemBeingEdited) =>
    dispatch({
      type: "SET_CURRENT_LIST",
      payload: state.currentList.map((item) =>
        item.id === id ? { ...item, name: itemBeingEdited.name } : item
      ),
    });

  const resetList = () => {
    dispatch({ type: "RESET_LIST", payload: state.previousList });
  };

  const context = {
    state,
    addItem,
    setList,
    removeItem,
    checkItem,
    updateItem,
    resetList,
  };

  return (
    <SetListsContext.Provider value={context}>
      {props.children}
    </SetListsContext.Provider>
  );
};

export default SetListsContext;
