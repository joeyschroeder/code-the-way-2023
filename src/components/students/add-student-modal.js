import React from 'react';
import { flattenDeep } from 'lodash';
import { Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { validate } from 'validate.js';
import { addStudentHandler } from './studentHandlers';
import { GenericModal } from '../shared/generic-modal';

export function AddStudentModal() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
  const [email, setEmail] = React.useState('');
  const [cellPhone, setCellPhone] = React.useState('');

  const [firstNameEdit, setFirstNameEdit] = React.useState(false);
  const [lastNameEdit, setLastNameEdit] = React.useState(false);
  const [emailEdit, setEmailEdit] = React.useState(false);
  const [cellPhoneEdit, setCellPhoneEdit] = React.useState(false);

  const validator = validate(
    { firstName, lastName, email, dateOfBirth, cellPhone },
    {
      firstName: {
        presence: { allowEmpty: false, message: '' },
      },
      lastName: {
        presence: { allowEmpty: false },
      },
      email: {
        presence: { allowEmpty: false },
        email: true,
      },
      cellPhone: {
        presence: { allowEmpty: true },
      },
      dateOfBirth: {},
    }
  );

  const messages = flattenDeep(Object.values(validator || {}));

  const actionButtonDisabled = Boolean(messages.length);

  const closeAction = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setDateOfBirth(new Date());
    setCellPhone('');

    setEmailEdit(false);
    setFirstNameEdit(false);
    setLastNameEdit(false);
    setCellPhoneEdit(false);
  };

  const addStudentAction = async () => {
    await addStudentHandler(firstName, lastName, dateOfBirth, cellPhone, email);
    closeAction();
  };

  const content = (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <TextField
          label="First Name"
          margin="normal"
          size="large"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          sx={{ my: 1 }}
          errorText={firstName.length < 1 ? 'Enter First Name' : ' '}
          error={firstName.length < 1 && firstNameEdit}
          onBlur={() => setFirstNameEdit(true)}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Last Name"
          margin="normal"
          size="large"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          sx={{ my: 1 }}
          errorText={lastName.length < 1 ? 'Enter Last Name' : ' '}
          error={lastName.length < 1 && lastNameEdit}
          onBlur={() => setLastNameEdit(true)}
        />
      </Grid>
      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date of Birth"
            margin="normal"
            sx={{ width: 210, my: 1 }}
            value={dayjs(dateOfBirth)}
            onChange={(newValue) => setDateOfBirth(newValue)}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item>
        <TextField
          label="Phone"
          margin="normal"
          size="large"
          onChange={(event) => {
            setCellPhone(event.target.value);
          }}
          sx={{ my: 1 }}
          errorText={cellPhone.length < 1 ? 'Enter Phone Number' : ' '}
          error={cellPhone.length < 1 && cellPhoneEdit}
          onBlur={() => setCellPhoneEdit(true)}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Email"
          margin="normal"
          size="large"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          sx={{ my: 1 }}
          errorText={email.length < 1 ? 'Enter Email' : ' '}
          error={
            (!email.includes('@') ? 'Must contain an @ sign.' : ' ') &&
            emailEdit
          }
          onBlur={() => setEmailEdit(true)}
        />
      </Grid>
    </Grid>
  );
  return (
    <GenericModal
      openModal={<AddIcon />}
      modalHeadingTitle="Add Student"
      modalMessage={content}
      actionButtonColor="submit"
      cancelButtonColor="cancel"
      actionButtonTitle="Add"
      cancelButtonTitle="Cancel"
      onActionButtonClick={addStudentAction}
      actionButtonDisabled={actionButtonDisabled}
      onCancelButtonClick={closeAction}
      onIconButtonClick={closeAction}
    />
  );
}
