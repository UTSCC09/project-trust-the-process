const { gql } = require('apollo-server');

const User = gql`
  type User {
    firstName: String!
    lastName: String
    email: String!
    password: String!
  }

  type UserRegisterSuccess {
    user: User!
    statusCode: Int!
  }

  type UserLoginSuccess {
    user: User!
    token: String!
    statusCode: Int!
  }
  
  type UserFail {
    message: String!
    statusCode: Int!
  }

  union UserRegisterResult = UserRegisterSuccess | UserFail
  union UserLoginResult = UserLoginSuccess | UserFail

  type Mutation {
    registerUser(firstName: String!, lastName: String!, email: String!, password: String!): UserRegisterResult!
    loginUser(email: String!, password: String!): UserLoginResult!
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