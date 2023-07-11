import React, { useState, useEffect } from 'react';
import { MenuItem, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { assignStudentHandler } from './studentHandlers';
import GenericModal from '../shared/generic-modal';
import { getActiveCoachesHandler } from '../coaches/coachHandlers';

export function ChooseCoachModal(props) {
  const [value, setValue] = useState('');
  const [newCoachId, setNewCoachId] = useState('');

  const { studentId, refreshTable, coaches } = props;

  const reassignCoachHandler = async () => {
    if (newCoachId !== '') {
      if (newCoachId !== 'Unassigned') {
        await assignStudentHandler(newCoachId, studentId);
      }
    }
    refreshTable();
  };

  const handleCoachChange = (event) => {
    setValue(event.target.value);
  };

  const recordValue = () => {
    setNewCoachId(value);
  };

  const content = (
    <TextField
      id="coach-select"
      select
      label="Unassigned"
      value={value}
      onFocus={recordValue}
      onChange={handleCoachChange}
      disabled={coaches.length === 0}
      style={{ width: '200px' }}
    >
      {coaches && coaches.length > 0 ? (
        coaches.map((coach) => (
          <MenuItem key={coach.id} value={coach.id}>
            {coach.coachFirstName}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>No coaches available</MenuItem>
      )}
    </TextField>
  );

  return (
    <GenericModal
      openButtonIcon={<EditIcon />}
      modalHeadingTitle="Change Coach"
      modalMessage={content}
      actionButtonTitle="Save"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
      onActionButtonClick={() => reassignCoachHandler()}
    />
  );
}
