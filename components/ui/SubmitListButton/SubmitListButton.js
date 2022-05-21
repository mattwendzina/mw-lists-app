import Button from "../Button/Button";

const SubmitListButton = ({ name, classNames, onSubmit }) => (
  <form className={classNames} onSubmit={onSubmit}>
    <Button name={name} primary />
  </form>
);

export default SubmitListButton;
