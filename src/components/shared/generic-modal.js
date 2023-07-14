import React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  IconButton,
  Stack,
  Icon,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
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

  const actionAndClose = async () => {
    if (onActionButtonClick) await onActionButtonClick();
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
            <Typography px={5} py={3} align="center" fontSize={20}>
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
  openModal: PropTypes.element,
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

export default GenericModal;
