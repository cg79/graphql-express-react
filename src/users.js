const { useQuery, gql } = require("@apollo/client")

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
}

export default Users;