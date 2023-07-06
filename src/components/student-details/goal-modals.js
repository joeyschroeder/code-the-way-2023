import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import { GenericModal } from '../shared/generic-modal';
import { TextFieldWithErrorMessage } from '../coaches/text-field-with-error-message';
import { editGoalHandler } from './goalsHandler';

export function EditGoalModal(props) {
  const { goal, onSaveSuccess } = props;

  const [goalSet, setGoalSet] = useState('');
  const [dateGoalSet, setDateGoalSet] = useState(new Date());
  const [sel, setSel] = useState('');
  const [goalReviewDate, setGoalReviewDate] = useState(new Date());
  const [wasItAccomplished, setWasItAccomplished] = useState('');
  const [explanation, setExplanation] = useState('');

  // useEffect(() => {
  //   setGoalSet(goal.goalSet);
  //   setDateGoalSet(goal.dateGoalSet);
  //   setSEL(goal.sel);
  //   setGoalReviewDate(goal.goalReviewDate);
  //   setWasItAccomplished(goal.wasItAccomplished);
  //   setExplanation(goal.explanation);
  // }, [goal]);

  const requestSave = async () => {
    await editGoalHandler(
      goal.id,
      goal.studentId,
      goalSet,
      dateGoalSet,
      sel,
      goalReviewDate,
      wasItAccomplished,
      explanation
    );

    // if (onSaveSuccess) onSaveSuccess();
  };
  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="Cancel"
      modalHeadingTitle="Edit Goal"
      onActionButtonClick={requestSave}
      openButtonIcon={<EditIcon />}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="spaceBetween"
      >
        <Grid item mb={2}>
          <TextFieldWithErrorMessage
            label="Goal"
            onChange={(value) => setGoalSet(value)}
            value={goalSet}
          />
        </Grid>
        <Grid item my={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              margin="normal"
              sx={{ width: 210 }}
              label="Date Goal Set"
              value={dayjs(dateGoalSet)}
              onChange={(newValue) => setDateGoalSet(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item my={1}>
          <TextFieldWithErrorMessage
            label="SEL"
            onChange={(value) => setSel(value)}
            value={sel}
          />
        </Grid>
        <Grid item my={1}>
          <TextFieldWithErrorMessage
            label="Accomplished?"
            onChange={(value) => setWasItAccomplished(value)}
            value={wasItAccomplished}
          />
        </Grid>
        <Grid item my={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              margin="normal"
              sx={{ width: 210 }}
              label="Goal Review Date"
              value={dayjs(goalReviewDate)}
              onChange={(newValue) => setGoalReviewDate(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item my={1}>
          <TextFieldWithErrorMessage
            label="Explanation"
            onChange={(value) => setExplanation(value)}
            value={explanation}
          />
        </Grid>
      </Grid>
    </GenericModal>
  );
}
