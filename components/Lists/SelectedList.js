import { useEffect, useState, useContext } from "react";

import SetListsContext from "../../store/set-lists.context";
import ListItem from "../ui/ListItem/ListItem";
import AddItemForm from "../Forms/AddItemForm/AddItemForm";

import { updateListInDb } from "../../lib/utils";
import {
  listClasses, itemClasses, editingItemClasses,
  deleteItemClasses, checkItemClasses, itemTextClasses
} from "../../helpers/classes"


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
                setItemBeingEdited({ id, name })
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
