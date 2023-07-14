import React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  IconButton,
  Icon,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { headingStyle, headingText, closeIconStyle } from './modal-styling';

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
  onIconButtonClick: null,
  children: null,
};

GenericViewModal.propTypes = {
  openModal: PropTypes.string,
  openButtonIcon: PropTypes.element,
  modalHeadingTitle: PropTypes.string.isRequired,
  viewModalWidth: PropTypes.number,
  onIconButtonClick: PropTypes.func,
  children: PropTypes.element,
};
