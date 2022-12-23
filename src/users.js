const { useQuery, gql } = require("@apollo/client");
const { useExecuteQuery } = require("./api/api");

const USERS_QUERY = gql`
query ExampleQuery {
  allUsers {
    id
  }
}
`;

const Users = () => {

    const users = useQuery(USERS_QUERY);
    const { loading, error, data } = useQuery(USERS_QUERY);
    console.log(data)

    // const makeCall = () => {
    //     const { loading, error, data } = useQuery(USERS_QUERY);
    // }

    // return (
    //     <Button onClick={makeCall}></Button>
    // )
}

export default Users;