import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import { GenericModal } from '../shared/generic-modal';
import { TextFieldWithErrorMessage } from '../coaches/text-field-with-error-message';
import { editStudent } from '../../services/students/students';

export default function EditStudentInfoModal(props) {
  const { student, onSaveSuccess, isParent } = props;

  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [studentCellPhone, setStudentCellPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const [parentFirstName, setParentFirstName] = useState('');
  const [parentLastName, setParentLastName] = useState('');
  const [parentCellPhone, setParentCellPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [header, setHeader] = useState('');

  useEffect(() => {
    if (isParent) {
      setParentFirstName(student.parentFirstName);
      setParentLastName(student.parentLastName);
      setParentCellPhone(student.parentCellPhone);
      setParentEmail(student.parentEmail);
      setHeader('Edit Parent Information');
    } else {
      setStudentFirstName(student.studentFirstName);
      setStudentLastName(student.studentLastName);
      setStudentCellPhone(student.studentCellPhone);
      setStudentEmail(student.studentEmail);
      setHeader('Edit Student Information');
    }
  }, [student]);

  const requestSave = async () => {
    const updatedStudent = {
      ...student,
      studentFirstName,
      studentLastName,
      studentCellPhone,
      studentEmail,
    };
    const updatedParent = {
      ...student,
      parentFirstName,
      parentLastName,
      parentCellPhone,
      parentEmail,
    };

    await editStudent(isParent ? updatedParent : updatedStudent);

    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="cancel"
      modalHeadingTitle={header}
      onActionButtonClick={requestSave}
      openModal="open"
    >
      <TextFieldWithErrorMessage
        label="First Name"
        onChange={(value) =>
          isParent ? setParentFirstName(value) : setStudentFirstName(value)
        }
        value={isParent ? parentFirstName : studentFirstName}
      />
      <TextFieldWithErrorMessage
        label="Last Name"
        onChange={(value) =>
          isParent ? setParentLastName(value) : setStudentLastName(value)
        }
        value={isParent ? parentLastName : studentLastName}
      />
      <TextFieldWithErrorMessage
        label="Phone"
        onChange={(value) =>
          isParent ? setParentCellPhone(value) : setStudentCellPhone(value)
        }
        value={isParent ? parentCellPhone : studentCellPhone}
      />
      <TextFieldWithErrorMessage
        label="Email"
        onChange={(value) =>
          isParent ? setParentEmail(value) : setStudentEmail(value)
        }
        value={isParent ? parentEmail : studentEmail}
      />
    </GenericModal>
  );
}

EditStudentInfoModal.propTypes = {
  student: PropTypes.object,
  onSaveSuccess: PropTypes.func,
  isParent: PropTypes.bool,
};

EditStudentInfoModal.defaultProps = {
  student: undefined,
  onSaveSuccess: undefined,
  isParent: false,
};
