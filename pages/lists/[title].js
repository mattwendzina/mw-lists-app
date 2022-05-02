import { useContext } from 'react'
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react'
import ListsContext from '../../store/lists-context';
import { getAllLists } from "../../lib/utils"

import SelectedList from "../../components/Lists/SelectedList"

const List = () => {
    const [list, setList] = useState()
    const router = useRouter()
    const query = router.query.title
    const { allLists } = useContext(ListsContext)

    const fetchLists = async (query) => {
        const list = await getAllLists(query)
        setList(list)
    }

    useEffect(() => {
        const selectedList = allLists.find(list => list._id === query)
        if (selectedList) {
            setList(selectedList)
            return
        }
        if (query && !selectedList) {
            fetchLists(query)
        }
    }, [query])

    if (!list) {
        return (<p> Loading list...</p>)
    }

    return (
        <>
            <h2 className='text-2xl p-2 text-center'>{list.title}</h2>
            <SelectedList list={list} />
        </>
    )
}

export default List