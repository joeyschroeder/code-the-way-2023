import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GenericModal } from '../shared/generic-modal';
import { TextFieldWithErrorMessage } from '../coaches/text-field-with-error-message';
import { addCommunicationHandler } from './CommunicationsHandler';

export default function AddCommunicationsModal(props) {
  // "communicationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "studentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "coachId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "topic": "string",
  //   "description": "string",
  //   "created": "2023-07-10T18:57:02.295Z"

  const { student, onSaveSuccess } = props;

  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  const studentId = student.id;
  const coachID = student.coachId;
  const created = new Date().toJSON();

  console.log('student Id', studentId);
  console.log('coach Id', coachID);
  console.log('created', created);

  const requestSave = async () => {
    await addCommunicationHandler(
      studentId,
      coachID,
      topic,
      description,
      created
    );

    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="Cancel"
      modalHeadingTitle="Add Communication"
      onActionButtonClick={requestSave}
      openModal="Add Communication"
    >
      <TextFieldWithErrorMessage
        label="Topic"
        onChange={(value) => setTopic(value)}
        value={topic}
      />
      <TextFieldWithErrorMessage
        label="Description"
        onChange={(value) => setDescription(value)}
        value={description}
      />
    </GenericModal>
  );
}

AddCommunicationsModal.propTypes = {
  student: PropTypes.func,
  onSaveSuccess: PropTypes.func,
};

AddCommunicationsModal.defaultProps = {
  student: PropTypes.func,
  onSaveSuccess: undefined,
};
