import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GenericModal from '../shared/generic-modal';
import { TextFieldWithErrorMessage } from '../coaches/text-field-with-error-message';
import { addGoalHandler } from './goalsHandler';

export default function AddGoalModal(props) {
  // "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  // "studentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  // "goalSet": "string",
  // "dateGoalSet": "2023-06-29T14:41:28.332Z",
  // "sel": "string",
  // "goalReviewDate": "2023-06-29T14:41:28.332Z",
  // "wasItAccomplished": "string",
  // "explanation": "string"

  const { student, onSaveSuccess } = props;

  const [goalSet, setGoalSet] = useState('');
  const [dateGoalSet, setDateGoalSet] = useState('');
  const [sel, setSel] = useState('');
  const [goalReviewDate, setGoalReviewDate] = useState('');
  const [wasItAccomplished, setWasItAccomplished] = useState('');
  const [explanation, setExplanation] = useState('');

  const id = String(Math.random());
  const studentId = student.id;
  console.log('Goal id', id);
  console.log('student Id', studentId);

  const requestSave = async () => {
    const addGoal = {
      id,
      studentId,
      goalSet,
      dateGoalSet,
      sel,
      goalReviewDate,
      wasItAccomplished,
      explanation,
    };

    await addGoalHandler(addGoal);

    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="cancel"
      modalHeadingTitle="Add Goal"
      onActionButtonClick={requestSave}
      openModal="Add Goal"
    >
      <TextFieldWithErrorMessage
        label="Goal"
        onChange={(value) => setGoalSet(value)}
        value={goalSet}
      />
      <TextFieldWithErrorMessage
        label="Date the Goal was Set"
        onChange={(value) => setDateGoalSet(value)}
        value={dateGoalSet}
      />
      <TextFieldWithErrorMessage
        label="SEL"
        onChange={(value) => setSel(value)}
        value={sel}
      />
      <TextFieldWithErrorMessage
        label="Review Date"
        onChange={(value) => setGoalReviewDate(value)}
        value={goalReviewDate}
      />
      <TextFieldWithErrorMessage
        label="Was it Accomplished?"
        onChange={(value) => setWasItAccomplished(value)}
        value={wasItAccomplished}
      />
      <TextFieldWithErrorMessage
        label="Explanation"
        onChange={(value) => setExplanation(value)}
        value={explanation}
      />
    </GenericModal>
  );
}

AddGoalModal.propTypes = {
  student: PropTypes.func,
  goals: PropTypes.func,
  onSaveSuccess: PropTypes.func,
};

AddGoalModal.defaultProps = {
  student: PropTypes.func,
  goals: undefined,
  onSaveSuccess: undefined,
};
