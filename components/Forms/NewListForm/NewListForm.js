import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  listContainerClasses,
  editingItemClasses,
  itemClasses,
  deleteItemClasses,
  titleInputClasses,
} from "../../../helpers/classes";
import { SuccessMessage } from "../../ui/Messages/messages";
import TitleItem from "../../ui/TitleItem/TitleItem";
import SubmitListButton from "../../ui/SubmitListButton/SubmitListButton";
import ListItem from "../../ui/ListItem/ListItem";
import AddItemForm from "../AddItemForm/AddItemForm";

import { createErrorMessage, setMessageDuration } from "../../../helpers/utils";

const NewListForm = () => {
  const titleRef = useRef(null);

  const [itemBeingEdited, setItemBeingEdited] = useState({});
  const [item, setItem] = useState("");
  const [title, setTitle] = useState("List Name");
  const [list, setList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const newItemHandler = (e) => setItem(e.target.value);
  const editTitleHandler = (e) => setTitle(e.target.value);
  const editItemHandler = (e, item) => {
    setItemBeingEdited({ ...itemBeingEdited, name: e.target.value });
  };

  useEffect(() => {
    successMessage && setMessageDuration(1000, () => setSuccessMessage(null));
    errorMessage && setMessageDuration(6000, () => setErrorMessage(null));
  }, [errorMessage, successMessage]);

  const addItem = (e) => {
    e.preventDefault();
    setList([...list, { name: item, checked: false, id: uuidv4() }]);
    setItem("");
  };

  const removeItem = (id) => setList(list.filter((item) => item.id !== id));

  const updateItem = () => {
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

  const resetFieldsAndShowConfirmation = () => {
    setTitle("List Name");
    setList([]);
    setErrorMessage(null);
    setSuccessMessage(
      <SuccessMessage
        message="List successfully created!"
        classes="text-base"
      />
    );
  };

  const createList = async (e) => {
    e.preventDefault();
    const newList = {
      listTitle: title,
      titleLower: title.toLowerCase(),
      listItems: list,
    };

    const response = await fetch("/api/lists/create-list", {
      body: JSON.stringify(newList),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.message === "List not created") {
        createErrorMessage("createListFailed", setErrorMessage);
        return;
      }
      if (data.message === "List name already exists") {
        createErrorMessage("listNameAlreadyExists", setErrorMessage);
        return;
      }
      createErrorMessage(null, setErrorMessage);
    }

    resetFieldsAndShowConfirmation();
  };

  return (
    <div className="flex">
      <AddItemForm
        addItem={addItem}
        item={item}
        newItemHandler={newItemHandler}
      />
      <div className={listContainerClasses}>
        <TitleItem
          onSubmit={(e) => {
            e.preventDefault();
            titleRef.current.blur();
          }}
          className={titleInputClasses}
          placeHolder="List Name"
          editTitleHandler={editTitleHandler}
          title={title}
          titleRef={titleRef}
        />
        <ul>
          {list.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              itemClasses={
                itemBeingEdited.id === item.id
                  ? `${editingItemClasses}`
                  : `${itemClasses}`
              }
              itemBeingEdited={itemBeingEdited}
              deleteItemClasses={deleteItemClasses}
              setItemBeingEdited={setItemBeingEdited}
              editItemHandler={editItemHandler}
              removeItem={removeItem}
              updateItem={updateItem}
            />
          ))}
        </ul>
        {list.length > 0 && (
          <SubmitListButton
            name="Create List"
            classNames="mt-6"
            onSubmit={createList}
          />
        )}
        {errorMessage && errorMessage}
        {successMessage && successMessage}
      </div>
    </div>
  );
};

export default NewListForm;
