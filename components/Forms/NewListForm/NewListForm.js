import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Button from "../../ui/Button/Button"
import Input from "../../ui/Input/Input"
import { FiDelete } from "react-icons/fi"

const NewListForm = () => {
    const [editItem, setEditItem] = useState("")
    const [item, setItem] = useState("")
    const [editTitle, setEditTitle] = useState(false)
    const [title, setTitle] = useState("List Name")
    const [list, setList] = useState([])

    let lastAction

    const newItemHandler = (e) => setItem(e.target.value)
    const editItemHandler = (e) => setEditItem(e.target.value)
    const setTitleHandler = (e) => setTitle(e.target.value)

    const onSubmitHandler = (e) => {
        e.preventDefault()
        setList([...list, { name: item, id: uuidv4(), editing: false }])
        setItem("")
    }

    const removeItemHandler = (id) => {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
    }

    const enableEditingHandler = (e, item) => {
        e.preventDefault()
        const listWithEditingItem = list.map(i => {
            if (i.id === item.id) {
                setEditItem(i.name)
                i.editing = !i.editing
                return i
            }
            return i
        })
        setList(listWithEditingItem)
    }

    const resetAndUpdateItem = (e, item, action) => {
        e.preventDefault()

        if (action === 'blur' && lastAction === 'submit') { return }

        lastAction = action

        const listWithEditingItem = list.map(i => {
            if (i.id === item.id) {
                i.name = editItem
                i.editing = !i.editing
                setEditItem("")
                return i
            }
            return i
        })

        setList(listWithEditingItem)
    }

    const settingTitle = (e) => {
        e.preventDefault()
        setEditTitle(false)
    }
    return (
        <>
            <div className='flex'>
                <form onSubmit={onSubmitHandler} className='basis-1/3'>
                    <Input label="Add new item" onChange={newItemHandler} value={item} />
                    {item ?
                        <Button name="Submit" classes='mx-auto' primary />
                        :
                        <Button name="Submit" classes='mx-auto' disabled />}
                </form>

                <div className='basis-2/3 p-2 m-1 border border-honey-yellow rounded'>
                    <h2 className='text-xl'>
                        {!editTitle ?
                            <p
                                className='bg-transparent p-1 text-center
                                    border-b border-honey-yellow w-56 mx-auto'
                                onClick={() => { setEditTitle(true) }}
                            >
                                {title}
                            </p>
                            :
                            <form onSubmit={settingTitle}>
                                <input className='bg-transparent p-1 text-center
                                        focus:outline-none border-b border-honey-yellow
                                        placeholder:text-md placeholder:text-oxford-blue'
                                    placeholder="List Name"
                                    autoFocus
                                    onChange={setTitleHandler}
                                    value={title}
                                />
                            </form>
                        }
                    </h2>
                    <ul>
                        {list.map(item =>
                        (
                            <li className='
                                mx-auto 
                                relative w-60 
                                hover:opacity-100 hover:cursor-pointer group
                                before:content-[" "] before:absolute before:border-b
                                before:left-28 before:right-28 before:top-full
                                before:border-honey-yellow
                                '
                                key={item.id}
                            >
                                {!item.editing ?
                                    <p className='px-2 py-1 inline-block break-normal w-60'
                                        onClick={(e) => enableEditingHandler(e, item)}>
                                        {item.name}
                                    </p>
                                    :
                                    <form className='inline' onSubmit={(e) => resetAndUpdateItem(e, item, 'submit')}>
                                        <input
                                            className='bg-transparent text-center focus:outline-none px-2 py-1'
                                            value={editItem}
                                            autoFocus
                                            onChange={editItemHandler}
                                            onBlur={(e) => resetAndUpdateItem(e, item, 'blur')}
                                        />
                                    </form>
                                }
                                <span className='
                                        absolute left-full bottom-2/4 
                                        translate-y-2/4 opacity-0 
                                        transition ease duration-200
                                        hover:cursor-pointer 
                                        hover:text-french-raspberry
                                        group-hover:opacity-100'
                                    onClick={() => removeItemHandler(item.id)}
                                > <FiDelete />
                                </span>
                            </li>
                        )
                        )}
                    </ul>
                </div>

            </div>

        </>
    )
}

export default NewListForm
