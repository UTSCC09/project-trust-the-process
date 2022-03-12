const Exercise = require("../models/exercise");
const Report = require("../models/report");

module.exports = {
    Mutation: {
        addExercise: async (_, {reportId, exerciseName, duration, weight}) => {
            try {
                if(!reportId || !exerciseName || !duration || !weight) {
                    return {
                        __typename: "ExerciseFail",
                        message: `At least one of reportId, exerciseName, duration, or weight is missing`,
                        statusCode: 401
                    };
                }

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
                    "weight": weight
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

        getExercise: async (_, {exerciseId}) => {
            try {
                if(!exerciseId) {
                    return {
                        __typename: "ExerciseFail",
                        message: `exerciseId is missing`,
                        statusCode: 401
                    };
                }

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
                    weight: exercise.weight,
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
