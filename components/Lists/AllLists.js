import { useState } from "react";
import Link from "next/link";
import { FiDelete } from "react-icons/fi";

import Modal from "../ui/Modal/Modal";
import Button from "../ui/Button/Button";

const liClasses = `mx-auto relative w-60 hover:cursor-pointer group text-center
  before:transition-all before:duration-500 
  before:content-[" "] before:absolute 
  before:border-b before:left-28 before:right-28 before:top-full before:border-honey-yellow 
  hover:before:left-24 hover:before:right-24
  text-lg p-1
  `;

const deleteItemClasses = `absolute left-full bottom-2/4 translate-y-2/4 opacity-0 transition ease duration-200 hover:cursor-pointer hover:text-french-raspberry group-hover:opacity-100 focus:opacity-100 focus:text-french-raspberry`;

const AllLists = ({ lists, setLists }) => {
  const [deleteList, setDeleteList] = useState({
    warning: { status: false, classes: "-translate-x-[60rem]" },
    listName: null,
    listId: null,
    confirmed: false,
  });
  const removeList = async (listId) => {
    const cachedLists = lists;
    setLists(lists.filter((list) => list._id !== listId));

    const response = await fetch("/api/lists/remove-list", {
      method: "POST",
      body: JSON.stringify(listId),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      setLists(cachedLists);
    }

    setDeleteList((prevState) => ({ ...prevState, confirmed: true }));
    setTimeout(() => {
      setDeleteList((prevState) => ({
        ...prevState,
        confirmed: { status: false, classes: "" },
        warning: { status: false, classes: "-translate-x-[60rem]" },
      }));
    }, 650);

    // const data = await response.json();
    // console.log("DATA", data);
  };

  return (
    <>
      <ul className="text-center">
        {lists.map((list, i) => (
          <li key={i} className={liClasses}>
            <Link href={`lists/${list._id}`}>
              <a className="block mx-auto">{list.title}</a>
            </Link>
            <button
              className={deleteItemClasses}
              onClick={() =>
                setDeleteList((prevState) => ({
                  ...prevState,
                  warning: {
                    status: true,
                    classes:
                      "-translate-x-0 transition ease-in-out delay-160 flex flex-col items-center",
                  },
                  listName: list.title,
                  listId: list._id,
                }))
              }
            >
              <FiDelete />
            </button>
          </li>
        ))}
      </ul>
      <Modal open={deleteList.warning.status}>
        {!deleteList.confirmed && (
          <div className={deleteList.warning.classes}>
            <p className="text-2xl"> Delete {deleteList.listName}</p>
            <div className="flex">
              <Button
                onClickHandler={() => removeList(deleteList.listId)}
                warning
                classes="w-16 h-12"
              >
                Yes
              </Button>
              <Button
                onClickHandler={() =>
                  setDeleteList((prevState) => ({
                    ...prevState,
                    warning: {
                      status: false,
                      classes:
                        "translate-x-[60rem] transition duration-150 ease-in",
                    },
                    listName: null,
                  }))
                }
                warning
                classes="w-16 h-12"
              >
                No
              </Button>
            </div>
          </div>
        )}
        <p
          className={
            !deleteList.confirmed
              ? "-translate-x-[60rem]"
              : "transition ease-in-out delay-50 text-2xl"
          }
        >
          Successfully Deleted!
        </p>
      </Modal>
    </>
  );
};

export default AllLists;
