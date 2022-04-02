const Exercise = require("../models/exercise");
const Report = require("../models/report");

module.exports = {
    Mutation: {
        addExercise: async (_, {reportId, exerciseName, duration, order}, context) => {
            try {
                if(!validator.isMongoId(context.id)) {
                    return {
                        __typename: "ExerciseFail",
                        message: `Invalid auth token`,
                        statusCode: 401
                    };
                }

                if(!validator.isMongoId(reportId) || !validator.isAlphanumeric(exerciseName) || !validator.isNumeric(duration) || !validator.isNumeric(order)) {
                    return {
                        __typename: "ExerciseFail",
                        message: `At least one of reportId, exerciseName, duration, or order is invalid`,
                        statusCode: 401
                    };
                }

                // reportId = sanitizeContent(reportId);
                reportId = validator.escape(reportId);
                reportId = validator.trim(reportId);

                // exerciseName = sanitizeContent(exerciseName);
                exerciseName = validator.escape(exerciseName);
                exerciseName = validator.trim(exerciseName);

                // duration = sanitizeContent(duration);
                duration = validator.escape(duration);
                duration = validator.trim(duration);

                // order = sanitizeContent(order);
                order = validator.escape(order);
                order = validator.trim(order);

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
                if(!validator.isMongoId(context.id)) {
                    return {
                        __typename: "ExerciseFail",
                        message: `Invalid auth token`,
                        statusCode: 401
                    };
                }
                if(!validator.isMongoId(exerciseId)) {
                    return {
                        __typename: "ExerciseFail",
                        message: `exerciseId is invalid`,
                        statusCode: 401
                    };
                }

                // exerciseId = sanitizeContent(exerciseId);
                exerciseId = validator.escape(exerciseId);
                exerciseId = validator.trim(exerciseId);

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
