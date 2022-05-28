import { useEffect, useState, useContext } from "react";

import ListItem from "../ui/ListItem/ListItem";
import AddItemForm from "../Forms/AddItemForm/AddItemForm";
import { updateListInDb } from "../../lib/utils";
import SetListsContext from "../../store/set-lists.context";

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
  const [itemInput, setItemInput] = useState("");
  const [itemBeingEdited, setItemBeingEdited] = useState({});

  const setListsCtx = useContext(SetListsContext);

  useEffect(() => {
    setListsCtx.setList(selectedList);
  }, []);

  useEffect(() => {
    if (!setListsCtx.state.previousList.length) return;
    sendToDatabase();
  }, [setListsCtx.state.currentList]);

  const setClasses = (item) => ({
    deleteItemClasses,
    checkItemClasses,
    editingItemClasses,
    ...(itemBeingEdited.id === item.id
      ? { itemClasses: editingItemClasses }
      : { itemClasses: itemClasses }),
    ...(item.checked
      ? { itemTextClasses: `${itemTextClasses} line-through` }
      : { itemTextClasses: `${itemTextClasses}` }),
  });

  const editItemHandler = (e) =>
    setItemBeingEdited({ ...itemBeingEdited, name: e.target.value });

  const inputHandler = (e) => setItemInput(e.target.value);

  const sendToDatabase = async () => {
    try {
      await updateListInDb(selectedList, setListsCtx.state.currentList);
    } catch (e) {
      setListsCtx.resetList();
    }
  };

  return (
    <>
      <AddItemForm
        addItem={(e) => {
          e.preventDefault();
          setItemInput("");
          setListsCtx.addItem(itemInput);
        }}
        inputHandler={inputHandler}
        item={itemInput}
        classes="flex items-end"
      />
      <ul className={listClasses}>
        {setListsCtx.state.currentList.map((item) => {
          return (
            <ListItem
              key={item.id}
              item={item}
              classes={setClasses(item)}
              itemBeingEdited={itemBeingEdited}
              setItemBeingEdited={(id, name) =>
                setItemBeingEdited({ id: id, name: name })
              }
              editItemHandler={editItemHandler}
              checkItem={setListsCtx.checkItem}
              removeItem={setListsCtx.removeItem}
              updateItem={(e, id) =>
                setListsCtx.updateItem(id, itemBeingEdited)
              }
            />
          );
        })}
      </ul>
    </>
  );
};

export default SelectedList;
