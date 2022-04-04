import { useMutation, gql } from '@apollo/client';
import { useEffect } from 'react';

const ADD_EXERCISE = gql`
  mutation($reportId: String!, $exerciseName: String!, $duration: Int!, $order: Int!) {
    addExercise(reportId: $reportId, exerciseName: $exerciseName, duration: $duration, order: $order){
      ... on ExerciseFail {
        message,
        statusCode
      }
      ... on AddExercise {
        exerciseId,
        statusCode
      }
    }
  }
`;

let order = 1;

const PopulateReport = ({exercises, reportId}) => {
    console.log(reportId);
    const [addExercise] = useMutation(ADD_EXERCISE, {
        onCompleted: (data) => {
            return data;
        },
        onError: () => {
            return null;
        }
    });

    useEffect(async () => {
        if((exercises.length > 0) && (reportId != '')) {
            const newExercise = exercises[exercises.length - 1];
            const exerciseName = newExercise.exerciseName;
            const duration = Number(newExercise.duration);

            await addExercise({variables: {reportId, exerciseName, duration, order}});
            order += 1;
          
            /*
            addExercise({variables: {reportId, exerciseName, duration, order}}).then((res) => {
              console.log(res);
              order += 1;
            });
            */
        }
    }, [exercises])


    return null;
}

export default PopulateReport;