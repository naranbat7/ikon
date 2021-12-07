import React, { useReducer, useContext, createContext } from "react";
import { reducer } from "./global.reducer";

const GlobalContext = createContext({});
const INITIAL_STATE = {
  isLoading: false,
  authorization: {
    isAuthorized: false,
  },
  toast: {
    message: "",
    type: false,
  },
  name: "",
  url: "",
  id: 0,
  toastCount: 0,
};

const useGlobalActions = (initialGlobal = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initialGlobal);

  const setGlobalLoading = (item, quantity = 1) => {
    dispatch({ type: "SET_LOADING", payload: item });
  };

  const setGlobalAuthorization = (item, quantity = 1) => {
    dispatch({ type: "SET_AUTHORIZATION", payload: item });
  };

  const setGlobalToast = (item, quantity = 1) => {
    dispatch({ type: "SET_TOAST", payload: item });
    setGlobalCount(state.toastCount + 1);
  };

  const setGlobalAdmin = (item, quantity = 1) => {
    dispatch({ type: "SET_ADMIN", payload: item });
  };

  const setGlobalName = (item, quantity = 1) => {
    dispatch({ type: "SET_NAME", payload: item });
  };

  const setGlobalId = (item, quantity = 1) => {
    dispatch({ type: "SET_ID", payload: item });
  };

  const setGlobalUrl = (item, quantity = 1) => {
    dispatch({ type: "SET_URL", payload: item });
  };

  const setGlobalCount = (item, quantity = 1) => {
    dispatch({ type: "SET_COUNT", payload: item });
  };

  return {
    state,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
    setGlobalAdmin,
    setGlobalName,
    setGlobalId,
    setGlobalUrl,
  };
};

export const GlobalProvider = ({ children }) => {
  const {
    state,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
    setGlobalAdmin,
    setGlobalName,
    setGlobalId,
    setGlobalUrl,
  } = useGlobalActions();

  return (
    <GlobalContext.Provider
      value={{
        globalData: state,
        setGlobalLoading: setGlobalLoading,
        setGlobalAuthorization: setGlobalAuthorization,
        setGlobalToast: setGlobalToast,
        setGlobalAdmin: setGlobalAdmin,
        setGlobalName: setGlobalName,
        setGlobalId: setGlobalId,
        setGlobalUrl: setGlobalUrl,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
