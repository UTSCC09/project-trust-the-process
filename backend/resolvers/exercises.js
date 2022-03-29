const Exercise = require("../models/exercise");
const Report = require("../models/report");

import { checkAlphanumeric, checkNumeric, checkObjectId, sanitizeContent } from 'securityUtils';

module.exports = {
    Mutation: {
        addExercise: async (_, {reportId, exerciseName, duration, order}, context) => {
            try {
                if(!checkObjectId(context.id)) {
                    return {
                        __typename: "ExerciseFail",
                        message: `Invalid auth token`,
                        statusCode: 401
                    };
                }

                if(!checkObjectId(reportId) || !checkAlphanumeric(exerciseName) || !checkNumeric(duration) || !checkNumeric(order)) {
                    return {
                        __typename: "ExerciseFail",
                        message: `At least one of reportId, exerciseName, duration, or order is invalid`,
                        statusCode: 401
                    };
                }

                reportId = sanitizeContent(reportId);
                exerciseName = sanitizeContent(exerciseName);
                duration = sanitizeContent(duration);
                order = sanitizeContent(order);

                const report = await Report.findOne({_id: reportId});
                if(!report) {
                    return {
                        __typename: "ExerciseFail",
                        message: `The report with reportId ${reportId} cannot be found`,
                        statusCode: 409
                    };
                }

                const newExercise = new Exercise({
                    "reportId": reportId,
                    "exerciseName": exerciseName,
                    "duration": duration,
                    "order": order
                });
                await newExercise.save();

                let exercise = newExercise._id.toString();

                report.exercises.push(exercise);
                await report.save();

                return {
                    __typename: "AddExercise",
                    exerciseId: exercise,
                    statusCode: 200
                };
            }
            catch (error) {
                return {
                    __typename: "ExerciseFail",
                    message: `${error}`,
                    statusCode: 500
                };
            }
        },

        getExercise: async (_, {exerciseId}, context) => {
            try {
                if(!checkObjectId(context.id)) {
                    return {
                        __typename: "ExerciseFail",
                        message: `Invalid auth token`,
                        statusCode: 401
                    };
                }
                if(!checkObjectId(exerciseId)) {
                    return {
                        __typename: "ExerciseFail",
                        message: `exerciseId is invalid`,
                        statusCode: 401
                    };
                }

                exerciseId = sanitizeContent(exerciseId);

                const exercise = await Exercise.findOne({_id: exerciseId});
                if(!exercise) {
                    return {
                        __typename: "ExerciseFail",
                        message: `The exercise with exerciseId ${exerciseId} cannot be found`,
                        statusCode: 404
                    };
                }
                
                return {
                    __typename: "Exercise",
                    exerciseName: exercise.exerciseName,
                    duration: exercise.duration,
                    order: exercise.order,
                    statusCode: 200
                };
            }
            catch(err) {
                return {
                    __typename: "ExerciseFail",
                    message: `${error}`,
                    statusCode: 500
                };
            }
        }
    }
};
