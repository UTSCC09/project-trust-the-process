

export default function ExerciseStat(props) {
    const { exercise } = props;

    return (
        <div style={exerciseStatStyle}>
            <h1>{exercise.exerciseName}</h1>
            <h1>{exercise.duration}</h1>
        </div>
    );
}



const exerciseStatStyle = {
};


ExerciseStat.defaultProps = {
    exercise: {
        exerciseName: 'Eating Food',
        duration: 100
    }
}
