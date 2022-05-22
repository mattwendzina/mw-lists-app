import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import ListItem from "../ui/ListItem/ListItem";
import AddItemForm from "../Forms/AddItemForm/AddItemForm";
import { updateListInDb } from "../../lib/utils";

const SelectedList = ({ selectedList }) => {
  const [listItems, setListItems] = useState();
  const [item, setItem] = useState("");
  const [itemBeingEdited, setItemBeingEdited] = useState({});
  const UPDATE = "UPDATE";
  const CHECK = "CHECK";

  useEffect(() => {
    setListItems({ currentList: selectedList.items });
  }, []);

  // When listItems gets updated save to DB
  useEffect(() => {
    if (!listItems?.previousList) return;
    sendToDatabase();
  }, [listItems]);

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

  const editItemHandler = (e) => {
    setItemBeingEdited({ ...itemBeingEdited, name: e.target.value });
  };
  const newItemHandler = (e) => setItem(e.target.value);

  const sendToDatabase = async () => {
    try {
      await updateListInDb(selectedList, listItems.currentList);
      setListItems({ currentList: listItems.currentList });
    } catch (e) {
      setListItems({ currentList: listItems.previousList });
    }
  };

  // This is an annoying get around... I couldn't get this to work with a simple
  // map. It seems that map always mutates the original list. Using forEach
  // and pushing to a new array was only was I could find around this problem
  const newList = (type, id) => {
    let newList = [];
    listItems.currentList.forEach((item) => {
      if (item.id === id) {
        return newList.push({
          ...item,
          ...(type === UPDATE && { name: itemBeingEdited.name }),
          ...(type === CHECK && { checked: !item.checked }),
        });
      }
      newList.push(item);
    });
    return newList;
  };

  const setList = (newList) =>
    setListItems((prevState) => ({
      previousList: [...prevState.currentList],
      currentList: newList,
    }));

  const addItem = (e) => {
    e.preventDefault();
    setList([
      ...listItems.currentList,
      { name: item, checked: false, id: uuidv4() },
    ]);
    setItem("");
  };

  const updateItem = (e, id) => {
    if (!e.target.value) return;
    setList(newList(UPDATE, id));
  };

  const removeItem = (id) =>
    setList(listItems.currentList.filter((item) => item.id !== id));

  const checkItem = (id) => setList(newList(CHECK, id));

  return (
    <>
      <AddItemForm
        addItem={addItem}
        newItemHandler={newItemHandler}
        item={item}
        classes="flex items-end"
      />
      <ul className={listClasses}>
        {listItems?.currentList.map((item) => {
          return (
            <ListItem
              key={item.id}
              item={item}
              itemClasses={
                itemBeingEdited.id === item.id
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
              itemBeingEdited={itemBeingEdited}
              setItemBeingEdited={setItemBeingEdited}
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
