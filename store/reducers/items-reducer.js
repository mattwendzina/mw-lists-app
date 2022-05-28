export const initialState = {
  currentList: [],
  previousList: [],
  listItem: "",
  itemBeingEdited: "",
};

export const itemsReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_LIST":
      return {
        ...state,
        previousList: state.currentList,
        currentList: action.payload,
      };
    case "INITIATE_LIST":
      return {
        ...state,
        currentList: action.payload,
      };
    case "RESET_LIST":
      return {
        ...state,
        previousList: action.payload,
        currentList: action.payload,
      };
    case "SET_ITEM":
      return {
        ...state,
        listItem: action.payload,
      };
    case "SET_ITEM_BEING_EDITED":
      return {
        ...state,
        itemBeingEdited: action.payload,
      };
    default:
      throw new Error("Error occured");
  }
};
