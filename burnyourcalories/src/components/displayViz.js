import {VictoryChart, VictoryLine} from 'victory';

const DisplayViz = ({data}) => {
    if(data != [[]]) {
        let state = [];
        let times = data[0]
        let exerciseNames = data[1];
        for(let i = 0; i < times.length; i++) {
            state.push({
                x: times[i],
                y: exerciseNames[i]
            });
        }

        return (
            <VictoryChart>
                <VictoryLine data = {state} />
            </VictoryChart>
        )
    }
    return null;
}
export default DisplayViz;