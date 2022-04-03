const Report = require("../models/report");
const User = require("../models/user");
const validator = require('validator');

module.exports = {
    Mutation: {
        initReport: async (_, {userId}, context) => {
            try {
                if(!validator.isMongoId(context.id)) {
                    return {
                        __typename: "ReportFail",
                        message: `Invalid auth token`,
                        statusCode: 401
                    };
                }

                if(!validator.isMongoId(userId)) {
                    return {
                        __typename: "ReportFail",
                        message: `userId is invalid`,
                        statusCode: 401
                    };
                }

                userId = validator.escape(userId);
                userId = validator.trim(userId);

                const user = await User.findOne({_id: userId});
                if(!user) {
                    return {
                        __typename: "ReportFail",
                        message: `The user with userId ${userId} cannot be found`,
                        statusCode: 409
                    };
                }

                let full_date = Date().toString();
                let date = full_date.split(" ");

                const newReport = new Report({
                    "userId": userId,
                    "date": date[1] + " " + date[2] + " " + date[3],
                    "startTime": date[4]
                });
                await newReport.save();
                let report = newReport._id.toString();

                user.reports.push(report);
                await user.save();

                return {
                    __typename: "ReportId",
                    reportId: report,
                    statusCode: 200
                };
            }
            catch (error) {
                return {
                    __typename: "ReportFail",
                    message: `${error}`,
                    statusCode: 500
                };
            }
        },

        getUserReportDates: async (_, {userId, month, year}, context) => {
            try {
                if(!validator.isMongoId(context.id)) {
                    return {
                        __typename: "ReportFail",
                        message: `Invalid auth token`,
                        statusCode: 401
                    };
                }

                if(!validator.isMongoId(userId) || !validator.isAlpha(month) || !validator.isNumeric(year)) {
                    return {
                        __typename: "ReportFail",
                        message: `At least one of userId, month, or year is invalid`,
                        statusCode: 401
                    };
                }

                userId = validator.escape(userId);
                userId = validator.trim(userId);

                month = validator.escape(month);
                month = validator.trim(month);

                year = validator.escape(year);
                year = validator.trim(year);

                const reports = await Report.find({"userId": userId});
                if(!reports) {
                    return {
                        __typename: "ReportFail",
                        message: `The report with userId ${userId} cannot be found`,
                        statusCode: 404
                    };
                }

                let userDates = [];

                reports.forEach(function (report, _) {
                    if (report.date.includes(month) && report.date.includes(year)) {
                        userDates.push(report.date);
                    } 
                });
                userDates.sort();

                return {
                    __typename: "UserReportDates",
                    dates: userDates,
                    statusCode: 200
                };
            }
            catch(err) {
                return {
                    __typename: "ReportFail",
                    message: `${error}`,
                    statusCode: 500
                };
            }
        },

        getReportTimesByDate: async (_, {userId, date}, context) => {
            try {
                if(!validator.isMongoId(context.id)) {
                    return {
                        __typename: "ReportFail",
                        message: `Invalid auth token`,
                        statusCode: 401
                    };
                }

                if(!validator.isMongoId(userId) || validator.isEmpty(date)) {
                    return {
                        __typename: "ReportFail",
                        message: `At least one of userId, or date is invalid`,
                        statusCode: 401
                    };
                }

                userId = validator.escape(userId);
                userId = validator.trim(userId);

                date = validator.escape(date);
                date = validator.trim(date);

                const reports = await Report.find({"userId": userId, "date": date});
                if(!reports) {
                    return {
                        __typename: "ReportFail",
                        message: `The report with userId ${userId} and date ${date} cannot be found`,
                        statusCode: 404
                    };
                }

                let workoutTimes = [];

                reports.forEach(function (report, _) {
                    workoutTimes.push({startTime: report.startTime, endTime: report.endTime, reportId: report._id});
                });
                
                return {
                    __typename: "ReportTimes",
                    times: workoutTimes,
                    statusCode: 200
                };
            }
            catch(err) {
                return {
                    __typename: "ReportFail",
                    message: `${error}`,
                    statusCode: 500
                };
            }
        },

        getReportById: async (_, {reportId}, context) => {
            try {
                if(!validator.isMongoId(context.id)) {
                    return {
                        __typename: "ReportFail",
                        message: `Invalid auth token`,
                        statusCode: 401
                    };
                }

                if(!validator.isMongoId(reportId)) {
                    return {
                        __typename: "ReportFail",
                        message: `reportId is inavlid`,
                        statusCode: 401
                    };
                }

                reportId = validator.escape(reportId);
                reportId = validator.trim(reportId);

                const report = await Report.findOne({_id: reportId});
                if(!report) {
                    return {
                        __typename: "ReportFail",
                        message: `The report with reportId ${reportId} cannot be found`,
                        statusCode: 404
                    };
                }
                
                return {
                    __typename: "Report",
                    userId: report.userId,
                    exercises: report.exercises,
                    date: report.date,
                    startTime: report.startTime,
                    endTime: report.endTime,
                    id: report._id,
                    statusCode: 200
                };
            }
            catch(err) {
                return {
                    __typename: "ReportFail",
                    message: `${error}`,
                    statusCode: 500
                };
            }
        },

        endReport: async (_, {reportId}, context) => {
            try {
                if(!validator.isMongoId(context.id)) {
                    return {
                        __typename: "ReportFail",
                        message: `Invalid auth token`,
                        statusCode: 401
                    };
                }

                if(!validator.isMongoId(reportId)) {
                    return {
                        __typename: "ReportFail",
                        message: `reportId is invalid`,
                        statusCode: 401
                    };
                }

                reportId = validator.escape(reportId);
                reportId = validator.trim(reportId);

                const report = await Report.findOne({_id: reportId});
                if(!report) {
                    return {
                        __typename: "ReportFail",
                        message: `The report with reportId ${reportId} cannot be found`,
                        statusCode: 409
                    };
                }

                let full_date = Date().toString();
                let date = full_date.split(" ");

                report.endTime = date[4];
                await report.save();

                return {
                    __typename: "ReportEnd",
                    endTime: date[4],
                    statusCode: 200
                };
            }
            catch (error) {
                return {
                    __typename: "ReportFail",
                    message: `${error}`,
                    statusCode: 500
                };
            }
        }
    }
};
