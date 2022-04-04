import {VictoryChart, VictoryLine, VictoryAxis, VictoryLabel} from 'victory';

const DisplayViz = ({data}) => {
    if(data != [[]]) {
        let state = [];
        let times = data[0];
        let exerciseNames = data[1];

        for(let i = 0; i < times.length; i++) {
            state.push({
                x: times[i],
                y: exerciseNames[i]
            });
        }

        return (
            <VictoryChart padding={{ top: 40, bottom: 60, left: 120, right: 60 }}>
                <VictoryLabel text= "Your Workout Progress Over Time" x={225} y={15} textAnchor="middle"/>
                <VictoryAxis label= "Seconds" axisLabelComponent={<VictoryLabel dy={15} />} />
                <VictoryAxis dependentAxis label = "Exercise Type" axisLabelComponent={<VictoryLabel dy={-55} />} />
                <VictoryLine interpolation = "stepAfter" data = {state} />
            </VictoryChart>
        )
    }
    return null;
}
export default DisplayViz;