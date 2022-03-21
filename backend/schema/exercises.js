const { gql } = require('apollo-server');

const Exercise = gql`
  type AddExercise {
    exerciseId: String!
    statusCode: Int!
  }

  type Exercise {
    exerciseName: String!
    duration: Int!
    statusCode: Int!
  }

  type ExerciseFail {
    message: String!
    statusCode: Int!
  }

  union AddExerciseResult = AddExercise | ExerciseFail
  union GetExerciseResult = Exercise | ExerciseFail

  type Mutation {
    addExercise(reportId: String!, exerciseName: String!, duration: Int!): AddExerciseResult!
    getExercise(exerciseId: String!): GetExerciseResult!
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
