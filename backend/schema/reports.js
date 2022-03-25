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

  type UserReportDates {
    dates: [String!]
    statusCode: Int!
  }

  type WorkoutTime {
    startTime: String!
    endTime: String!
    reportId: String!
  }

  type ReportTimes {
    times: [WorkoutTime!]!
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
  union UserReportDatesResult = UserReportDates | ReportFail
  union ReportsTimesResult = ReportTimes | ReportFail
  union ReportResult = Report | ReportFail
  union EndReportResult = ReportEnd | ReportFail

  type Mutation {
    initReport(userId: String!): initReportResult!
    getUserReportDates(userId: String!, month: String!, year: String!): UserReportDatesResult
    getReportTimesByDate(userId: String!, date: String!): ReportsTimesResult!
    getReportById(reportId: String!): ReportResult!
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
