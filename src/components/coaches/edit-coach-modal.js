import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { GenericModal } from '../shared/generic-modal';
import { editCoachHandler } from './coachHandlers';

export function EditCoachModal(props) {
  const { coachId, coach, onCoachEdit } = props;

  const [firstName, setFirstName] = useState(coach.coachFirstName);
  const [lastName, setLastName] = useState(coach.coachLastName);
  const [email, setEmail] = useState(coach.coachEmail);
  const [phoneNumber, setPhoneNumber] = useState(coach.coachPhoneNumber);

  const submitAction = async () => {
    try {
      await editCoachHandler(
        coachId,
        coach.userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        coach.active
      );
    } catch (error) {
      console.log(error);
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');

    onCoachEdit();
  };

  const cancelAction = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
  };

  const content = (
    <Grid container spacing={2} justifyContent="center">
      <div>
        <TextField
          id="outlined"
          label="First Name"
          defaultValue={firstName}
          sx={{ my: 1 }}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <TextField
          id="outlined"
          label="Last Name"
          defaultValue={lastName}
          sx={{ my: 1 }}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <TextField
          id="outlined"
          label="Email"
          defaultValue={email}
          sx={{ my: 1 }}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          id="outlined"
          label="Phone Number"
          defaultValue={phoneNumber}
          sx={{ my: 1 }}
          onChange={(event) => {
            setPhoneNumber(event.target.value);
          }}
        />
      </div>
    </Grid>
  );
  return (
    <GenericModal
      openModal={<EditIcon />}
      modalHeadingTitle="Edit Coach"
      modalMessage={content}
      actionButtonTitle="Save"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
      onActionButtonClick={submitAction}
      onCancelButtonClick={cancelAction}
    />
  );
}

EditCoachModal.propTypes = {
  coachId: PropTypes.string.isRequired,
  coach: PropTypes.object.isRequired,
  onCoachEdit: PropTypes.func,
};

EditCoachModal.defaultProps = {
  onCoachEdit: null,
};
