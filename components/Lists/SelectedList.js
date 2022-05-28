import { useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { initialState, itemsReducer } from "../../store/reducers/items-reducer";
import ListItem from "../ui/ListItem/ListItem";
import AddItemForm from "../Forms/AddItemForm/AddItemForm";
import { updateListInDb } from "../../lib/utils";

const listClasses = `p-2 m-1 flex flex-col items-center`;
const itemClasses = `
  mx-auto relative w-60 hover:cursor-pointer group text-center
  before:transition-all before:duration-500 
  before:content-[" "] before:absolute 
  before:border-b before:left-28 before:right-28 before:top-full before:border-honey-yellow 
  hover:before:left-24 hover:before:right-24
  `;
const editingItemClasses = `mx-auto relative w-60 hover:cursor-pointer group text-center
  before:transition-all before:duration-500 
  before:content-[" "] before:absolute 
  before:border-b before:left-24 before:right-24 before:top-full before:border-french-raspberry-light
  `;
const deleteItemClasses = `absolute left-full bottom-2/4 translate-y-2/4 opacity-0 transition ease duration-200 hover:cursor-pointer hover:text-french-raspberry group-hover:opacity-100 focus:opacity-100 focus:text-french-raspberry`;
const checkItemClasses = `absolute right-full bottom-2/4 translate-y-2/4 opacity-0 transition ease duration-200 hover:cursor-pointer hover:text-french-raspberry group-hover:opacity-100 focus:opacity-100 focus:text-french-raspberry`;
const itemTextClasses = `bg-transparent text-center focus:outline-none px-2 py-1`;

const SelectedList = ({ selectedList }) => {
  const [state, dispatch] = useReducer(itemsReducer, initialState);

  useEffect(() => {
    dispatch({ type: "INITIATE_LIST", payload: selectedList.items });
  }, []);

  useEffect(() => {
    if (!state.previousList.length) return;
    sendToDatabase();
  }, [state.currentList]);

  const editItemHandler = (e) => {
    dispatch({
      type: "SET_ITEM_BEING_EDITED",
      payload: { ...state.itemBeingEdited, name: e.target.value },
    });
  };
  const newItemHandler = (e) =>
    dispatch({ type: "SET_ITEM", payload: e.target.value });

  const sendToDatabase = async () => {
    try {
      await updateListInDb(selectedList, state.currentList);
    } catch (e) {
      dispatch({ type: "RESET_LIST", payload: state.previousList });
    }
  };

  const addItem = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_CURRENT_LIST",
      payload: [
        ...state.currentList,
        { name: state.listItem, checked: false, id: uuidv4() },
      ],
    });
    dispatch({ type: "SET_ITEM", payload: "" });
  };

  const updateItem = (e, id) => {
    if (!e.target.value) return;
    dispatch({
      type: "SET_CURRENT_LIST",
      payload: state.currentList.map((item) =>
        item.id === id ? { ...item, name: state.itemBeingEdited.name } : item
      ),
    });
  };

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

  return (
    <>
      <AddItemForm
        addItem={addItem}
        newItemHandler={newItemHandler}
        item={state.listItem}
        classes="flex items-end"
      />
      <ul className={listClasses}>
        {state.currentList.map((item) => {
          return (
            <ListItem
              key={item.id}
              item={item}
              itemClasses={
                state.itemBeingEdited.id === item.id
                  ? `${editingItemClasses}`
                  : `${itemClasses}`
              }
              deleteItemClasses={deleteItemClasses}
              checkItemClasses={checkItemClasses}
              itemTextClasses={
                item.checked
                  ? `${itemTextClasses} line-through`
                  : `${itemTextClasses}`
              }
              itemBeingEdited={state.itemBeingEdited}
              setItemBeingEdited={(id, name) =>
                dispatch({
                  type: "SET_ITEM_BEING_EDITED",
                  payload: { id: id, name: name },
                })
              }
              checkItem={checkItem}
              editItemHandler={editItemHandler}
              removeItem={removeItem}
              updateItem={updateItem}
            />
          );
        })}
      </ul>
    </>
  );
};

export default SelectedList;
