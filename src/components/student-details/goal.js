import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import propTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { EditGoalModal } from './goal-modals';

export default function Goal(props) {
  const { goal, onSaveSuccess } = props;

  // handles API stuff
  const [goalId, setGoalId] = useState('');
  const [goalSet, setGoalSet] = useState('');
  const [dateGoalSet, setDateGoalSet] = useState(new Date());
  const [SEL, setSEL] = useState('');
  const [goalReviewDate, setGoalReviewDate] = useState(new Date());
  const [wasItAccomplished, setWasItAccomplished] = useState('');
  const [explanation, setExplanation] = useState('');

  // controls how much of the explanation is shown
  const [showMore, setShowMore] = useState(true);
  useEffect(() => {
    if (goal.id) {
      setGoalId(goal.id);
      setGoalSet(goal.goalSet ? goal.goalSet : '');
      setDateGoalSet(goal.dateGoalSet ? goal.dateGoalSet : new Date());
      setSEL(goal.sel ? goal.sel : '');
      setGoalReviewDate(goal.goalReviewDate ? goal.goalReviewDate : new Date());
      setWasItAccomplished(
        goal.wasItAccomplished ? goal.wasItAccomplished : ''
      );
      setExplanation(goal.explanation ? goal.explanation : '');
    }
  }, [goal]);
  const handleChange = () => {
    setShowMore(!showMore);
  };

  return (
    <Grid container direction="column" sx={{ border: '1px solid black' }}>
      <Grid
        item
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ border: '2px solid gray' }}
      >
        <Typography>Goal: {goalSet}</Typography>
        <Typography>{SEL}</Typography>

        <Typography>
          Goal set: {dayjs(dateGoalSet).format('MMM DD, YYYY')}
        </Typography>
        <EditGoalModal goal={goal} onSaveSuccess={onSaveSuccess} />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Typography>
          Review Date: {dayjs(goalReviewDate).format('MMM DD, YYYY')}
        </Typography>
        <Typography>Was it accomplished: {wasItAccomplished}</Typography>
      </Grid>
      <Typography
        width="95%"
        sx={{ mx: '2.5%' }}
        paragraph
        gutterBottom
        noWrap={showMore}
      >
        Explanation: {explanation}
      </Typography>
      <Button
        onClick={handleChange}
        startIcon={
          showMore ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />
        }
      />
    </Grid>
  );
}

Goal.propTypes = {
  goal: propTypes.object,
  onSaveSuccess: propTypes.func,
};
Goal.defaultProps = {
  goal: undefined,
  onSaveSuccess: undefined,
};
