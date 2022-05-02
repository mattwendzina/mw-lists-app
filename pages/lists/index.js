import { useEffect, useState, useContext } from 'react'

import { getAllLists } from "../../lib/utils"

import ListsContext from "../../store/lists-context"

import AllLists from "../../components/Lists/AllLists"

const Lists = () => {
    const [allLists, setAllLists] = useState([])
    const listsCtx = useContext(ListsContext)

    const fetchLists = async () => {
        const lists = await getAllLists()
        listsCtx.setLists(lists)
        setAllLists(lists)
    }

    useEffect(() => {
        fetchLists()
    }, [])

    return (
        <div>
            <h2 className='text-2xl p-2 text-center'>Your Lists</h2>
            <AllLists lists={allLists} />
        </div >
    )
}

export default Lists