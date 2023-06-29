import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  IconButton,
  Stack,
  TextField,
  Icon,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { validate } from 'validate.js';
import { flattenDeep } from 'lodash';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {
  backgroundStyle,
  headingStyle,
  headingText,
  closeIconStyle,
  footerStyle,
  buttonBackground,
  buttonText,
  buttonTheme,
} from './modal-styling';
import {
  activateAdminHandler,
  deactivateAdminHandler,
} from '../admin/adminHandlers';
import { activateCoachHandler, deactivateCoachHandler } from './coachHandlers';
// function onClick confirm
// function onCLick cancel
// onConfirm lable
// onCancel label

export function GenericModal(props) {
  const {
    openModal,
    openButtonIcon,
    modalHeadingTitle,
    modalMessage,
    actionButtonTitle,
    cancelButtonTitle,
    actionButtonColor,
    actionButtonDisabled,
    onActionButtonClick,
    onCancelButtonClick,
    onIconButtonClick,
    children,
  } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actionAndClose = () => {
    if (onActionButtonClick) onActionButtonClick();
    handleClose();
  };

  const cancelAndClose = () => {
    if (onCancelButtonClick) onCancelButtonClick();
    handleClose();
  };

  const iconAndClose = () => {
    if (onIconButtonClick) onIconButtonClick();
    handleClose();
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} startIcon={openButtonIcon}>
        {openModal}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={backgroundStyle}>
          <Grid item sx={headingStyle}>
            <Typography padding={2} align="center" sx={headingText}>
              {modalHeadingTitle}
            </Typography>
            <IconButton size="small" onClick={iconAndClose} sx={closeIconStyle}>
              <CloseIcon fontSize="large" sx={closeIconStyle} />
            </IconButton>
          </Grid>
          {modalMessage && (
            <Typography padding={5} align="center" fontSize={20}>
              {modalMessage}
            </Typography>
          )}

          {children}

          <Grid item sx={footerStyle} xs={12}>
            <Stack
              direction="row"
              spacing={0}
              justifyContent="right"
              padding={3}
            >
              <Button
                variant="text"
                onClick={cancelAndClose}
                spacing={2}
                sx={buttonBackground}
                theme={buttonTheme}
                color="cancel"
              >
                <Typography style={buttonText}>{cancelButtonTitle}</Typography>
              </Button>
              <Button
                variant="contained"
                onClick={actionAndClose}
                sx={buttonBackground}
                disabled={actionButtonDisabled}
                theme={buttonTheme}
                color={actionButtonColor}
              >
                <Typography style={buttonText}>{actionButtonTitle}</Typography>
              </Button>
            </Stack>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

GenericModal.defaultProps = {
  openModal: null,
  openButtonIcon: null,
  actionButtonDisabled: null,
  onCancelButtonClick: null,
  onIconButtonClick: null,
  children: null,
};

GenericModal.propTypes = {
  openModal: PropTypes.string,
  openButtonIcon: PropTypes.instanceOf(Icon),
  modalHeadingTitle: PropTypes.string.isRequired,
  modalMessage: PropTypes.string.isRequired,
  actionButtonTitle: PropTypes.string.isRequired,
  cancelButtonTitle: PropTypes.string.isRequired,
  actionButtonColor: PropTypes.string.isRequired,
  onActionButtonClick: PropTypes.func.isRequired,
  actionButtonDisabled: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onIconButtonClick: PropTypes.func,
  children: PropTypes.element,
};

export function AddCoachModal() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const validator = validate(
    { userName, password },
    {
      userName: {
        presence: true,
        email: true,
      },
      password: {
        presence: true,
        length: {
          minimum: 6,
          message: 'must be at least 6 characters',
        },
      },
    }
  );

  const messages = flattenDeep(Object.values(validator || {}));
  console.log('messages: ', messages);

  const submitAction = () => {
    alert('make api call here');
    setUserName('');
    setPassword('');
  };

  const cancelAction = () => {
    setUserName('');
    setPassword('');
  };

  const actionButtonDisabled = Boolean(messages.length);

  return (
    <GenericModal
      openModal={<AddIcon />}
      modalHeadingTitle="Add a Coach"
      modalMessage="Fill out the fields below to add a coach."
      actionButtonTitle="Create"
      cancelButtonTitle="Cancel"
      actionButtonDisabled={actionButtonDisabled}
      actionButtonColor="submit"
      onActionButtonClick={submitAction}
      onCancelButtonClick={cancelAction}
      onIconButtonClick={cancelAction}
    >
      <Grid container justifyContent="center">
        <Grid item xs={9}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              onChange={(event) => setUserName(event.target.value)}
              label="Username"
              value={userName}
              type="email"
            />
            <TextField
              fullWidth
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
              value={password}
              type="password"
            />
          </Stack>
        </Grid>
        {messages.length > 0 && (
          <Grid item xs={9}>
            {messages.map((message, index) => (
              <Typography key={index.id} variant="body2" color="error">
                {message}
              </Typography>
            ))}
          </Grid>
        )}
      </Grid>
    </GenericModal>
  );
}

export function ArchiveCoachModal() {
  // const archiveCoachAction = () => {
  //   console.log('here is where you connect to api');
  // };

  return (
    <GenericModal
      openModal="open"
      modalHeadingTitle="Archive Coach"
      modalMessage="Are you sure you want to archive this coach?"
      actionButtonTitle="Archive"
      cancelButtonTitle="Cancel"
      actionButtonColor="archive"
      // actionButtonFunction={archiveCoachAction}
    />
  );
}

export function DeactivateAdminModal(props) {
  const { adminId, onAdminDeactivate } = props;
  const deactivateAdminAction = async () => {
    await deactivateAdminHandler(adminId);
    if (onAdminDeactivate) onAdminDeactivate();
  };

  return (
    <GenericModal
      openModal={<DeleteIcon />}
      modalHeadingTitle="Deactivate Admin"
      modalMessage="Are you sure you want to deactivate this admin?"
      actionButtonTitle="Deactivate"
      cancelButtonTitle="Cancel"
      actionButtonColor="archive"
      cancelButtonColor="cancel"
      onActionButtonClick={deactivateAdminAction}
    />
  );
}
DeactivateAdminModal.propTypes = {
  adminId: PropTypes.string,
  onAdminDeactivate: PropTypes.func.isRequired,
};

DeactivateAdminModal.defaultProps = {
  adminId: '',
};

export function ActivateAdminModal(props) {
  const { adminId, onAdminActivate } = props;
  const activateAdminAction = async () => {
    await activateAdminHandler(adminId);
    if (onAdminActivate) onAdminActivate();
  };

  return (
    <GenericModal
      openModal={<Typography>Activate</Typography>}
      modalHeadingTitle="Activate Admin"
      modalMessage="Are you sure you want to activate this admin?"
      actionButtonTitle="Activate"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
      cancelButtonColor="cancel"
      onActionButtonClick={activateAdminAction}
    />
  );
}
ActivateAdminModal.propTypes = {
  adminId: PropTypes.string,
  onAdminActivate: PropTypes.func.isRequired,
};

ActivateAdminModal.defaultProps = {
  adminId: '',
};

export function DeactivateCoachModal(props) {
  const { coachId, coachEmail, onCoachDeactivate } = props;
  const deactivateCoachAction = async () => {
    await deactivateCoachHandler(coachId, coachEmail, coachEmail);
    if (onCoachDeactivate) onCoachDeactivate();
  };

  return (
    <GenericModal
      openModal={<DeleteIcon />}
      modalHeadingTitle="Deactivate Coach"
      modalMessage="Are you sure you want to deactivate this coach?"
      actionButtonTitle="Deactivate"
      cancelButtonTitle="Cancel"
      actionButtonColor="archive"
      cancelButtonColor="cancel"
      onActionButtonClick={deactivateCoachAction}
    />
  );
}
DeactivateCoachModal.propTypes = {
  coachId: PropTypes.string,
  coachEmail: PropTypes.string,
  onCoachDeactivate: PropTypes.func.isRequired,
};

DeactivateCoachModal.defaultProps = {
  coachId: '',
  coachEmail: '',
};

export function ActivateCoachModal(props) {
  const { coachId, coachEmail, onCoachActivate } = props;
  const activateCoachAction = async () => {
    await activateCoachHandler(coachId, coachEmail, coachEmail);
    if (onCoachActivate) onCoachActivate();
  };

  return (
    <GenericModal
      openModal={<Typography>Activate</Typography>}
      modalHeadingTitle="Activate Coach"
      modalMessage="Are you sure you want to activate this coach?"
      actionButtonTitle="Activate"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
      cancelButtonColor="cancel"
      onActionButtonClick={activateCoachAction}
    />
  );
}
ActivateCoachModal.propTypes = {
  coachId: PropTypes.string,
  coachEmail: PropTypes.string,
  onCoachActivate: PropTypes.func.isRequired,
};

ActivateCoachModal.defaultProps = {
  coachId: '',
  coachEmail: '',
};

export function ArchiveStudentModal() {
  return (
    <GenericModal
      openModal={<DeleteIcon />}
      modalHeadingTitle="Archive Student"
      modalMessage="Are you sure you want to archive this student?"
      actionButtonColor="archive"
      cancelButtonColor="cancel"
      actionButtonTitle="Archive"
      cancelButtonTitle="Cancel"
    />
  );
}

export function ActivateStudentModal() {
  return (
    <GenericModal
      openModal="Accept"
      modalHeadingTitle="Accept Student"
      modalMessage="Are you sure you want to accept this student?"
      actionButtonColor="submit"
      cancelButtonColor="cancel"
      actionButtonTitle="Accept"
      cancelButtonTitle="Cancel"
    />
  );
}

export function AddStudentModal() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const content = (
    <React.Fragment>
      <TextField
        label="First Name"
        margin="normal"
        size="small"
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <TextField
        label="Last Name"
        margin="normal"
        size="small"
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />
      <TextField
        label="Email"
        margin="normal"
        size="small"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <TextField
        label="Phone"
        margin="normal"
        size="small"
        onChange={(event) => {
          setPhone(event.target.value);
        }}
      />
    </React.Fragment>
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
    />
  );
}

export function ChooseCoachModal() {
  const test = [
    {
      value: 'Coach API',
      label: 'Coach 1 API Call',
    },
    {
      value: 'Coach API!',
      label: 'Coach 2 API Call',
    },
    {
      value: 'Coach API!!',
      label: 'Coach 3 API Call',
    },
    {
      value: 'Coach API!!!',
      label: 'Coach 4 API Call',
    },
  ];
  const content = (
    <Grid container spacing={2} justifyContent="center">
      <div>
        <TextField
          id="API"
          select
          label="Select"
          defaultValue="Coach API"
          helperText="Select Coach"
        >
          {test.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Grid>
  );
  return (
    <GenericModal
      openModal={<EditIcon />}
      modalHeadingTitle="Change Coach"
      modalMessage={content}
      actionButtonTitle="Save"
      cancelButtonTitle="Cancel"
      actionButtonColor="submit"
    />
  );
}

export function GenericViewModal(props) {
  const {
    openModal,
    openButtonIcon,
    modalHeadingTitle,
    onIconButtonClick,
    children,
    viewModalWidth,
  } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const iconAndClose = () => {
    if (onIconButtonClick) onIconButtonClick();
    handleClose();
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} startIcon={openButtonIcon}>
        {openModal}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: viewModalWidth,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: '10px',
          }}
        >
          <Grid item sx={headingStyle}>
            <Typography padding={2} align="center" sx={headingText}>
              {modalHeadingTitle}
            </Typography>
            <IconButton size="small" onClick={iconAndClose} sx={closeIconStyle}>
              <CloseIcon fontSize="large" sx={closeIconStyle} />
            </IconButton>
          </Grid>
          {children}
        </Box>
      </Modal>
    </React.Fragment>
  );
}

GenericViewModal.defaultProps = {
  openModal: null,
  openButtonIcon: null,
  viewModalWidth: 475,
};

GenericViewModal.propTypes = {
  openModal: PropTypes.string,
  openButtonIcon: PropTypes.instanceOf(Icon),
  modalHeadingTitle: PropTypes.string.isRequired,
  viewModalWidth: PropTypes.number,
};

export default GenericModal;
