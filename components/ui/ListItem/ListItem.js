import { FiDelete } from "react-icons/fi";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md"
import PropTypes from "prop-types";

const ListItem = (
    { item,
        itemClasses,
        itemBeingEdited,
        deleteItemClasses,
        setItemBeingEdited,
        editItemHandler,
        removeItem,
        updateList,
        checkItemClasses,
        checkItem
    }
) => {
    return (
        <li className={itemClasses}
            onClick={() => setItemBeingEdited({ id: item.id, name: item.name })}
        >
            <button
                className={checkItemClasses}
                onClick={() => checkItem(item.id)}
            >
                <MdCheckBoxOutlineBlank />
            </button>
            {itemBeingEdited.id === item.id ?
                <form
                    className='inline'
                    onSubmit={(e) => {
                        e.preventDefault()
                        setItemBeingEdited({})
                        updateList()
                    }}>
                    <input
                        className='bg-transparent text-center focus:outline-none px-2 py-1'
                        onChange={(e) => editItemHandler(e, item)}
                        onBlur={() => {
                            setItemBeingEdited({})
                            updateList()
                        }
                        }
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
    checkItem: PropTypes.func,
}

export default ListItem