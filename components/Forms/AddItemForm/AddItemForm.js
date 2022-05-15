import PropTypes from "prop-types";

import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

const AddItemForm = ({ addItem, newItemHandler, item }) => (
  <form onSubmit={addItem} className="basis-1/3">
    <Input label="Add new item" onChange={newItemHandler} value={item} />
    <Button
      name="Submit"
      classes="mx-auto"
      primary={item ? true : false}
      disabled={!item ? true : false}
    />
  </form>
);

export default AddItemForm;

AddItemForm.propTypes = {
  addItem: PropTypes.func,
  newItemHandler: PropTypes.func,
  item: PropTypes.string,
};
