import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import { FixedSizeList as List } from 'react-window';
import EditStudentInfoModal from './edit-student-info-modal';
import Goal from './goal';
import { altGetStudentGoalsHandler } from './goalsHandler';
import { LayoutPreloader } from '../layout/layout-preloader/layout-preloader';
import { LayoutError } from '../layout/layout-error/layout-error';
import { AddGoalModal } from './goal-modals';

export function StudentInfoBox(props) {
  const { student, onReload, isParent } = props;

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [CellPhone, setCellPhone] = useState('');
  const [Email, setEmail] = useState('');

  // useEffect gets names again when the student is updated
  useEffect(() => {
    if (isParent) {
      setFirstName(student.parentFirstName);
      setLastName(student.parentLastName);
      setCellPhone(student.parentCellPhone);
      setEmail(student.parentEmail);
    } else {
      setFirstName(student.studentFirstName);
      setLastName(student.studentLastName);
      setCellPhone(student.studentCellPhone);
      setEmail(student.studentEmail);
    }
  }, [isParent, student]);

  return (
    <Grid container direction="column" sx={{ my: 2 }}>
      <Grid item>
        <Typography fontSize="35px">
          {`${FirstName} ${LastName}`}
          <EditStudentInfoModal
            student={student}
            onSaveSuccess={() => onReload()}
            isParent={isParent}
          />
        </Typography>
      </Grid>
      <Grid item>
        <Typography>Cell: {CellPhone}</Typography>
      </Grid>
      <Grid item>
        <Typography>Email: {Email}</Typography>
      </Grid>
    </Grid>
  );
}
export function GoalsBox(props) {
  const { student, onReload } = props;

  const [allGoals, setAllGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const fetchGoals = () => {
    console.log('fetchGoals triggered');
    setIsLoading(true);
    setHasError(false);
    setAllGoals([]);

    // altGetStudentGoalsHandler uses callbacks
    // I have no clue why it didn't work with the regular one.
    altGetStudentGoalsHandler(student.id, (goals, error) => {
      if (error) {
        setHasError(true);
      } else {
        setAllGoals(goals.data);
        console.log('FINDME', goals.data);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchGoals();
  }, [student.id]);
  if (isLoading) return <LayoutPreloader />;
  if (hasError) return <LayoutError />;

  return (
    <Box>
      <AddGoalModal student={student} onSaveSuccess={() => fetchGoals()} />
      {allGoals.map((goalContent) => (
        <Goal
          goal={goalContent}
          key={goalContent.id}
          onSaveSuccess={() => fetchGoals()}
        />
      ))}
    </Box>
  );
}

StudentInfoBox.propTypes = {
  student: propTypes.func,
  onReload: propTypes.func,
  isParent: propTypes.bool,
};
StudentInfoBox.defaultProps = {
  student: undefined,
  onReload: undefined,
  isParent: false,
};
