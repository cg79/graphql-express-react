import axios from "axios";
import { useEffect, useState } from "react";
import { memoryStorage } from "../localStorage/memoryStorage";
import { useApolloClient } from "@apollo/client";


const isPromise = (p) => {
  if (typeof p === "object" && typeof p.then === "function") {
    return true;
  }
  return false;
};

const useExecuteQuery = (name, query, variables) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const request = {
    query,
  };
  if (variables) {
    request.variables = variables;
  }

  const key = name+ JSON.stringify(variables || '');

  const client = useApolloClient();

  useEffect(() => {
    const memoryInfo = memoryStorage.get(key);
    if (memoryInfo) {
      if (!isPromise(memoryInfo)) {
        setData(memoryInfo);
        setIsLoading(false);
        return;
      }
      memoryInfo.then((response) => {
        const dataResponse = response.data.data;
        setData(dataResponse);
        setIsLoading(false);
      });
      return;
    }

    const promise = axios.post(client.link.options.uri, request, {
      "Content-Type": "application/json",
      Authorization: "JWT fefege...",
    });
    memoryStorage.set(key, promise);

    promise
      .then((response) => {
        const dataResponse = response.data.data;
        setData(dataResponse);
        setIsLoading(false);

        const apiResponse = {
          data: dataResponse,
          loading: false,
          error: null,
        };
        memoryStorage.set(key, apiResponse);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);

  return { isLoading, data, error };
};

export { useExecuteQuery };
