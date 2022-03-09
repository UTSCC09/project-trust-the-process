const { gql } = require('apollo-server');

const Exercise = gql`
  type Exercise {
    reportID: String!
    exerciseName: String!
    repetitions: Int!
    weight: Int!
    statusCode: Int!
  }

  type ExerciseFail {
    message: String!
    statusCode: Int!
  }

  union AddExerciseResult = Exercise | ExerciseFail

  type Mutation {
    addExercise(reportId: String!, exerciseName: String!, repetitions: Int!, weight: Int!): AddExerciseResult!
  }

  type Query {
    _: String!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = Exercise;
