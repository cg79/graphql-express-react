import { useQuery } from '@apollo/client';
import { memoryStorage } from '../localStorage/memoryStorage';

//export declare function useQuery<TData = any, TVariables = OperationVariables>(query: DocumentNode | TypedDocumentNode<TData, TVariables>, options?: QueryHookOptions<TData, TVariables>): QueryResult<TData, TVariables>;

function useExecuteQuery(
  name,
  query,
  variables
) {
//   const memoryInfo = memoryStorage.get(name);
//   if (memoryInfo) {
//     return memoryInfo;
//   }
//   memoryStorage.set(name, {});

  const { data, loading, error } = variables
    ? useQuery(query, { variables })
    : useQuery(query);

  if (error) {
    console.log(error);
  }

  const response = { data, loading, error };
  if(!response.loading){
    memoryStorage.set(name, response);
  }

  return response;
}

function executeQuery(
    name,
    query,
    variables
  ) {
    const memoryInfo = memoryStorage.get(name);
    if (memoryInfo) {
        debugger;
      return memoryInfo;
    }
  //   memoryStorage.set(name, {});
  
    const { data, loading, error } = variables
      ? useQuery(query, { variables })
      : useQuery(query);
  
    if (error) {
      console.log(error);
    }
  
    const response = { data, loading, error };
    if(!response.loading){
      memoryStorage.set(name, response);
    }
  
    return response;
  }

export { useExecuteQuery, executeQuery };
