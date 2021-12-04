export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_AUTHORIZATION":
      return { ...state, authorization: action.payload };
    case "SET_TOAST":
      return { ...state, toast: action.payload };
    case "SET_ADMIN":
      return { ...state, isAdmin: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_COUNT":
      return { ...state, toastCount: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
