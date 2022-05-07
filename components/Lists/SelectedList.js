import { useState, useEffect } from 'react'

import ListItem from '../ui/ListItem/ListItem'

const SelectedList = ({ selectedList }) => {
    const [list, setList] = useState()
    const [itemBeingEdited, setItemBeingEdited] = useState({})

    const listClasses = `p-2 m-1 flex flex-col items-center`
    const itemClasses = `
        mx-auto relative w-60 hover:cursor-pointer group text-center
        before:transition-all before:duration-500 
        before:content-[" "] before:absolute 
        before:border-b before:left-28 before:right-28 before:top-full before:border-honey-yellow 
        hover:before:left-24 hover:before:right-24
        `
    const editingItemClasses = `before:border-french-raspberry before:border-b before:left-24 before:right-24`
    const deleteItemClasses = `absolute left-full bottom-2/4 translate-y-2/4 opacity-0 transition ease duration-200 hover:cursor-pointer hover:text-french-raspberry group-hover:opacity-100 focus:opacity-100 focus:text-french-raspberry`

    const editItemHandler = e => {
        setItemBeingEdited({ ...itemBeingEdited, name: e.target.value })
    }

    const updateList = () => {
        setList(() =>
            list.map(i => {
                if (itemBeingEdited.id === i.id) {
                    i.name = itemBeingEdited.name
                    return i
                }
                return i
            })
        )
    }

    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
    }

    useEffect(() => {
        setList(selectedList.items)
    }, [])

    return (
        <ul className={listClasses}>
            {list?.map(item => (
                <ListItem
                    key={item.id}
                    item={item}
                    itemClasses={itemBeingEdited.id === item.id ?
                        `${itemClasses} ${editingItemClasses}` :
                        `${itemClasses}`
                    }
                    itemBeingEdited={itemBeingEdited}
                    deleteItemClasses={deleteItemClasses}
                    setItemBeingEdited={setItemBeingEdited}
                    editItemHandler={editItemHandler}
                    removeItem={removeItem}
                    updateList={updateList}
                />
            ))}
        </ul>
    )
}

export default SelectedList