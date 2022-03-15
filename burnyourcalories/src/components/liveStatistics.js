import React, { useEffect, useState } from 'react';
import { LockOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

import {
	Container,
	Box,
	Typography,
	Avatar,
	TextField,
} from '@mui/material';

import {
    useMutation, 
    gql 
} from '@apollo/client';

import { BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
    useNavigate
} from 'react-router-dom';










import { ExerciseStat } from "./exerciseStat";


export default function LiveStatistic(props) {
    const { exercises, totalWorkoutTime } = props;

    return (
      <div className="LiveStat">

        <div className="Exercises">
          {exercises.length === 0 ? (
            <h2>No exercises added yet, try adding some.</h2>
          ) : (
            exercises.map((exercise, idx) => (
              <ExerciseStat
                exercise={exercise}
              />
            ))
          )}
        </div>


        <div className="WorkoutDuration">
          {totalWorkoutTime}
        </div>

      </div>
    );
}


const divStyle = {
  color: 'blue',
  align: 'center',
};

LiveStatistic.defaultProps = {
  exercise: [],
  totalWorkoutTime: 100
}


