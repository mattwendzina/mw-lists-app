import { ErrorMessage } from "../components/ui/Messages/messages";

export const createErrorMessage = (error, setErrorMessage) => {
  switch (error) {
    case "createListFailed":
      setErrorMessage(
        <ErrorMessage
          message="Creating list failed! Please try again"
          classes="text-base"
        />
      );
      return;
    case "listNameAlreadyExists":
      setErrorMessage(
        <ErrorMessage
          message="List name already exists, please choose another."
          classes="text-base"
        />
      );
      return;
    default:
      setErrorMessage(<ErrorMessage message="An unexpected error occured!" />);
      return;
  }
};

export const setMessageDuration = (length, setMessage) => {
  setTimeout(() => {
    setMessage();
  }, length);
};
