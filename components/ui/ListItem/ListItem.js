import { FiDelete } from "react-icons/fi";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import PropTypes from "prop-types";

const ListItem = ({
  item,
  itemClasses,
  itemBeingEdited,
  deleteItemClasses,
  setItemBeingEdited,
  editItemHandler,
  removeItem,
  updateItem,
  checkItemClasses,
  checkItem,
  itemTextClasses,
}) => {
  return (
    <li className={itemClasses}>
      {checkItem && (
        <button
          className={checkItemClasses}
          onClick={(e) => {
            e.currentTarget.blur();
            checkItem(item.id);
          }}
        >
          {item.checked === true ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </button>
      )}
      {itemBeingEdited.id === item.id ? (
        <form
          className="inline"
          onSubmit={(e) => {
            e.preventDefault();
            setItemBeingEdited({});
            updateItem(e, item.id);
          }}
        >
          <input
            className="bg-transparent text-center focus:outline-none px-2 py-1"
            onChange={(e) => editItemHandler(e, item)}
            onBlur={(e) => {
              setItemBeingEdited({});
              updateItem(e, item.id);
            }}
            value={itemBeingEdited.name}
            autoFocus
          />
        </form>
      ) : (
        <button
          onClick={() => {
            setItemBeingEdited(item.id, item.name);
          }}
          className="w-full"
        >
          <p className={itemTextClasses} value={item.name}>
            {item.name}
          </p>
        </button>
      )}
      <button className={deleteItemClasses} onClick={() => removeItem(item.id)}>
        <FiDelete />
      </button>
    </li>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  itemClasses: PropTypes.string,
  itemBeingEdited: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  deleteItemClasses: PropTypes.string,
  itemTextClasses: PropTypes.string,
  checkItemClasses: PropTypes.string,
  setItemBeingEdited: PropTypes.func,
  editItemHandler: PropTypes.func,
  removeItem: PropTypes.func,
  checkItem: PropTypes.func,
  updateItem: PropTypes.func,
};

export default ListItem;
