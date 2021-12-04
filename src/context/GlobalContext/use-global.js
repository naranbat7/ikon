import React, { useReducer, useContext, createContext } from "react";
import { reducer } from "./global.reducer";

const GlobalContext = createContext({});
const INITIAL_STATE = {
  isLoading: false,
  authorization: {
    isAuthorized: false,
    token: "",
    appToken: "",
  },
  toast: {
    message: "",
    type: false,
  },
  isAdmin: 0,
  name: "",
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
