import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import ListItem from "../ui/ListItem/ListItem";
import AddItemForm from "../Forms/AddItemForm/AddItemForm";

const SelectedList = ({ selectedList }) => {
  const [list, setList] = useState();
  const [item, setItem] = useState("");
  const [itemBeingEdited, setItemBeingEdited] = useState({});

  const listClasses = `p-2 m-1 flex flex-col items-center`;
  const itemClasses = `
        mx-auto relative w-60 hover:cursor-pointer group text-center
        before:transition-all before:duration-500 
        before:content-[" "] before:absolute 
        before:border-b before:left-28 before:right-28 before:top-full before:border-honey-yellow 
        hover:before:left-24 hover:before:right-24
        `;
  const editingItemClasses = `before:border-french-raspberry-light before:border-b before:left-24 before:right-24`;
  const deleteItemClasses = `absolute left-full bottom-2/4 translate-y-2/4 opacity-0 transition ease duration-200 hover:cursor-pointer hover:text-french-raspberry group-hover:opacity-100 focus:opacity-100 focus:text-french-raspberry`;
  const checkItemClasses = `absolute right-full bottom-2/4 translate-y-2/4 opacity-0 transition ease duration-200 hover:cursor-pointer hover:text-french-raspberry group-hover:opacity-100 focus:opacity-100 focus:text-french-raspberry`;
  const itemTextClasses = `bg-transparent text-center focus:outline-none px-2 py-1`;

  const addItem = (e) => {
    e.preventDefault();
    setList([...list, { name: item, checked: false, id: uuidv4() }]);
    setItem("");
  };

  const editItemHandler = (e) => {
    setItemBeingEdited({ ...itemBeingEdited, name: e.target.value });
  };

  const newItemHandler = (e) => setItem(e.target.value);

  const updateList = () => {
    setList(() =>
      list.map((i) => {
        if (itemBeingEdited.id === i.id) {
          i.name = itemBeingEdited.name;
          return i;
        }
        return i;
      })
    );
  };

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const checkItem = (id) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
    setList(newList);
  };

  useEffect(() => {
    setList(selectedList.items);
  }, []);

  return (
    <>
      <AddItemForm
        addItem={addItem}
        newItemHandler={newItemHandler}
        item={item}
      />
      <ul className={listClasses}>
        {list?.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            itemClasses={
              itemBeingEdited.id === item.id
                ? `${itemClasses} ${editingItemClasses}`
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
            updateList={updateList}
          />
        ))}
      </ul>
    </>
  );
};

export default SelectedList;
