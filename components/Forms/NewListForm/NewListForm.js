import { useEffect, useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FiDelete } from "react-icons/fi"

import Button from "../../ui/Button/Button"
import Input from "../../ui/Input/Input"
import { ErrorMessage, SuccessMessage } from "../../ui/Messages/messages"

const NewListForm = () => {
    const titleRef = useRef(null)

    const [itemBeingEdited, setItemBeingEdited] = useState({})
    const [item, setItem] = useState("")
    const [title, setTitle] = useState("List Name")
    const [list, setList] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const newItemHandler = (e) => setItem(e.target.value)
    const editTitleHandler = (e) => setTitle(e.target.value)
    const editItemHandler = (e, item) => {
        setItemBeingEdited({ ...itemBeingEdited, name: e.target.value })
        setList(() =>
            list.map(i => {
                if (item.id === i.id) {
                    i.name = e.target.value
                    return i
                }
                return i
            })
        )
    }


    const listClasses = `basis-2/3 p-2 m-1 border border-honey-yellow rounded flex flex-col items-center`
    const titleInputClasses = `bg-transparent p-1 text-center text-xl focus:outline-none border-b border-honey-yellow placeholder:text-md placeholder:text-oxford-blue`
    const itemClasses = `mx-auto relative w-60 hover:opacity-100 hover:cursor-pointer group before:content-[" "] before:absolute before:border-b before:left-28 before:right-28 before:top-full before:border-honey-yellow`
    const deleteItemClasses = `absolute left-full bottom-2/4 translate-y-2/4 opacity-0 transition ease duration-200 hover:cursor-pointer hover:text-french-raspberry group-hover:opacity-100 focus:opacity-100 focus:text-french-raspberry`

    const createErrorMessage = (error) => {
        switch (error) {
            case 'createListFailed':
                setErrorMessage(<ErrorMessage message="Creating list failed! Please try again" classes="text-base" />)
                return
            case 'listNameAlreadyExists':
                setErrorMessage(<ErrorMessage message="List name already exists, please choose another." classes="text-base" />)
                return
            default:
                setErrorMessage(<ErrorMessage message="An unexpected error occured!" />)
                return
        }
    }

    // Only show error messages for 6 seconds
    useEffect(() => {
        if (successMessage) {
            setTimeout(() => {
                setSuccessMessage(null)
            }, 1000)

        }
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
        }
    }, [errorMessage, successMessage])

    const addItem = (e) => {
        e.preventDefault()
        setList([...list, { name: item, id: uuidv4() }])
        setItem("")
    }

    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
    }

    const createList = async (e) => {
        e.preventDefault()
        const newList = {
            listTitle: title,
            titleLower: title.toLowerCase(),
            listItems: list,

        }

        const response = await fetch('/api/list/create-list', {
            body: JSON.stringify(newList),
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })


        const data = await response.json()

        if (!response.ok) {
            if (data.message === "List not created") {
                createErrorMessage('createListFailed')
                return
            }
            if (data.message === "List name already exists") {
                createErrorMessage('listNameAlreadyExists')
                return
            }
            createErrorMessage()
        }

        setTitle("List Name")
        setList([])
        setErrorMessage(null)
        setSuccessMessage(<SuccessMessage message="List successfully created!" classes="text-base" />)
    }

    const addItemForm = () => (
        <form onSubmit={addItem} className='basis-1/3'>
            <Input
                label="Add new item"
                onChange={newItemHandler}
                value={item} />
            <Button
                name="Submit"
                classes='mx-auto'
                primary={item ? true : false}
                disabled={!item ? true : false}
            />
        </form>
    )

    const titleItem = () => (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                titleRef.current.blur()
            }}>
            <input
                className={titleInputClasses}
                placeholder="List Name"
                onChange={editTitleHandler}
                autoFocus
                value={title}
                ref={titleRef}
            />
        </form>
    )

    const listItem = (item) => (
        (
            <li className={itemClasses}
                key={item.id}
                onClick={() => setItemBeingEdited({ id: item.id, name: item.name })}
            >
                {itemBeingEdited.id === item.id ?
                    <form
                        className='inline'
                        onSubmit={(e) => {
                            e.preventDefault()
                            setItemBeingEdited({})
                        }}>
                        <input
                            className='bg-transparent text-center focus:outline-none px-2 py-1'
                            onChange={(e) => editItemHandler(e, item)}
                            onBlur={() => setItemBeingEdited({})}
                            value={itemBeingEdited.name}
                            autoFocus
                        />
                    </form>
                    :
                    <button>
                        <p
                            className='bg-transparent text-center focus:outline-none px-2 py-1'
                            value={item.name}
                        >
                            {item.name}
                        </p>
                    </button>
                }
                <button
                    className={deleteItemClasses}
                    onClick={() => removeItem(item.id)}
                >
                    <FiDelete />
                </button>
            </li>
        )
    )

    const submitListButton = () => (
        <form className='mt-6' onSubmit={createList}>
            <Button name="Create List" primary />
        </form>
    )

    return (
        <div className='flex'>
            {addItemForm()}
            <div className={listClasses}>
                {titleItem()}
                <ul>
                    {list.map(item =>
                        listItem(item)
                    )}
                </ul>
                {list.length > 0 &&
                    submitListButton()
                }
                {errorMessage && errorMessage}
                {successMessage && successMessage}
            </div>
        </div>
    )
}

export default NewListForm
