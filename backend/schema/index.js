const { gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        me: User
    }

    type User {
        username: String!
    }
`;
module.exports = typeDefs;