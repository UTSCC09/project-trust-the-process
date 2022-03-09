const { gql } = require('apollo-server');

const Report = gql`
  type Exercise {
    reportID: String!
    exerciseName: String!
    repetitions: Int!
    weight: Int!
  }

  type ReportId {
    reportId: String!
    statusCode: Int!
  }

  type Report {
    userID: String!
    exercises: [Exercise!]
    date: String!
    startTime: Int!
    endTime: Int!
    id: String!
    statusCode: Int!
  }

  type ReportEnd {
    endTime: Int!
    statusCode: Int!
  }
  
  type ReportFail {
    message: String!
    statusCode: Int!
  }

  union initReportResult = ReportId | ReportFail
  union ReportResult = Report | ReportFail
  union EndReportResult = ReportEnd | ReportFail

  type Mutation {
    initReport(userId: String!, date: String!): initReportResult!
    getReportByDate(userId: String!, date: String!): ReportResult!
    endReport(reportId: String!): EndReportResult!
  }

  type Query {
    _: String!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = Report;
