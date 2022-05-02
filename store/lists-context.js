import { createContext, useState } from 'react'

const ListsContext = createContext({
    allList: []
})

export const ListsContextProvider = (props) => {
    const [lists, setLists] = useState([]);

    const setListsHandler = (lists) => setLists(lists)

    const context = {
        allLists: lists,
        setLists: setListsHandler
    }

    return (
        <ListsContext.Provider value={context}>
            {props.children}
        </ListsContext.Provider>
    )
}

export default ListsContext