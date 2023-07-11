import { flattenDeep } from 'lodash';
import React, { useState } from 'react';
import { validate } from 'validate.js';
import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField } from '@mui/material';
import { GenericModal } from '../shared/generic-modal';
import { addAdminHandler } from './adminHandlers';

export function AddAdminModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailEdit, setEmailEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [confirmPasswordEdit, setConfirmPasswordEdit] = useState(false);

  const validator = validate(
    { email, password, confirmPassword },
    {
      email: {
        presence: true,
        email: true,
      },
      password: {
        presence: true,
        format: {
          pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*',
          message:
            'must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
        },
        length: {
          minimum: 12,
          message: 'must be at least 12 characters',
        },
      },
      confirmPassword: {
        presence: true,
        equality: 'password',
      },
    }
  );

  const messages = flattenDeep(Object.values(validator || {}));

  const closeAction = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    setEmailEdit(false);
    setPasswordEdit(false);
    setConfirmPasswordEdit(false);
  };

  const submitAction = () => {
    addAdminHandler(email, password, confirmPassword);
    closeAction();
  };

  const actionButtonDisabled = Boolean(messages.length);

  return (
    <GenericModal
      openModal={<AddIcon />}
      modalHeadingTitle="Add an Admin"
      modalMessage="Fill out the fields below to add an admin."
      actionButtonTitle="Create"
      cancelButtonTitle="Cancel"
      actionButtonDisabled={actionButtonDisabled}
      actionButtonColor="submit"
      onActionButtonClick={submitAction}
      onCancelButtonClick={closeAction}
      onIconButtonClick={closeAction}
    >
      <Grid container justifyContent="center">
        <Grid item xs={9}>
          <TextField
            fullWidth
            onChange={(event) => setEmail(event.target.value)}
            label="Email"
            value={email}
            error={!email.includes('@') && emailEdit}
            errorText={!email.includes('@') ? 'Must contain an @ sign.' : ' '}
            required
            type="email"
            sx={{ my: 1 }}
            onBlur={() => setEmailEdit(true)}
          />
          <TextField
            fullWidth
            onChange={(event) => setPassword(event.target.value)}
            label="Password"
            value={password}
            error={password.length < 1 && passwordEdit}
            errorText={!password.length < 1}
            required
            type="password"
            sx={{ my: 1 }}
            onBlur={() => setPasswordEdit(true)}
          />
          <TextField
            fullWidth
            onChange={(event) => setConfirmPassword(event.target.value)}
            label="Confirm Password"
            value={confirmPassword}
            type="password"
            error={
              confirmPassword !== password ||
              (confirmPassword.length < 1 && confirmPasswordEdit)
            }
            errorText={
              confirmPassword !== password ? 'Passwords must match.' : ' '
            }
            required
            sx={{ my: 1 }}
            onBlur={() => setConfirmPasswordEdit(true)}
          />
        </Grid>
      </Grid>
    </GenericModal>
  );
}
