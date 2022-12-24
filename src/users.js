import { useEffect, useRef } from "react";
import React from "react";
// const useExecuteQuery  = require("./api/api");
import { useExecuteQuery, useAsyncHookWithLoading1 } from "./api/api";
//https://codesandbox.io/s/react-async-custom-hook-example-with-and-without-loading-zhbjrl?file=/src/useAsyncHookWithoutLoading.js

const { useQuery, gql } = require("@apollo/client");

const GQL_USERS_QUERY = gql`
  query ExampleQuery {
    allUsers {
      id
    }
  }
`;

const USERS_QUERY = `
query ExampleQuery {
  allUsers {
    id
  }
}
`;

const Users = () => {
  // const users = useQuery(GQL_USERS_QUERY);

  // const { loading, error, data } = useQuery(GQL_USERS_QUERY);
  // console.log(data);

  // const [list, setMyList] = React.useState([]);
  // const myRef = useRef(0);

  const {
    error,
    isLoading,
    data,
  } = useExecuteQuery("users", USERS_QUERY, null);
  console.log({ error, isLoading, data });

  // const {
  //   error:e1,
  //   isLoading:l1,
  //   data:d1,
  // } = useExecuteQuery("users", USERS_QUERY, null);
  // console.log({ e1, l1, d1 });

  const x = useExecuteQuery("users", USERS_QUERY, null);
  console.log('x', x);

  // useEffect(() => {
  //   console.log('useEffect');
  //   setTimeout(() => {
  //     console.log('setTimeout');
  //     const {
  //       error:e2,
  //       isLoading:l2,
  //       data:d2,
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     } = useExecuteQuery("users", USERS_QUERY, null);
  //     console.log({ e2, l2, d2 });
  //   }, 2000);

  // }, []);


  // (async () => {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const response =  await useExecuteQuery("users", USERS_QUERY, null);
  //   // debugger;
  //   // setMyList(response.data.allUsers);
  //   console.log(response);

  // })();

  

  return (
    <>
      {isLoading ? (
        <p>useAsyncHookWithLoading is loading a message...</p>
      ) : (
        <p>{error}</p>
      )}

      {/* {console.log(data1)}
      {
        
         data1 && data1?.allUsers.map(({ id }) => {
            return <div key={id}>{id}</div>;
          })
      } */}

      {data &&
        data?.allUsers.map(({ id }) => {
          return <div key={id}>{id}</div>;
        })}
    </>
  );
};

export default Users;
