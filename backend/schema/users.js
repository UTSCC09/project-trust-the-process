const { gql } = require('apollo-server');

const User = gql`
  type User {
    name: String!
    email: String!
    password: String!
  }

  type UserRegisterSuccess {
    user: User!
    statusCode: Int!
  }
  type UserRegisterFail {
    message: String!
    statusCode: Int!
  }
  union UserRegisterResult = UserRegisterSuccess | UserRegisterFail

  type Mutation {
    registerUser(name: String!, email: String!, password: String!): UserRegisterResult!
  }
  type Query {
    _: String!
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = User;