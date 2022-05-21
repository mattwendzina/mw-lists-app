import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  listContainerClasses,
  editingItemClasses,
  itemClasses,
  deleteItemClasses,
  titleInputClasses,
} from "../../../helpers/classes";
import Button from "../../ui/Button/Button";
import { ErrorMessage, SuccessMessage } from "../../ui/Messages/messages";
import ListItem from "../../ui/ListItem/ListItem";
import AddItemForm from "../AddItemForm/AddItemForm";

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

  const createErrorMessage = (error) => {
    switch (error) {
      case "createListFailed":
        setErrorMessage(
          <ErrorMessage
            message="Creating list failed! Please try again"
            classes="text-base"
          />
        );
        return;
      case "listNameAlreadyExists":
        setErrorMessage(
          <ErrorMessage
            message="List name already exists, please choose another."
            classes="text-base"
          />
        );
        return;
      default:
        setErrorMessage(
          <ErrorMessage message="An unexpected error occured!" />
        );
        return;
    }
  };

  // Only show error messages for 6 seconds
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(null);
      }, 1000);
    }
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 6000);
    }
  }, [errorMessage, successMessage]);

  const addItem = (e) => {
    e.preventDefault();
    setList([...list, { name: item, checked: false, id: uuidv4() }]);
    setItem("");
  };

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

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
        createErrorMessage("createListFailed");
        return;
      }
      if (data.message === "List name already exists") {
        createErrorMessage("listNameAlreadyExists");
        return;
      }
      createErrorMessage();
    }

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

  const titleItem = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        titleRef.current.blur();
      }}
    >
      <input
        className={titleInputClasses}
        placeholder="List Name"
        onChange={editTitleHandler}
        autoFocus
        value={title}
        ref={titleRef}
      />
    </form>
  );

  const submitListButton = () => (
    <form className="mt-6" onSubmit={createList}>
      <Button name="Create List" primary />
    </form>
  );

  return (
    <div className="flex">
      <AddItemForm
        addItem={addItem}
        item={item}
        newItemHandler={newItemHandler}
      />
      <div className={listContainerClasses}>
        {titleItem()}
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
        {list.length > 0 && submitListButton()}
        {errorMessage && errorMessage}
        {successMessage && successMessage}
      </div>
    </div>
  );
};

export default NewListForm;
