import { useMutation, gql } from '@apollo/client'
import { useEffect, useState } from 'react';
import DisplayViz from './displayViz';

const GET_REPORT_BY_ID = gql`
  mutation($reportId: String!) {
    getReportById(reportId: $reportId) {
        ... on ReportFail {
            message,
            statusCode
        }   
        ... on Report {
            userId,
            exercises,
            date,
            startTime,
            endTime,
            id,
            statusCode
        }
    }
}
`;
const GET_EXERCISE = gql`
  mutation($exerciseId: String!) {
    getExercise(exerciseId: $exerciseId){
        ... on ExerciseFail {
            message,
            statusCode
        }
        ... on Exercise {
            exerciseName,
            duration,
            order,
            statusCode
        }
    }
}
`;

const ReportViz = ({reportId}) => {
    const [data, setData] = useState([[]]);

    const [getReport] = useMutation(GET_REPORT_BY_ID, {
        onCompleted: (data) => {
            return data;
        },
        onError: () => {
          return null;
        }
    });
    const [getExercise] = useMutation(GET_EXERCISE, {
        onCompleted: (data) => {
            return data;
        },
        onError: () => {
            return null;
        }
    });

    const compare = (x,y) => {
        if(x.order < y.order) return -1;
        if(x.order > y.order) return 1;
        return 0;
    }

    const mapToNumber = (exerciseName) => {
        if(exerciseName == 'rest') return 0;
        if(exerciseName == 'squat') return 1;
        if(exerciseName == 'shoulder press') return 2;
    }


    useEffect(async() => {
        const reportObj = await getReport({variables: {reportId}});
        if(reportObj == null) return;

        //setData(report.data.getReportById);
        const report = reportObj.data.getReportById;
        const startTime = report.startTime;
        const exercises = report.exercises;
        exercises.sort(compare);

        let exerciseObj, exercise, currentTime = startTime, exerciseId;
        let exerciseNames = []; // y-axis 
        let times = [0]; // x-axis

        for(let i = 0; i < exercises.length; i++) {
            exerciseId = exercises[i];
            exerciseObj = await getExercise({variables: {exerciseId}});
            exercise = exerciseObj.data.getExercise;

            times.push(Number(times[times.length - 1]) + exercise.duration);
            exerciseNames.push(exercise.exerciseName);
        }
        exerciseNames.push(exerciseNames[exerciseNames.length - 1]);

        setData([times, exerciseNames]);
    }, []);

    return (
        <>
            <DisplayViz data = {data} />
        </>
    )
}

export default ReportViz;