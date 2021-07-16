import React from "react";

const StoreContext = React.createContext();
const initialState = { a: 1, b: 1 };

// helpers
function combineReducers(slices) {
  return (state, action) =>
    Object.keys(slices).reduce(
      (acc, prop) => ({
        ...acc,
        [prop]: slices[prop](acc[prop], action),
      }),
      state
    );
}

function reduceReducers(...reducers) {
  return (state, action) =>
    reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state);
}

// omit distinct action types for brevity
const plusOneReducer = (state, _action) => state + 1;
const timesTwoReducer = (state, _action) => state * 2;
const rootReducer = combineReducers({
  a: reduceReducers(plusOneReducer, plusOneReducer), // aNew = aOld + 1 + 1
  b: reduceReducers(timesTwoReducer, plusOneReducer), // bNew = bOld * 2 + 1
});

const StoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);
  const store = React.useMemo(() => [state, dispatch], [state]);
  return (
    <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
  );
};

const Comp = () => {
  const [globalState, globalDispatch] = React.useContext(StoreContext);
  return (
    <div>
      <p>
        a: {globalState.a}, b: {globalState.b}
      </p>
      <button onClick={globalDispatch}>Click me</button>
    </div>
  );
};

export const CombinedReducerContext = () => (
  <StoreProvider>
    <Comp />
  </StoreProvider>
);
