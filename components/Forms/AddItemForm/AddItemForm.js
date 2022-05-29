import PropTypes from "prop-types";

import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

const AddItemForm = ({ addItem, inputHandler, item, classes }) => (
  <form onSubmit={addItem} className="basis-1/3">
    <div className={classes}>
      <Input label="Add new item" onChange={inputHandler} value={item} />
      <Button
        name="Submit"
        classes="mx-auto"
        primary={item ? true : false}
        disabled={!item ? true : false}
      />
    </div>
  </form>
);

export default AddItemForm;

AddItemForm.propTypes = {
  addItem: PropTypes.func,
  inputHandler: PropTypes.func,
  item: PropTypes.string,
};
