import React, { createContext, useReducer, useContext } from "react";

const CountContext = createContext();

const countReducer = (state, action) => {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const CountProvider = ({ children }) => {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });

  // NOTE: might need to memoize this value
  // http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
};

const useCount = () => {
  const context = useContext(CountContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};

// NOTE: not exporting CountContext is intentional
// exposing only one way to provide the context value and only one way to consume it
// allows to ensure that the context value is used the way it should be
// and allows to provide useful utilities for the consumers
export { CountProvider, useCount };
