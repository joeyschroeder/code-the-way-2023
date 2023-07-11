import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { setStudentInactive } from '../../services/students/students';
import { GenericModal } from '../shared/generic-modal';

export function ArchiveStudentModal(props) {
  const { studentId, onStudentDeactivate } = props;
  const deactivateStudentAction = async () => {
    await setStudentInactive(studentId);
    if (onStudentDeactivate) onStudentDeactivate();
  };

  ArchiveStudentModal.propTypes = {
    studentId: PropTypes.string,
    onStudentDeactivate: PropTypes.func.isRequired,
  };

  ArchiveStudentModal.defaultProps = {
    studentId: '',
  };
  return (
    <GenericModal
      openModal={<DeleteIcon />}
      modalHeadingTitle="Deactivate Student"
      modalMessage="Are you sure you want to deactivate this student?"
      actionButtonColor="archive"
      cancelButtonColor="cancel"
      actionButtonTitle="Deactivate"
      cancelButtonTitle="Cancel"
      onActionButtonClick={deactivateStudentAction}
    />
  );
}
