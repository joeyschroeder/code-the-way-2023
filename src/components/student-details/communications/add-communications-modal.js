import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, TextField, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import { TextFieldWithErrorMessage } from '../../shared/text-field-with-error-message';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { validate } from 'validate.js';
import { flattenDeep } from 'lodash';
import { getActiveCoachesHandler } from '../../coaches/coachHandlers';
import { addCommunicationHandler } from './communicationsHandler';
import { GenericModal } from '../../shared/generic-modal';

export default function AddCommunicationsModal(props) {
  const { student, onSaveSuccess } = props;

  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [coachId, setCoachId] = useState('');
  const [activeCoaches, setActiveCoaches] = React.useState([]);
  const [created, setCreated] = React.useState(new Date());

  const [descriptionEdit, setDescriptionEdit] = React.useState('');

  const requestActiveCoaches = async () => {
    const response = await getActiveCoachesHandler();
    const { data } = response;
    setActiveCoaches(data);
  };

  useEffect(() => {
    requestActiveCoaches();
  }, []);

  const validator = validate(
    { description },
    {
      description: {
        presence: { allowEmpty: false },
      },
    }
  );

  const messages = flattenDeep(Object.values(validator || {}));

  const actionButtonDisabled = Boolean(messages.length);
  const studentId = student.id;

  const requestSave = async () => {
    try {
      await addCommunicationHandler(
        studentId,
        coachId,
        topic,
        description,
        created
      );
      if (onSaveSuccess) onSaveSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="Cancel"
      modalHeadingTitle="Add Communication"
      onActionButtonClick={requestSave}
      actionButtonDisabled={actionButtonDisabled}
      openModal={<AddIcon sx={{ width: '40px', height: '40px' }} />}
      modalMessage="Fill out the fields below to add a communication."
      actionButtonColor="submit"
    >
      <Grid container alignItems="center" px={4} py={2} spacing={1}>
        <Grid item xs={12}>
          <TextField
            label="Topic"
            select
            value={topic}
            onChange={(event) => {
              setTopic(event.target.value);
            }}
            fullWidth
          >
            <MenuItem value="One-on-One Coaching Session">
              One-on-One Coaching Session
            </MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Phone call">Phone Call</MenuItem>
            <MenuItem value="Text message">Text Message</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
      <TextField
        label="Description"
        onChange={(event) => setDescription(event.target.value)}
        value={description}
        errorText={description.length < 1 ? 'Enter Description' : ' '}
        error={description.length < 1 && descriptionEdit}
        onBlur={() => setDescriptionEdit(true)}
        required
            multiline
            fullWidth
            minRows={2}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Coach"
            select
            value={coachId}
            onChange={(event) => setCoachId(event.target.value)}
            disabled={activeCoaches.length === 0}
            style={{ width: '200px' }}
          >
            {activeCoaches && activeCoaches.length > 0 ? (
              activeCoaches.map((activeCoach) => (
                <MenuItem key={activeCoach.id} value={activeCoach.id}>
                  {`${activeCoach.coachFirstName} ${activeCoach.coachLastName}`}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No coaches available</MenuItem>
            )}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              margin="normal"
              label="Date of Communication"
              value={dayjs(created)}
              onChange={(newValue) => setCreated(newValue)}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </GenericModal>
  );
}

AddCommunicationsModal.propTypes = {
  student: PropTypes.object,
  onSaveSuccess: PropTypes.func,
};

AddCommunicationsModal.defaultProps = {
  student: PropTypes.func,
  onSaveSuccess: undefined,
};
