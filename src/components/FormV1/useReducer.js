// SRC: https://www.robinwieruch.de/react-hooks-fetch-data

import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const FETCH_INIT = "FETCH_INIT";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAILURE = "FETCH_FAILURE";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, loading: true, error: false };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case FETCH_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      throw new Error("dataFetchReducer error: state, action", state, action);
  }
};

export const useDataFetcher = (initialUrl, initialData = null) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: false,
    data: initialData,
  });

  useEffect(() => {
    let runTask = true;

    const fetchData = async () => {
      dispatch({ type: FETCH_INIT });

      try {
        const response = await axios(url);
        if (runTask) dispatch({ type: FETCH_SUCCESS, payload: response.data });
      } catch (error) {
        if (runTask) dispatch({ type: FETCH_FAILURE });
      }
    };

    fetchData();

    return () => {
      runTask = false;
    };
  }, [url]);

  return { ...state, setUrl };
};
