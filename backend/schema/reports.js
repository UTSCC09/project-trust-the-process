const { gql } = require('apollo-server');

const Report = gql`
  type ReportId {
    reportId: String!
    statusCode: Int!
  }

  type Report {
    userId: String!
    exercises: [String!]
    date: String!
    startTime: String!
    endTime: String!
    id: String!
    statusCode: Int!
  }

  type ReportEnd {
    endTime: String!
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
    initReport(userId: String!): initReportResult!
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
