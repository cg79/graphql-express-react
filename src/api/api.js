import axios from "axios";
import { useEffect, useState } from "react";
import { memoryStorage } from "../localStorage/memoryStorage";
import { useApolloClient } from "@apollo/client";

//export declare function useQuery<TData = any, TVariables = OperationVariables>(query: DocumentNode | TypedDocumentNode<TData, TVariables>, options?: QueryHookOptions<TData, TVariables>): QueryResult<TData, TVariables>;

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

  const client = useApolloClient();

  useEffect(() => {
    const memoryInfo = memoryStorage.get(name);
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
    memoryStorage.set(name, promise);

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
        memoryStorage.set(name, apiResponse);
      })
      .catch((error) => {
        // debugger;
        console.log(error);
        setError(error);
      });
  }, []);

  return { isLoading, data, error };
};

export { useExecuteQuery };
// export default useExecuteQuery;
