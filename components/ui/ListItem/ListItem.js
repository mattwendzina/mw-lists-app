import { FiDelete } from "react-icons/fi";
import PropTypes from "prop-types";

const ListItem = (
    { item,
        itemClasses,
        itemBeingEdited,
        deleteItemClasses,
        setItemBeingEdited,
        editItemHandler,
        removeItem
    }
) => {
    console.log(removeItem)
    return (
        <li className={itemClasses}
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
}

ListItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    }),
    itemClasses: PropTypes.string,
    itemBeingEdited: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    }),
    deleteItemClasses: PropTypes.string,
    setItemBeingEdited: PropTypes.func,
    editItemHandler: PropTypes.func,
    removeItem: PropTypes.func,
}

export default ListItem